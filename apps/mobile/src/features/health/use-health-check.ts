import { useQuery } from '@tanstack/react-query';

import { getApiHealth } from '@mobile/services/api/api-client';

const healthQueryKey = ['api-health'] as const;

export function useHealthCheck() {
  return useQuery({
    queryKey: healthQueryKey,
    queryFn: getApiHealth,
    refetchInterval: 60_000,
  });
}
