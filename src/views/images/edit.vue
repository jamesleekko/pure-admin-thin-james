<script setup lang="ts">
import { reactive } from "vue";
import { useImageStoreHook } from "@/store/modules/image";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";

defineOptions({
  name: "ArticleEdit"
});

const imageTypes = useImageStoreHook().getImageTypes;

const form = reactive({
  title: "",
  imageType: "",
  imageUrl: ""
});

const handleUploadSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  form.imageUrl = URL.createObjectURL(uploadFile.raw!);
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
</script>

<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="名称">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="form.imageType" placeholder="请选择">
        <el-option
          v-for="item in imageTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="图片">
      <el-upload
        class="w-8 h-4"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUpload"
        :auto-upload="false"
      >
        <img v-if="form.imageUrl" :src="form.imageUrl" class="w-8 h-4" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon
      ></el-upload>
    </el-form-item>
  </el-form>
</template>
