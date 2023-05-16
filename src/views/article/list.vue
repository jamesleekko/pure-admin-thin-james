<script setup lang="ts">
import { ref, reactive } from "vue";
import { useArticleStoreHook } from "@/store/modules/article";
import type { articleType } from "@/store/modules/types";
import { useRouter } from "vue-router";
import { getArticleList, deleteArticle } from "@/api/article";
import { ElMessage, ElMessageBox, ElTable } from "element-plus";

defineOptions({
  name: "ArticleList"
});

const store = useArticleStoreHook();
const categories = store.getCategories;
const searchParams = reactive({});
const dataList = ref([]);
const search = () => {
  getArticleList(searchParams).then(res => {
    if (res.success) {
      dataList.value = res.data;
    } else {
      ElMessage.error("列表获取失败");
    }
  });
};
search();

const router = useRouter();
const handleEdit = (index: number, row: articleType) => {
  router.push({
    name: "ArticleEdit",
    query: {
      ...row
    }
  });
};

const handleDelete = (index: number, row: articleType) => {
  //根据row.id提示是否删除
  ElMessageBox.confirm("此操作将永久删除该文章, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      deleteArticle(row.id).then(res => {
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

const typeFormatter = (row: articleType) => {
  const type = categories.find(item => item.id === row.type);
  return type ? type.name : "";
};
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
        label="分类"
        prop="type"
        width="180"
        :formatter="typeFormatter"
      />
      <el-table-column label="时间" prop="time" />
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
