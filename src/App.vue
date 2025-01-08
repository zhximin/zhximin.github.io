<template>
	<a-config-provider :locale="antdLang">
		<router-view :key="lang"></router-view>
	</a-config-provider>
</template>

<script setup>
import "dayjs/locale/ar-sa";
import "dayjs/locale/en-gb";
import { computed, provide, reactive } from "vue";
import moment from "moment";
import { useI18n } from "vue-i18n";
import enUS from "ant-design-vue/es/locale/en_US";
import arEG from "ant-design-vue/es/locale/ar_EG";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
const I18n = useI18n();

const lang = computed(() => {
	document.documentElement.setAttribute("dir", I18n.locale.value === "ar" ? "rtl" : "ltr");
	return I18n.locale.value;
});

const antdLang = computed(() => {
	switch (I18n.locale.value) {
		case "en": {
			return enUS;
		}
		case "ar": {
			return arEG;
		}
		case "zh": {
			return zhCN;
		}
	}
	momentDefault(I18n.locale.value)

});

const setMomentLocale = (locale) => {
	moment.locale(locale); // 设置 moment 的语言环境
};

const momentDefault = () => {
	switch (I18n.locale.value) {
		case "en": {
			setMomentLocale("en"); // 设置 moment 为英语
			return
		}
		case "ar": {
			setMomentLocale("ar"); // 设置 moment 为阿拉伯语
			return
		}
	}
};
</script>

<style></style>
