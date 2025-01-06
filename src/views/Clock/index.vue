<template>
    <div class="container">
        <div class="watch">
            <div v-for="num in digits" :key="num" :style="getDigitStyle(num)" class="digit">
                <span>{{ num }}</span>
            </div>
            <div class="mickey"></div>
            <div :class="hoursClass" class="hours"></div>
            <div :class="minutesClass" class="minutes"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const hoursClass = ref('left');
const minutesClass = ref('back left');

onMounted(() => {
    setInterval(() => {
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();

        hoursClass.value = hours >= 6 && hours < 12 ? 'left' : 'right';
        minutesClass.value = minutes <= 30 ? 'back left' : 'left';

        setRotation('hours', 30 * hours);
        setRotation('minutes', 6 * minutes);
    }, 500);
});

const getDigitStyle = (num) => {
    const rotation = (360 / 12) * num; // 360 degrees divided by 12 hours
    return {
        transform: `rotate(${rotation}deg)`,
    };
};

const setRotation = (elmt, deg) => {
    const element = document.querySelector(`.${elmt}`);

    if (elmt === 'hours' && deg < 180) {
        deg = deg - 5;
    }

    if (elmt === 'minutes' && deg < 180) {
        deg = deg + 5;
    } else {
        deg = deg - 5;
    }

    element.style.transform = `rotate(${deg}deg)`;
    element.style.webkitTransform = `rotate(${deg}deg)`;
};
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

        .mickey,
        .hours,
        .minutes {
            position: absolute;
            width: 100%;
            height: 100%;
            background: no-repeat center center;
            background-size: contain;
        }

        .mickey {
            background-size: 70%;
            background-position: 45% 85%;
            z-index: 50;
        }

        .hours,
        .minutes {
            width: 100%;
            height: 100%;
            background: no-repeat top center;
            background-size: 90px;
            background-position: center 5%;
            transition: transform 1s;
        }

        .hours {
            z-index: 10;
        }

        .minutes {
            z-index: 100;
        }

        .minutes::after {
            content: '';
            display: block;
            animation: seconds infinite 1s;
        }

        @keyframes seconds {
            0% {
                transform: scale(1);
            }

            50% {
                transform: scale(0.95);
            }

            100% {
                transform: scale(1);
            }
        }

        /* Sprites */
        .mickey {
            background-image: url("/images/svg/body.svg");
        }

        .hours.right,
        .minutes.right::after {
            background-image: url("/images/svg/hand3.svg") !important;
        }

        .hours.left.back,
        .minutes.left.back::after {
            background-image: url("/images/svg/hand1.svg") !important;
        }

        .hours.left,
        .minutes.left::after {
            background-image: url("/images/svg/hand2.svg") !important;
        }
    }
}
</style>
