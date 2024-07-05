import js from '@eslint/js';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import * as regexpPlugin from "eslint-plugin-regexp";
import shared from './eslint-base.mjs';

/** 0: off | 1: warn | 2: error */
export default [
	eslintPluginUnicorn.configs['flat/all'],
	regexpPlugin.configs['flat/recommended'],
	eslintPluginPromise.configs['flat/recommended'],
	{
		...shared,
		rules: {
			...js.configs.recommended.rules,
			'no-console': 0,
			'no-tabs': [2, {
				allowIndentationTabs: true,
			}],
			'quotes': [2, 'single'],
			'regexp/no-super-linear-backtracking': 0,
			'regexp/no-misleading-capturing-group': 0,
			'regexp/strict': 0,
			'semi': [2, 'always'],
			'promise/always-return': 1,
			'promise/catch-or-return': 1,
			'promise/no-callback-in-promise': 1,
			'promise/no-multiple-resolved': 1,
			'promise/no-nesting': 1,
			'promise/no-new-statics': 1,
			'promise/no-promise-in-callback': 1,
			'promise/no-return-in-finally': 1,
			'promise/no-return-wrap': 1,
			'promise/param-names': 1,
			'promise/prefer-await-to-then': 1,
			'unicorn/better-regex': 0,
			'unicorn/filename-case': 0,
			'unicorn/no-array-reduce': 0,
			'unicorn/no-empty-file': 0,
			'unicorn/no-keyword-prefix': 0,
			'unicorn/no-null': 0,
			'unicorn/prefer-at': 0,
			'unicorn/prefer-dom-node-text-content': 0,
			'unicorn/prefer-module': 0,
			'no-undef': 0,
			'unicorn/prefer-logical-operator-over-ternary': 0,
			'unicorn/prefer-spread': 0,
			'unicorn/numeric-separators-style': 0,
			'unicorn/prefer-top-level-await': 0,
			'unicorn/prevent-abbreviations': 0,
		},
	}
];