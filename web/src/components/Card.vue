<template>
  <div>
    <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex ai-center pb-3">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-1 px-2">{{title}}</div>
        <i class="iconfont icon-menu"></i>
      </div>
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    props: {
      title: { type: String, required: true },
      icon: { type: String, required: true }
    }
  };
</script>

<style lang="scss">
@import '../assets/scss/variables';
.card {
    border-bottom:1px solid $border-color;
  .card-header {
    border-bottom:1px solid $border-color;
  }
}
</style>