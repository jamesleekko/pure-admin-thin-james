<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useImageStoreHook } from "@/store/modules/image";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, FormInstance, FormRules } from "element-plus";
import { updateImg } from "@/api/image";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";

defineOptions({
  name: "ImageEdit"
});

const route = useRoute();
const router = useRouter();
const imageTypes = useImageStoreHook().getImageTypes;
const ruleFormRef = ref<FormInstance>();
const form = reactive({
  id: null,
  title: "",
  imageType: 3,
  imageUrl: ""
});
const uploader = ref<any>(null);

const handleUploadSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  console.log("upload success", uploadFile, response);
  form.imageUrl = response.data.fileList[0].fileurl;
};

const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];

const beforeUpload: UploadProps["beforeUpload"] = rawFile => {
  if (!allowedImageTypes.includes(rawFile.type)) {
    ElMessage.error("图片需为jpg, jpeg, png格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片不能大于2MB!");
    return false;
  }
  return true;
};

const rules = reactive<FormRules>({
  title: [
    { required: true, message: "请输入图片名", trigger: "blur" },
    {
      min: 1,
      max: 20,
      message: "图片名大于1个字符，小于20个字符",
      trigger: "blur"
    }
  ],
  imageType: [
    {
      required: true,
      message: "请选择图片类型",
      trigger: "change"
    }
  ],
  imageUrl: [
    {
      required: true,
      message: "请上传图片",
      trigger: "change"
    }
  ]
});

const onSubmit = async (formEl: FormInstance) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      updateImg({
        id: form.id,
        title: form.title,
        imageType: form.imageType,
        imageUrl: form.imageUrl,
        time: moment().format("YYYY:MM:DD HH:mm:ss")
      }).then(function (res) {
        if (res.success) {
          ElMessage.success(res.data.message);
          router.push({ name: "ImageList" });
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
    form.imageType = route.query.type as unknown as number;
    form.imageUrl = route.query.src as string;
  }
});
</script>

<template>
  <el-form :model="form" label-width="80px" ref="ruleFormRef" :rules="rules">
    <el-form-item label="名称" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="分类" prop="imageType">
      <el-select v-model="form.imageType" placeholder="请选择">
        <el-option
          v-for="item in imageTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="图片" prop="imageUrl">
      <el-upload
        class="img-upload"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUpload"
        :action="'/api/upload'"
        :data="{ file_type: 'resource' }"
        ref="uploader"
      >
        <img v-if="form.imageUrl" :src="form.imageUrl" />
        <el-icon v-else class="img-upload-icon"><Plus /></el-icon
      ></el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">确定</el-button>
    </el-form-item>
  </el-form>
</template>
