// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from "vitepress/theme";
import { useData } from 'vitepress'

import './style/index.css'

import imageViewer from "./components/imageViewer.vue"
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

import MNavLinks from './components/MNavLinks.vue'

export default {
	...Theme,
	enhanceApp({app}) {
    // 注册组件
    app.component('MNavLinks' , MNavLinks)
  },
	Layout: () => {
		const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

		return h(Theme.Layout, props, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
			"doc-bottom": () => h(imageViewer),
		});
	},
};
