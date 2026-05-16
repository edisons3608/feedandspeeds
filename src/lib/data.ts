export type MaterialGroup = "carbon" | "alloy" | "stainless";
export type CuttingMode = "highSpeed" | "generalPurpose";
export type Operation = "shoulder" | "slotting";

export interface CutCondition {
  rpm: number;
  feedRate: number; // IPM
  ap: number; // depth of cut (inch)
  ae?: number; // width of cut (inch) — omitted for full-slot slotting (ae = DC)
}

export interface DiameterEntry {
  dc: string; // fraction string e.g. "1/8"
  dcInch: number; // decimal inches
  carbon: { highSpeed: CutCondition; generalPurpose: CutCondition };
  alloy: { highSpeed: CutCondition; generalPurpose: CutCondition };
  stainless: { highSpeed: CutCondition; generalPurpose: CutCondition };
}

export const OPERATION_LABELS: Record<Operation, { label: string; sub: string }> = {
  shoulder: { label: "Shoulder Milling", sub: "Radial depth ae < DC" },
  slotting: { label: "Slotting (Full Slot)", sub: "ae = DC (full width)" },
};

export const MATERIAL_LABELS: Record<MaterialGroup, { label: string; examples: string }> = {
  carbon: {
    label: "Carbon Steel (≤30HRC)",
    examples: "AISI 1035, AISI 1050, ASTM 283",
  },
  alloy: {
    label: "Alloy / Pre-hardened Steel",
    examples: "AISI H13, AISI 4140, AISI P21",
  },
  stainless: {
    label: "Stainless Steel / Titanium",
    examples: "AISI 304, AISI 306, AISI 316L, Ti-6Al-4V etc.",
  },
};

