"use client";

import { useState } from "react";
import {
  SHOULDER_TABLE,
  SLOTTING_TABLE,
  MATERIAL_LABELS,
  OPERATION_LABELS,
  type MaterialGroup,
  type CuttingMode,
  type Operation,
  type DiameterEntry,
} from "@/lib/data";

const CUTTING_MODE_LABELS: Record<CuttingMode, string> = {
  highSpeed: "High Speed",
  generalPurpose: "General Purpose",
};

function ResultCard({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: string | number;
  unit: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 flex flex-col gap-1 ${
        highlight
          ? "border-cyan-500 bg-cyan-950/40"
          : "border-zinc-700 bg-zinc-800/60"
      }`}
    >
      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
        {label}
      </span>
      <span
        className={`text-2xl font-bold tabular-nums ${
          highlight ? "text-cyan-300" : "text-white"
        }`}
      >
        {value}
        <span className="ml-1 text-sm font-normal text-zinc-400">{unit}</span>
      </span>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; sub?: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-300">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2.5 pr-8 text-white text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
          <svg className="h-4 w-4 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {options.find((o) => o.value === value)?.sub && (
        <p className="text-xs text-zinc-500">
          {options.find((o) => o.value === value)?.sub}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [operation, setOperation] = useState<Operation>("shoulder");
  const [diameter, setDiameter] = useState<string>("1/8");
  const [material, setMaterial] = useState<MaterialGroup>("carbon");
  const [mode, setMode] = useState<CuttingMode>("generalPurpose");
  const [machineMaxRpm, setMachineMaxRpm] = useState<string>("");
  const [showTable, setShowTable] = useState(false);

  const activeTable = operation === "shoulder" ? SHOULDER_TABLE : SLOTTING_TABLE;
  const entry = activeTable.find((r) => r.dc === diameter) as DiameterEntry;
  const conditions = entry[material][mode];

  const maxRpm = machineMaxRpm ? parseInt(machineMaxRpm, 10) : null;
  const effectiveRpm =
    maxRpm && maxRpm < conditions.rpm ? maxRpm : conditions.rpm;
  const rpmScale = effectiveRpm / conditions.rpm;
  const effectiveFeed = parseFloat((conditions.feedRate * rpmScale).toFixed(1));
  const isRpmLimited = maxRpm !== null && !isNaN(maxRpm) && maxRpm < conditions.rpm;

  const operationOptions = (
    Object.entries(OPERATION_LABELS) as [Operation, { label: string; sub: string }][]
  ).map(([k, v]) => ({ value: k, label: v.label, sub: v.sub }));

  const diameterOptions = activeTable.map((r) => ({
    value: r.dc,
    label: `${r.dc}"  (${r.dcInch.toFixed(4)}")`,
  }));

  const materialOptions = (
    Object.entries(MATERIAL_LABELS) as [MaterialGroup, { label: string; examples: string }][]
  ).map(([k, v]) => ({ value: k, label: v.label, sub: v.examples }));

  const modeOptions = (
    Object.entries(CUTTING_MODE_LABELS) as [CuttingMode, string][]
  ).map(([k, v]) => ({ value: k, label: v }));

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-cyan-600">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">Feeds &amp; Speeds Calculator</h1>
            <p className="text-xs text-zinc-400">{OPERATION_LABELS[operation].label} — Carbide End Mill</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        {/* Inputs */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Tool &amp; Material Setup
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <SelectField
              label="Operation"
              value={operation}
              onChange={(v) => setOperation(v as Operation)}
              options={operationOptions}
            />
            <SelectField
              label="Tool Diameter (DC)"
              value={diameter}
              onChange={setDiameter}
              options={diameterOptions}
            />
            <SelectField
              label="Work Material"
              value={material}
              onChange={(v) => setMaterial(v as MaterialGroup)}
              options={materialOptions}
            />
            <SelectField
              label="Cutting Mode"
              value={mode}
              onChange={(v) => setMode(v as CuttingMode)}
              options={modeOptions}
            />
          </div>

          <div className="flex flex-col gap-1.5 max-w-xs">
            <label className="text-sm font-medium text-zinc-300">
              Machine Max RPM{" "}
              <span className="text-zinc-500 font-normal">(optional — scales feed)</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 10000"
              value={machineMaxRpm}
              onChange={(e) => setMachineMaxRpm(e.target.value)}
              className="rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2.5 text-white text-sm placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </section>

        {/* Results */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              Recommended Conditions
            </h2>
            {isRpmLimited && (
              <span className="rounded-full bg-amber-900/60 border border-amber-700 px-3 py-0.5 text-xs text-amber-300 font-medium">
                RPM limited — feed scaled proportionally
              </span>
            )}
          </div>

          <div className={`grid gap-3 ${operation === "slotting" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
            <ResultCard
              label="Spindle Speed"
              value={effectiveRpm.toLocaleString()}
              unit="RPM"
              highlight
            />
            <ResultCard
              label="Feed Rate"
              value={effectiveFeed}
              unit="IPM"
              highlight
            />
            <ResultCard
              label="Depth of Cut (ap)"
              value={conditions.ap}
              unit="in"
            />
            {operation === "shoulder" && conditions.ae != null && (
              <ResultCard
                label="Width of Cut (ae)"
                value={conditions.ae}
                unit="in"
              />
            )}
            {operation === "slotting" && (
              <ResultCard
                label="Width of Cut (ae)"
                value={`= DC (${entry.dc}")`}
                unit=""
              />
            )}
          </div>

          {isRpmLimited && (
            <p className="text-xs text-zinc-500">
              Table recommends {conditions.rpm.toLocaleString()} RPM /{" "}
              {conditions.feedRate} IPM. Values scaled to your machine limit of{" "}
              {effectiveRpm.toLocaleString()} RPM (
              {(rpmScale * 100).toFixed(0)}%).
            </p>
          )}

          {/* Derived values */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-800/40 px-5 py-4 flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-zinc-400">Chip load / tooth (2-flute): </span>
              <span className="font-semibold text-white">
                {(effectiveFeed / (effectiveRpm * 2)).toFixed(4)}&quot;
              </span>
            </div>
            <div>
              <span className="text-zinc-400">Chip load / tooth (4-flute): </span>
              <span className="font-semibold text-white">
                {(effectiveFeed / (effectiveRpm * 4)).toFixed(4)}&quot;
              </span>
            </div>
            <div>
              <span className="text-zinc-400">Surface speed: </span>
              <span className="font-semibold text-white">
                {Math.round(effectiveRpm * Math.PI * entry.dcInch / 12)} SFM
              </span>
            </div>
          </div>
        </section>

        {/* Full table toggle */}
        <section className="space-y-3">
          <button
            onClick={() => setShowTable((s) => !s)}
            className="flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showTable ? "rotate-90" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            {showTable ? "Hide" : "Show"} full lookup table
          </button>

          {showTable && (
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-800 text-zinc-300">
                    <th rowSpan={2} className="border border-zinc-700 px-3 py-2 text-left sticky left-0 bg-zinc-800 z-10">
                      DC (in)
                    </th>
                    {(["carbon", "alloy", "stainless"] as MaterialGroup[]).map((m) => (
                      <th key={m} colSpan={operation === "slotting" ? 5 : 6} className="border border-zinc-700 px-3 py-2 text-center">
                        {MATERIAL_LABELS[m].label}
                      </th>
                    ))}
                  </tr>
                  <tr className="bg-zinc-800/80 text-zinc-400">
                    {(["carbon", "alloy", "stainless"] as MaterialGroup[]).map((m) => (
                      <>
                        <th key={`${m}-hs-rpm`} className="border border-zinc-700 px-2 py-1.5 whitespace-nowrap">HS RPM</th>
                        <th key={`${m}-hs-feed`} className="border border-zinc-700 px-2 py-1.5">HS IPM</th>
                        <th key={`${m}-gp-rpm`} className="border border-zinc-700 px-2 py-1.5">GP RPM</th>
                        <th key={`${m}-gp-feed`} className="border border-zinc-700 px-2 py-1.5">GP IPM</th>
                        <th key={`${m}-ap`} className="border border-zinc-700 px-2 py-1.5">ap</th>
                        {operation === "shoulder" && (
                          <th key={`${m}-ae`} className="border border-zinc-700 px-2 py-1.5">ae</th>
                        )}
                      </>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeTable.map((row) => {
                    const active = row.dc === diameter;
                    return (
                      <tr
                        key={row.dc}
                        onClick={() => setDiameter(row.dc)}
                        className={`cursor-pointer transition-colors ${
                          active
                            ? "bg-cyan-950/60 text-cyan-200"
                            : "hover:bg-zinc-800/60 text-zinc-300"
                        }`}
                      >
                        <td className={`border border-zinc-700 px-3 py-2 font-bold sticky left-0 z-10 ${active ? "bg-cyan-950/80" : "bg-zinc-900"}`}>
                          {row.dc}
                        </td>
                        {(["carbon", "alloy", "stainless"] as MaterialGroup[]).map((m) => (
                          <>
                            <td key={`${row.dc}-${m}-hs-rpm`} className="border border-zinc-700 px-2 py-2 text-right tabular-nums">{row[m].highSpeed.rpm.toLocaleString()}</td>
                            <td key={`${row.dc}-${m}-hs-feed`} className="border border-zinc-700 px-2 py-2 text-right tabular-nums">{row[m].highSpeed.feedRate}</td>
                            <td key={`${row.dc}-${m}-gp-rpm`} className="border border-zinc-700 px-2 py-2 text-right tabular-nums">{row[m].generalPurpose.rpm.toLocaleString()}</td>
                            <td key={`${row.dc}-${m}-gp-feed`} className="border border-zinc-700 px-2 py-2 text-right tabular-nums">{row[m].generalPurpose.feedRate}</td>
                            <td key={`${row.dc}-${m}-ap`} className="border border-zinc-700 px-2 py-2 text-right tabular-nums">{row[m].highSpeed.ap}</td>
                            {operation === "shoulder" && (
                              <td key={`${row.dc}-${m}-ae`} className="border border-zinc-700 px-2 py-2 text-right tabular-nums">{row[m].highSpeed.ae}</td>
                            )}
                          </>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Notes */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 space-y-1.5 text-xs text-zinc-500">
          <p className="font-medium text-zinc-400">Notes</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Values are for carbide end mills — dry or light mist cutting.</li>
            <li>ap = axial depth of cut{operation === "shoulder" ? "; ae = radial width of cut" : "; ae = DC (full slot width)"}.</li>
            {operation === "shoulder" && <li>High Speed mode uses full ap/ae; reduce 20–30% for interrupted cuts or long reach.</li>}
            {operation === "slotting" && <li>Slotting is full-width engagement — consider reducing ap or feed for deflection-sensitive setups.</li>}
            <li>Always verify conditions against your specific toolholder rigidity and machine capability.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
