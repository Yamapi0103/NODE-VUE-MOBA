<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex ai-center">
        <i class="iconfont icon-menu1"></i>
        <div class="fs-xl flex-1 px-2">新聞資訊</div>
        <i class="iconfont icon-menu"></i>
      </div>
      <div class="card-body">
        <div class="nav">
          <div class="nav-item active">
            <div class="nav-link">熱門</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">熱門</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    data() {
      return {
        swiperOption: {
          pagination: {
            el: ".pagination-home"
          }
        },
        newsCats: [],
        heroCats: []
      };
    }
  };
</script>


<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem; // 2px
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
