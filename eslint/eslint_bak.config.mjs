import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended", "standard"), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: 2015,
        sourceType: "module",
    },

    rules: {
        "no-var": "warn",
        "init-declarations": ["error", "always"],
        "array-callback-return": "error",
        "block-scoped-var": "error",

        "no-multiple-empty-lines": ["error", {
            max: 2,
        }],

        semi: ["error", "always"],
        "space-before-function-paren": ["error", "never"],
        quotes: "off",

        "operator-linebreak": ["error", "before", {
            overrides: {
                "=": "after",
            },
        }],

        indent: ["error", 2, {
            VariableDeclarator: 2,
        }],

        "no-undefined": "error",
        "import/extensions": ["error", "always"],
    },
}, {
    files: ["types/*.ts", "src/*.ts"],

    languageOptions: {
        parser: tsParser,
    },

    rules: {
        "import/no-duplicates": "off",
        "import/extensions": "off",
    },
}, {
    files: ["src/**/*.js"],

    rules: {
        "import/no-nodejs-modules": "error",
        "import/no-commonjs": "error",
    },
}, {
    files: ["src/languages/*.js"],

    rules: {
        "no-unused-expressions": "off",
        camelcase: "off",
        "no-control-regex": "off",
        "no-useless-escape": "off",
        "comma-dangle": "off",
        "array-bracket-spacing": ["error", "always"],

        "array-bracket-newline": ["warn", {
            multiline: true,
            minItems: 2,
        }],

        "array-element-newline": "warn",

        "object-curly-newline": [1, {
            minProperties: 2,
        }],

        "object-property-newline": [2, {
            allowAllPropertiesOnSameLine: false,
        }],
    },
}, {
    files: ["demo/**/*.js"],

    languageOptions: {
        globals: {
            hljs: "readonly",
        },
    },
}, {
    files: ["test/**/*.js"],

    languageOptions: {
        globals: {
            ...globals.mocha,
            should: "readonly",
        },

        ecmaVersion: 2018,
        sourceType: "script",
    },
}, {
    files: ["tools/**/*.js"],

    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "script",
    },

    rules: {
        camelcase: "off",
    },
}];