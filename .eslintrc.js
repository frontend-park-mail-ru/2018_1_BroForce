module.exports = {
    "extends": "google",
    "env": {
        "es6": true
    },
    "rules": {
        "object-shorthand": 0,
        "max-len": 0,
        "no-unused-vars": 0,
        "guard-for-in": 0,
        "new-cap": 0,
        "no-invalid-this": "off",

        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": false,
                "ClassDeclaration": false,
                "ArrowFunctionExpression": false,
                "FunctionExpression": false
            }
        }]
    },

    "parserOptions": {
        "sourceType": "module"
    }
};
