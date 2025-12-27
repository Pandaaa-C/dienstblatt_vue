import { defineStore } from 'pinia';
import type { ILiabilityData } from '@shared';

export const useLiabilityStore = defineStore('liability', {
    state: () => ({
        isInitialized: false,
        reductions: [] as ILiabilityData[]
    }),
    getters: {
    },
    actions: {},
});
