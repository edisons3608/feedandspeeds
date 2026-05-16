// ─── Shared types ────────────────────────────────────────────────────────────

export type CuttingMode = "highSpeed" | "generalPurpose";
export type Operation   = "shoulder" | "slotting";
export type ToolModel   = "VQMHZV"   | "VQJHV";

export interface CutCondition {
  rpm:      number;
  feedRate: number; // IPM
  ap:       number; // axial depth of cut (inch)
  ae?:      number; // radial width of cut (inch) — omitted for full-slot slotting
}

export const TOOL_MODEL_LABELS: Record<ToolModel, string> = {
  VQMHZV: "VQMHZV",
  VQJHV:  "VQJHV",
};

export const OPERATION_LABELS: Record<Operation, { label: string; sub: string }> = {
  shoulder: { label: "Shoulder Milling", sub: "Radial depth ae < DC" },
  slotting: { label: "Slotting (Full Slot)", sub: "ae = DC (full width)" },
};

// ─── VQMHZV ──────────────────────────────────────────────────────────────────
// 3-flute carbide end mill · 3 material groups · 12 diameters · HS + GP modes

export type VQMHZVMaterial = "carbon" | "alloy" | "stainless";

export const VQMHZV_MATERIAL_LABELS: Record<VQMHZVMaterial, { label: string; examples: string }> = {
  carbon:    { label: "Carbon Steel (≤30HRC)",       examples: "AISI 1035, AISI 1050, ASTM 283" },
  alloy:     { label: "Alloy / Pre-hardened Steel",  examples: "AISI H13, AISI 4140, AISI P21" },
  stainless: { label: "Stainless Steel / Titanium",  examples: "AISI 304, AISI 306, AISI 316L, Ti-6Al-4V etc." },
};

export interface VQMHZVEntry {
  dc: string; dcInch: number;
  carbon:    { highSpeed: CutCondition; generalPurpose: CutCondition };
  alloy:     { highSpeed: CutCondition; generalPurpose: CutCondition };
  stainless: { highSpeed: CutCondition; generalPurpose: CutCondition };
}

