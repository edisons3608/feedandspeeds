"use client";

import { useState, useEffect } from "react";
import {
  INDEXABLE_1IN,
  INDEXABLE_AE_LABELS,
  INDEXABLE_AP_LABELS,
  type IndexableMaterial,
  type IndexableAe,
  type IndexableAp,
} from "@/lib/data";

const DC_IN = 1.0; // fixed: 1" indexable end mill
const MATERIALS = Object.keys(INDEXABLE_1IN) as IndexableMaterial[];
const AE_OPTIONS = Object.keys(INDEXABLE_AE_LABELS) as IndexableAe[];
const AP_OPTIONS = Object.keys(INDEXABLE_AP_LABELS) as IndexableAp[];

const GROUP_BADGE: Record<"P" | "N" | "S", string> = {
  P: "bg-blue-900/60 text-blue-300 border-blue-700",
  N: "bg-green-900/60 text-green-300 border-green-700",
  S: "bg-orange-900/60 text-orange-300 border-orange-700",
};

function Card({ label, value, unit, sub, highlight }: {
  label: string; value: string | number; unit: string; sub?: string; highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-1 ${highlight ? "border-cyan-500 bg-cyan-950/40" : "border-zinc-700 bg-zinc-800/60"}`}>
      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{label}</span>
      <span className={`text-2xl font-bold tabular-nums ${highlight ? "text-cyan-300" : "text-white"}`}>
        {value}
        {unit && <span className="ml-1 text-sm font-normal text-zinc-400">{unit}</span>}
      </span>
      {sub && <span className="text-xs text-zinc-500">{sub}</span>}
    </div>
  );
}

function SelectField({ label, value, onChange, options, disabled }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-300">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2.5 pr-8 text-white text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-50"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
          <svg className="h-4 w-4 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function IndexableCalc() {
  const [material, setMaterial]       = useState<IndexableMaterial>("mildSteel");
  const [ae, setAe]                   = useState<IndexableAe>("0.25DC");
  const [ap, setAp]                   = useState<IndexableAp>("0.197");
  const [numInserts, setNumInserts]   = useState<string>("2");
  const [machineMaxRpm, setMachineMaxRpm] = useState<string>("");

  const spec = INDEXABLE_1IN[material];
  const isSlot = ae === "slot";

  // Available ap keys for current material + ae
  const availableAps = Object.keys(spec.feeds[ae] ?? {}) as IndexableAp[];

  // Auto-correct ap when ae changes and current ap is no longer available
  useEffect(() => {
    if (!availableAps.includes(ap)) setAp(availableAps[0] ?? "0.197");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ae, material]);

  const effectiveAp: IndexableAp = isSlot ? "0.197" : ap;
  const ipt = spec.feeds[ae]?.[effectiveAp];
  const hasData = ipt !== undefined;

  // RPM from cutting speed
  const rpmNominal = Math.round((spec.vc * 12) / (Math.PI * DC_IN));
  const z = Math.max(1, parseInt(numInserts, 10) || 2);
  const maxRpm = machineMaxRpm ? parseInt(machineMaxRpm, 10) : null;
  const effectiveRpm  = maxRpm && !isNaN(maxRpm) && maxRpm < rpmNominal ? maxRpm : rpmNominal;
  const isRpmLimited  = maxRpm !== null && !isNaN(maxRpm) && maxRpm < rpmNominal;
  const effectiveVc   = Math.round((effectiveRpm * Math.PI * DC_IN) / 12);
  const feedRate      = hasData ? parseFloat((ipt! * effectiveRpm * z).toFixed(1)) : null;

  // ap options for the selector
  const apOptions = AP_OPTIONS.map((k) => ({
    value: k,
    label: INDEXABLE_AP_LABELS[k],
    disabled: !availableAps.includes(k),
  }));

  return (
    <div className="space-y-8">
      {/* Setup */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Indexable End Mill Setup — 1&quot; DC
          </h2>
          <span className="text-xs text-zinc-500 bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1">
            Feed = IPT × RPM × z
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="lg:col-span-2">
            <SelectField
              label="Work Material"
              value={material}
              onChange={(v) => setMaterial(v as IndexableMaterial)}
              options={MATERIALS.map((k) => ({
                value: k,
                label: `${INDEXABLE_1IN[k].label}${INDEXABLE_1IN[k].subtitle !== "—" ? ` (${INDEXABLE_1IN[k].subtitle})` : ""}`,
              }))}
            />
          </div>

          <SelectField
            label="Radial Engagement (ae)"
            value={ae}
            onChange={(v) => setAe(v as IndexableAe)}
            options={AE_OPTIONS.map((k) => ({ value: k, label: INDEXABLE_AE_LABELS[k] }))}
          />

          <SelectField
            label="Axial Depth (ap)"
            value={isSlot ? "0.197" : ap}
            onChange={(v) => setAp(v as IndexableAp)}
            options={apOptions}
            disabled={isSlot}
          />
        </div>

        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-1.5 w-36">
            <label className="text-sm font-medium text-zinc-300">No. of Inserts (z)</label>
            <input
              type="number" min="1" max="12"
              value={numInserts}
              onChange={(e) => setNumInserts(e.target.value)}
              className="rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2.5 text-white text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div className="flex flex-col gap-1.5 w-44">
            <label className="text-sm font-medium text-zinc-300">
              Machine Max RPM{" "}
              <span className="text-zinc-500 font-normal">(optional)</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={machineMaxRpm}
              onChange={(e) => setMachineMaxRpm(e.target.value)}
              className="rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2.5 text-white text-sm placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>
      </section>

      {/* Grade / breaker recommendation */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${GROUP_BADGE[spec.group]}`}>
          ISO {spec.group}
        </span>
        <span className="text-sm text-zinc-300">
          Grade: <span className="font-semibold text-white">{spec.grade}</span>
        </span>
        <span className="text-sm text-zinc-300">
          Breaker: <span className="font-semibold text-white">{spec.breaker}</span>
        </span>
        {isRpmLimited && (
          <span className="rounded-full bg-amber-900/60 border border-amber-700 px-3 py-0.5 text-xs text-amber-300 font-medium ml-auto">
            RPM limited — vc scaled down
          </span>
        )}
      </div>

      {/* Results */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Results</h2>

        {!hasData ? (
          <div className="rounded-xl border border-red-800 bg-red-950/30 px-5 py-4 text-sm text-red-300">
            This ae / ap combination is not recommended for the selected material. Choose a smaller ae or ap.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card
                label="Cutting Speed (vc)"
                value={effectiveVc.toLocaleString()}
                unit="SFM"
                sub={`range: ${spec.vcMin}–${spec.vcMax}`}
              />
              <Card
                label="Spindle Speed"
                value={effectiveRpm.toLocaleString()}
                unit="RPM"
                highlight
              />
              <Card
                label="Feed per Tooth"
                value={`≤ ${ipt!}`}
                unit="IPT"
              />
              <Card
                label="Feed Rate"
                value={feedRate ?? "—"}
                unit="IPM"
                highlight
                sub={`${z} insert${z !== 1 ? "s" : ""}`}
              />
            </div>

            {isRpmLimited && (
              <p className="text-xs text-zinc-500">
                Nominal: {rpmNominal.toLocaleString()} RPM ({spec.vc} SFM). Scaled to machine limit of {effectiveRpm.toLocaleString()} RPM ({effectiveVc} SFM).
              </p>
            )}

            <div className="rounded-xl border border-zinc-700 bg-zinc-800/40 px-5 py-4 flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-zinc-400">Chip load per tooth: </span>
                <span className="font-semibold text-white">≤ {ipt!}&quot;</span>
              </div>
              <div>
                <span className="text-zinc-400">Total feed per rev: </span>
                <span className="font-semibold text-white">≤ {(ipt! * z).toFixed(4)}&quot;</span>
              </div>
              <div>
                <span className="text-zinc-400">ae actual: </span>
                <span className="font-semibold text-white">
                  {isSlot ? `${DC_IN}" (full slot)` : `≤ ${(DC_IN * parseFloat(ae)).toFixed(3)}"`}
                </span>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Notes */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 space-y-1.5 text-xs text-zinc-500">
        <p className="font-medium text-zinc-400">Notes</p>
        <ul className="list-disc list-inside space-y-1">
          <li>RPM = (vc × 12) / (π × DC). For 1&quot; DC: RPM ≈ vc × 3.820.</li>
          <li>Feed values from the 1.000&quot; / 25–28mm DC column of the manufacturer table.</li>
          <li>IPT values are maximums — start at 70% and adjust for rigidity and surface finish.</li>
          <li>Aluminum vc range is very wide (655–9840 SFM); use higher end for roughing, lower for heat-sensitive setups.</li>
        </ul>
      </section>
    </div>
  );
}