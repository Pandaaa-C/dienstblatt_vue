<template>
    <div class="component" @click="open">
        <p>{{ options[activeIndex] }}</p>
        <i class="fa-solid fa-chevron-down"></i>

        <div class="options" v-if="isOpen">
            <input dropdown-whitelist type="text" placeholder="Filter" v-model="filter" />

            <div class="list">
                <p v-for="(item, index) in getFilteredOptions" :key="index" dropdown-whitelist @click.stop="select(item)">
                    {{ item }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
    options: string[];
    onSelect: (index: number) => void;
    currentIndex: number;
}>();

const activeIndex = ref(props.currentIndex);
const isOpen = ref(false);
const filter = ref('');

watch(
    () => props.currentIndex,
    v => {
        activeIndex.value = v;
    },
);

const open = (): void => {
    if (isOpen.value) return;
    queueMicrotask(() => (isOpen.value = true));
};

const select = (item: string): void => {
    const index = props.options.indexOf(item);
    if (index === -1) return;

    props.onSelect(index);
    activeIndex.value = index;
    filter.value = '';
    isOpen.value = false;
};

const onClick = (event: MouseEvent): void => {
    if (!isOpen.value) return;

    const target = event.target as HTMLElement;

    if (target.closest('[dropdown-whitelist]')) return;
    if (target.closest('.component')) return;

    isOpen.value = false;
};

const getFilteredOptions = computed((): string[] => {
    const f = filter.value.toLowerCase();
    return props.options.filter(x => x.toLowerCase().includes(f));
});

onMounted(() => {
    document.addEventListener('click', onClick);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', onClick);
});
</script>

<style scoped lang="scss">
.component {
    position: relative;
    background: #181818;
    border: 0.1vw solid #222222;
    border-radius: 0.15vw;
    padding-bottom: 0 !important;
    padding-left: 0.3vw;
    padding-right: 0.3vw;
    overflow: visible;
    cursor: pointer;

    > p {
        height: 100%;
        display: flex;
        align-items: center;
        color: #969696;
        font-size: 0.55vw;
        pointer-events: none;
        overflow: visible;
        float: left;
    }

    i {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #969696;
        font-size: 0.5vw;
        margin-left: 0.5vw;
        pointer-events: none;
        overflow: visible;
        float: right;
    }

    .options {
        position: absolute;
        top: 115%;
        left: -0.1vw;
        width: 100%;
        height: fit-content;
        background: #181818;
        border: 0.1vw solid #222222;
        border-radius: 0.15vw;
        z-index: 2;
        padding-bottom: 0.3vw;
        cursor: default;

        .list {
            width: 100%;
            max-height: 10vw;
            height: fit-content;
            overflow-y: scroll;
        }

        input {
            width: 92%;
            height: 0.7vw;
            border: none;
            background: transparent;
            font-size: 0.5vw;
            margin-left: 4%;
            color: white;
            border-bottom: 0.1vw solid rgba(255, 255, 255, 0.1);
            margin-bottom: 0.5vw;
        }

        p {
            width: 100%;
            font-size: 0.5vw;
            padding: 0.2vw;
            color: #969696;
            text-indent: 3%;
            cursor: pointer;

            &:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        }
    }
}
</style>
