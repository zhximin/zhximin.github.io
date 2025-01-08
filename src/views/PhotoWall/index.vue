<template>
    <div class="gallery">
        <!-- 循环生成每个图片盒子 -->
        <div v-for="(image, index) in images" :key="index" class="gallery__box" @mousemove="onMouseMove(index, $event)"
            @mouseleave="onMouseLeave(index)" ref="boxes">
            <!-- 图片包裹层 -->
            <div class="gallery__image-wrap">
                <div :class="`gallery__image gallery__image--${index}`"></div>
            </div>
            <!-- 边框效果 -->
            <div class="gallery__border"></div>
            <!-- 文本说明 -->
            <div class="gallery__text">
                <span>{{ captions[index] }}</span>
            </div>
        </div>
        <!-- 返回按钮 -->
        <LeftOutlined class="gallery__back-icon" @click="handleBack" />
    </div>
</template>
<script setup>
import { reactive, ref, onMounted, onUnmounted } from "vue"; // 引入必要的Vue方法
import { LeftOutlined } from '@ant-design/icons-vue'; // 引入返回图标
import { useRouter } from 'vue-router'; // 路由操作

// 路由实例
const router = useRouter();

// 图片说明文字
const captions = [
    "I'm",
    "Following",
    "You",
    "Now",
    "Just",
    "Going",
    "Follow you",
    "Everywhere",
];

// 图片路径数组
const images = [
    "/images/ImageCollection/Image1.png",
    "/images/ImageCollection/Image2.png",
    "/images/ImageCollection/Image3.jpg",
    "/images/ImageCollection/Image4.jpg",
    "/images/ImageCollection/Image5.jpg",
    "/images/ImageCollection/Image6.png",
    "/images/ImageCollection/Image7.png",
    "/images/ImageCollection/Image8.jpg",
];

// 鼠标位置和盒子状态数据
const mousePos = reactive({ x: -10, y: -10 }); // 鼠标位置
const boxes = ref([]); // 盒子数据

// 返回上一页
const handleBack = () => {
    router.back();
};

// 初始化盒子数据
const initializeBoxes = () => {
    // 选取DOM元素并初始化每个盒子的数据
    boxes.value = Array.from(document.querySelectorAll(".gallery__box")).map((el) => ({
        el,
        targetX: 0,
        targetY: 0,
        x: 0,
        y: 0,
        left: el.offsetLeft,
        top: el.offsetTop,
        size: el.offsetWidth,
    }));
};

// 鼠标移动事件
const onMouseMove = (index, event) => {
    mousePos.x = event.pageX;
    mousePos.y = event.pageY;
    updateBox(boxes.value[index]);
};

// 鼠标离开事件
const onMouseLeave = (index) => {
    const box = boxes.value[index];
    box.targetX = 0;
    box.targetY = 0;
    updateBox(box);
};

// 更新盒子位置
const updateBox = (box) => {
    // 判断鼠标是否在盒子内部
    if (
        mousePos.x > box.left &&
        mousePos.x < box.left + box.size &&
        mousePos.y > box.top &&
        mousePos.y < box.top + box.size
    ) {
        // 鼠标位于盒子中心时的偏移计算
        box.targetX = (box.size / 2 - (mousePos.x - box.left)) * 0.1;
        box.targetY = (box.size / 2 - (mousePos.y - box.top)) * 0.1;
    } else {
        box.targetX = 0;
        box.targetY = 0;
    }

    // 平滑移动
    box.x += (box.targetX - box.x) * 0.2;
    box.y += (box.targetY - box.y) * 0.2;

    // 设置阈值，避免无限小数震荡
    if (Math.abs(box.x) < 0.001) box.x = 0;
    if (Math.abs(box.y) < 0.001) box.y = 0;

    // 应用偏移到DOM元素
    if (box.el.children[0]?.children[0]) {
        box.el.children[0].children[0].style.transform = `translate3d(${box.x}px, ${box.y}px, 0)`;
    }
};

// 更新所有盒子在页面尺寸变化时的位置信息
const resize = () => {
    boxes.value.forEach((box) => {
        box.left = box.el.offsetLeft;
        box.top = box.el.offsetTop;
        box.size = box.el.offsetWidth;
    });
};

// 页面挂载时初始化
onMounted(() => {
    initializeBoxes();
    window.addEventListener("resize", resize); // 监听窗口变化
});

// 页面卸载时移除监听器
onUnmounted(() => {
    window.removeEventListener("resize", resize);
});
</script>


<style scoped lang="scss">
.gallery {
    width: 100%;
    height: 100%;
    font-size: 40px;
    font-family: 'Bungee Shade', cursive;
    color: #222;
    background: #222;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    perspective: 800px;

    &__back-icon {
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 50px;
        z-index: 9;
        color: #fff;
        cursor: pointer;
    }

    &__box {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        float: left;
        transform-style: preserve-3d;
        transition: transform 0.3s ease;

        &:hover .gallery__border {
            transform: scale(0.94);
            transition-duration: 140ms;
        }

        &:hover .gallery__text {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition-duration: 140ms;
        }

        &:hover .gallery__image-wrap {
            transform: scale(1);
            opacity: 1;
            transition-duration: 140ms;
        }
    }

    &__image-wrap {
        position: absolute;
        width: 130%;
        height: 130%;
        left: -15%;
        top: -15%;
        transform: scale(0.8);
        transition: 280ms ease-out;
        pointer-events: none;
        opacity: 0.74;
    }

    &__border {
        position: absolute;
        width: 100%;
        height: 100%;
        left: -30px;
        top: -30px;
        border: 30px solid #222;
        box-sizing: content-box;
        transition: 360ms ease-in-out;
    }

    &__text {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        opacity: 0;
        transform: translate3d(0, -4%, 0);
        transition: 280ms ease-out;
        text-align: center;
        color: lightgrey;
    }

    &__image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    // Responsive adjustments
    &__box {
        width: 100%;
        height: 100vw;

        @media (min-width: 500px) {
            width: 50%;
            height: 50vw;
        }

        @media (min-width: 800px) {
            width: 33.333%;
            height: 33.333vw;
        }

        @media (min-width: 1200px) {
            width: 25%;
            height: 25vw;
        }
    }
}

// Background images
@for $i from 0 through 7 {
    .gallery__image--#{$i} {
        background-image: url("/images/ImageCollection/Image#{$i + 1}.#{if($i == 2 or $i == 3 or $i == 4 or $i == 7, 'jpg', 'png')}");
    }
}
</style>