// Shoulder milling lookup table from manufacturer data
export const SHOULDER_TABLE: DiameterEntry[] = [
  {
    dc: "1/16", dcInch: 1 / 16,
    carbon:    { highSpeed: { rpm: 26000, feedRate: 55.3, ap: 0.094, ae: 0.013 }, generalPurpose: { rpm: 24000, feedRate: 33.9, ap: 0.094, ae: 0.013 } },
    alloy:     { highSpeed: { rpm: 20000, feedRate: 26.0, ap: 0.094, ae: 0.013 }, generalPurpose: { rpm: 20000, feedRate: 17.3, ap: 0.094, ae: 0.013 } },
    stainless: { highSpeed: { rpm: 18000, feedRate: 23.4, ap: 0.094, ae: 0.013 }, generalPurpose: { rpm: 16000, feedRate: 13.8, ap: 0.094, ae: 0.013 } },
  },
  {
    dc: "5/64", dcInch: 5 / 64,
    carbon:    { highSpeed: { rpm: 24000, feedRate: 70.9, ap: 0.12, ae: 0.023 }, generalPurpose: { rpm: 19000, feedRate: 37.0, ap: 0.12, ae: 0.023 } },
    alloy:     { highSpeed: { rpm: 19000, feedRate: 33.7, ap: 0.12, ae: 0.023 }, generalPurpose: { rpm: 16000, feedRate: 18.9, ap: 0.12, ae: 0.023 } },
    stainless: { highSpeed: { rpm: 16000, feedRate: 24.6, ap: 0.12, ae: 0.023 }, generalPurpose: { rpm: 13000, feedRate: 13.0, ap: 0.12, ae: 0.023 } },
  },
  {
    dc: "3/32", dcInch: 3 / 32,
    carbon:    { highSpeed: { rpm: 20000, feedRate: 70.9, ap: 0.14, ae: 0.028 }, generalPurpose: { rpm: 16000, feedRate: 37.4, ap: 0.14, ae: 0.028 } },
    alloy:     { highSpeed: { rpm: 16000, feedRate: 34.0, ap: 0.14, ae: 0.028 }, generalPurpose: { rpm: 13000, feedRate: 18.1, ap: 0.14, ae: 0.028 } },
    stainless: { highSpeed: { rpm: 13000, feedRate: 24.6, ap: 0.14, ae: 0.028 }, generalPurpose: { rpm: 11000, feedRate: 13.8, ap: 0.14, ae: 0.028 } },
  },
  {
    dc: "7/64", dcInch: 7 / 64,
    carbon:    { highSpeed: { rpm: 17000, feedRate: 72.3, ap: 0.16, ae: 0.033 }, generalPurpose: { rpm: 14000, feedRate: 39.4, ap: 0.16, ae: 0.033 } },
    alloy:     { highSpeed: { rpm: 14000, feedRate: 34.7, ap: 0.16, ae: 0.033 }, generalPurpose: { rpm: 11000, feedRate: 18.1, ap: 0.16, ae: 0.033 } },
    stainless: { highSpeed: { rpm: 11000, feedRate: 24.7, ap: 0.16, ae: 0.033 }, generalPurpose: { rpm: 9200,  feedRate: 13.8, ap: 0.16, ae: 0.033 } },
  },
  {
    dc: "1/8", dcInch: 1 / 8,
    carbon:    { highSpeed: { rpm: 15000, feedRate: 76.2, ap: 0.19, ae: 0.038 }, generalPurpose: { rpm: 12000, feedRate: 39.4, ap: 0.19, ae: 0.038 } },
    alloy:     { highSpeed: { rpm: 12000, feedRate: 36.9, ap: 0.19, ae: 0.038 }, generalPurpose: { rpm: 10000, feedRate: 20.1, ap: 0.19, ae: 0.038 } },
    stainless: { highSpeed: { rpm: 10000, feedRate: 26.0, ap: 0.19, ae: 0.038 }, generalPurpose: { rpm: 8000,  feedRate: 13.8, ap: 0.19, ae: 0.038 } },
  },
  {
    dc: "5/32", dcInch: 5 / 32,
    carbon:    { highSpeed: { rpm: 12000, feedRate: 78.0, ap: 0.23, ae: 0.047 }, generalPurpose: { rpm: 9600,  feedRate: 39.4, ap: 0.23, ae: 0.047 } },
    alloy:     { highSpeed: { rpm: 9600,  feedRate: 37.4, ap: 0.23, ae: 0.047 }, generalPurpose: { rpm: 8000,  feedRate: 20.5, ap: 0.23, ae: 0.047 } },
    stainless: { highSpeed: { rpm: 8000,  feedRate: 26.5, ap: 0.23, ae: 0.047 }, generalPurpose: { rpm: 6400,  feedRate: 13.8, ap: 0.23, ae: 0.047 } },
  },
  {
    dc: "3/16", dcInch: 3 / 16,
    carbon:    { highSpeed: { rpm: 10000, feedRate: 74.4, ap: 0.28, ae: 0.056 }, generalPurpose: { rpm: 8000,  feedRate: 39.4, ap: 0.28, ae: 0.056 } },
    alloy:     { highSpeed: { rpm: 8000,  feedRate: 37.8, ap: 0.28, ae: 0.056 }, generalPurpose: { rpm: 6700,  feedRate: 20.9, ap: 0.28, ae: 0.056 } },
    stainless: { highSpeed: { rpm: 6700,  feedRate: 26.5, ap: 0.28, ae: 0.056 }, generalPurpose: { rpm: 5300,  feedRate: 13.8, ap: 0.28, ae: 0.056 } },
  },
  {
    dc: "1/4", dcInch: 1 / 4,
    carbon:    { highSpeed: { rpm: 7500,  feedRate: 74.4, ap: 0.38, ae: 0.075 }, generalPurpose: { rpm: 6000,  feedRate: 39.4, ap: 0.38, ae: 0.075 } },
    alloy:     { highSpeed: { rpm: 6000,  feedRate: 39.0, ap: 0.38, ae: 0.075 }, generalPurpose: { rpm: 5000,  feedRate: 21.3, ap: 0.38, ae: 0.075 } },
    stainless: { highSpeed: { rpm: 5000,  feedRate: 35.4, ap: 0.38, ae: 0.075 }, generalPurpose: { rpm: 4000,  feedRate: 18.9, ap: 0.38, ae: 0.075 } },
  },
  {
    dc: "5/16", dcInch: 5 / 16,
    carbon:    { highSpeed: { rpm: 6000,  feedRate: 74.4, ap: 0.47, ae: 0.094 }, generalPurpose: { rpm: 4800,  feedRate: 39.4, ap: 0.47, ae: 0.094 } },
    alloy:     { highSpeed: { rpm: 4800,  feedRate: 39.7, ap: 0.47, ae: 0.094 }, generalPurpose: { rpm: 4000,  feedRate: 21.7, ap: 0.47, ae: 0.094 } },
    stainless: { highSpeed: { rpm: 4000,  feedRate: 35.4, ap: 0.47, ae: 0.094 }, generalPurpose: { rpm: 3200,  feedRate: 18.9, ap: 0.47, ae: 0.094 } },
  },
  {
    dc: "11/32", dcInch: 11 / 32,
    carbon:    { highSpeed: { rpm: 5500,  feedRate: 71.5, ap: 0.52, ae: 0.10 }, generalPurpose: { rpm: 4400,  feedRate: 37.8, ap: 0.52, ae: 0.10 } },
    alloy:     { highSpeed: { rpm: 4400,  feedRate: 37.9, ap: 0.52, ae: 0.10 }, generalPurpose: { rpm: 3600,  feedRate: 20.5, ap: 0.52, ae: 0.10 } },
    stainless: { highSpeed: { rpm: 3600,  feedRate: 36.1, ap: 0.52, ae: 0.10 }, generalPurpose: { rpm: 2900,  feedRate: 19.3, ap: 0.52, ae: 0.10 } },
  },
  {
    dc: "3/8", dcInch: 3 / 8,
    carbon:    { highSpeed: { rpm: 5000,  feedRate: 67.9, ap: 0.56, ae: 0.11 }, generalPurpose: { rpm: 4000,  feedRate: 35.8, ap: 0.56, ae: 0.11 } },
    alloy:     { highSpeed: { rpm: 4000,  feedRate: 36.9, ap: 0.56, ae: 0.11 }, generalPurpose: { rpm: 3300,  feedRate: 20.1, ap: 0.56, ae: 0.11 } },
    stainless: { highSpeed: { rpm: 3300,  feedRate: 37.0, ap: 0.56, ae: 0.11 }, generalPurpose: { rpm: 2700,  feedRate: 20.1, ap: 0.56, ae: 0.11 } },
  },
  {
    dc: "1/2", dcInch: 1 / 2,
    carbon:    { highSpeed: { rpm: 3800,  feedRate: 56.1, ap: 0.75, ae: 0.15 }, generalPurpose: { rpm: 3000,  feedRate: 29.1, ap: 0.75, ae: 0.15 } },
    alloy:     { highSpeed: { rpm: 3000,  feedRate: 32.6, ap: 0.75, ae: 0.15 }, generalPurpose: { rpm: 2500,  feedRate: 18.1, ap: 0.75, ae: 0.15 } },
    stainless: { highSpeed: { rpm: 2500,  feedRate: 32.5, ap: 0.75, ae: 0.15 }, generalPurpose: { rpm: 2000,  feedRate: 17.3, ap: 0.75, ae: 0.15 } },
  },
];

