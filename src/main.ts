import { createApp, createSSRApp } from 'vue'
import { AppProps } from '@/app';
import { useRouter } from "@/plugins/router/";
import { useStore } from "@/plugins/store";
import App from '@/App.vue'


export function useApp(isServer: boolean, props: AppProps) {
    const router = useRouter(isServer);
    const store = useStore(isServer);

    const app = isServer ? createSSRApp(App, props) : createApp(App, props);
    app.use(router);

    // inject store
    app.mixin({
        created() {
            this.$store = store;
        }
    })

    return { app, router, store }
}