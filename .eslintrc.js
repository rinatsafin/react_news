module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ["airbnb", "eslint:recommended", "plugin:react/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    },
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "jsx-a11y/no-static-element-interactions": [
      "error",
      {
        handlers: [
          "onClick",
          "onMouseDown",
          "onMouseUp",
          "onKeyPress",
          "onKeyDown",
          "onKeyUp"
        ]
      }
    ],
    "react/prefer-stateless-function": [
      0,
      {
        ignorePureComponents: true
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to"],
        aspects: ["noHref", "invalidHref", "preferButton"]
      }
    ],
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: ["error", "always"],
    "react/prop-types": [
      1,
      {
        ignore: ["children"],
        skipUndeclared: true
        // propTypes: {
        //   children: React.PropTypes.oneOfType([
        //     React.PropTypes.arrayOf(React.PropTypes.node),
        //     React.PropTypes.node
        //   ])
        // },
        // getDefaultProps: function() {
        //   return {
        //     children: null // or [] I guess
        //   };
        // }
      }
    ],
    "comma-dangle": 0,
    "react/jsx-uses-vars": 1,
    "react/display-name": 1,
    "no-unused-vars": "warn",
    "no-console": 1,
    "no-unexpected-multiline": "warn"
  }
};
