const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");
const util = require("util");

const nextConfig = {
  distDir: "build",
  webpack: (config, options) => {
    //console.log(util.inspect(config, false, null, true));  
    return config;
  },

  ignoreBuildErrors: false,
};

module.exports = withPlugins(
  [
    [withCSS , {
      cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: "[local]___[hash:base64:5]",
        },
    }],
    [
      withSass,
      {
        cssModules: false,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: "[local]___[hash:base64:5]",
        },
        // sassLoaderOptions: {
        //   includePaths: ["absolute/path/a", "absolute/path/b"]
        // }
      },
    ],
    [
      withLess,
      {
        cssModules:false,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: "[local]___[hash:base64:5]",
        },
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      },
    ],
  ],
  nextConfig
);
