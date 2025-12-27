import { defineStore } from 'pinia';

export const useGeneralStore = defineStore('general', {
    state: () => ({
        isInitialized: false,
        generalInfo: {
            globalInfo: '',
            defcon: 0,
            leitstelle: '',
            funk: 1000,
            maxEinsatz: 20,
            currentOperationOfficer: 0,
            swat: '',
        },
    }),
    getters: {
        getGeneralInfo(state): IGeneralInfo {
            return state.generalInfo;
        },
    },
    actions: {},
});

export interface IGeneralInfo {
    globalInfo: string;
    defcon: number;
    leitstelle: string;
    funk: number;
    maxEinsatz: number;
    currentOperationOfficer: number;
    swat: string;
}
