import { useState } from 'react';

const UseErrors = () => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const updateError = (error: unknown) => {
    setError(true);
    setErrorText(String(error));
  };
  const resetErrors = () => {
    setError(false);
  };
  return { errorText, resetErrors, updateError, error };
};

export default UseErrors;
