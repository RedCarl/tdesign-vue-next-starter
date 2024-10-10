<template>
  <div class="container">
    <t-form
        ref="form"
        class="base-form"
        :data="formData"
        :rules="FORM_RULES"
        label-align="top"
        :label-width="100"
        @submit="replace"
        @reset="cancel"
    >
      <div class="form-basic-container">
        <div class="form-basic-item">
          <div class="form-basic-container-title">菜单信息</div>

          <t-row :gutter="[32, 24]">
            <t-col :span="6">
              <t-form-item label="菜单分组" name="title">
                <t-select
                    v-model="formData.title"
                    :creatable="true"
                    :filterable="true"
                    :options="groupData"
                    :keys="{ label: 'title', value: 'title' }"
                    placeholder="请输入菜单分组"
                    :style="{ width: '322px' }"
                    :popup-props="{ overlayInnerStyle: { width: '322px' } }"
                />
              </t-form-item>
            </t-col>

            <t-col :span="6"></t-col>

            <t-col :span="6">
              <t-form-item label="菜单名称" name="name">
                <t-input v-model="formData.name" :style="{ width: '322px' }" placeholder="请输入菜单名称" />
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="菜单图标" name="icon">
                <t-select
                    v-model="formData.icon"
                    placeholder="请选择菜单图标"
                    :style="{ width: '322px' }"
                    :popup-props="{ overlayInnerStyle: { width: '322px' } }"
                >
                  <t-option
                      v-for="item in options"
                      :key="item.stem"
                      :value="item.stem"
                      class="inline-block text-[20px]"
                  >
                    <div>
                      <t-icon :name="item.stem" />
                    </div>
                  </t-option>
                  <template #valueDisplay>
                    <t-icon :name="formData.icon" :style="{ marginRight: '8px' }" />{{ formData.icon }}
                  </template>
                </t-select>
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="菜单路径" name="path">
                <t-input v-model="formData.path" :style="{ width: '322px' }" placeholder="请输入菜单路径" />
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="组件路径" name="component">
                <t-input v-model="formData.component" :style="{ width: '322px' }" placeholder="请输入组件路径" />
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="权重顺序" name="sort">
                <t-input-number v-model="formData.sort" placeholder="请输入权重顺序" />
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="隐藏菜单" name="hidden">
                <t-switch v-model="formData.hidden" />
              </t-form-item>
            </t-col>
          </t-row>

          <div class="form-submit-sub">
            <div class="form-submit-left">
              <t-button theme="primary" class="form-submit-confirm" type="submit" :loading="dataLoading">
                确认提交
              </t-button>
              <t-button type="reset" class="form-submit-cancel" theme="default" variant="base"> 取消操作 </t-button>
            </div>
          </div>
        </div>
      </div>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { manifest } from 'tdesign-icons-vue-next';
import { FormRule, MessagePlugin, SubmitContext } from 'tdesign-vue-next';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { menuGroup, menuQuery, menuReplace } from '@/api/menu';

// 获取全部图标的列表
const options = ref(manifest);

const router = useRouter();
const route = useRoute();

/* 表单模型 */
const formModel = () => {
  return {
    id: route.query.id,
    title: '',
    name: '',
    icon: '',
    path: '',
    hidden: false,
    component: '',
    sort: 0,
  };
};

/* 表单规则 */
const FORM_RULES: Record<string, FormRule[]> = {
  title: [{ required: true, message: '请输入分组名称', type: 'error' }],
  name: [{ required: true, message: '请输入名称', type: 'error' }],
  path: [{ required: true, message: '请输入路由路径', type: 'error' }],
  component: [{ required: true, message: '请输入组件路径', type: 'error' }],
};

/* 表单数据 */
const formData = ref(formModel());
const groupData = ref();

/* 数据加载状态 */
const dataLoading = ref(false);

/* 提交数据 */
const replace = async (ctx: SubmitContext) => {
  dataLoading.value = true;
  try {
    if (ctx.validateResult === true) {
      const data = await menuReplace(formData.value);
      if (data) {
        await MessagePlugin.success('创建成功');
        cancel();
      }
    }
  } catch (e) {
    await MessagePlugin.error(e.message);
  } finally {
    dataLoading.value = false;
  }
};

/* 取消操作 */
const cancel = () => {
  router.push('/menu');
};

/* 编辑模式下数据查询 */
const queryData = async (id: string) => {
  try {
    if (id) {
      formData.value = await menuQuery({ id });
    }
  } catch (e) {
    await MessagePlugin.error(e.message);
  }
};

/* 查询现有菜单组别 */
const queryGroup = async () => {
  try {
    groupData.value = await menuGroup();
  } catch (e) {
    await MessagePlugin.error(e.message);
  }
};

queryGroup();
queryData(route.query.id as string);
</script>

<style scoped lang="less">
.form-basic-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium) var(--td-radius-medium) 0 0;
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl) 80px var(--td-comp-paddingLR-xxl);

  @media (max-width: @screen-sm-max) {
    padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingLR-xl) 80px var(--td-comp-paddingLR-xl);

    .form-basic-container-title {
      margin: 0 0 var(--td-comp-margin-xxxl) 0;
    }
  }

  .form-basic-item {
    width: 676px;

    .form-basic-container-title {
      font: var(--td-font-title-large);
      font-weight: 400;
      color: var(--td-text-color-primary);
      margin: var(--td-comp-margin-xxl) 0 var(--td-comp-margin-xl) 0;
    }

    .form-title-gap {
      margin: calc(var(--td-comp-margin-xxl) * 2) 0 var(--td-comp-margin-xl) 0;
    }
  }
}

.form-submit-sub {
  width: 676px;
  align-items: center;
  margin-top: 50px;
  flex: 1;
  text-align: right;

  .form-submit-left {
    .form-submit-upload-span {
      font-size: 14px;
      line-height: 22px;
      color: var(--td-text-color-placeholder);
      padding-top: 8px;
      display: inline-block;
    }
  }
}
</style>
