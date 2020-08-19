const withPlugins = require("next-compose-plugins");
const { PHASE_PRODUCTION_BUILD } = require("next/constants");
const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const withTsconfigPaths = (nextConfig = {}) => ({
  ...nextConfig,
  ...{
    webpack(config, options) {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          plugins: [
            ...(config.resolve && config.resolve.plugins),
            new TsconfigPathsPlugin(),
          ],
        },
      };

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(newConfig, options);
      }

      return newConfig;
    },
  },
});

const nextConfig = {
  distDir: "build",
  webpack: (config, options) => {
    // modify config here

    return config;
  },
  ignoreBuildErrors: false,
};

module.exports = withPlugins(
  [
    withCSS,
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: "[path]___[local]___[hash:base64:5]",
        },
        [PHASE_PRODUCTION_BUILD]: {
          cssLoaderOptions: {
            localIdentName: "[hash:base64:8]",
          },
        },
      },
    ],
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      },
    ],
    withTsconfigPaths,
  ],
  nextConfig
);
