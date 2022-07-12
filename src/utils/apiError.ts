import { APIError } from 'api/types/errorsTypes';

export function apiError(response: any): response is APIError {
  return response && response.reason;
}
