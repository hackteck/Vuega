import { reactive } from "vue";

export function useStore(isServer: boolean) {
    const store = reactive({
        isServer,
    });
    return store;
}