import axios from 'axios';
import * as gzipSize from 'gzip-size';
import * as path from 'path';

const API_URL = 'https://app.datadoghq.com/api/v1/series';
const METRIC_TYPE_GAUGE = 'gauge';

const headers = { 'Content-Type': 'application/json' };
const method = 'POST';
const getTimestamp = () => parseInt(`${new Date().getTime() / 1000}`, 10);

export interface DataDogStatsReporterOptions {
  apiKey: string;
  gzipSize: boolean;
  metricName: string;
  tags?: string[]
}

export class DataDogStatsReporter {
  private readonly apiKey: string;
  private readonly gzipSize: boolean;
  private readonly metricName: string;
  private readonly tags: string[];
  private readonly url: string;

  constructor(options: DataDogStatsReporterOptions) {
    this.apiKey = options.apiKey;
    this.gzipSize = options.gzipSize
    this.metricName = options.metricName;
    this.tags = options.tags || [];
    this.url = `${API_URL}?api_key=${this.apiKey}`;

    this.validateOptions();
  }

  public async send(stats: any) {
    try {
      const series = await this.parseStats(stats);
      // console.log(require('util').inspect(series, {showHidden: false, depth: null}));
      return await axios({
        data: { series },
        headers,
        method,
        url: this.url
      });
    } catch (err) {
      throw new Error(`DataDogStatsReporter: ${err.message}`);
    }
  }

  private parseStats(stats: any) {
    const { assets, outputPath } = stats;
    const now = getTimestamp();
    const promises = assets.map(async (asset: any) => {
      const size = this.gzipSize === false
        ? asset.size
        : await gzipSize.file(path.join(outputPath, asset.name));
      return {
        metric: `${this.metricName}.bytes${path.extname(asset.name)}`,
        points: [[ now, size ]],
        tags: [
          ...this.tags,
          `chunk:${asset.chunkNames[0]}`
        ],
        type: METRIC_TYPE_GAUGE
      };
    });
    return Promise.all(promises);
  }

  private validateOptions() {
    const errors = [];
    if (!this.apiKey) {
      errors.push('apiKey is required.');
    }
    if (!this.metricName) {
      errors.push('metricName is required.');
    }
    if (!Array.isArray(this.tags)) {
      errors.push('tags must be an array of strings.');
    }
    if (errors.length !== 0) {
      throw new Error(`DataDogStatsReporter: ${errors.join(' ')}`);
    }
  }
}
