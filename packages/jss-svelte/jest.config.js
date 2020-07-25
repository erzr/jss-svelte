const typescript = require('@rollup/plugin-typescript');

module.exports = {
    transform: {
        "^.+\\.svelte$": ["svelte-jester", { "preprocess": true }],
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'svelte'],
}