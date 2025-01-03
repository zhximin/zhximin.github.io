import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import Antd from "ant-design-vue";
import Vant from "vant";

// 国际化插件
import i18n from "./I18n/index.js";

// 清除标签默认样式
import "./styles/normalize.css";
import "./styles/reset.css";

// 导入字体图标
import "@/assets/index.css";

// 设置全局样式
import "./styles/global.scss";

const app = createApp(App);

app.use(Vant);
app.use(store);
app.use(router);
app.use(Antd);
app.use(i18n);

app.mount("#app");
