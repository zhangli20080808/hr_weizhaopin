<template>
  <div>
    <header class="hidden-xs hidden-sm ">
      <nav class="navbar navbar-sample" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" :href="seller.s_log_back" target="_blank">
              <img :src="seller.logoUrl" alt="">
            </a>
          </div>

          <div v-if="hiddens" class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">首页</a></li>
              <li><a href="#1F">{{homeData.customName1}}</a></li>
              <li><a href="#2F">{{homeData.customName2}}</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right nav_search  hidden-sm">
              <li>
                <div class="search" v-show="seller.isSearch">
                  <input type="text" placeholder="职位关键词" class="search_content" v-model="search"
                         @keyup.enter="goSearch">
                  <span class="submit" @click="goSearch"><i></i></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        search: '',
        hiddens: true
      }
    },
    props: {
      seller: {
        type: Object
      },
      companyId: {
        type: String
      },
      homeData: {
        type: Object
      }
    },
    created(){
      if (this.$route.name !== 'home') {
        this.hiddens = false
      }
    },
    watch: {
      $route(to, from) {
        if (to.path == '/list' ||
          to.path == '/list/' + this.$route.params.id) {
          this.hiddens = false
        } else if (to.path == '/') {
          this.hiddens = true
        }
      }
    },
    methods: {
      goSearch() {
        this.$emit('search', this.search)
      },
      toIndex(){
        this.$emit('toIndex', Number(this.companyId))
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  header {
    height 80px
    line-height 80px
    .navbar-sample {
      background-color: #fff
      border-color: #f5f5f5
      margin-bottom: 0
      top: 0
      width: 100%
      z-index: 1000
      .navbar-header {
        height 84px
        .navbar-brand {
          img {
            display: block;
            width: 164px;
            height: 46px;
          }
        }
      }
      .navbar-brand {
        height: 80px
      }
      .navbar-nav {
        margin-left: 74px
        li {
          margin-right: 10px
          a {
            color: #1F2D3D
            line-height: 50px
            font-size: 16px
            &:hover {
              background #fff
              border-bottom: 1px solid #5AA2E7
            }
          }
        }
      }
      .nav_search {
        .search {
          .search_content {
            width 230px
            height 40px
            border: 1px solid #C0CCDA
            position: relative
            outline: none
            color: #99A9BF
            font-size: 12px
            padding: 14px 0 13px 16px
            &::placeholder {
              color: #99A9BF
            }
          }
          .submit {
            position: absolute
            display inline-block
            right: 0
            top: 21px
            width 40px
            height 40px
            background: url(../../common/image/search.png) no-repeat center
            background-size :cover
          }
        }
      }
    }
  }
</style>
