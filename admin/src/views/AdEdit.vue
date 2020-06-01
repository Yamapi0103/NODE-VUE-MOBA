<template>
  <div class="about">
    <h1>{{id? '編輯':'新建'}}廣告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名稱">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="廣告">
        <el-button size="small" @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加廣告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳轉鏈結(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="圖片" style="margin-top: 0.5rem;">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res=>$set(item,'image',res.url)"
                accept="image/*"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(i,1)">刪除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        model: {
          items: []
        }
      };
    },
    methods: {
      async save() {
        if (this.id) {
          await this.$http.put(`rest/ads/${this.id}`, this.model);
        } else {
          await this.$http.post("rest/ads", this.model);
        }
        this.$router.push("/ads/list");
        this.$message({
          type: "success",
          message: "保存成功"
        });
      },
      async fetch() {
        const res = await this.$http.get(`rest/ads/${this.id}`);
        this.model = Object.assign({}, this.model, res.data);
      }
    },
    created() {
      this.id && this.fetch();
    }
  };
</script>
<style>
.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}
</style>
