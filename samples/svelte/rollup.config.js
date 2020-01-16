import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
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
			// enable run-time checks when not in production
			dev: !production,
			hydratable: true,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write(`public${packageConfig.config.sitecoreDistPath}/bundle.css`);
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
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

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	]
};