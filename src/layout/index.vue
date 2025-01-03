<template>
  <div class="layout" ref="layoutRef">
    <div class="center">
      <div class="user-info">
        <img :src="`${basePath}/images/avatar.jpg`" class="avatar" width="100" height="100" />
        <div class="user_name">斜曦</div>
        <div class="user_vip">VIP用户</div>
        <div class="user_desc">
          <p v-if="!isEditing" @click="actions.editSignature">
            {{ state.describe || "点击这里修改签名..." }}
          </p>
          <a-input ref="iptRef" v-else v-model:value="state.describe" placeholder="请输入签名" @blur="actions.saveSignature"
            @keydown.enter="saveSignature" />
        </div>
      </div>
      <a-menu v-model:selectedKeys="state.selectedKeys" class="menu" mode="inline" @click="handleClick" v-show="showMenu">
        <a-menu-item v-for="item in menuList" :key="item.path" :disabled="item.disabled">
          <span> <i :class="`iconfont ${item.icon}`"></i>{{ item.label }}</span>
        </a-menu-item>
      </a-menu>
    </div>
    <router-view name="center" class="center-child" :style="showMenu ? '' : 'max-width: 100%'"></router-view>
  </div>
</template>


<script setup>
import { computed, reactive, ref, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const state = reactive({
  selectedKeys: ['/home'],
  describe: "", // 签名内容
});
const basePath = window.config.basePath;

const router = useRouter();
const route = useRoute();
const layoutRef = ref();
const iptRef = ref();
const showMenu = computed(() => {
  // return route.path !== '/account' && route.path !== '/role' && route.path !== '/home';
  return true
});
const isEditing = ref(false); // 是否处于编辑状态
const selectedIndex = ref(null); // 当前选中的菜单索引

const menuList = computed(() => {
  const originList = [
    {
      path: '/home',
      label: '主页',
      code: 'Home',
      icon: 'icon-zhuye',
      disabled: false
    },
    {
      path: '/favorites',
      label: '我的喜欢',
      code: 'Favorites',
      icon: 'icon-xihuan',
      disabled: false
    },
    {
      path: '/history',
      label: '浏览历史',
      code: 'History',
      icon: 'icon-lishi',
      disabled: false
    },
    {
      path: '/notifications',
      label: '我的提醒',
      code: 'Notifications',
      icon: 'icon-tixing',
      disabled: false
    },
    {
      path: '/circle',
      label: '朋友圈',
      code: 'Circle',
      icon: 'icon-pengyouquan',
      disabled: false
    },
    {
      path: '/membership',
      label: '积分·会员',
      code: 'Membership',
      icon: 'icon-huiyuan',
      disabled: false
    },
    {
      path: '/orders',
      label: '我的订单',
      code: 'Orders',
      icon: 'icon-dingdan',
      disabled: false
    },
    {
      path: '/settings',
      label: '设置',
      code: 'Settings',
      icon: 'icon-shezhi',
      disabled: false
    },
    {
      path: '/logout',
      label: '退出登录',
      code: 'Logout',
      icon: 'icon-tuichu',
      disabled: false
    }
  ]
  return originList
});

const handleClick = (item) => {
  router.push(item.key);
};

const actions = {
  // 切换到编辑状态
  editSignature: () => {
    isEditing.value = true;
    // 使用 nextTick 等待 DOM 更新完成
    nextTick(() => {
      iptRef.value.focus();
    });
  },
  // 保存签名并退出编辑状态
  saveSignature: () => {
    isEditing.value = false;
  },
};
watch(
  () => route.path,
  (val) => {
    if (state.selectedKeys[0] !== val) {
      state.selectedKeys = [val];
    }
  }
);

onMounted(() => {
  const { path } = route;
  state.selectedKeys = [path];
});
</script>


<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;

  .center {
    display: flex;
    overflow: auto;
    flex-direction: column;
    width: 208px;

    .user-info {
      width: 100%;
      flex: .5;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-bottom: 1px solid #c5c5c5;
      background-color: #fff;

      .avatar {
        width: 120px;
        height: 120px;
        border: solid 1px #e6e6e6;
        border-radius: 50%;
        padding: 8px;
      }

      .user_name {
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        margin-top: 10px;
      }

      .user_vip {
        color: #8e8e8e;
        margin-bottom: 5px;
      }

      .user_desc {
        margin-top: 10px;

        p {
          cursor: pointer;
          color: #666;
        }

        input {
          width: 100%;
        }
      }
    }

    .menu {
      width: 100%;
      flex: 1;
      box-shadow: 2px 0px 8px rgba(0, 0, 0, 0.1);

      .iconfont {
        margin-right: 5px;
      }

      ::v-deep(.ant-menu-item-selected) {
        color: #f66;
        background-color: #ccc;
      }

      ::v-deep(.ant-menu-item-active) {
        color: #f66;
      }
    }

    &-child {
      padding: 24px;
      flex: 1;
      max-width: calc(100% - 210px);
    }
  }

  :-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }
}
</style>

<style>
.ant-modal-header {
  border-radius: 12px 12px 0 0 !important;
}

.ant-modal-content {
  border-radius: 12px !important;
}
</style>