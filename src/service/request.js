import axios from "axios";
import { message, Modal } from "ant-design-vue";
import Cookies from "js-cookie";

// const baseURL = window.config.isMock ? '/api' : 'https://10.198.20.51:1880/pandora'; // 数据底座

// create an axios instance
const service = axios.create({
	baseURL: window.config.serverIp, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: window.config.requestTimeout, // request timeout
});

// request interceptor
service.interceptors.request.use(
	(config) => {
		// config.headers.Park = localStorage.getItem('park')
		// do something before request is sent
		// if (Cookies.get("token")) {
		// 	config.headers["Token"] = Cookies.get("token");
		// }
		return config;
	},
	(error) => {
		// do something with request error
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

// response interceptor
service.interceptors.response.use(
	(response) => {
		const res = response.data;
		if (res.code && res.code !== "0") {
			if (res.code === "1002" || res.code === "1001") {
				Modal.error({
					title: "Error",
					content: `Login expired or no permission.`,
					okText: "OK",
					centered: true,
					closable: false,
					onOk: () => {
						Cookies.remove("token");
						location.reload();
					},
				});
			} else {
				message.error(res.msg);
				return Promise.reject(new Error(res.msg || "Error"));
			}
			// Message({
			//   message: res.message || "Error",
			//   type: "error",
			//   duration: 5 * 1000,
			// });
		} else {
			return res.data || res;
		}
	},
	(error) => {
		console.log("err" + error); // for debug
		// Message({
		//   message: error.message,
		//   type: 'error',
		//   duration: 5 * 1000
		// });
		message.error(error);
		return Promise.reject(error);
	}
);

export default service;
