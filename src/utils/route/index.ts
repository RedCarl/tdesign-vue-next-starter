import { shallowRef } from 'vue';

import {Component, MenuItem, RouteItem} from '@/api/model/permissionModel';
import {
  BLANK_LAYOUT,
  EXCEPTION_COMPONENT,
  LAYOUT,
  PAGE_NOT_FOUND_ROUTE,
  PARENT_LAYOUT,
} from '@/utils/route/constant';
import component from "*.vue";

// vite 3+ support dynamic import from node_modules
const iconsPath = import.meta.glob('../../../node_modules/tdesign-icons-vue-next/esm/components/*.js');

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();

LayoutMap.set('LAYOUT', LAYOUT);
LayoutMap.set('BLANK', BLANK_LAYOUT);

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

// 动态从包内引入单个Icon
async function getMenuIcon(iconName: string): Promise<string> {
  const RenderIcon = iconsPath[`../../../node_modules/tdesign-icons-vue-next/esm/components/${iconName}.js`];

  const Icon = await RenderIcon();
  // @ts-ignore
  return shallowRef(Icon.default);
}

// 动态引入路由组件
function asyncImportRoute(routes: MenuItem[] | undefined) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../pages/**/*.vue');
  if (!routes) return;

  routes.forEach(async (item) => {
    const { component, name } = item;

    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase());
      if (layoutFound) {
        item.component = layoutFound;
      } else {
        item.component = dynamicImport(dynamicViewsModules, component);
      }
    } else if (name) {
      item.component = PARENT_LAYOUT();
    }

    if (item.icon) item.icon = await getMenuIcon(item.icon);
  });
}

function dynamicImport(dynamicViewsModules: Record<string, () => Promise<Recordable>>, component: string) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../pages', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    throw new Error(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    );
  } else {
    console.warn(`Can't find ${component} in pages folder`);
  }
  return EXCEPTION_COMPONENT;
}

// 将背景对象变成路由对象
export function transformObjectToRoute(routeList: RouteItem[]) {
  routeList.forEach(async (route) => {
    for (const menu of route.menu) {
      if (typeof menu.component === 'string') {
        const component = menu.component as string;

        if (component) {
          if (component.toUpperCase() === 'LAYOUT') {
            menu.component = LayoutMap.get(component.toUpperCase());
          }
        } else {
          throw new Error('component is undefined');
        }
        route.menu && asyncImportRoute(route.menu);
        if (menu.icon) menu.icon = await getMenuIcon(menu.icon);

      }
    }
  });

  let routes = [
    {
      "path": "/layout",
      "name": "layout",
      "component": () => import('@/layouts/index.vue'),
      "children": [] as MenuItem[]
    }
  ];

  for (const route of routeList) {
    routes[0].children.push(...route.menu);
  }

  return {
    routes: [PAGE_NOT_FOUND_ROUTE, ...routes],
    menus: routeList
  };
}
