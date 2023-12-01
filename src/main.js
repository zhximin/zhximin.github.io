import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import Antd from "ant-design-vue";
import Vant from "vant";

// 解决dayjs报错问题
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import "@/styles/normalize.css";
import "@/assets/index.css";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);

const app = createApp(App);

app.use(Vant);
app.use(store);
app.use(router);
app.use(Antd);

app.mount("#app");