export const VQMHZV_SHOULDER_TABLE: VQMHZVEntry[] = [
  { dc: "1/16",  dcInch: 1/16,
    carbon:    { highSpeed: { rpm: 26000, feedRate: 55.3, ap: 0.094, ae: 0.013 }, generalPurpose: { rpm: 24000, feedRate: 33.9, ap: 0.094, ae: 0.013 } },
    alloy:     { highSpeed: { rpm: 20000, feedRate: 26.0, ap: 0.094, ae: 0.013 }, generalPurpose: { rpm: 20000, feedRate: 17.3, ap: 0.094, ae: 0.013 } },
    stainless: { highSpeed: { rpm: 18000, feedRate: 23.4, ap: 0.094, ae: 0.013 }, generalPurpose: { rpm: 16000, feedRate: 13.8, ap: 0.094, ae: 0.013 } } },
  { dc: "5/64",  dcInch: 5/64,
    carbon:    { highSpeed: { rpm: 24000, feedRate: 70.9, ap: 0.12,  ae: 0.023 }, generalPurpose: { rpm: 19000, feedRate: 37.0, ap: 0.12,  ae: 0.023 } },
    alloy:     { highSpeed: { rpm: 19000, feedRate: 33.7, ap: 0.12,  ae: 0.023 }, generalPurpose: { rpm: 16000, feedRate: 18.9, ap: 0.12,  ae: 0.023 } },
    stainless: { highSpeed: { rpm: 16000, feedRate: 24.6, ap: 0.12,  ae: 0.023 }, generalPurpose: { rpm: 13000, feedRate: 13.0, ap: 0.12,  ae: 0.023 } } },
  { dc: "3/32",  dcInch: 3/32,
    carbon:    { highSpeed: { rpm: 20000, feedRate: 70.9, ap: 0.14,  ae: 0.028 }, generalPurpose: { rpm: 16000, feedRate: 37.4, ap: 0.14,  ae: 0.028 } },
    alloy:     { highSpeed: { rpm: 16000, feedRate: 34.0, ap: 0.14,  ae: 0.028 }, generalPurpose: { rpm: 13000, feedRate: 18.1, ap: 0.14,  ae: 0.028 } },
    stainless: { highSpeed: { rpm: 13000, feedRate: 24.6, ap: 0.14,  ae: 0.028 }, generalPurpose: { rpm: 11000, feedRate: 13.8, ap: 0.14,  ae: 0.028 } } },
  { dc: "7/64",  dcInch: 7/64,
    carbon:    { highSpeed: { rpm: 17000, feedRate: 72.3, ap: 0.16,  ae: 0.033 }, generalPurpose: { rpm: 14000, feedRate: 39.4, ap: 0.16,  ae: 0.033 } },
    alloy:     { highSpeed: { rpm: 14000, feedRate: 34.7, ap: 0.16,  ae: 0.033 }, generalPurpose: { rpm: 11000, feedRate: 18.1, ap: 0.16,  ae: 0.033 } },
    stainless: { highSpeed: { rpm: 11000, feedRate: 24.7, ap: 0.16,  ae: 0.033 }, generalPurpose: { rpm:  9200, feedRate: 13.8, ap: 0.16,  ae: 0.033 } } },
  { dc: "1/8",   dcInch: 1/8,
    carbon:    { highSpeed: { rpm: 15000, feedRate: 76.2, ap: 0.19,  ae: 0.038 }, generalPurpose: { rpm: 12000, feedRate: 39.4, ap: 0.19,  ae: 0.038 } },
    alloy:     { highSpeed: { rpm: 12000, feedRate: 36.9, ap: 0.19,  ae: 0.038 }, generalPurpose: { rpm: 10000, feedRate: 20.1, ap: 0.19,  ae: 0.038 } },
    stainless: { highSpeed: { rpm: 10000, feedRate: 26.0, ap: 0.19,  ae: 0.038 }, generalPurpose: { rpm:  8000, feedRate: 13.8, ap: 0.19,  ae: 0.038 } } },
  { dc: "5/32",  dcInch: 5/32,
    carbon:    { highSpeed: { rpm: 12000, feedRate: 78.0, ap: 0.23,  ae: 0.047 }, generalPurpose: { rpm:  9600, feedRate: 39.4, ap: 0.23,  ae: 0.047 } },
    alloy:     { highSpeed: { rpm:  9600, feedRate: 37.4, ap: 0.23,  ae: 0.047 }, generalPurpose: { rpm:  8000, feedRate: 20.5, ap: 0.23,  ae: 0.047 } },
    stainless: { highSpeed: { rpm:  8000, feedRate: 26.5, ap: 0.23,  ae: 0.047 }, generalPurpose: { rpm:  6400, feedRate: 13.8, ap: 0.23,  ae: 0.047 } } },
  { dc: "3/16",  dcInch: 3/16,
    carbon:    { highSpeed: { rpm: 10000, feedRate: 74.4, ap: 0.28,  ae: 0.056 }, generalPurpose: { rpm:  8000, feedRate: 39.4, ap: 0.28,  ae: 0.056 } },
    alloy:     { highSpeed: { rpm:  8000, feedRate: 37.8, ap: 0.28,  ae: 0.056 }, generalPurpose: { rpm:  6700, feedRate: 20.9, ap: 0.28,  ae: 0.056 } },
    stainless: { highSpeed: { rpm:  6700, feedRate: 26.5, ap: 0.28,  ae: 0.056 }, generalPurpose: { rpm:  5300, feedRate: 13.8, ap: 0.28,  ae: 0.056 } } },
  { dc: "1/4",   dcInch: 1/4,
    carbon:    { highSpeed: { rpm:  7500, feedRate: 74.4, ap: 0.38,  ae: 0.075 }, generalPurpose: { rpm:  6000, feedRate: 39.4, ap: 0.38,  ae: 0.075 } },
    alloy:     { highSpeed: { rpm:  6000, feedRate: 39.0, ap: 0.38,  ae: 0.075 }, generalPurpose: { rpm:  5000, feedRate: 21.3, ap: 0.38,  ae: 0.075 } },
    stainless: { highSpeed: { rpm:  5000, feedRate: 35.4, ap: 0.38,  ae: 0.075 }, generalPurpose: { rpm:  4000, feedRate: 18.9, ap: 0.38,  ae: 0.075 } } },
  { dc: "5/16",  dcInch: 5/16,
    carbon:    { highSpeed: { rpm:  6000, feedRate: 74.4, ap: 0.47,  ae: 0.094 }, generalPurpose: { rpm:  4800, feedRate: 39.4, ap: 0.47,  ae: 0.094 } },
    alloy:     { highSpeed: { rpm:  4800, feedRate: 39.7, ap: 0.47,  ae: 0.094 }, generalPurpose: { rpm:  4000, feedRate: 21.7, ap: 0.47,  ae: 0.094 } },
    stainless: { highSpeed: { rpm:  4000, feedRate: 35.4, ap: 0.47,  ae: 0.094 }, generalPurpose: { rpm:  3200, feedRate: 18.9, ap: 0.47,  ae: 0.094 } } },
  { dc: "11/32", dcInch: 11/32,
    carbon:    { highSpeed: { rpm:  5500, feedRate: 71.5, ap: 0.52,  ae: 0.10  }, generalPurpose: { rpm:  4400, feedRate: 37.8, ap: 0.52,  ae: 0.10  } },
    alloy:     { highSpeed: { rpm:  4400, feedRate: 37.9, ap: 0.52,  ae: 0.10  }, generalPurpose: { rpm:  3600, feedRate: 20.5, ap: 0.52,  ae: 0.10  } },
    stainless: { highSpeed: { rpm:  3600, feedRate: 36.1, ap: 0.52,  ae: 0.10  }, generalPurpose: { rpm:  2900, feedRate: 19.3, ap: 0.52,  ae: 0.10  } } },
  { dc: "3/8",   dcInch: 3/8,
    carbon:    { highSpeed: { rpm:  5000, feedRate: 67.9, ap: 0.56,  ae: 0.11  }, generalPurpose: { rpm:  4000, feedRate: 35.8, ap: 0.56,  ae: 0.11  } },
    alloy:     { highSpeed: { rpm:  4000, feedRate: 36.9, ap: 0.56,  ae: 0.11  }, generalPurpose: { rpm:  3300, feedRate: 20.1, ap: 0.56,  ae: 0.11  } },
    stainless: { highSpeed: { rpm:  3300, feedRate: 37.0, ap: 0.56,  ae: 0.11  }, generalPurpose: { rpm:  2700, feedRate: 20.1, ap: 0.56,  ae: 0.11  } } },
  { dc: "1/2",   dcInch: 1/2,
    carbon:    { highSpeed: { rpm:  3800, feedRate: 56.1, ap: 0.75,  ae: 0.15  }, generalPurpose: { rpm:  3000, feedRate: 29.1, ap: 0.75,  ae: 0.15  } },
    alloy:     { highSpeed: { rpm:  3000, feedRate: 32.6, ap: 0.75,  ae: 0.15  }, generalPurpose: { rpm:  2500, feedRate: 18.1, ap: 0.75,  ae: 0.15  } },
    stainless: { highSpeed: { rpm:  2500, feedRate: 32.5, ap: 0.75,  ae: 0.15  }, generalPurpose: { rpm:  2000, feedRate: 17.3, ap: 0.75,  ae: 0.15  } } },
];

