<template>
  <t-upload
    ref="uploadRef"
    v-model="files"
    theme="image"
    :action="host + '/api/common/upload?path=' + path"
    accept="image/*"
    :auto-upload="true"
    :show-image-file-name="false"
    @remove="removeImage"
    @fail="handleFail"
    @success="handleSuccess"
  >
  </t-upload>
</template>

<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
  },
  path: {
    type: String,
  },
});

const emit = defineEmits(['update:url']);
const env = import.meta.env.MODE || 'development';
const host = env === 'mock' || import.meta.env.VITE_IS_REQUEST_PROXY !== 'true' ? '' : import.meta.env.VITE_API_URL;

/* 图片上传 */
import { MessagePlugin, type UploadInstanceFunctions, type UploadProps } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';

const uploadRef = ref<UploadInstanceFunctions>();
const files = ref<UploadProps['value']>([]);
const handleFail: UploadProps['onFail'] = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const handleSuccess: UploadProps['onSuccess'] = ({ file }) => {
  emit('update:url', file?.url);
  MessagePlugin.success('上传成功。');
};

const loadImage = () => {
  if (files.value && files.value?.length === 0) {
    if (props.url) {
      files.value.push({
        url: props.url,
      });
    }
  }
};

const removeImage = () => {
  files.value = [];
  emit('update:url', '');
};

/* 进入页面后的查询 */
// onBeforeUpdate(() => {
//   loadImage();
// });

// 当组件挂载时检查，如果 `parentData` 已加载则执行方法
onMounted(() => {
  if (props.url) {
    loadImage();
  }
});

// 监听 `parentData` 的变化，如果有变化且已经加载完成，则执行方法
watch(
  () => props.url,
  (newVal) => {
    if (newVal) {
      loadImage();
    }
  },
);
</script>

<style scoped></style>
