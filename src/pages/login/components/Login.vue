<template>
  <main class="flex-grow flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800">登录您的帐户</h1>
          <p class="text-gray-600 mt-2">欢迎回来，请输入您的登录信息。</p>
        </div>

        <t-form
            ref="form"
            label-width="0"
            :colon="true"
            :data="formData"
            :rules="FORM_RULES"
            class="space-y-6"
            @submit="onSubmit"
        >
          <!--账号-->
          <div class="space-y-4">
            <div class="relative">
              <t-form-item name="username">
                <t-input v-model="formData.username" :disabled="loading" placeholder="请输入账号" >
                  <template #prefix-icon>
                    <UserIcon />
                  </template>
                </t-input>
              </t-form-item>
            </div>
          </div>

          <!--密码-->
          <div class="space-y-4">
            <div class="relative">
              <t-form-item name="password">
                <t-input v-model="formData.password" :disabled="loading" type="password" placeholder="请输入密码" >
                  <template #prefix-icon>
                    <lock-on-icon />
                  </template>
                </t-input>
              </t-form-item>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <t-checkbox :disabled="loading" />
              <label for="remember" class="ml-2 block text-sm text-gray-600">记住密码</label>
            </div>
            <a href="#" class="text-sm text-blue-600 hover:underline">忘记密码？</a>
          </div>

          <t-button theme="primary" type="submit" class="w-full" :loading="loading">登录</t-button>
        </t-form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { FormInstanceFunctions, FormRule, SubmitContext } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { t } from '@/locales';
import { useUserStore } from '@/store';
import {LockOnIcon, UserIcon} from "tdesign-icons-vue-next";

const userStore = useUserStore();

const INITIAL_DATA = {
  username: '',
  password: '',
};

const FORM_RULES: Record<string, FormRule[]> = {
  username: [{ required: true, message: t('pages.login.required.username'), type: 'error' }],
  password: [{ required: true, message: t('pages.login.required.password'), type: 'error' }],
};

const loading = ref(false);
const form = ref<FormInstanceFunctions>();
const formData = ref({ ...INITIAL_DATA });

const router = useRouter();
const route = useRoute();

const onSubmit = async (ctx: SubmitContext) => {
  loading.value = true;

  try {
    if (ctx.validateResult === true) {
      await userStore.login(formData.value);

      await MessagePlugin.success('登录成功');
      const redirect = route.query.redirect as string;
      const redirectUrl = redirect ? decodeURIComponent(redirect) : '/dashboard';
      await router.push(redirectUrl);
    }
  } catch (e) {
    await MessagePlugin.error(e.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
</style>
