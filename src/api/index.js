import request from "@/service/request";
import Cookies from "js-cookie";

export function initOptions(data) {
	const parkCode = localStorage.getItem("park");
	return request({
		url: `/init/${parkCode}`,
		method: "get",
	});
}

export function getDeviceOptions(data) {
	return request({
		url: `/device/list `,
		method: "post",
		data,
	});
}
