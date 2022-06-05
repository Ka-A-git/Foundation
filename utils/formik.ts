import { FormikErrors } from 'formik';

type ErrorPair = string | Record<string, any>;

// see utils/formik.test.ts for test cases
function getErrorFromObject([error]: ErrorPair[]): string {
  return typeof error === 'object'
    ? getErrorFromObject(Object.values<ErrorPair>(error))
    : error;
}

export function getFormikErrorMessage<T>(errors: FormikErrors<T>) {
  const errorPairs = Object.values<ErrorPair>(errors);
  return getErrorFromObject(errorPairs);
}