export const VQMHZV_SLOTTING_TABLE: VQMHZVEntry[] = [
  { dc: "1/16",  dcInch: 1/16,
    carbon:    { highSpeed: { rpm: 26000, feedRate: 27.6, ap: 0.031 }, generalPurpose: { rpm: 20000, feedRate: 14.2, ap: 0.031 } },
    alloy:     { highSpeed: { rpm: 20000, feedRate: 11.8, ap: 0.031 }, generalPurpose: { rpm: 16000, feedRate:  6.3, ap: 0.031 } },
    stainless: { highSpeed: { rpm: 18000, feedRate: 10.6, ap: 0.031 }, generalPurpose: { rpm: 12000, feedRate:  4.7, ap: 0.031 } } },
  { dc: "5/64",  dcInch: 5/64,
    carbon:    { highSpeed: { rpm: 24000, feedRate: 36.9, ap: 0.078 }, generalPurpose: { rpm: 16000, feedRate: 16.1, ap: 0.078 } },
    alloy:     { highSpeed: { rpm: 19000, feedRate: 18.0, ap: 0.078 }, generalPurpose: { rpm: 13000, feedRate:  8.3, ap: 0.078 } },
    stainless: { highSpeed: { rpm: 16000, feedRate: 18.9, ap: 0.078 }, generalPurpose: { rpm:  9600, feedRate:  7.5, ap: 0.078 } } },
  { dc: "3/32",  dcInch: 3/32,
    carbon:    { highSpeed: { rpm: 20000, feedRate: 37.8, ap: 0.094 }, generalPurpose: { rpm: 13000, feedRate: 16.1, ap: 0.094 } },
    alloy:     { highSpeed: { rpm: 16000, feedRate: 18.9, ap: 0.094 }, generalPurpose: { rpm: 11000, feedRate:  8.7, ap: 0.094 } },
    stainless: { highSpeed: { rpm: 13000, feedRate: 19.2, ap: 0.094 }, generalPurpose: { rpm:  8000, feedRate:  7.9, ap: 0.094 } } },
  { dc: "7/64",  dcInch: 7/64,
    carbon:    { highSpeed: { rpm: 17000, feedRate: 40.2, ap: 0.11  }, generalPurpose: { rpm: 11000, feedRate: 17.3, ap: 0.11  } },
    alloy:     { highSpeed: { rpm: 14000, feedRate: 19.8, ap: 0.11  }, generalPurpose: { rpm:  9200, feedRate:  8.7, ap: 0.11  } },
    stainless: { highSpeed: { rpm: 11000, feedRate: 19.5, ap: 0.11  }, generalPurpose: { rpm:  6900, feedRate:  7.9, ap: 0.11  } } },
  { dc: "1/8",   dcInch: 1/8,
    carbon:    { highSpeed: { rpm: 15000, feedRate: 44.3, ap: 0.13  }, generalPurpose: { rpm: 10000, feedRate: 19.7, ap: 0.13  } },
    alloy:     { highSpeed: { rpm: 12000, feedRate: 22.7, ap: 0.13  }, generalPurpose: { rpm:  8000, feedRate:  9.8, ap: 0.13  } },
    stainless: { highSpeed: { rpm: 10000, feedRate: 20.1, ap: 0.13  }, generalPurpose: { rpm:  6000, feedRate:  7.9, ap: 0.13  } } },
  { dc: "5/32",  dcInch: 5/32,
    carbon:    { highSpeed: { rpm: 12000, feedRate: 56.7, ap: 0.16  }, generalPurpose: { rpm:  8000, feedRate: 24.8, ap: 0.16  } },
    alloy:     { highSpeed: { rpm:  9600, feedRate: 26.1, ap: 0.16  }, generalPurpose: { rpm:  6400, feedRate: 11.4, ap: 0.16  } },
    stainless: { highSpeed: { rpm:  8000, feedRate: 20.8, ap: 0.16  }, generalPurpose: { rpm:  4800, feedRate:  8.3, ap: 0.16  } } },
  { dc: "3/16",  dcInch: 3/16,
    carbon:    { highSpeed: { rpm: 10000, feedRate: 56.7, ap: 0.19  }, generalPurpose: { rpm:  6700, feedRate: 25.2, ap: 0.19  } },
    alloy:     { highSpeed: { rpm:  8000, feedRate: 26.9, ap: 0.19  }, generalPurpose: { rpm:  5300, feedRate: 11.8, ap: 0.19  } },
    stainless: { highSpeed: { rpm:  6700, feedRate: 21.4, ap: 0.19  }, generalPurpose: { rpm:  4000, feedRate:  8.3, ap: 0.19  } } },
  { dc: "1/4",   dcInch: 1/4,
    carbon:    { highSpeed: { rpm:  7500, feedRate: 55.8, ap: 0.25  }, generalPurpose: { rpm:  5000, feedRate: 24.4, ap: 0.25  } },
    alloy:     { highSpeed: { rpm:  6000, feedRate: 29.8, ap: 0.25  }, generalPurpose: { rpm:  4000, feedRate: 13.0, ap: 0.25  } },
    stainless: { highSpeed: { rpm:  5000, feedRate: 21.9, ap: 0.25  }, generalPurpose: { rpm:  3000, feedRate:  8.7, ap: 0.25  } } },
  { dc: "5/16",  dcInch: 5/16,
    carbon:    { highSpeed: { rpm:  6000, feedRate: 49.6, ap: 0.31  }, generalPurpose: { rpm:  4000, feedRate: 21.7, ap: 0.31  } },
    alloy:     { highSpeed: { rpm:  4800, feedRate: 28.3, ap: 0.31  }, generalPurpose: { rpm:  3200, feedRate: 12.6, ap: 0.31  } },
    stainless: { highSpeed: { rpm:  4000, feedRate: 23.6, ap: 0.31  }, generalPurpose: { rpm:  2400, feedRate:  9.4, ap: 0.31  } } },
  { dc: "11/32", dcInch: 11/32,
    carbon:    { highSpeed: { rpm:  5500, feedRate: 48.7, ap: 0.34  }, generalPurpose: { rpm:  3600, feedRate: 20.9, ap: 0.34  } },
    alloy:     { highSpeed: { rpm:  4400, feedRate: 27.0, ap: 0.34  }, generalPurpose: { rpm:  2900, feedRate: 11.8, ap: 0.34  } },
    stainless: { highSpeed: { rpm:  3600, feedRate: 24.2, ap: 0.34  }, generalPurpose: { rpm:  2200, feedRate:  9.8, ap: 0.34  } } },
  { dc: "3/8",   dcInch: 3/8,
    carbon:    { highSpeed: { rpm:  5000, feedRate: 46.1, ap: 0.38  }, generalPurpose: { rpm:  3300, feedRate: 20.1, ap: 0.38  } },
    alloy:     { highSpeed: { rpm:  4000, feedRate: 25.5, ap: 0.38  }, generalPurpose: { rpm:  2700, feedRate: 11.4, ap: 0.38  } },
    stainless: { highSpeed: { rpm:  3300, feedRate: 25.3, ap: 0.38  }, generalPurpose: { rpm:  2000, feedRate: 10.2, ap: 0.38  } } },
  { dc: "1/2",   dcInch: 1/2,
    carbon:    { highSpeed: { rpm:  3800, feedRate: 35.9, ap: 0.50  }, generalPurpose: { rpm:  2500, feedRate: 15.7, ap: 0.50  } },
    alloy:     { highSpeed: { rpm:  3000, feedRate: 22.3, ap: 0.50  }, generalPurpose: { rpm:  2000, feedRate:  9.8, ap: 0.50  } },
    stainless: { highSpeed: { rpm:  2500, feedRate: 23.6, ap: 0.50  }, generalPurpose: { rpm:  1500, feedRate:  9.4, ap: 0.50  } } },
];

