import { useMemo } from 'react';
import { computeCalc } from '../utils/calculations';

export function useCalc(project) {
  return useMemo(() => {
    try {
      return { result: computeCalc(project), error: null };
    } catch (e) {
      return { result: null, error: e.message };
    }
  }, [project]);
}
