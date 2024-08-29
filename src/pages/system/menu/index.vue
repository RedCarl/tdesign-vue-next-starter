<template>
  <div class="container">
    <t-card class="list-card-container" :bordered="false">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button @click="$router.push('/system-menu/replace')">新增菜单</t-button>
        </div>
      </t-row>
      <t-enhanced-table
        row-key="id"
        :data="renderData"
        :tree="{
          childrenKey: 'children',
          treeNodeColumnIndex: 1,
          expandTreeNodeOnClick: true,
        }"
        :columns="COLUMNS"
        :stripe="true"
        :pagination="pagination"
        :loading="dataLoading"
        @page-change="onPageChange"
      >
        <template #icon="{ row }">
          <icon :name="row.meta.icon" size="20" />
        </template>

        <template #roles="{ row }">
          <t-tag v-for="(item, index) in row.roles" :key="index" theme="primary">
            {{ item }}
          </t-tag>
        </template>

        <template #operate="{ row }">
          <t-space>
            <t-link
              v-if="row.parentId === '0'"
              theme="primary"
              @click="$router.push('/system-menu/replace?parentId=' + row.id)"
            >
              子菜单
            </t-link>
            <t-link
              theme="primary"
              @click="$router.push('/system-menu/replace?id=' + row.id + '&parentId=' + row.parentId)"
            >
              编辑
            </t-link>

            <t-popconfirm
              v-if="renderData.length !== 1"
              theme="default"
              content="是否删除该账号？"
              @confirm="deleteData(row.id)"
            >
              <t-link theme="danger"> 删除 </t-link>
            </t-popconfirm>
          </t-space>
        </template>
      </t-enhanced-table>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'tdesign-icons-vue-next';
import { MessagePlugin, PrimaryTableCol } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { menuDelete, menuPage } from '@/api/menu';

/* 表头部字段 */
const COLUMNS: PrimaryTableCol[] = [
  {
    title: '菜单图标',
    align: 'center',
    width: 100,
    colKey: 'icon',
  },
  {
    title: '菜单名称',
    width: 100,
    colKey: 'meta.title',
  },
  {
    title: '菜单路径',
    align: 'center',
    width: 100,
    colKey: 'path',
  },
  {
    title: '操作',
    align: 'center',
    width: '100px',
    colKey: 'operate',
  },
];

/* 搜索表单模型 */
const searchModel = () => {
  return {
    name: '',
  };
};

/* 表格数据 */
const renderData = ref([]);

/* 分页基础数据 */
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
});

/* 搜索表单数据 */
const formData = ref(searchModel());

/* 数据加载状态 */
const dataLoading = ref(false);

/* 表单数据查询 */
const fetchData = async (params: any) => {
  dataLoading.value = true;
  try {
    const data = await menuPage(params);

    renderData.value = data.records;
    pagination.value = {
      ...pagination.value,
      total: data.totalRow,
      current: data.pageNumber,
      pageSize: data.pageSize,
    };
  } catch (e) {
    await MessagePlugin.error(e.message);
  } finally {
    dataLoading.value = false;
  }
};

/* 搜索 */
const search = async () => {
  await fetchData({
    ...formData.value,
    ...pagination.value,
  } as unknown);
};

/* 删除 */
const deleteData = async (ids: string) => {
  try {
    await menuDelete(ids);
    await MessagePlugin.success('删除成功');
    await search();
  } catch (e) {
    await MessagePlugin.error(e.message);
  }
};

/* 分页更改 */
const onPageChange = (pageInfo: any) => {
  fetchData({
    ...formData.value,
    ...pagination.value,
    current: pageInfo.current,
    pageSize: pageInfo.pageSize,
  });
};

/* 进入页面后的查询 */
onMounted(() => {
  fetchData({ ...pagination.value });
});
</script>

<style lang="less" scoped>
.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  min-width: 1000px;
}

.left-operation-container {
  display: flex;
  align-items: center;
  margin-bottom: var(--td-comp-margin-xxl);
}
</style>