// ─── VQJHV ───────────────────────────────────────────────────────────────────
// 6-flute carbide end mill · 6 material groups · 6 diameters · single mode

export type VQJHVMaterial =
  | "carbonMild"
  | "preHardened"
  | "stainlessTi"
  | "hardenedSS"
  | "copper"
  | "heatResistant";

export const VQJHV_MATERIAL_LABELS: Record<VQJHVMaterial, { label: string; examples: string }> = {
  carbonMild:   { label: "Carbon / Alloy / Mild Steel",        examples: "AISI 1035, AISI 1050, ASTM 283" },
  preHardened:  { label: "Pre-hardened / Alloy Tool Steel",    examples: "AISI H13, AISI 4140, AISI P21" },
  stainlessTi:  { label: "Stainless Steel / Titanium",         examples: "AISI 304, AISI 306, AISI 316L, Ti-6Al-4V etc." },
  hardenedSS:   { label: "Hardened SS / Cobalt Chromium",      examples: "ASTM S17400, S17700, 17-4PH, 15-5PH etc." },
  copper:       { label: "Copper / Copper Alloy",              examples: "" },
  heatResistant:{ label: "Heat Resistant Alloys",              examples: "Inconel 718 etc." },
};

export interface VQJHVEntry {
  dc: string; dcInch: number;
  carbonMild:    CutCondition;
  preHardened:   CutCondition;
  stainlessTi:   CutCondition;
  hardenedSS:    CutCondition;
  copper:        CutCondition;
  heatResistant: CutCondition;
}

