<template>
  <div class="layout" ref="layoutRef">
    <div class="center">
      <div class="user-info">
        <img src="/images/avatar.jpg" class="avatar" width="100" height="100" />
        <div class="user_name">斜曦</div>
        <div class="user_vip">VIP用户</div>
        <div class="user_desc">
          <p v-if="!isEditing" class="signature">
            {{ state.describe || "点击这里修改签名..." }}
            <EditOutlined @click="actions.editSignature" />
          </p>
          <a-input ref="iptRef" v-else v-model:value="state.describe" placeholder="请输入签名" @blur="actions.saveSignature"
            @keydown.enter="actions.saveSignature" show-count :maxlength="8" class="signature-input" />
        </div>
      </div>
      <a-menu v-model:selectedKeys="state.selectedKeys" class="menu" mode="inline" @click="handleClick" v-show="showMenu">
        <a-menu-item v-for="item in menuList" :key="item.path" :disabled="item.disabled">
          <span>
            <i :class="`iconfont ${item.icon}`"></i>{{ item.label }}
          </span>
        </a-menu-item>
      </a-menu>
    </div>
    <router-view name="center" class="center-child" :style="showMenu ? '' : 'max-width: 100%'"></router-view>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { EditOutlined } from '@ant-design/icons-vue';
const state = reactive({
  selectedKeys: ['/home'],
  describe: localStorage.getItem('userSignature') || "", // 签名内容
});

const router = useRouter();
const route = useRoute();
const layoutRef = ref();
const iptRef = ref();
const showMenu = computed(() => true);
const isEditing = ref(false);

const menuList = computed(() => [
  { path: '/home', label: '主页', icon: 'icon-zhuye', disabled: false },
  { path: '/favorites', label: '我的喜欢', icon: 'icon-xihuan', disabled: false },
  { path: '/history', label: '浏览历史', icon: 'icon-lishi', disabled: false },
  { path: '/notifications', label: '我的提醒', icon: 'icon-tixing', disabled: false },
  { path: '/circle', label: '朋友圈', icon: 'icon-pengyouquan', disabled: false },
  { path: '/membership', label: '积分·会员', icon: 'icon-huiyuan', disabled: false },
  { path: '/orders', label: '我的订单', icon: 'icon-dingdan', disabled: false },
  { path: '/settings', label: '设置', icon: 'icon-shezhi', disabled: false },
  { path: '/Login', label: '退出登录', icon: 'icon-tuichu', disabled: false },
]);

const handleClick = (item) => {
  router.push(item.key);
};

const actions = {
  editSignature: () => {
    isEditing.value = true;
    nextTick(() => {
      iptRef.value.focus();
    });
  },
  saveSignature: () => {
    isEditing.value = false;
    localStorage.setItem('userSignature', state.describe);
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
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.layout {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1, #84fab0, #8fd3f4);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;

  .center {
    display: flex;
    overflow: auto;
    flex-direction: column;
    width: 208px;
    background-color: transparent;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .user-info {
      width: 100%;
      flex: .5;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      // border-bottom: 1px solid #c5c5c5;
      background-color: transparent;

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
        color: #FFC107;
        margin-bottom: 5px;
      }

      .user_desc {
        margin-top: 10px;

        .signature {
          height: 30px;
          display: inline-block;
          line-height: 30px;
          color: #666;
          cursor: pointer;
        }

        .signature-input {
          width: 100%;
          height: 30px;
          background-color: rgba(0, 0, 0, 0.1);
          border: none;
        }
      }
    }

    .menu {
      width: 100%;
      flex: 1;
      // box-shadow: 2px 0px 8px rgba(0, 0, 0, 0.1);
      background-color: transparent;

      .iconfont {
        margin-right: 5px;
      }

      ::v-deep(.ant-menu-item-selected) {
        color: #f66;
        background-color: transparent;
      }

      ::v-deep(.ant-menu-item-active) {
        color: #f66;
      }
    }



    &-child {
      padding: 15px;
      flex: 1;
      max-width: calc(100% - 210px);

      background-color: transparent;
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