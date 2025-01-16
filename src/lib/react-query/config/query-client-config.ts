import { TestApiErrorType } from '@/lib/axios/clients';
import { getMilliseconds } from '@/utils';
import { DefaultOptions, UseMutationOptions } from '@tanstack/react-query';

export const queryClientConfig = {
	queries: {
		staleTime: getMilliseconds({ minutes: 1 }),
		retry: false,
		refetchOnWindowFocus: false,
	},
} satisfies DefaultOptions;

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> = Awaited<
	ReturnType<FnType>
>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
	ReturnType<T>,
	'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => Promise<any>> =
	UseMutationOptions<
		ApiFnReturnType<MutationFnType>,
		TestApiErrorType,
		Parameters<MutationFnType>[0]
	>;
