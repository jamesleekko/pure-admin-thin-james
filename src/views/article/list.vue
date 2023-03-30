<script setup ts>
import { PureTable } from "@pureadmin/table";
import { ref } from "vue";

defineOptions({
  name: "ArticleList"
});

const columns = ref([
  {
    type: "selection",
    width: 55,
    align: "left"
  },
  {
    label: "标题",
    prop: "title",
    width: 200
  },
  {
    label: "分类",
    prop: "category"
  }
]);

const dataList = ref([
  {
    title: "测试文章",
    category: 1
  }
]);
</script>

<template>
  <div>
    <PureTable :columns="columns" :data="dataList" />
  </div>
</template>
