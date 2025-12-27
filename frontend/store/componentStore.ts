// store/componentStore.ts
import { defineStore } from 'pinia';

type Notification = {
    id: string;
    message: string;
    createdAt: number;
};

export const useComponentStore = defineStore('component', {
    state: () => ({
        notifications: [] as Notification[],
        loadingActive: false,
        editorMode: false,
        addUnitMode: false,
        updateUnitMode: false,
    }),
    actions: {
        sendNotification(message: string) {
            this.notifications.push({
                id: crypto.randomUUID(),
                message,
                createdAt: Date.now(),
            });
        },
        removeNotification(id: string) {
            const i = this.notifications.findIndex(n => n.id === id);
            if (i !== -1) this.notifications.splice(i, 1);
        },
        setLoadingComponentActive(active: boolean) {
            this.loadingActive = active;
        },
        setEditorMode(active: boolean) {
            this.editorMode = active;
        },
        setAddUnitMode(active: boolean) {
            this.addUnitMode = active;
        },
        setUpdateUnitMode(active: boolean) {
            this.updateUnitMode = active;
        },
    },
});
