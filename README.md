# Stats reporting plugin for webpack

Send the stats of a build to a reporting service. Currently DataDog is the only reporter implemented.

## Installation

```sh
$ npm install --save-dev stats-reporter-webpack-plugin
```

## Usage

```js
const { StatsPlugin, DataDogStatsReporter } = require('stats-webpack-plugin');

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

##### DataDogStatsReporterOptions fields

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
  * `chunk`: the chunk name
  * `type`: the type of asset (js, css, etc)
- `test?: RegExp`: Test to match files against. If not set, stats for all emitted assets will be sent.
