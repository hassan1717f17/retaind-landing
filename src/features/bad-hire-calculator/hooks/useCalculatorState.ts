"use client";
import { useState, useMemo } from "react";
import { validateInputs, calculateResults } from "../lib/calculations";
import type {
  CalculatorDefaults,
  CalculatorInputs,
  CalculatorResults,
} from "@/lib/api/types/bad-hire-calculator";

export interface CalculatorState {
  inputs: CalculatorInputs;
  calculated: boolean;
  showBreakdown: boolean;
  validationErrors: string[];
  results: CalculatorResults;
  isValid: boolean;
  setTotalHires: (v: number | "") => void;
  setTotalLeavers: (v: number | "") => void;
  setFirstYearLeavers: (v: number | "") => void;
  setAvgSalary: (v: number | "") => void;
  setAgencyFee: (v: number | "") => void;
  setShowBreakdown: (v: boolean) => void;
  handleCalculate: () => void;
  handleReset: () => void;
}

export function useCalculatorState(
  defaults: CalculatorDefaults,
): CalculatorState {
  const [totalHires, setTotalHires] = useState<number | "">(
    defaults.totalHires,
  );
  const [totalLeavers, setTotalLeavers] = useState<number | "">(
    defaults.totalLeavers,
  );
  const [firstYearLeavers, setFirstYearLeavers] = useState<number | "">(
    defaults.firstYearLeavers,
  );
  const [avgSalary, setAvgSalary] = useState<number | "">(defaults.avgSalary);
  const [agencyFee, setAgencyFee] = useState<number | "">(defaults.agencyFee);
  const [calculated, setCalculated] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const inputs: CalculatorInputs = useMemo(
    () => ({ totalHires, totalLeavers, firstYearLeavers, avgSalary, agencyFee }),
    [totalHires, totalLeavers, firstYearLeavers, avgSalary, agencyFee],
  );

  const validationErrors = useMemo(() => validateInputs(inputs), [inputs]);
  const results = useMemo(() => calculateResults(inputs), [inputs]);
  const isValid =
    validationErrors.length === 0 &&
    Number(totalHires) > 0 &&
    Number(avgSalary) > 0 &&
    Number(agencyFee) > 0;

  const handleCalculate = () => {
    if (isValid) setCalculated(true);
  };

  const handleReset = () => {
    setTotalHires(defaults.totalHires);
    setTotalLeavers(defaults.totalLeavers);
    setFirstYearLeavers(defaults.firstYearLeavers);
    setAvgSalary(defaults.avgSalary);
    setAgencyFee(defaults.agencyFee);
    setCalculated(false);
    setShowBreakdown(false);
  };

  return {
    inputs,
    calculated,
    showBreakdown,
    validationErrors,
    results,
    isValid,
    setTotalHires,
    setTotalLeavers,
    setFirstYearLeavers,
    setAvgSalary,
    setAgencyFee,
    setShowBreakdown,
    handleCalculate,
    handleReset,
  };
}
