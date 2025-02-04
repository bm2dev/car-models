import { Brand } from '@/features/brands/types';

const brand1: Brand = {
	codigo: '1',
	nome: 'Brand 1',
};

const brand2: Brand = {
	codigo: '2',
	nome: 'Brand 2',
};

export const brandMocks = { brand1, brand2 } as const;
