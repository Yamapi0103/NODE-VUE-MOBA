<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="英雄名稱"></el-table-column>
      <el-table-column prop="title" label="英雄稱號"></el-table-column>
      <el-table-column prop="avatar" label="頭像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3em;"> 
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="open(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: []
      };
    },
    methods: {
      async fetch() {
        const res = await this.$http.get("rest/heroes");
        this.items = res.data;
      },
      async open(row) {
        this.$confirm(`是否要刪除分類 ${row.name}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          await this.$http.delete(`rest/heroes/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        });
      }
    },
    created() {
      this.fetch();
    }
  };
</script>