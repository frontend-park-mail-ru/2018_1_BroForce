module.exports = {
    "extends": "google",
    "env": {
        "es6": true
    },
    "rules": {
        "constructor-super": 0,      // verify super() callings in constructors (off by default)
        "generator-star-spacing": 0, // enforce the spacing around the * in generator functions (off by default)
        "no-this-before-super": 0,   // disallow to use this/super before super() calling in constructors (off by default)
        "no-var": 0,                 // require let or const instead of var (off by default)
        "object-shorthand": 0,       // require method and property shorthand syntax for object literals (off by default)
        "prefer-const": 0,          // suggest using of const declaration for variables that are never modified after declared (off by default)

        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": false,
                "ClassDeclaration": false,
                "ArrowFunctionExpression": false,
                "FunctionExpression": false
            }
        }],

        "max-len": 0,
        "no-unused-vars": 0
    }
};