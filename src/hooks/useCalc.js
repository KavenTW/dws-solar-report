import { useMemo } from 'react';
import { computeCalc } from '../utils/calculations';

export function useCalc(project) {
  return useMemo(() => {
    try {
      return computeCalc(project);
    } catch {
      return null;
    }
  }, [project]);
}
