<template>
<div>
	<el-container>
    <el-header height="70px">
      <router-link to="/">行走书店管理系统</router-link>
      <div class="user-info">
        <el-popover
        placement="top"
        v-model="visible">
        <el-button size="mini" type="text" @click="signOut">退出登录</el-button>
        <div slot="reference">
          <img v-show="role.photoPath" :src="role.photoPath" alt="">
          <img v-show="!role.photoPath" src="../assets/1.jpg" alt="">
          <span>{{role.userName}}</span>
        </div>
        </el-popover>
        
      </div>
    </el-header>
    <el-container>
      <el-aside width="160px">
        <el-menu @select="handlerSelect">
          <el-menu-item v-for="(item,index) in menuList" :index="item.menuPath" :key="index">
            <span slot="title">{{item.menuName}}</span>
          </el-menu-item>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</div>
</template>
<script>
import req from '@/api/home.js'
export default {
  name: 'home',
  data () {
    return {
            menuList: [
              // {title: '用户管理', path: '/user-manage'},
              // {title: '菜单管理', path: '/menu-manage'},
              // {title: '商品管理', path: '/comm-manage'},
              // {title: '首页轮播图管理', path: '/home-pic-manage'},
              // {title: '商品分类管理', path: '/comm-classify-manage'},
              // {title: '客户管理', path: '/client-manage'},
              // {title: '订单管理', path: '/order-manage'},
              // {title: '热门位商品管理', path: '/hot-comm-manage'},
              // {title: '门店信息管理', path: '/shop-info-manage'},
              // {title: '司机信息管理', path: '/driver-info-manage'}
      ],
      visible:false
    }
  },
   created () {
        // req ('getTopOfColumn',{

        // }).then(data => {
        //   this.userInfo = data.data
        //   req('listMenuHome',{
        //     role:this.userInfo.role
        // }).then(data => {
        //   console.log(this.userInfo.role)
        //   this.menuList = data.data
        // })
        // })
      this.getMenu()
        
    },
    computed: {
      role () {
        return JSON.parse(sessionStorage.getItem('roleInfo'))
      }
    },
  methods: {

    // eslint-disable-next-line no-unused-vars
    handlerSelect (key, path) {
      if (key !== this.$route.path) {
         this.$router.replace({path: key})
      }
     
    },
    signOut () {
      // sessionStorage.clear('userInfo')
      // sessionStorage.clear('roleInfo')
      this.$router.push({path: 'login'})
    },
    getMenu () {
      req('listMenuHome',{role: JSON.parse(sessionStorage.getItem('roleInfo')).role}).then(data => {
        this.menuList = data.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(242,242,242);

  .router-link-active {
    font-size: 25px;
    color: rgb(86, 163, 254);
    text-decoration: none;
  }

  .user-info {
    height: 100%;
    display: flex;
    align-items: center;
    .el-popover__reference {
      display: flex;
    align-items: center;
    }
    span {
      color: rgb(86, 163, 254);
    }

    img {
      margin-right: 20px;
      border-radius: 50%;
      width: 60px;
      height: 60px;

    }
  }
}

.el-main {
  padding: 0;
}
</style>