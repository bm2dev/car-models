import { queryClientConfig } from '@/lib/react-query/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({ defaultOptions: queryClientConfig });

export function ReactQueryProvider({ children }: { children?: React.ReactNode }) {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
