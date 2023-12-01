<template>
	<div class="setting_main">
		<div id="sitenews-wrap" class="container"></div>
		<div class="setting_inner pagewrapper cl" id="author-page">
			<div class="yscd avatar">
				<i class="fa fa-angle-double-right"></i>
			</div>
			<div class="yinxsh"></div>
			<aside class="user-left">
				<div class="moblie-usermenu-div-us div-click-close" style="right: 0px">
					<div class="user-menu-kzdiv">
						<img src="./img/head portrait.jpg" class="avatar" width="100" height="100" />
						<span class="user_name">斜曦</span>
						<span class="user_vip_data">VIP用户</span>
						<span class="user_desc_uption_user">
							<p>点击这里修改签名...</p>
							<input
								class="add-user-desction"
								type="text"
								name="user-desction"
								placeholder="签名信息"
								autocomplete="off"
								value="" />
						</span>
					</div>
					<div class="user-menu-li">
						<ul class="userdata-ul cl">
							<li class="active">
								<a href="#"><i class="iconfont icon-zhuye"></i>主页</a>
							</li>
							<li>
								<a href="#"><i class="iconfont icon-xihuan"></i>我的喜欢</a>
							</li>
							<li>
								<a href="#"><i class="iconfont icon-lishi"></i>浏览历史</a>
							</li>
							<li>
								<a href="#"><i class="iconfont icon-tixing"></i>我的提醒</a>
							</li>
							<li>
								<a href="#"><i class="iconfont icon-pengyouquan"></i>朋友圈</a>
							</li>
							<li>
								<a href="#"><i class="iconfont icon-huiyuan"></i>积分·会员</a>
							</li>
							<li>
								<a href="#"><i class="iconfont icon-dingdan"></i>我的订单</a>
							</li>
							<li>
								<a href="#"><i class="iconfont icon-shezhi"></i>设置</a>
							</li>
							<li>
								<a href="#"><i class="iconfont icon-tuichu"></i>退出登录</a>
							</li>
						</ul>
					</div>
				</div>
			</aside>
			<div class="user-right">
				<div class="user_contentr">
					<!-- Content -->
					<div class="setting_header">
						<a class="sh_1">个人中心~</a>
					</div>
					<div class="settin">
						<div class="kz-user-div-box">
							<div class="user_data_html">
								<div class="ud_left u_touxian">
									<img src="./img/head portrait.jpg" class="avatar" width="100" height="100" />
								</div>
								<div class="ud_left u_text">
									<p><span class="user_name">斜曦</span><span class="user_vip_data">VIP用户</span></p>
									<p>WeChat:15112523208</p>
								</div>
							</div>
							<ul class="ud_number cl">
								<li class="calendar"><i class="iconfont icon-hanbao"></i>日历</li>
								<li class="clock"><i class="iconfont icon-kele"></i>时钟</li>
								<li class="ImageCollection"><i class="iconfont icon-shutiao"></i>照片墙</li>
								<li><i class="iconfont icon-nuomici"></i>投稿总评论数<em>0</em>条</li>
							</ul>
						</div>

						<div class="kz-user-div-boxs cl">
							<div class="ud_left">
								<div class="user_post_box">
									<h3>随机文案</h3>
									<ul class="user_new_post">
										<!-- JS动态生成 -->
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, reactive, ref, watch, nextTick, inject, onMounted } from "vue";
const state = reactive({});
const actions = {};
const props = defineProps({
	videoId: String,
	videoUrl: String,
});
const emit = defineEmits(["eventChange"]);
onMounted(() => {});
watch(
	() => {},
	() => {}
);

function getDom(str) {
	return document.querySelector(str);
}
function local(dm, event, url) {
	dm.addEventListener(event, () => {
		location.href = url;
	});
}

document.addEventListener("DOMContentLoaded", () => {
	let cnarr = str.split("//");
	let enarr = eng.split("//");

	const userpost = getDom(".user_new_post");

	var list = [];
	for (let i = 0; i < 5; i++) {
		let li = document.createElement("li");
		let acn = document.createElement("a");
		acn.href = "javascript:;";
		let suiji = Math.round(Math.random() * (cnarr.length - 1) + 0);
		do {
			suiji = Math.round(Math.random() * (cnarr.length - 1) + 0);
			acn.textContent = cnarr[suiji];
		} while (list.includes(suiji));
		list.push(suiji);
		li.append(acn);
		acn.addEventListener("mouseenter", () => {
			acn.textContent = enarr[suiji];
		});
		acn.addEventListener("mouseleave", () => {
			acn.textContent = cnarr[suiji];
		});
		userpost.appendChild(li);
	}
	const calendar = getDom(".calendar");
	local(calendar, "click", "../calendar/calendar.html");
	const clock = getDom(".clock");
	local(clock, "click", "../clock/clock.html");
	const ImageCollection = getDom(".ImageCollection");
	local(ImageCollection, "click", "../ImageCollection.html");
});
</script>

<style scoped lang="scss"></style>
