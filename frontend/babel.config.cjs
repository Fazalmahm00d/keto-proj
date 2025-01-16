module.exports = {
  // Changed from `export default` to `module.exports` for CommonJS compatibility
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }], // Transpile code to match the current Node.js version
    ["@babel/preset-react", { runtime: "automatic" }], // Enable React JSX transformation with the new JSX runtime
  ],
};