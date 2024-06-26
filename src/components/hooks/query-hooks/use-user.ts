import { getUser } from '@/lib/auth/utils';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getUser(),
    staleTime: Infinity,
  });
};
