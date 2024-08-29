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
              <t-form-item label="菜单名称" name="name">
                <t-input v-model="formData.name" :style="{ width: '322px' }" placeholder="请输入菜单名称" />
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
              <t-form-item label="默认路径" name="redirect">
                <t-input v-model="formData.redirect" :style="{ width: '322px' }" placeholder="请输入默认路径" />
              </t-form-item>
            </t-col>
          </t-row>
          <t-divider />
          <t-row :gutter="[32, 24]">
            <t-col :span="6">
              <t-form-item label="菜单标题">
                <t-input v-model="formData.meta.title" :style="{ width: '322px' }" placeholder="请输入菜单标题" />
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="菜单图标" name="icon">
                <t-input
                  v-model="formData.meta.icon"
                  :style="{ width: '322px', marginRight: '10px' }"
                  placeholder="请输入菜单图标"
                />
                <t-icon :name="formData.meta.icon" size="2em" />
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="权重顺序" name="orderNo">
                <t-input-number v-model="formData.meta.orderNo" placeholder="请输入权重顺序" />
              </t-form-item>
            </t-col>

            <t-col :span="6"></t-col>

            <t-col :span="6">
              <t-form-item label="隐藏菜单" name="hidden">
                <t-switch v-model="formData.meta.hidden" />
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="分组标签" name="group">
                <t-switch v-model="formData.meta.group" />
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="服务编号" name="service">
                <t-input v-model="formData.service" :style="{ width: '322px' }" placeholder="请输入服务编号" />
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="权限节点" name="permission">
                <t-input v-model="formData.permission" :style="{ width: '322px' }" placeholder="请输入权限节点" />
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
import { FormRule, MessagePlugin, SubmitContext } from 'tdesign-vue-next';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { menuQuery, menuReplace } from '@/api/menu';

const router = useRouter();
const route = useRoute();

/* 表单模型 */
const formModel = () => {
  return {
    id: route.query.id,
    parentId: route.query.parentId,
    name: '',
    path: '',
    component: 'LAYOUT',
    redirect: '',
    meta: {
      title: '',
      icon: '',
      expanded: false,
      orderNo: 0,
      hidden: false,
      hiddenBreadcrumb: false,
      single: false,
      frameSrc: false,
      frameBlank: false,
      keepAlive: true,
      group: false,
    },
    status: 0,
    type: 0,
    service: '',
    permission: '',
  };
};

/* 表单规则 */
const FORM_RULES: Record<string, FormRule[]> = {
  // name: [{ required: true, message: '请输入菜单名称', type: 'error' }],
  // path: [{ required: true, message: '请输入菜单路径', type: 'error' }],
  // component: [{ required: true, message: '请输入菜单组件路径', type: 'error' }],
};

/* 表单数据 */
const formData = ref(formModel());

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
  router.push('/system-menu/base');
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
