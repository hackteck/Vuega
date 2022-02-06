import { RouteRecordRaw, RouteMeta } from "vue-router"

export interface AppRouteMeta extends RouteMeta {
    onlyRouterView: boolean;
}

export type AppRoute = RouteRecordRaw & { meta: AppRouteMeta };