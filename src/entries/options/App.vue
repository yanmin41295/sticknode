<template>
  <a-layout>
    <a-layout-header style="height: 50px;background: gray">
      <a-button @click="addSite">添加站点</a-button>
    </a-layout-header>
    <a-layout-content style="display: flex;align-items: flex-start;margin: 10px;flex-wrap: wrap;height: 100%">
      <PageContent :sites="sites" @edit="editSite" @deleteItem="remove"></PageContent>
    </a-layout-content>
  </a-layout>
  <a-modal v-model:visible="siteForm.show" title="更新、修改站点" style="width: 800px" @ok="comfirmAddSite">
    <a-form :model="siteForm">
      <a-form-item label="标题">
        <a-input v-model:value="siteForm.title">
        </a-input>
      </a-form-item>
      <a-form-item label="链接">
        <a-input v-model:value="siteForm.link">
        </a-input>
      </a-form-item>
      <a-form-item label="问题">
        <a-textarea v-model:value="siteForm.issue" style="height: 200px"></a-textarea>
      </a-form-item>
      <a-form-item label="详情">
        <a-textarea v-model:value="siteForm.detail" style="height:300px"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import PageContent from "~/components/PageContent.vue";
import { onBeforeMount, reactive, ref } from "vue";
import { Site } from "~/entries/options/main";
import { deleteById, initDb, insert, queryAll, Tables, update } from "~/entries/options/db";
import { message } from 'ant-design-vue';

const name = ref("")

const sites = reactive({
      list: [] as Site[]
    }
)
const siteForm = reactive({
  id: 0,
  title: "",
  link: "",
  detail: "",
  issue: "",
  show: false,
  editIndex: 0,
  edit: false,
})

function addSite() {
  siteForm.show = true;
  siteForm.edit = false;
}


async function remove(index: number) {
  await deleteById(Tables.sites, sites.list[index].id!)
  await findAll()
}

async function editSite(index: number) {
  let site = sites.list[index]
  siteForm.id = <number>site.id;
  siteForm.title = site.title;
  siteForm.link = site.link;
  siteForm.detail = site.detail;
  siteForm.issue = site.issue;

  siteForm.editIndex = index;
  siteForm.edit = true;
  siteForm.show = true;
}

async function comfirmAddSite() {
  let data = {
    title: siteForm.title,
    link: siteForm.link,
    detail: siteForm.detail,
    issue: siteForm.issue,
  }
  if (!siteForm.edit) {
    sites.list.forEach(v => {
      if (v.title == data.title || v.link == data.link) {
        message.error("标题或链接已存在")
        return
      }
    })
    await insert(Tables.sites, data)
  } else {
    await update(Tables.sites, { id: siteForm.id, ...data });
    siteForm.edit = false
  }
  await findAll();
  siteForm.show = false;
}

async function findAll() {
  sites.list = await queryAll(Tables.sites);
}

onBeforeMount(async () => {
  await initDb();
  await findAll()
})

</script>

<style>
</style>
