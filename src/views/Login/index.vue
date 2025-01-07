<template>
	<div class="main">
		<div class="loginBox">
			<h2 class="title">Login</h2>
			<div class="item">
				<input type="text" class="user-input" v-model="state.userName" required placeholder="Username" />
			</div>
			<div class="item">
				<input type="password" class="user-input" v-model="state.passWord" required placeholder="Password" />
			</div>
			<button class="btn" @click.prevent="handleLogin">
				Submit
				<span class="line1 line"></span>
				<span class="line2 line"></span>
				<span class="line3 line"></span>
				<span class="line4 line"></span>
			</button>
		</div>
	</div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const router = useRouter();

// 表单状态
const state = reactive({
	userName: "",
	passWord: "",
});

// 用户信息模拟
const user = {
	userName: "xiexi",
	passWord: "1511",
};

// 登录处理
const handleLogin = () => {
	if (state.userName === user.userName && state.passWord === user.passWord) {
		// 存储 token
		localStorage.setItem("token", "123");
		message.success("Login successful!");
		router.push("/home");
	} else {
		message.error("Invalid username or password.");
	}
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
			margin-bottom: 40px;
			position: relative;

			.user-input {
				width: 100%;
				height: 100%;
				color: #fff;
				padding: 10px;
				background: transparent;
				border: 1px solid #fff;
				border-radius: 5px;
				outline: none;

				&::placeholder {
					color: #aaa;
				}
			}
		}

		.btn {
			padding: 10px 20px;
			color: #20a3aa;
			text-transform: uppercase;
			letter-spacing: 2px;
			position: relative;
			background: transparent;
			border: 0;
			outline: none;
			cursor: pointer;

			&:hover {
				color: #fff;
				background: #20a3aa;
				border-radius: 5px;
				box-shadow: 0 0 5px 0 #20a3aa, 0 0 25px 0 #20a3aa, 0 0 50px 0 #20a3aa, 0 0 100px 0 #20a3aa;
				transition: all 1s linear;
			}

			.line {
				position: absolute;
			}

			.line1 {
				width: 100%;
				height: 2px;
				background: linear-gradient(to right, transparent, #03e9f4);
				top: 0;
				left: -100%;
				animation: line1-animation 1s linear infinite;
			}

			.line2 {
				width: 2px;
				height: 100%;
				background: linear-gradient(to bottom, transparent, #03e9f4);
				top: -100%;
				right: 0;
				animation: line2-animation 1s 0.25s linear infinite;
			}

			.line3 {
				width: 100%;
				height: 2px;
				background: linear-gradient(to left, #03e9f4, transparent);
				bottom: 0;
				left: 100%;
				animation: line3-animation 1s 0.5s linear infinite;
			}

			.line4 {
				width: 2px;
				height: 100%;
				background: linear-gradient(to top, #03e9f4, transparent);
				top: 100%;
				left: 0;
				animation: line4-animation 1s 0.75s linear infinite;
			}
		}
	}
}
</style>
