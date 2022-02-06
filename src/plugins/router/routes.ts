import { AppRoute } from "@/router";

export const routes: AppRoute[] = [
    {
        path: "/",
        alias: "/index.html",
        component: () => import(/* webpackChunkName: "index" */ "@/views/index/index.vue"),
        meta: {
            onlyRouterView: true
        }
    },
];

export default routes;