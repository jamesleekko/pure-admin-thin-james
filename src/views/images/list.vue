<script setup lang="ts">
import { ref, reactive } from "vue";
import { useImageStoreHook } from "@/store/modules/image";
// import type { UploadProps, FormInstance, FormRules } from "element-plus";
import type { imageItemType } from "@/store/modules/types";
// import moment from "moment";
import { getImageList, deleteImage } from "@/api/image";
import { ElMessage, ElMessageBox, ElTable } from "element-plus";
import { useRouter } from "vue-router";

defineOptions({
  name: "ImageList"
});

const store = useImageStoreHook();
const types = store.getImageTypes;
const typeOptions = [
  { label: "全部类型", value: null },
  ...types.map(item => ({ label: item.name, value: item.id }))
];
const searchParams = reactive({ type: null, name: null });
const dataList = ref([]);
const selects = ref([]);
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

const router = useRouter();
const handleEdit = (index: number, row: imageItemType) => {
  router.push({
    name: "ImageEdit",
    query: {
      ...row
    }
  });
};

const handleSelectionChange = (rows: any) => {
  selects.value = rows;
};

const handleDelete = (rows: any) => {
  //根据row.id提示是否删除
  ElMessageBox.confirm("此操作将永久删除选中图片, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      const idList: number[] = [];
      rows.forEach(item => {
        idList.push(item.id);
      });
      deleteImage(idList).then(res => {
        if (res.success) {
          ElMessage.success("删除成功");
          search();
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
</script>

<template>
  <div>
    <div class="mb-2">
      <el-button type="default" @click="handleDelete(selects)">删除</el-button>
      <el-select
        class="ml-2"
        v-model="searchParams.type"
        placeholder="请选择类型"
        style="width: 200px"
        @change="search"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-table
      :data="dataList"
      :default-sort="{ prop: 'time', order: 'descending' }"
      @selection-change="handleSelectionChange"
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
            @click="handleDelete([scope.row])"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
