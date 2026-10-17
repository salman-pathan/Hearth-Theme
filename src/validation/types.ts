export type Severity = "error" | "warning" | "info";

export interface ValidationIssue {
  severity: Severity;
  code: string;
  message: string;
  tokens: string[];
  actual?: number;
  expected?: number;
}

export interface ValidationReport {
  valid: boolean;
  issues: ValidationIssue[];
}
