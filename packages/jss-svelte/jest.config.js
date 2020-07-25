const typescript = require('@rollup/plugin-typescript');

module.exports = {
    preset: 'ts-jest',
    transform: {
        "^.+\\.svelte$": ["svelte-jester", { "preprocess": true }],
        '^.+\\.ts$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'ts', 'svelte'],
}