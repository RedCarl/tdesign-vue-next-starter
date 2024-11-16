import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

import { RouteItem } from '@/api/model/permissionModel';
import { userMenu } from '@/api/user';
import router, { fixedRouterList, homepageRouterList } from '@/router';
import { store } from '@/store';
import { transformObjectToRoute } from '@/utils/route';
import { MessagePlugin } from "tdesign-vue-next";

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login','/register'],
    routers: [],
    menus: [],
    removeRoutes: [],
    asyncRoutes: [],
  }),
  actions: {
    async initRoutes() {
      const accessedRouters = this.asyncRoutes;

      // 在菜单展示全部路由
      this.routers = [...homepageRouterList, ...accessedRouters, ...fixedRouterList];
    },
    async buildAsyncRoutes() {
      try {
        // 发起菜单权限请求 获取菜单列表
        let asyncRoutes: Array<RouteItem> = await userMenu();

        if (!asyncRoutes) {
          asyncRoutes = [];
        }

        let data = transformObjectToRoute(asyncRoutes);

        this.asyncRoutes = data.routes;
        this.menus = data.menus;

        await this.initRoutes();

        return this.asyncRoutes;
      } catch (e) {
        await MessagePlugin.error(e.message);
      }
    },
    async restoreRoutes() {
      // 不需要在此额外调用initRoutes更新侧边导肮内容，在登录后asyncRoutes为空会调用
      this.asyncRoutes.forEach((item: RouteRecordRaw) => {
        if (item.name) {
          router.removeRoute(item.name);
        }
      });
      this.asyncRoutes = [];
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