export const VQJHV_SHOULDER_TABLE: VQJHVEntry[] = [
  { dc: "1/8",  dcInch: 1/8,
    carbonMild:    { rpm: 13000, feedRate: 39.0, ap: 0.313, ae: 0.013 },
    preHardened:   { rpm: 10000, feedRate: 26.8, ap: 0.313, ae: 0.013 },
    stainlessTi:   { rpm:  8000, feedRate:  2.1, ap: 0.313, ae: 0.006 },
    hardenedSS:    { rpm:  7500, feedRate: 18.9, ap: 0.313, ae: 0.006 },
    copper:        { rpm: 16000, feedRate: 48.0, ap: 0.013, ae: 0.013 },
    heatResistant: { rpm:  4000, feedRate:  5.1, ap: 0.313, ae: 0.003 } },
  { dc: "3/16", dcInch: 3/16,
    carbonMild:    { rpm:  8700, feedRate: 39.4, ap: 0.469, ae: 0.019 },
    preHardened:   { rpm:  6700, feedRate: 27.6, ap: 0.469, ae: 0.019 },
    stainlessTi:   { rpm:  5300, feedRate: 21.7, ap: 0.469, ae: 0.009 },
    hardenedSS:    { rpm:  5000, feedRate: 20.5, ap: 0.469, ae: 0.009 },
    copper:        { rpm: 11000, feedRate: 51.9, ap: 0.019, ae: 0.019 },
    heatResistant: { rpm:  2700, feedRate:  7.1, ap: 0.469, ae: 0.004 } },
  { dc: "1/4",  dcInch: 1/4,
    carbonMild:    { rpm:  6500, feedRate: 47.2, ap: 0.625, ae: 0.025 },
    preHardened:   { rpm:  5000, feedRate: 32.3, ap: 0.625, ae: 0.025 },
    stainlessTi:   { rpm:  4000, feedRate: 25.2, ap: 0.625, ae: 0.013 },
    hardenedSS:    { rpm:  3800, feedRate: 24.0, ap: 0.625, ae: 0.013 },
    copper:        { rpm:  8000, feedRate: 57.9, ap: 0.025, ae: 0.025 },
    heatResistant: { rpm:  2000, feedRate:  6.7, ap: 0.625, ae: 0.005 } },
  { dc: "5/16", dcInch: 5/16,
    carbonMild:    { rpm:  5200, feedRate: 47.2, ap: 0.781, ae: 0.031 },
    preHardened:   { rpm:  4000, feedRate: 33.5, ap: 0.781, ae: 0.031 },
    stainlessTi:   { rpm:  3200, feedRate: 25.2, ap: 0.781, ae: 0.016 },
    hardenedSS:    { rpm:  3000, feedRate: 23.6, ap: 0.781, ae: 0.016 },
    copper:        { rpm:  6400, feedRate: 59.4, ap: 0.031, ae: 0.031 },
    heatResistant: { rpm:  1600, feedRate:  6.7, ap: 0.781, ae: 0.006 } },
  { dc: "3/8",  dcInch: 3/8,
    carbonMild:    { rpm:  4300, feedRate: 43.3, ap: 0.938, ae: 0.038 },
    preHardened:   { rpm:  3300, feedRate: 31.9, ap: 0.938, ae: 0.038 },
    stainlessTi:   { rpm:  2700, feedRate: 23.2, ap: 0.938, ae: 0.019 },
    hardenedSS:    { rpm:  2500, feedRate: 22.4, ap: 0.938, ae: 0.019 },
    copper:        { rpm:  5300, feedRate: 51.7, ap: 0.038, ae: 0.038 },
    heatResistant: { rpm:  1300, feedRate:  6.7, ap: 0.938, ae: 0.008 } },
  { dc: "1/2",  dcInch: 1/2,
    carbonMild:    { rpm:  3300, feedRate: 43.3, ap: 1.25,  ae: 0.050 },
    preHardened:   { rpm:  2500, feedRate: 29.1, ap: 1.25,  ae: 0.050 },
    stainlessTi:   { rpm:  2000, feedRate:  2.9, ap: 1.25,  ae: 0.025 },
    hardenedSS:    { rpm:  1900, feedRate: 20.1, ap: 1.25,  ae: 0.025 },
    copper:        { rpm:  4000, feedRate: 50.4, ap: 0.050, ae: 0.050 },
    heatResistant: { rpm:  1000, feedRate:  5.1, ap: 1.25,  ae: 0.010 } },
];

