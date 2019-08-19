import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
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
			generate: 'ssr'
		}),
		resolve({browser: true}),
		commonjs(),
		replace({
      		'process.env.NODE_ENV': JSON.stringify('development'),
    	}),
		production && terser()
	]
};