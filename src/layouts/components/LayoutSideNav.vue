<template>
  <l-side-nav
    v-if="settingStore.showSidebar"
    :show-logo="settingStore.showSidebarLogo"
    :layout="settingStore.layout"
    :is-fixed="settingStore.isSidebarFixed"
    :menu="sideMenu"
    :theme="settingStore.displaySideMode"
    :is-compact="settingStore.isSidebarCompact"
  />
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {computed} from 'vue';

import {usePermissionStore, useSettingStore} from '@/store';

import LSideNav from './SideNav.vue';
import {RouteItem} from "@/api/model/permissionModel";

const permissionStore = usePermissionStore();
const settingStore = useSettingStore();
const { menus: menuRouters } = storeToRefs(permissionStore);

const sideMenu = computed(() => {
  return menuRouters.value as Array<RouteItem>;
});
</script>
