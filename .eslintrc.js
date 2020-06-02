module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier", "@vue/typescript"],
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    rules: {
        "prettier/prettier": [
            "warn",
            {
                tabWidth: 4,
                semi: true,
                bracketSpacing: true,
                arrowParens: "avoid",
                "vue/max-attributes-per-line": [
                    2,
                    {
                        singleline: 20,
                        multiline: {
                            max: 5,
                            allowFirstLine: false,
                        },
                    },
                ],
            },
        ],
        "vue/max-attributes-per-line": [
            2,
            {
                singleline: 20,
                multiline: {
                    max: 5,
                    allowFirstLine: false,
                },
            },
        ],
    },
};
