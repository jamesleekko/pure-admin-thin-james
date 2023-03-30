<script setup ts>
import { ref, reactive } from "vue";

defineOptions({
  name: "ArticleEdit"
});

const categories = ref([
  {
    id: 1,
    name: "分类1"
  },
  {
    id: 2,
    name: "分类2"
  }
]);

const form = reactive({
  title: "",
  category: "",
  content: ""
});
</script>

<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option
          v-for="item in categories"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select> </el-form-item
  ></el-form>
</template>
