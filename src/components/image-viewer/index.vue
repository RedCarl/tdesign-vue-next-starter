<template>
  <div>
    <div class="tdesign-demo-image-viewer__base">
      <div
          v-if="!images"
          class="tdesign-demo-image-viewer__error tdesign-demo-image-viewer__ui-image tdesign-demo-image-viewer__base"
      >
        <div class="tdesign-demo-image-viewer__error--content">暂无图片</div>
      </div>
      <t-image-viewer v-else :images="[images]">
        <template #trigger="{ open }">
          <div class="tdesign-demo-image-viewer__ui-image">
            <img alt="test" :src="images" class="tdesign-demo-image-viewer__ui-image--img" />
            <div class="tdesign-demo-image-viewer__ui-image--hover" @click="open">
              <span>
                <browse-icon size="1.4em" />
                <br />
                预览
              </span>
            </div>
          </div>
        </template>
      </t-image-viewer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BrowseIcon } from 'tdesign-icons-vue-next';

defineProps({
  images: {
    type: String,
  },
});
</script>

<style scoped>
.tdesign-demo-image-viewer__ui-image {
  width: 100%;
  height: 100%;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: var(--td-radius-small);
  overflow: hidden;
}

.tdesign-demo-image-viewer__ui-image--hover {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--td-text-color-anti);
  line-height: 22px;
  transition: 0.2s;
}

.tdesign-demo-image-viewer__ui-image:hover .tdesign-demo-image-viewer__ui-image--hover {
  opacity: 1;
  cursor: pointer;
}

.tdesign-demo-image-viewer__ui-image--img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  position: absolute;
}

.tdesign-demo-image-viewer__ui-image--icons .tdesign-demo-icon {
  cursor: pointer;
}

.tdesign-demo-image-viewer__base {
  width: 100%;
  height: 100%;
}
</style>
