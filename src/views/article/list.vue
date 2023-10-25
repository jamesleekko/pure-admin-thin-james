<script setup lang="ts">
import { ref, reactive } from "vue";
import { useArticleStoreHook } from "@/store/modules/article";
import type { articleType } from "@/store/modules/types";
import { useRouter } from "vue-router";
import { getArticleList, deleteArticle } from "@/api/article";
import { ElMessage, ElMessageBox, ElTable, ElTag } from "element-plus";
import moment from "moment";

defineOptions({
  name: "ArticleList"
});

const store = useArticleStoreHook();
const categories = store.getCategories;
const typeOptions = [
  { label: "全部类型", value: null },
  ...categories.map(item => ({ label: item.name, value: item.id }))
];
const searchParams = reactive({ type: null, name: null });
const dataList = ref([]);
const dataTotal = ref(0);
const selects = ref([]);
const search = () => {
  getArticleList(searchParams).then(res => {
    if (res.success) {
      dataList.value = res.data.list;
      dataTotal.value = res.data.total;
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

const handleSelectionChange = (rows: any) => {
  selects.value = rows;
};

const handleDelete = (rows: any) => {
  //根据row.id提示是否删除
  ElMessageBox.confirm("此操作将永久删除选中文章, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      const idList: number[] = [];
      rows.forEach(item => {
        idList.push(item.id);
      });
      deleteArticle(idList).then(res => {
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

const typeFormatter = (row: articleType) => {
  const type = categories.find(item => item.id === row.type);
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
      <el-table-column label="标题" prop="title" width="200" />
      <el-table-column
        label="分类"
        prop="type"
        width="180"
        :formatter="typeFormatter"
      />
      <el-table-column label="tags" prop="tags">
        <template #default="scope">
          <el-tag
            v-for="tag in typeof scope.row.tags === 'string'
              ? scope.row.tags.length > 0
                ? scope.row.tags.split(',')
                : []
              : []"
            :key="tag"
            class="mr-2"
          >
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="修改时间">
        <template #default="scope">
          {{ moment(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
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
