import { useState, useCallback } from 'react';

export const useErrorHandling = () => {
  const [errors, setErrors] = useState([]);

  const addError = useCallback((newError) => {
    setErrors(prevErrors => {
      const exists = prevErrors.some(error => error.id === newError.id);
      if (!exists) {
        return [...prevErrors, newError];
      }
      return prevErrors;
    });
  }, []);

  return { errors, setErrors, addError };
};
