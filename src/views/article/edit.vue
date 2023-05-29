<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useArticleStoreHook } from "@/store/modules/article";
import { getArticleContent, updateArticle } from "@/api/article";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import { ElMessage, FormInstance, FormRules } from "element-plus";

defineOptions({
  name: "ArticleEdit"
});

const route = useRoute();
const router = useRouter();
const categories = useArticleStoreHook().getCategories;
const ruleFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  title: [
    { required: true, message: "请输入文章名", trigger: "blur" },
    {
      min: 1,
      max: 20,
      message: "文章名大于1个字符，小于20个字符",
      trigger: "blur"
    }
  ],
  type: [
    {
      required: true,
      message: "请选择文章类型",
      trigger: "change"
    }
  ],
  content: [
    {
      required: true,
      message: "文章内容不能为空",
      trigger: "change"
    }
  ]
});

const form = reactive({
  id: null,
  title: "",
  type: categories[0],
  content: ""
});

const onSubmit = async (formEl: FormInstance) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateArticle({
        id: form.id,
        title: form.title,
        type: form.type,
        content: form.content,
        time: moment().format("YYYY:MM:DD HH:mm:ss")
      }).then(function (res) {
        if (res.success) {
          ElMessage.success(res.data.message);
          router.push({ name: "ArticleList" });
        } else {
          ElMessage.error(res.errmsg);
        }
      });
    } else {
      console.log("error submit!!", fields);
    }
  });
};

onMounted(() => {
  if (route.query.id != undefined) {
    form.id = route.query.id;
    form.title = route.query.name as string;
    form.type = route.query.type as unknown as number;

    getArticleContent(route.query.id as unknown as number).then(function (res) {
      if (res.success) {
        form.id = res.data[0].id;
        form.title = res.data[0].title as string;
        form.type = res.data[0].type as unknown as number;
        form.content = res.data[0].content as string;
      } else {
        ElMessage.error(res.errmsg);
      }
    });
  }
});
</script>

<template>
  <el-form :model="form" label-width="80px" ref="ruleFormRef" :rules="rules">
    <el-form-item label="标题">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="form.type" placeholder="请选择">
        <el-option
          v-for="item in categories"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="内容">
      <v-md-editor v-model="form.content" height="800px" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">确定</el-button>
    </el-form-item></el-form
  >
</template>
