<template>
    <div class="container">
        <div class="watch">
            <!-- 表盘数字 -->
            <div v-for="num in digits" :key="num" :style="getDigitStyle(num)" class="digit">
                <span>{{ num }}</span>
            </div>
            <!-- 米老鼠和指针 -->
            <div class="mickey"></div>
            <div ref="hoursHand" class="hours" :style="getRotationStyle(hoursDeg)"></div>
            <div ref="minutesHand" class="minutes" :style="getRotationStyle(minutesDeg)"></div>
        </div>
        <LeftOutlined class="back-icon" @click="handleBack" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { LeftOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment';

// 数字表盘
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const router = useRouter();

// 指针角度
const hoursDeg = ref(0);
const minutesDeg = ref(0);

// 表盘数字样式
const getDigitStyle = (num) => {
    const rotation = (360 / 12) * num; // 每个数字旋转的角度
    return {
        transform: `rotate(${rotation}deg)`,
    };
};

// 计算指针旋转样式
const getRotationStyle = (deg) => ({
    transform: `rotate(${deg}deg)`,
});

// 返回上一级路由
const handleBack = () => {
    router.back();
};

// 更新时针和分针角度
const updateClock = () => {
    const now = moment();
    const hours = now.hours();
    const minutes = now.minutes();

    // 计算时针和分针的角度
    hoursDeg.value = (hours % 12) * 30 + (minutes / 60) * 30; // 时针每小时30度，加分钟进度
    minutesDeg.value = minutes * 6; // 分针每分钟6度
};

// 初始化并设置定时器
onMounted(() => {
    updateClock(); // 初始化时钟
    setInterval(updateClock, 1000); // 每秒更新一次
});
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
    position: relative;
    background: black;

    .watch {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        width: 450px;
        height: 450px;
        background: radial-gradient(grey, black 70%);
        color: #fff;
        font: bold 30px Arial, sans-serif;

        .digit {
            position: absolute;
            width: 104%;
            height: 104%;
            margin: -2%;
            text-align: center;

            span {
                display: block;
            }
        }

        .mickey {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: url("/images/svg/body.svg");
            background-size: 70%;
            background-position: 45% 85%;
            z-index: 50;
            background-repeat: no-repeat;
        }

        .hours,
        .minutes {
            position: absolute;
            width: 100%;
            height: 100%;
            background: no-repeat center center;
            background-size: contain;
            transition: transform 0.5s ease-in-out;

            &.hours {
                background-image: url("/images/svg/hand2.svg");
                background-size: 90px;
                background-position: center 5%;
                z-index: 100;
            }

            &.minutes {
                background-image: url("/images/svg/hand3.svg");
                background-size: 90px;
                background-position: center 5%;
                z-index: 10;
            }
        }
    }

    .back-icon {
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 50px;
        z-index: 9;
        color: #fff;
        cursor: pointer;
    }
}
</style>
