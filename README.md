# Stats reporting plugin for webpack

Send the stats of a build to a reporting service. Currently DataDog is the only reporter implemented.

## Installation

```sh
$ npm install --save-dev stats-reporter-webpack-plugin
```

## Usage

```js
var { StatsPlugin, DataDogStatsReporter } = require("stats-webpack-plugin");

module.exports = {
  plugins: [
    new StatsReporterPlugin({
      reporter: new DataDogStatsReporter({
        apiKey: process.env.DD_API_KEY,
        metricName: "my-app.assets",
        tags: ["app:my-app", "env:production"]
      })
    })
  ]
};
```

## API

### StatsReporterPlugin

```js
new StatsReporterPlugin((reporter: DataDogStatsReporter));
```

### Reporters

#### DataDogStatsReporter

```js
new DataDogStatsReporter((options: DataDogStatsReporterOptions));
```

##### DataDogStatsReporterOptions fields

- `apiKey: string`: Your DataDog API key
- `gzipSize?: boolean = true`: Report gzipped size if true, uncompressed size if false
- `metricName: string`: The base name for the metric
- `tags?: string[]`: Custom tags for the metric.
