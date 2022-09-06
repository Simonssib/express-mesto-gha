module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "extends:airbnb-base",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-underscore-dangle": ["error", { "allow": ["_id"] }]
    }
}