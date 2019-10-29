import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = false;

export default {
	input: 'src/generate-index.js',
	output: {
		sourcemap: false,
		format: 'iife',
		name: 'app',
		file: `src/temp/generate-index.bundle.js`
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			generate: 'ssr'
		}),

		resolve({browser: false}),
		commonjs()
	]
};