# Stats reporting plugin for webpack

[![Build Status](https://travis-ci.com/brandondoran/stats-reporter-webpack-plugin.svg?branch=master)](https://travis-ci.com/brandondoran/stats-reporter-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/github/brandondoran/stats-reporter-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/brandondoran/stats-reporter-webpack-plugin?branch=master)
[![dependencies Status](https://david-dm.org/brandondoran/stats-reporter-webpack-plugin/status.svg)](https://david-dm.org/brandondoran/stats-reporter-webpack-plugin)
[![devDependencies Status](https://david-dm.org/brandondoran/stats-reporter-webpack-plugin/dev-status.svg)](https://david-dm.org/brandondoran/stats-reporter-webpack-plugin?type=dev)
[![peerDependencies Status](https://david-dm.org/brandondoran/stats-reporter-webpack-plugin/peer-status.svg)](https://david-dm.org/brandondoran/stats-reporter-webpack-plugin?type=peer)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/brandondoran/stats-reporter-webpack-plugin.svg)](https://greenkeeper.io/)

Send the stats of a build to a reporting service. Currently DataDog is the only reporter implemented.

## Installation

```sh
npm install --save-dev stats-reporter-webpack-plugin
```

## Usage

```js
const { StatsPlugin, DataDogStatsReporter } = require('stats-reporter-webpack-plugin');

module.exports = {
  plugins: [
    new StatsReporterPlugin({
      test:
      reporter: new DataDogStatsReporter({
        apiKey: process.env.DD_API_KEY,
        metricName: 'my-app.assets',
        tags: ['app:my-app', 'env:production'],
        test: /(js|css)$/
      })
    })
  ]
};
```

## API

### StatsReporterPlugin

```js
new StatsReporterPlugin(options: StatsReporterPluginOptions);
```

#### StatsReporterPluginOptions fields

- `reporter: StatsReporter`: The reporter to use for sending stats.

### Stats Reporters

#### DataDogStatsReporter

```js
new DataDogStatsReporter(options: DataDogStatsReporterOptions);
```

##### DataDogStatsReporterOptions fields

- `apiKey: string`: Your DataDog API key
- `gzipSize?: boolean = true`: Report gzipped size if true, uncompressed size if false
- `metricName: string`: The base name for the metric
- `tags?: string[]`: Custom tags for the metric. The following tags are always added:
  - `chunk`: the chunk name
  - `type`: the type of asset (js, css, etc)
- `test?: RegExp`: Test to match files against. If not set, stats for all emitted assets will be sent.
