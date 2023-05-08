<script setup lang="ts">
import { ref, reactive } from "vue";
import { useImageStoreHook } from "@/store/modules/image";
// import type { UploadProps, FormInstance, FormRules } from "element-plus";
import type { imageItemType } from "@/store/modules//types";
// import moment from "moment";
import { getImageList, deleteImage } from "@/api/image";
import { ElMessage, ElMessageBox, ElTable } from "element-plus";

defineOptions({
  name: "ImageList"
});

const store = useImageStoreHook();
const types = store.getImageTypes;
const searchParams = reactive({});
const search = () => {
  getImageList(searchParams).then(res => {
    if (res.success) {
      dataList.value = res.data;
    } else {
      ElMessage.error("列表获取失败");
    }
  });
};
search();

const handleEdit = (index: number, row: imageItemType) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: imageItemType) => {
  //根据row.id提示是否删除
  ElMessageBox.confirm("此操作将永久删除该图片, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      deleteImage(row.id).then(res => {
        if (res.success) {
          ElMessage.success("删除成功");
          dataList.value.splice(index, 1);
        } else {
          ElMessage.error("删除失败");
        }
      });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};

const typeFormatter = (row: imageItemType) => {
  const type = types.find(item => item.id === row.type);
  return type ? type.name : "";
};

const dataList = ref([
  {
    name: "测试图片",
    type: 3,
    src: "https://picsum.photos/200/300"
  }
]);
</script>

<template>
  <div>
    <el-table
      :data="dataList"
      :default-sort="{ prop: 'time', order: 'descending' }"
    >
      <el-table-column type="selection" label="ID" width="55" />
      <el-table-column label="id" prop="id" width="80" />
      <el-table-column label="标题" prop="name" width="200" />
      <el-table-column
        label="类型"
        prop="type"
        width="180"
        :formatter="typeFormatter"
      />
      <el-table-column label="URL" prop="src" />
      <el-table-column label="时间" prop="time" width="300" />
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
