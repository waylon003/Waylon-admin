import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	plugins: [
		vue(),
		vueJsx(),
		AutoImport({
			imports: [
				'vue',
				'vue-router',
				'pinia',
				VueRouterAutoImports,
				{
					// 自定义导入
					'@/stores': ['useCounterStore'],
				},
			],
			dirs: ['src/hooks/**', 'src/stores/**', 'src/utils/**'],
			dts: 'src/typings/auto-imports.d.ts',
			eslintrc: {
				enabled: true,
			},
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			dirs: ['src/components', 'src/layouts', 'src/views'],
			extensions: ['vue'],
			deep: true,
			dts: 'src/typings/components.d.ts',
			include: [/\.vue$/, /\.vue\?vue/],
			resolvers: [ElementPlusResolver()],
		}),
	],
})
