module.exports = {
    "env": {
        "es2020": true,
        "node": true,
        "jest": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "plugins": [
        "@typescript-eslint"
    ],

    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },

    "rules": {
        "no-unused-vars": ["warn"]
    }
};
