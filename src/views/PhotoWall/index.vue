<template>
    <div class="image-container">
        <div v-for="(image, index) in images" :key="index" class="box" @mousemove="onMouseMove(index)"
            @mouseleave="onMouseLeave(index)" ref="boxes">
            <div class="image-wrap">
                <div :class="`image image-${index}`"></div>
            </div>
            <div class="border"></div>
            <div class="text">
                <span>{{ captions[index] }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';

// Data
const captions = [
    "I'm", "Following", "You", "Now", "Just", "Going", "Follow you", "Everywhere"
];
const images = [
    "/images/ImageCollection/love1.jpg",
    "/images/ImageCollection/love2.jpg",
    "/images/ImageCollection/love3.jpg",
    "/images/ImageCollection/love4.jpg",
    "/images/ImageCollection/shanxi.jpg",
    "/images/ImageCollection/sz.jpg",
    "/images/ImageCollection/dog1.jpg",
    "/images/ImageCollection/dog2.jpg",
    "/images/ImageCollection/dog3.jpg",
    "/images/ImageCollection/dog4.jpg",
    "/images/ImageCollection/dog5.jpg",
    "/images/ImageCollection/Ierland.jpg"
];

// Mouse Position
const mousePos = reactive({ x: -10, y: -10 });
const boxes = ref([]);

// Methods
onMounted(() => {
    // Initialize boxes array after DOM has mounted and elements are accessible
    boxes.value = Array.from($refs.boxes).map(el => ({
        el,
        targetX: 0,
        targetY: 0,
        prevX: 0,
        prevY: 0,
        x: 0,
        y: 0,
        left: el.offsetLeft,
        top: el.offsetTop,
        size: el.offsetWidth
    }));
});

const onMouseMove = (index) => (e) => {
    mousePos.x = e.pageX;
    mousePos.y = e.pageY;
    updateBox(boxes.value[index]);
};

const onMouseLeave = (index) => {
    boxes.value[index].targetX = 0;
    boxes.value[index].targetY = 0;
    updateBox(boxes.value[index]);
};

const updateBox = (box) => {
    // Debug output to check if box.el exists and is correct
    console.log("Box Element:", box.el);
    console.log("Children of Box Element:", box.el.children);

    if (
        mousePos.x > box.left &&
        mousePos.x < box.left + box.size &&
        mousePos.y > box.top &&
        mousePos.y < box.top + box.size
    ) {
        box.targetX = (box.size / 2 - (mousePos.x - box.left)) * 0.1;
        box.targetY = (box.size / 2 - (mousePos.y - box.top)) * 0.1;
    } else {
        box.targetX = 0;
        box.targetY = 0;
    }

    box.x += (box.targetX - box.x) * 0.2;
    box.y += (box.targetY - box.y) * 0.2;

    if (Math.abs(box.x) < 0.001) box.x = 0;
    if (Math.abs(box.y) < 0.001) box.y = 0;

    // Ensure box.el.children[0].children[0] exists before applying style
    if (box.el && box.el.children[0] && box.el.children[0].children[0]) {
        console.log("Applying 3D Transform");
        // Apply 3D rotation effect using X and Y axis
        box.el.children[0].children[0].style.transform = `rotateX(${box.y}deg) rotateY(${box.x}deg)`;
    } else {
        console.error("Children not found for box:", box.el);
    }
    console.log(box, '----');

    box.prevX = box.x;
    box.prevY = box.y;
};
</script>

<style scoped lang="scss">
/* New container styling */
.image-container {
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
    /* Add perspective for 3D effect */
}

.box {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    float: left;
    transform-style: preserve-3d;
    /* Ensure children are rendered in 3D space */
    transition: transform 0.3s ease;
    /* Smooth transition for 3D effect */
}

.box:hover .border {
    transform: scale(0.94);
    transition-duration: 140ms;
}

.box:hover .text {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition-duration: 140ms;
}

.box:hover .image-wrap {
    transform: scale(1);
    opacity: 1;
    transition-duration: 140ms;
}

.border,
.text,
.image {
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
}

.image-wrap {
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

.border {
    left: -30px;
    top: -30px;
    border: 30px solid #222;
    box-sizing: content-box;
    transition: 360ms ease-in-out;
}

.text {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translate3d(0, -4%, 0);
    transition: 280ms ease-out;
    text-align: center;
    color: lightgrey;
}

.image {
    background-size: cover;
}

.box {
    width: 100%;
    height: 100vw;
    float: left;
}

@media (min-width: 500px) {
    .box {
        width: 50%;
        height: 50vw;
    }
}

@media (min-width: 800px) {
    .box {
        width: 33.333333%;
        height: 33.33333vw;
    }
}

@media (min-width: 1200px) {
    .box {
        width: 25%;
        height: 25vw;
    }
}

/* image backgrounds */
.image-0 {
    background: url("/images/ImageCollection/love1.jpg");
}

.image-1 {
    background: url("/images/ImageCollection/love2.jpg");
}

.image-2 {
    background: url("/images/ImageCollection/love3.jpg");
}

.image-3 {
    background: url("/images/ImageCollection/love4.jpg");
}

.image-4 {
    background: url("/images/ImageCollection/shanxi.jpg");
}

.image-5 {
    background: url("/images/ImageCollection/sz.jpg");
}

.image-6 {
    background: url("/images/ImageCollection/dog1.jpg");
}

.image-7 {
    background: url("/images/ImageCollection/dog2.jpg");
}

.image-8 {
    background: url("/images/ImageCollection/dog3.jpg");
}

.image-9 {
    background: url("/images/ImageCollection/dog4.jpg");
}

.image-10 {
    background: url("/images/ImageCollection/dog5.jpg");
}

.image-11 {
    background: url("/images/ImageCollection/Ierland.jpg");
}
</style>
