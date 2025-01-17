import { getMilliseconds } from '@/utils';
import { DefaultOptions, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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

export type MutationConfig<
	MutationFnType extends (...args: any) => Promise<any>,
	TError = AxiosError<any>
> = UseMutationOptions<ApiFnReturnType<MutationFnType>, TError, Parameters<MutationFnType>[0]>;
