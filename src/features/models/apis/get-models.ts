import { Brand } from '@/features/brands/types';
import { Model } from '@/features/models/types';
import { apiCars } from '@/lib/axios/clients';
import { QueryConfig } from '@/lib/react-query/config';
import { queryOptions, useQuery } from '@tanstack/react-query';

export type GetModelsReq = { brandCodigo: Brand['codigo'] };
export type GetModelsRes = { modelos: Array<Model> };

export async function getModels({ brandCodigo }: GetModelsReq) {
	return (await apiCars.get<GetModelsRes>(`/carros/marcas/${brandCodigo}/modelos`)).data;
}

export function getModelsQueryOptions({ brandCodigo }: GetModelsReq) {
	return queryOptions({
		queryKey: ['models', brandCodigo],
		queryFn: () => getModels({ brandCodigo }),
	});
}

type UseModelsOptions = {
	queryConfig?: QueryConfig<typeof getModelsQueryOptions>;
} & GetModelsReq;

export function useModels({ brandCodigo, queryConfig }: UseModelsOptions) {
	return useQuery({
		...getModelsQueryOptions({ brandCodigo }),
		...queryConfig,
	});
}
