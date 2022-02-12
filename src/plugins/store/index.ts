import { reactive, Plugin } from "vue";
import { Store } from "@/store"

export function useStore(isServer: boolean) {
    const store = reactive({
        isServer,
    });
    return store;
}

export function storePlugin($store: Store): Plugin {
    return {
        install(app) {
            app.config.globalProperties.$store = $store;
        }
    }
}