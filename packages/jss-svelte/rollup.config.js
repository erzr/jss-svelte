import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;
module.exports = {
	input: 'src/index.js',
	output: {
		sourcemap: true,
		format: 'cjs',
		name: 'app',
		file: 'build/index.js'
	},
	plugins: [
		svelte({
			dev: !production,
			generate: 'ssr',
			preprocess: autoPreprocess()
		}),
		typescript({ sourceMap: !production }),
		resolve({browser: true}),
		commonjs(),
		replace({
      		'process.env.NODE_ENV': JSON.stringify('development'),
    	}),
		production && terser()
	]
};