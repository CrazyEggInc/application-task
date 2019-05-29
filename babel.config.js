module.exports = {
  presets: [
    [
      "@babel/env",
      {
        corejs: "3",
        useBuiltIns: "entry"
      }
    ],
    "@babel/typescript",
  ],
  plugins: [
    // class { handleThing = () => { } }
    "@babel/proposal-class-properties",
    // { ...spread }
    "@babel/proposal-object-rest-spread",
  ],
}
