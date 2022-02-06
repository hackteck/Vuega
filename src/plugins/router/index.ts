import { createRouter, createMemoryHistory, createWebHistory } from "vue-router"
import routes from "./routes"

export function useRouter(isServer = false) {
    const router = createRouter({
        history: isServer ? createMemoryHistory() : createWebHistory(),
        routes
    });

    return router;
}

export default useRouter;