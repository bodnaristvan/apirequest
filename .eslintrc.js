module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
	"jasmine": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
      "flowtype",
      "jasmine"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "sort-imports": ["error", {
            "ignoreCase": true,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
        }],
        "prefer-const": ["error"],
        "no-var": ["error"],
        "no-const-assign": ["error"],
        "eqeqeq": ["error"]
    }
};
