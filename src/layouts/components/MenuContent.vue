<template>
  <t-menu-group v-for="menu in list" :title="menu.title" >
    <template v-for="item in menu.menu">
      <t-menu-item
          v-if="!item.hide"
          :name="item.path"
          :value="getPath(item)"
          :to="item.path"
      >
        <template #icon>
          <component :is="menuIcon(item)" class="t-icon"></component>
        </template>
        {{ item.name }}
      </t-menu-item>
    </template>
  </t-menu-group>
</template>
<script setup lang="tsx">
import type { PropType } from 'vue';
import { computed } from 'vue';

import { getActive } from '@/router';
import type { MenuRoute } from '@/types/interface';
import {MenuItem, RouteItem} from "@/api/model/permissionModel";

type ListItemType = MenuRoute & { icon?: string };

const props = defineProps({
  navData: {
    type: Array as PropType<RouteItem[]>,
    default: () => [],
  },
});

const active = computed(() => getActive());

const list = computed(() => {
  const { navData } = props;
  return navData;
});

const menuIcon = (item: MenuItem) => {
  if (typeof item.icon === 'string') return <t-icon name={item.icon} />;
  return item.icon;
};

const getMenuList = (list: MenuRoute[], basePath?: string): ListItemType[] => {
  if (!list || list.length === 0) {
    return [];
  }
  // 如果meta中有orderNo则按照从小到大排序
  list.sort((a, b) => {
    return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
  });
  return list
      .map((item) => {
        const path = basePath && !item.path.includes(basePath) ? `${basePath}/${item.path}` : item.path;

        return {
          path,
          title: item.meta?.title,
          icon: item.meta?.icon,
          children: getMenuList(item.children, path),
          meta: item.meta,
          redirect: item.redirect,
        };
      })
      .filter((item) => item.meta && item.meta.hidden !== true);
};

const getPath = (item: MenuItem) => {
  const activeLevel = active.value.split('/').length;
  const pathLevel = item.path.split('/').length;
  if (activeLevel > pathLevel && active.value.startsWith(item.path)) {
    return active.value;
  }

  if (active.value === item.path) {
    return active.value;
  }
};
</script>

<style scoped lang="less">
:deep(.t-menu-group__title) {
  line-height: 18px;
  font-size: 14px;
  font-weight: 500;
  color: var(--td-text-color-primary);
  padding: 22px 0 0 20px;
}
</style>
