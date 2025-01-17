import { Brand } from '@/features/brands/types';
import { apiCars } from '@/lib/axios/clients';
import { QueryConfig } from '@/lib/react-query/config';
import { queryOptions, useQuery } from '@tanstack/react-query';

export type GetBrandsRes = Array<Brand>;

export async function getBrands() {
	return (await apiCars.get<GetBrandsRes>(`/carros/marcas`)).data;
}

export function getBrandsQueryOptions() {
	return queryOptions({
		queryKey: ['brands'],
		queryFn: getBrands,
	});
}

type UseBrandsOptions = {
	queryConfig?: QueryConfig<typeof getBrandsQueryOptions>;
};

export function useBrands({ queryConfig }: UseBrandsOptions) {
	return useQuery({
		...getBrandsQueryOptions(),
		...queryConfig,
	});
}
