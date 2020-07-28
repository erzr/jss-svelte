import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import copy from 'rollup-plugin-copy'
import autoPreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
const path = require('path');
const packageConfig = require('../package.json');

const production = false;

export default {
	input: path.resolve(__dirname, './server.js'),
	output: {
		sourcemap: true,
		format: 'cjs',
		name: 'app',
		file: 'build/server.bundle.js'
	},
	plugins: [
		copy({
			targets: [
				{ src: `public${packageConfig.config.sitecoreDistPath}/bundle.js`, dest: 'build/' }
			],
			verbose: true
		}),

		svelte({
			dev: !production,
			generate: 'ssr',
			css: css => {
				css.write('build/bundle.css');
			},
			preprocess: autoPreprocess()
		}),
		typescript({ sourceMap: !production }),
		json(),
		resolve({ 
			browser: false,
			dedupe: ['svelte', 'svelte/internal'] 
		}),
		commonjs(),
		production && terser()
	]
};