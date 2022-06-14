import { useQuery, UseQueryResult } from 'react-query';
import { generatePinataApiKey } from 'queries/uploads';

export interface PinataApiKeyResult {
  JWT: string; 
  pinata_api_key: string;
  pinata_api_secret: string;
}

export default function useGeneratePinataKey(): UseQueryResult<
  PinataApiKeyResult,
  Error
> {
  return useQuery(useGeneratePinataKey.getKey(), () => generatePinataApiKey(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

useGeneratePinataKey.getKey = () => ['GeneratePinataApiKey'];
