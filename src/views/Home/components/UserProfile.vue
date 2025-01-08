<template>
    <div class="container">
        <div class="user-profile">
            <div class="user-profile-info">
                <div class="avatar-section">
                    <img src="/images/avatar.jpg" alt="User Avatar" class="avatar-image" width="100" height="100" />
                </div>
                <div class="details-section">
                    <p>
                        <span class="username">斜曦</span>
                        <span class="vip-status">VIP用户</span>
                    </p>
                    <p class="contact-info">WeChat: 15112523208</p>
                </div>
            </div>
            <ul class="user-stats">
                <li v-for="(item, index) in userStats" :key="index" class="stat-item" @click="handleStatClick(item.route)">
                    <i :class="item.icon"></i>
                    <span>{{ $t(item.label) }}</span>
                    <em v-if="item.isCommentCount" class="comment-count">&nbsp;0</em>
                </li>
            </ul>
        </div>
        <div class="random-copy-section">
            <h3>{{ $t('randomCopy') }}</h3>
            <ul class="random-copy-list">
                <li class="random-text" v-for="(item, index) in randomTexts" :key="index" @mouseover="showEnglish(index)"
                    @mouseleave="showChinese(index)">
                    {{ item.displayText }}
                </li>
            </ul>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { randomTextEn, randomTextZh } from './randomText.js';

const router = useRouter();
const { t, locale } = useI18n();

const randomTexts = ref([]);

// 根据当前语言生成随机文案
const generateRandomTexts = () => {
    const indices = Array.from({ length: randomTextZh.length }, (_, i) => i); // 索引数组
    const shuffledIndices = indices.sort(() => 0.5 - Math.random());
    randomTexts.value = shuffledIndices.slice(0, 5).map((index) => ({
        zh: randomTextZh[index],
        en: randomTextEn[index],
        displayText: locale.value === 'zh' ? randomTextZh[index] : randomTextEn[index]
    }));
};

// 当语言改变时更新显示文案
const updateDisplayedTexts = () => {
    randomTexts.value.forEach((item, index) => {
        item.displayText = locale.value === 'zh' ? item.zh : item.en;
    });
};
// 显示英文文案
const showEnglish = (index) => {
    randomTexts.value[index].displayText = randomTexts.value[index].en;
};

// 显示中文文案
const showChinese = (index) => {
    randomTexts.value[index].displayText = randomTexts.value[index].zh;
};

// 页面加载时生成随机文案
onMounted(generateRandomTexts);

// 监听语言切换，动态更新显示内容
watch(() => locale.value, updateDisplayedTexts);

const userStats = ref([
    { label: 'stats.clock', icon: 'iconfont icon-kele', route: '/clock' },
    { label: 'stats.photoWall', icon: 'iconfont icon-shutiao', route: '/photoWall' },
    { label: 'stats.comments', icon: 'iconfont icon-nuomici', route: '/comments', isCommentCount: true },
]);

const handleStatClick = (route) => {
    router.push(route);
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;

    .user-profile {
        padding: 20px;
        background-color: transparent;

        .user-profile-info {
            display: flex;
            align-items: center;
            margin-bottom: 16px;

            .avatar-section {
                margin-right: 16px;

                .avatar-image {
                    border-radius: 50%;
                    border: 2px solid #ddd;
                }
            }

            .details-section {
                .username {
                    font-weight: bold;
                    margin-right: 8px;
                }

                .vip-status {
                    color: #FFC107;
                }

                .contact-info {
                    color: #555;
                }
            }
        }

        .user-stats {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            padding: 0;
            margin: 0;
            padding-top: 16px;

            .stat-item {
                flex: 1 1 50%;
                display: flex;
                align-items: center;
                padding: 8px;
                cursor: pointer;

                .iconfont {
                    margin-right: 8px;
                    font-size: 1.2rem;
                }

                .comment-count {
                    font-weight: bold;
                    color: #3498db;
                }
            }
        }
    }

    .random-copy-section {
        margin-top: 20px;
        padding: 16px;
        background-color: transparent;
        border-radius: 8px;

        h3 {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 12px;
            color: #333;
        }

        .random-copy-list {
            list-style: none;
            margin: 0;
            padding: 0;

            .random-text {
                padding: 8px;
                border-radius: 4px;
                margin-bottom: 8px;
                font-size: 0.95rem;
                color: #333333;

                &:hover {
                    cursor: pointer;
                    color: #007BFF;
                }
            }
        }
    }
}
</style>
