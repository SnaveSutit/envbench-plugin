import PACKAGE from '@package'
import { sveltePreprocess } from 'svelte-preprocess'
import { typescript } from 'svelte-preprocess-esbuild'
import type { ISvelteESBuildPluginOptions } from './.scripts/esbuild-plugins/svelte'

function minifyJs(code: string) {
	return code.replace(/(?:\n|^\t+)/gm, '')
}

export const preprocess = [
	typescript({
		target: 'es2022',
		define: {
			'process.browser': 'true',
		},
	}),
	sveltePreprocess({
		typescript: false,
		sourceMap: process.env.NODE_ENV === 'development',
	}),
]

export const transformCssToJs = (css: string) =>
	minifyJs(`(() => {
		Blockbench.on('loaded_plugin', data => {
			if (data?.plugin?.id === '${PACKAGE.name}') {
				const css = Blockbench.addCSS(${JSON.stringify(css)});
				Blockbench.once('unloaded_plugin', data => {
					if (data?.plugin?.id === '${PACKAGE.name}') {
						css?.delete();
					}
				});
			};
		});
	})()`)

export default {
	preprocess,
	transformCssToJs,
	compilerOptions: {
		dev: process.env.NODE_ENV === 'development',
		runes: true,
	},
} satisfies ISvelteESBuildPluginOptions