// ─── Indexable End Mill (1" / 25mm DC) ───────────────────────────────────────
// Uses SFM → RPM calculation, then Feed = IPT × RPM × z
// Feed-per-tooth values are for the 1.000" DC column only.

export type IndexableMaterial =
  | "mildSteel"
  | "carbonAlloy"
  | "aluminumLowSiGL"
  | "aluminumLowSiGM"
  | "aluminumHighSiGM"
  | "titanium";

export type IndexableAe = "0.25DC" | "0.5DC" | "0.75DC" | "slot";
export type IndexableAp = "0.197"  | "0.394"  | "0.571";

export interface IndexableSpec {
  label:   string;
  subtitle: string;
  group:   "P" | "N" | "S";
  grade:   string;
  breaker: string;
  vc:    number; // recommended SFM
  vcMin: number;
  vcMax: number;
  // feeds[ae][ap] = IPT in inch/tooth; missing key = "—" (not recommended)
  feeds: Partial<Record<IndexableAe, Partial<Record<IndexableAp, number>>>>;
}

export const INDEXABLE_AE_LABELS: Record<IndexableAe, string> = {
  "0.25DC": "≤ 0.25 × DC  (≤ 0.25\")",
  "0.5DC":  "≤ 0.50 × DC  (≤ 0.50\")",
  "0.75DC": "≤ 0.75 × DC  (≤ 0.75\")",
  "slot":   "Full Slot  (ae = DC)",
};

