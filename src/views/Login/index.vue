<template>
	<div class="main">
		<div class="loginBox">
			<h2 class="title">login</h2>
			<div class="item">
				<input type="text" class="user-input" v-model="state.userName" required autocomplete="new-username"
					@keydown.enter="actions.handleClick" />
				<div for="username" class="user-text">userName</div>
			</div>
			<div class="item">
				<input type="password" class="user-input" v-model="state.passWord" required autocomplete="new-password"
					@keydown.enter="actions.handleClick" />
				<div for="password" class="user-text">password</div>
			</div>
			<button class="btn" ref="submitRef" @click.prevent="actions.handleClick">
				submit
				<span class="line1 line"></span>
				<span class="line2 line"></span>
				<span class="line3 line"></span>
				<span class="line4 line"></span>
			</button>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const router = useRouter();
const state = reactive({
	userName: "",
	passWord: "",
});

const user = {
	userName: "xiexi",
	passWord: "1511",
};

const actions = {
	handleClick() {
		// 检查是否为空
		if (!state.userName.trim() || !state.passWord.trim()) {
			message.error("Please fill in both username and password.");
			return;
		}
		// 校验用户名和密码
		if (state.userName === user.userName && state.passWord === user.passWord) {
			localStorage.setItem("token", "3208");
			message.success("Login successful!");
			nextTick(() => {
				router.push("/home");
			});
		} else {
			message.error("Invalid username or password.");
		}
	},
};
</script>
<style scoped lang="scss">
.main {
	width: 100%;
	height: 100vh;
	background: linear-gradient(#141e30, #243b55);
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	color: #03e9f4;

	.loginBox {
		width: 400px;
		height: 364px;
		background-color: #0c1622;
		margin: 100px auto;
		border-radius: 10px;
		box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.6);
		padding: 40px;
		box-sizing: border-box;

		.title {
			text-align: center;
			color: #20a3aa;
			margin-bottom: 30px;
			font-family: "Courier New", Courier, monospace;
		}

		.item {
			height: 45px;
			border-bottom: 1px solid #fff;
			margin-bottom: 40px;
			position: relative;

			.user-input {
				width: 100%;
				height: 100%;
				color: #fff;
				padding-top: 20px;
				box-sizing: border-box;
				background: transparent;
				border: 0;
				outline: none;
			}

			.user-text {
				position: absolute;
				left: 0;
				top: 12px;
				transition: all 0.5s linear;
			}

			// 同一级的input和label
			.user-input:focus+.user-text,
			.user-input:valid+.user-text {
				top: 0px;
				font-size: 8px;
			}
		}

		.btn {
			padding: 10px 20px;
			margin-top: 30px;
			color: #20a3aa;
			position: relative;
			overflow: hidden;
			text-transform: uppercase;
			letter-spacing: 2px;
			left: 35%;
			background: transparent;
			border: 0;
			outline: none;

			&:hover {
				border-radius: 5px;
				color: #fff;
				background: #20a3aa;
				box-shadow: 0 0 5px 0 #20a3aa, 0 0 25px 0 #20a3aa, 0 0 50px 0 #20a3aa, 0 0 100px 0 #20a3aa;
				transition: all 1s linear;
			}

			@keyframes line1-animation {

				50%,
				100% {
					left: 100%;
				}
			}

			@keyframes line2-animation {

				50%,
				100% {
					top: 100%;
				}
			}

			@keyframes line3-animation {

				50%,
				100% {
					left: -100%;
				}
			}

			@keyframes line4-animation {

				50%,
				100% {
					top: -100%;
				}
			}

			.line {
				position: absolute;
			}

			.line1 {
				width: 100%;
				height: 2px;
				background: -webkit-linear-gradient(left, transparent, #03e9f4);
				left: -100%;
				top: 0px;
				animation: line1-animation 1s linear infinite;
			}

			.line2 {
				width: 2px;
				height: 100%;
				background: -webkit-linear-gradient(top, transparent, #03e9f4);
				right: 0px;
				top: -100%;
				animation: line2-animation 1s 0.25s linear infinite;
			}

			.line3 {
				width: 100%;
				height: 2px;
				background: -webkit-linear-gradient(left, #03e9f4, transparent);
				left: 100%;
				bottom: 0px;
				animation: line3-animation 1s 0.75s linear infinite;
			}

			.line4 {
				width: 2px;
				height: 100%;
				background: -webkit-linear-gradient(top, transparent, #03e9f4);
				left: 0px;
				top: 100%;
				animation: line4-animation 1s 1s linear infinite;
			}
		}
	}
}
</style>
