<script setup lang="ts">
import { reactive, onMounted, ref, nextTick } from "vue";
import { useArticleStoreHook } from "@/store/modules/article";
import { getArticleContent, updateArticle } from "@/api/article";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import { ElMessage, FormInstance, FormRules, ElInput } from "element-plus";

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
  type: null,
  tags: [],
  content: ""
});

const tagInputVisible = ref(false);
const inputValue = ref("");
const TagInputRef = ref<InstanceType<typeof ElInput>>();

const handleCloseTag = (tag: string) => {
  form.tags.splice(form.tags.indexOf(tag), 1);
};

const showTagInput = () => {
  tagInputVisible.value = true;
  nextTick(() => {
    TagInputRef.value!.input!.focus();
  });
};

const handleTagConfirm = () => {
  if (inputValue.value) {
    form.tags.push(inputValue.value);
  }
  tagInputVisible.value = false;
  inputValue.value = "";
};

const onSubmit = async (formEl: FormInstance) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateArticle({
        id: form.id,
        title: form.title,
        type: form.type,
        tags: form.tags.toString(),
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
  form.type = categories[0].id;

  if (route.query.id != undefined) {
    getArticleContent(route.query.id as unknown as number).then(function (res) {
      if (res.success) {
        form.id = res.data[0].id;
        form.title = res.data[0].title as string;
        form.type = res.data[0].type as unknown as number;
        if (res.data[0].tags > 0) {
          form.tags = res.data[0].tags.split(",") as string[];
        }
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
    <el-form-item label="标签">
      <el-tag
        v-for="item in form.tags"
        :key="item"
        closable
        class="mr-1"
        @close="handleCloseTag(item)"
      >
        {{ item }}
      </el-tag>
      <el-input
        v-if="tagInputVisible"
        ref="TagInputRef"
        style="width: 90px"
        v-model="inputValue"
        size="small"
        @keyup.enter="handleTagConfirm"
        @blur="handleTagConfirm"
      />
      <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click="showTagInput"
      >
        + New Tag
      </el-button>
    </el-form-item>
    <el-form-item label="内容">
      <v-md-editor v-model="form.content" height="800px" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">确定</el-button>
    </el-form-item></el-form
  >
</template>
