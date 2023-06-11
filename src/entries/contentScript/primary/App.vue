<template>
  <div class="logo">
    <img :src="logoImageUrl" height="50" alt="" @click="showDrawer"/>
    <a-button @click="showDrawer"></a-button>
    <a-drawer id="drawer" :width="500" title="Basic Drawer" :placement="placement" :open="open" @close="onClose"
    >
      <template #extra>
        <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="onClose">Submit</a-button>
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import logo from "~/assets/logo.svg";
import { ref } from 'vue';
import type { DrawerProps } from 'ant-design-vue';
import { Button, Drawer } from "ant-design-vue"

const logoImageUrl = new URL(logo, import.meta.url).href;
const count = ref(0)
const placement = ref<DrawerProps['placement']>('left');
const open = ref<boolean>(true);

const showDrawer = () => {
  // window.open("https://www.baidu.com")
  console.log("open")
  open.value = true;
};

const onClose = () => {
  open.value = false;
};

function add() {
  console.log(count.value)
  count.value++;
}
</script>

<style scoped>
.logo {
  z-index: 99999;
  position: fixed;
  bottom: 20px;
  right: 10px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #c72a21;
  border-radius: 50%;
  background-color: #fff;
}

img {
  position: absolute;
  top: 7px;
}
</style>
