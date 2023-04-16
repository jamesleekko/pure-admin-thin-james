<script setup ts>
import { reactive } from "vue";
import { useArticleStoreHook } from "@/store/modules/article";

defineOptions({
  name: "ArticleEdit"
});

const categories = useArticleStoreHook().getCategories;

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
      <el-select v-model="form.category" placeholder="请选择">
        <el-option
          v-for="item in categories"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select> </el-form-item
  ></el-form>
</template>