export const INDEXABLE_AP_LABELS: Record<IndexableAp, string> = {
  "0.197": "≤ 0.197 in",
  "0.394": "≤ 0.394 in",
  "0.571": "≤ 0.571 in",
};

export const INDEXABLE_1IN: Record<IndexableMaterial, IndexableSpec> = {
  mildSteel: {
    label: "Mild Steel", subtitle: "≤ 180HB",
    group: "P", grade: "MP6120", breaker: "GM",
    vc: 655, vcMin: 490, vcMax: 720,
    feeds: {
      "0.25DC": { "0.197": 0.006, "0.394": 0.005, "0.571": 0.004 },
      "0.5DC":  { "0.197": 0.005, "0.394": 0.004, "0.571": 0.003 },
      "0.75DC": { "0.197": 0.005, "0.394": 0.004 },
      "slot":   { "0.197": 0.004 },
    },
  },
  carbonAlloy: {
    label: "Carbon / Alloy Steel", subtitle: "180–280HB",
    group: "P", grade: "MP6120", breaker: "GM",
    vc: 655, vcMin: 490, vcMax: 720,
    feeds: {
      "0.25DC": { "0.197": 0.006, "0.394": 0.005, "0.571": 0.004 },
      "0.5DC":  { "0.197": 0.005, "0.394": 0.004, "0.571": 0.003 },
      "0.75DC": { "0.197": 0.005, "0.394": 0.004 },
      "slot":   { "0.197": 0.004 },
    },
  },
  aluminumLowSiGL: {
    label: "Aluminum Alloy  (Si < 5%)", subtitle: "GL breaker",
    group: "N", grade: "TF15 / LC15TF", breaker: "GL",
    vc: 3280, vcMin: 655, vcMax: 9840,
    feeds: {
      "0.25DC": { "0.197": 0.010, "0.394": 0.008, "0.571": 0.006 },
      "0.5DC":  { "0.197": 0.010, "0.394": 0.008, "0.571": 0.006 },
      "0.75DC": { "0.197": 0.010, "0.394": 0.008, "0.571": 0.006 },
      "slot":   { "0.197": 0.010 },
    },
  },
  aluminumLowSiGM: {
    label: "Aluminum Alloy  (Si < 5%)", subtitle: "GM breaker",
    group: "N", grade: "TF15 / MP9120", breaker: "GM",
    vc: 3280, vcMin: 655, vcMax: 9840,
    feeds: {
      "0.25DC": { "0.197": 0.014, "0.394": 0.012, "0.571": 0.010 },
      "0.5DC":  { "0.197": 0.014, "0.394": 0.012, "0.571": 0.008 },
      "0.75DC": { "0.197": 0.012, "0.394": 0.010, "0.571": 0.008 },
      "slot":   { "0.197": 0.010 },
    },
  },
  aluminumHighSiGM: {
    label: "Aluminum Alloy  (5%≤Si≤10% / Si>10%)", subtitle: "GM breaker",
    group: "N", grade: "MP9120", breaker: "GM",
    vc: 3280, vcMin: 655, vcMax: 9840,
    feeds: {
      "0.25DC": { "0.197": 0.014, "0.394": 0.012, "0.571": 0.010 },
      "0.5DC":  { "0.197": 0.014, "0.394": 0.012, "0.571": 0.010 },
      "0.75DC": { "0.197": 0.012, "0.394": 0.010, "0.571": 0.008 },
      "slot":   { "0.197": 0.010 },
    },
  },
  titanium: {
    label: "Titanium Alloy", subtitle: "—",
    group: "S", grade: "MP9120", breaker: "GM",
    vc: 130, vcMin: 100, vcMax: 195,
    feeds: {
      "0.25DC": { "0.197": 0.004, "0.394": 0.004, "0.571": 0.004 },
      "0.5DC":  { "0.197": 0.003, "0.394": 0.003, "0.571": 0.003 },
      "0.75DC": { "0.197": 0.002, "0.394": 0.002, "0.571": 0.002 },
      "slot":   { "0.197": 0.002 },
    },
  },
};
