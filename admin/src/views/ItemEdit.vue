<template>
  <div class="about">
    <h1>{{id? '編輯':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名稱">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="圖標">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
          accept="image/*"
          :headers="getAuthHeaders()"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {}
      };
    },
    methods: {
      afterUpload(res) {
        this.$set(this.model, "icon", res.url);
      },
      async save() {
        if (this.id) {
          await this.$http.put(`rest/items/${this.id}`, this.model);
        } else {
          await this.$http.post("rest/items", this.model);
        }
        this.$router.push("/items/list");
        this.$message({
          type: "success",
          message: "保存成功"
        });
      },
      async fetch() {
        const res = await this.$http.get(`rest/items/${this.id}`);
        this.model = res.data;
      }
    },
    created() {
      console.log(this.$http.defaults.baseURL);
      this.id && this.fetch();
    }
  };
</script>
