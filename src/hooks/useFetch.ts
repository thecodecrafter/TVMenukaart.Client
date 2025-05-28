import { useEffect, useState } from "react";

export interface IUseFetchResponse<T> {
  data: T | null;
  isProcessing: boolean;
  hasError: boolean | null;
  hasFetched: boolean;
  isSuccess: boolean;
  error: string | null;
}

export const useFetch = <T>(
  handler: () => Promise<T | null>,
  getErrorMessage: (reason: unknown) => string,
  active: boolean,
  refreshCounter: number
): IUseFetchResponse<T> => {
  const [state, setState] = useState<IUseFetchResponse<T>>({
    data: null,
    isProcessing: false,
    hasError: null,
    hasFetched: false,
    isSuccess: false,
    error: null,
  });

  // const ERROR_MESSAGE =
  //   "Wegens een technische fout kon de pagina niet worden opgebouwd. Probeer het over een paar minuten opnieuw.";

  useEffect(() => {
    if (active) {
      setState((prevState) => ({
        ...prevState,
        isProcessing: true,
        error: null,
        isSuccess: false,
      }));

      handler().then(
        (value) => {
          setState((prevState) => ({
            ...prevState,
            data: value,
            isProcessing: false,
            hasError: false,
            error: null,
            isSuccess: true,
            hasFetched: true,
          }));
        },
        (reason) => {
          setState((prevState) => ({
            ...prevState,
            data: null,
            isProcessing: false,
            hasError: true,
            error: getErrorMessage(reason),
            isSuccess: false,
            hasFetched: true,
          }));
        }
      );
    }
  }, [active, refreshCounter]);

  return {
    data: state.data,
    hasError: state.hasError,
    isProcessing: state.isProcessing,
    isSuccess: state.isSuccess,
    error: state.error,
    hasFetched: state.hasFetched,
  };
};
