import { Model } from '@/features/models/types';

const model1: Model = {
	codigo: 1,
	nome: 'Model 1',
};

const model2: Model = {
	codigo: 2,
	nome: 'Model 2',
};

export const modelMocks = { model1, model2 } as const;
