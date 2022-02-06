import { useStore } from "@/plugins/store/"

export type Store = ReturnType<typeof useStore>;

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $store: Store;
    }
}