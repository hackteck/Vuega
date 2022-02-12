import { createApp, createSSRApp } from 'vue'
import { AppProps } from '@/app';
import { useRouter } from "@/plugins/router/";
import { useStore, storePlugin } from "@/plugins/store";
import { i18nPlugin, useI18N } from './plugins/i18n';
import App from '@/App.vue'


export async function useApp(isServer: boolean, props: AppProps) {
    const app = isServer ? createSSRApp(App, props) : createApp(App, props);

    const router = useRouter(isServer);
    const store = useStore(isServer);
    const i18n = useI18N();

    app.use(router);
    app.use(storePlugin(store));
    app.use(i18nPlugin(i18n));

    return { app, router, store }
}