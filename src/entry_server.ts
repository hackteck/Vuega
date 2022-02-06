import { AppContext } from "@/app";
import { useApp } from "@/main";
const { renderToString } = require('@vue/server-renderer');

export default async (context: AppContext = {}) => {
    const { app, router } = useApp(true, {
        
    });

    // устанавливаем маршрут для маршрутизатора серверной части
    router.push(context.url ?? "/");

    // mount
    await router.isReady();

    // return rendered string
    return await renderToString(app);
}