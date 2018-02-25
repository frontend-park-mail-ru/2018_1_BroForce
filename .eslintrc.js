module.exports = {
    "extends": "google",
    "env": {
        "es6": true
    },
    "rules": {
        "constructor-super": 0,
        "generator-star-spacing": 0,
        "no-this-before-super": 0,
        "no-var": 0,
        "object-shorthand": 0,
        "prefer-const": 0,
        "max-len": 0,
        "no-unused-vars": 0,
        "no-invalid-this": 0,
        "guard-for-in": 0,

        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": false,
                "ClassDeclaration": false,
                "ArrowFunctionExpression": false,
                "FunctionExpression": false
            }
        }]
    }
};
