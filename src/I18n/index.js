import { createI18n } from "vue-i18n";
import EN from "./en.js";
import AR from "./ar.js";
import ZH from "./zh.js";
// import aboutUsAR from "./aboutUsAR.js";
// import aboutUsEN from "./aboutUsEN.js";
const messages = {
	// en: { ...EN, ...aboutUsEN },
	en: { ...EN },
	// ar: { ...AR, ...aboutUsAR },
	ar: { ...AR },
	zh: { ...ZH },
};
const getLanguage = () => {
	const defaultLang = localStorage.getItem("lang");
	if (defaultLang) {
		return defaultLang;
	}
	if (navigator.language.split("-")[0].toLocaleLowerCase() === "ar") {
		return "ar";
	} else if (navigator.language.split("-")[0].toLocaleLowerCase() === "en") {
		return "en";
	} else {
		return "zh";
	}
};
const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	// locale: 'ar',
	locale: getLanguage(), // 设置语言
	fallbackLocale: "zh", // 设置备用语言
	messages,
});
export default i18n;
