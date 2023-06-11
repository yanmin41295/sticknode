<template>
  <div v-for="(site,index) in sites.list">
    <a-card :bordered="false" style="width:800px;margin: 10px">
      <template #title>
        <a-tag color="red">{{ site.title }}</a-tag>
        <a-tag color="orange">{{ site.link }}</a-tag>
      </template>
      <template #extra>
        <a-button @click="open(index)">前往</a-button>
        <a-button @click="close(index)">关闭</a-button>
      </template>
      <p style="white-space: pre-line">{{ site.issue }}</p>
      <template #actions>
        <setting-outlined @click="$emit('detail',index)"/>
        <edit-outlined @click="$emit('edit',index)"/>
        <a-popconfirm title="确定删除" ok-text="确定" cancel-text="取消" @confirm="$emit('deleteItem',index)">
          <delete-outlined/>
        </a-popconfirm>
      </template>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Site } from "~/entries/options/main";
import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { message } from "ant-design-vue";

defineEmits([ 'edit', 'deleteItem' ])

const props = defineProps<{
  sites: {
    list: Site[]
  },
}>()
const siteWindowMap = new Map();
const sites = reactive(props.sites)

function close(index: number) {
  let site = sites.list[index];
  let siteWindow = siteWindowMap.get(site.id);
  if (siteWindow) {
    siteWindow.close();
    siteWindowMap.delete(site.id);
  } else {
    message.warn("窗口未找到或已关闭")
  }
}

function open(index: number) {
  let site = sites.list[index];
  if (siteWindowMap.has(site.id)) {
    let siteWindow = siteWindowMap.get(site.id)
    if (siteWindow && siteWindow.closed) {
      siteWindowMap.set(site.id, window.open(site.link));
      message.warn("窗口已关闭，重新打开")
    } else {
      siteWindow.focus();
    }
  } else {
    siteWindowMap.set(site.id, window.open(site.link))
  }
}

</script>

<style>
h1 {
  margin: 5px;
}

button {
  margin-top: 10px;
}
</style>
