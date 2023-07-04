<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox, ElTable } from "element-plus";
import { getCommentList, deleteComment } from "@/api/comment";

defineOptions({
  name: "ArticleList"
});

const searchParams = reactive({ type: null, name: null });
const dataList = ref([]);
const dataTotal = ref(0);
const selects = ref([]);
const search = () => {
  getCommentList(searchParams).then(res => {
    if (res.success) {
      dataList.value = res.data.list;
      dataTotal.value = res.data.total;
    } else {
      ElMessage.error("列表获取失败");
    }
  });
};
search();

const handleSelectionChange = (rows: any) => {
  selects.value = rows;
};

const handleDelete = (rows: any) => {
  //根据row.id提示是否删除
  ElMessageBox.confirm("此操作将永久删除选中评论, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      const idList: number[] = [];
      rows.forEach(item => {
        idList.push(item.id);
      });
      deleteComment(idList).then(res => {
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
</script>

<template>
  <div>
    <div class="mb-2">
      <el-button type="default" @click="handleDelete(selects)">删除</el-button>
    </div>
    <el-table
      :data="dataList"
      :default-sort="{ prop: 'time', order: 'descending' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" label="ID" width="55" />
      <el-table-column label="id" prop="id" width="60" />
      <el-table-column label="用户名" prop="name" width="160" />
      <el-table-column label="邮箱" prop="email" width="240" />
      <el-table-column label="站点" prop="site" width="200" />
      <el-table-column label="内容" prop="content" width="700" />
      <el-table-column label="mainId" prop="mainId" />
      <el-table-column label="replyId" prop="replyId" />
      <el-table-column label="操作" width="80">
        <template #default="scope">
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
