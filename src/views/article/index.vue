<script setup ts>
import { PureTable } from "@pureadmin/table";
import { ref } from "vue";

defineOptions({
  name: "Article"
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
    label: "值",
    prop: "value"
  }
]);

const dataList = ref([
  {
    title: "标题1",
    value: 333
  }
]);
</script>

<template>
  <div>
    <PureTable :columns="columns" :data="dataList" />
  </div>
</template>
