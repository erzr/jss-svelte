import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import autoPreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
const packageConfig = require('./package.json');

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: `public${packageConfig.config.sitecoreDistPath}/bundle.js`
	},
	plugins: [
		svelte({
			dev: !production,
			hydratable: true,
			css: css => {
				css.write(`public${packageConfig.config.sitecoreDistPath}/bundle.css`);
			},
			preprocess: autoPreprocess()
		}),
		typescript({ sourceMap: !production }),
		json(),
		resolve({
			browser: true,
			dedupe: ['svelte', 'svelte/internal']
		}),
		commonjs(),
		replace({
			  'process.env.NODE_ENV': JSON.stringify('development'),
			  '%PUBLIC_URL%': packageConfig.config.sitecoreDistPath
    	}),
		!production && livereload('public'),
		production && terser()
	]
};