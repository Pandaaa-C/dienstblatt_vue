<template>
    <div class="component">
        <transition-group name="notify-anim">
            <div class="notification" v-for="item in store.notifications" :key="item.id">
                <p>{{ item.message }}</p>
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { useComponentStore } from '@/store/componentStore';

const store = useComponentStore();

const TTL_MS = 4000;
const timers = new Map<string, ReturnType<typeof setTimeout>>();

watch(
    () => store.notifications.map(n => n.id),
    () => {
        for (const n of store.notifications) {
            if (timers.has(n.id)) continue;
            timers.set(
                n.id,
                setTimeout(() => {
                    store.removeNotification(n.id);
                    timers.delete(n.id);
                }, TTL_MS),
            );
        }
    },
    { immediate: true },
);

onBeforeUnmount(() => {
    for (const t of timers.values()) clearTimeout(t);
    timers.clear();
});
</script>

<style scoped lang="scss">
.component {
    position: absolute;
    top: 0.8vw;
    left: 0.8vw;
    width: 15vw;
    height: calc(100% - 1.6vw);
    overflow: visible;
    pointer-events: none;

    .notification {
        width: fit-content;
        height: fit-content;
        background: #202020;
        border-left: 0.2vw solid red;
        padding: 0.7vw;
        margin-bottom: 0.5vw;

        p {
            color: rgb(218, 218, 218);
            font-size: 0.6vw;
        }
    }
}

.notify-anim-move,
.notify-anim-enter-active,
.notify-anim-leave-active {
    transition: all 0.25s ease;
}
.notify-anim-enter-from,
.notify-anim-leave-to {
    opacity: 0;
    transform: translateX(-20vw);
}
</style>
