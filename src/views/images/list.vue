<script setup ts>
import { PureTable } from "@pureadmin/table";
import { ref } from "vue";
import { useImageStoreHook } from "./modules/image";

defineOptions({
  name: "ImageList"
});

const store = useImageStoreHook();
const types = store.getImageTypes;

const columns = ref([
  {
    type: "selection",
    width: 55,
    align: "left"
  },
  {
    label: "标题",
    prop: "name",
    width: 200
  },
  {
    label: "分类",
    prop: "type",
    formatter: typeFormatter
  },
  {
    label: "url",
    prop: "src"
  },
  { label: "时间", prop: "time" },
  { label: "操作", prop: "action" }
]);

const dataList = ref([
  {
    title: "测试图片",
    category: 1
  }
]);

const typeFormatter = (row: any) => {
  const type = types.find(item => item.id === row.type);
  return type ? type.name : "";
};
</script>

<template>
  <div>
    <PureTable
      :columns="columns"
      :data="dataList"
      :default-sort="{ prop: 'time', order: 'descending' }"
    />
  </div>
</template>
