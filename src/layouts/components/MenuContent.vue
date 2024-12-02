<template>
  <t-menu-group v-for="menu in getMenuList(list)" :title="menu.title" >
    <template v-for="item in menu.menu">
      <t-menu-item
          v-if="!item.hidden"
          :name="item.path"
          :value="getPath(item)"
          :to="item.path"
      >
        <template #icon>
          <component :is="menuIcon(item)" class="t-icon"></component>
        </template>
        {{ item.display }}
      </t-menu-item>
    </template>
  </t-menu-group>
</template>
<script setup lang="tsx">
import type { PropType } from 'vue';
import { computed } from 'vue';

import { getActive } from '@/router';
import {MenuItem, RouteItem} from "@/api/model/permissionModel";

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

const getMenuList = (list: RouteItem[]): RouteItem[] => {
  if (!list || list.length === 0) {
    return [];
  }

  // 对每个菜单中的 menu 数组进行排序
  list.forEach(item => {
    item.menu.sort((a, b) => a.sort - b.sort);
  });

// 根据每个 RouteItem 的 menu.sort 最大值对最外层进行排序
  list.sort((a, b) => {
    const maxA = Math.max(...a.menu.map(menuItem => menuItem.sort));
    const maxB = Math.max(...b.menu.map(menuItem => menuItem.sort));
    return maxA - maxB;
  });

  return list;
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

:deep(.t-is-active::before){
  position: absolute;
  border-radius: 4px;
  left: 7px;
  width: 4px;
  height: 16px;
  content: "";
  background: var(--td-brand-color) !important;
}

</style>
