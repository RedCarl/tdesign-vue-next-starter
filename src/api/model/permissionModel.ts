import { defineComponent } from 'vue';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteItem {
  title: string;
  menu: MenuItem[];
}

export interface MenuItem {
  name: string;
  icon: string;
  path: string;
  hidden: boolean;
  sort: number;
  component: string | Component;
}
