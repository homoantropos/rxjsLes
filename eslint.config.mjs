import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPrettierConfig from "eslint-config-prettier";

export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	eslintPrettierConfig,
	{
		files: ["*.js"],
		"rules": {
			"no-console": "warn",
			"prettier/prettier": [
				"error",
				{
					"printWidth": 140
				}
			],
			"lines-between-class-members": "on",
			"padding-line-between-statements": "on"
		}
	},
	{
		files: ["./webpack.config.mjs"],
		rules: {
			"no-undef": "off",
			"no-unused-vars": "off",
		},
	},
];