// Full-slot slotting lookup table — ae = DC (no ae column)
export const SLOTTING_TABLE: DiameterEntry[] = [
  {
    dc: "1/16", dcInch: 1 / 16,
    carbon:    { highSpeed: { rpm: 26000, feedRate: 27.6, ap: 0.031 }, generalPurpose: { rpm: 20000, feedRate: 14.2, ap: 0.031 } },
    alloy:     { highSpeed: { rpm: 20000, feedRate: 11.8, ap: 0.031 }, generalPurpose: { rpm: 16000, feedRate: 6.3,  ap: 0.031 } },
    stainless: { highSpeed: { rpm: 18000, feedRate: 10.6, ap: 0.031 }, generalPurpose: { rpm: 12000, feedRate: 4.7,  ap: 0.031 } },
  },
  {
    dc: "5/64", dcInch: 5 / 64,
    carbon:    { highSpeed: { rpm: 24000, feedRate: 36.9, ap: 0.078 }, generalPurpose: { rpm: 16000, feedRate: 16.1, ap: 0.078 } },
    alloy:     { highSpeed: { rpm: 19000, feedRate: 18.0, ap: 0.078 }, generalPurpose: { rpm: 13000, feedRate: 8.3,  ap: 0.078 } },
    stainless: { highSpeed: { rpm: 16000, feedRate: 18.9, ap: 0.078 }, generalPurpose: { rpm: 9600,  feedRate: 7.5,  ap: 0.078 } },
  },
  {
    dc: "3/32", dcInch: 3 / 32,
    carbon:    { highSpeed: { rpm: 20000, feedRate: 37.8, ap: 0.094 }, generalPurpose: { rpm: 13000, feedRate: 16.1, ap: 0.094 } },
    alloy:     { highSpeed: { rpm: 16000, feedRate: 18.9, ap: 0.094 }, generalPurpose: { rpm: 11000, feedRate: 8.7,  ap: 0.094 } },
    stainless: { highSpeed: { rpm: 13000, feedRate: 19.2, ap: 0.094 }, generalPurpose: { rpm: 8000,  feedRate: 7.9,  ap: 0.094 } },
  },
  {
    dc: "7/64", dcInch: 7 / 64,
    carbon:    { highSpeed: { rpm: 17000, feedRate: 40.2, ap: 0.11 }, generalPurpose: { rpm: 11000, feedRate: 17.3, ap: 0.11 } },
    alloy:     { highSpeed: { rpm: 14000, feedRate: 19.8, ap: 0.11 }, generalPurpose: { rpm: 9200,  feedRate: 8.7,  ap: 0.11 } },
    stainless: { highSpeed: { rpm: 11000, feedRate: 19.5, ap: 0.11 }, generalPurpose: { rpm: 6900,  feedRate: 7.9,  ap: 0.11 } },
  },
  {
    dc: "1/8", dcInch: 1 / 8,
    carbon:    { highSpeed: { rpm: 15000, feedRate: 44.3, ap: 0.13 }, generalPurpose: { rpm: 10000, feedRate: 19.7, ap: 0.13 } },
    alloy:     { highSpeed: { rpm: 12000, feedRate: 22.7, ap: 0.13 }, generalPurpose: { rpm: 8000,  feedRate: 9.8,  ap: 0.13 } },
    stainless: { highSpeed: { rpm: 10000, feedRate: 20.1, ap: 0.13 }, generalPurpose: { rpm: 6000,  feedRate: 7.9,  ap: 0.13 } },
  },
  {
    dc: "5/32", dcInch: 5 / 32,
    carbon:    { highSpeed: { rpm: 12000, feedRate: 56.7, ap: 0.16 }, generalPurpose: { rpm: 8000,  feedRate: 24.8, ap: 0.16 } },
    alloy:     { highSpeed: { rpm: 9600,  feedRate: 26.1, ap: 0.16 }, generalPurpose: { rpm: 6400,  feedRate: 11.4, ap: 0.16 } },
    stainless: { highSpeed: { rpm: 8000,  feedRate: 20.8, ap: 0.16 }, generalPurpose: { rpm: 4800,  feedRate: 8.3,  ap: 0.16 } },
  },
  {
    dc: "3/16", dcInch: 3 / 16,
    carbon:    { highSpeed: { rpm: 10000, feedRate: 56.7, ap: 0.19 }, generalPurpose: { rpm: 6700,  feedRate: 25.2, ap: 0.19 } },
    alloy:     { highSpeed: { rpm: 8000,  feedRate: 26.9, ap: 0.19 }, generalPurpose: { rpm: 5300,  feedRate: 11.8, ap: 0.19 } },
    stainless: { highSpeed: { rpm: 6700,  feedRate: 21.4, ap: 0.19 }, generalPurpose: { rpm: 4000,  feedRate: 8.3,  ap: 0.19 } },
  },
  {
    dc: "1/4", dcInch: 1 / 4,
    carbon:    { highSpeed: { rpm: 7500,  feedRate: 55.8, ap: 0.25 }, generalPurpose: { rpm: 5000,  feedRate: 24.4, ap: 0.25 } },
    alloy:     { highSpeed: { rpm: 6000,  feedRate: 29.8, ap: 0.25 }, generalPurpose: { rpm: 4000,  feedRate: 13.0, ap: 0.25 } },
    stainless: { highSpeed: { rpm: 5000,  feedRate: 21.9, ap: 0.25 }, generalPurpose: { rpm: 3000,  feedRate: 8.7,  ap: 0.25 } },
  },
  {
    dc: "5/16", dcInch: 5 / 16,
    carbon:    { highSpeed: { rpm: 6000,  feedRate: 49.6, ap: 0.31 }, generalPurpose: { rpm: 4000,  feedRate: 21.7, ap: 0.31 } },
    alloy:     { highSpeed: { rpm: 4800,  feedRate: 28.3, ap: 0.31 }, generalPurpose: { rpm: 3200,  feedRate: 12.6, ap: 0.31 } },
    stainless: { highSpeed: { rpm: 4000,  feedRate: 23.6, ap: 0.31 }, generalPurpose: { rpm: 2400,  feedRate: 9.4,  ap: 0.31 } },
  },
  {
    dc: "11/32", dcInch: 11 / 32,
    carbon:    { highSpeed: { rpm: 5500,  feedRate: 48.7, ap: 0.34 }, generalPurpose: { rpm: 3600,  feedRate: 20.9, ap: 0.34 } },
    alloy:     { highSpeed: { rpm: 4400,  feedRate: 27.0, ap: 0.34 }, generalPurpose: { rpm: 2900,  feedRate: 11.8, ap: 0.34 } },
    stainless: { highSpeed: { rpm: 3600,  feedRate: 24.2, ap: 0.34 }, generalPurpose: { rpm: 2200,  feedRate: 9.8,  ap: 0.34 } },
  },
  {
    dc: "3/8", dcInch: 3 / 8,
    carbon:    { highSpeed: { rpm: 5000,  feedRate: 46.1, ap: 0.38 }, generalPurpose: { rpm: 3300,  feedRate: 20.1, ap: 0.38 } },
    alloy:     { highSpeed: { rpm: 4000,  feedRate: 25.5, ap: 0.38 }, generalPurpose: { rpm: 2700,  feedRate: 11.4, ap: 0.38 } },
    stainless: { highSpeed: { rpm: 3300,  feedRate: 25.3, ap: 0.38 }, generalPurpose: { rpm: 2000,  feedRate: 10.2, ap: 0.38 } },
  },
  {
    dc: "1/2", dcInch: 1 / 2,
    carbon:    { highSpeed: { rpm: 3800,  feedRate: 35.9, ap: 0.50 }, generalPurpose: { rpm: 2500,  feedRate: 15.7, ap: 0.50 } },
    alloy:     { highSpeed: { rpm: 3000,  feedRate: 22.3, ap: 0.50 }, generalPurpose: { rpm: 2000,  feedRate: 9.8,  ap: 0.50 } },
    stainless: { highSpeed: { rpm: 2500,  feedRate: 23.6, ap: 0.50 }, generalPurpose: { rpm: 1500,  feedRate: 9.4,  ap: 0.50 } },
  },
];
