import axios from 'axios';
import * as path from 'path';

const API_URL = 'https://app.datadoghq.com/api/v1/series';
const METRIC_TYPE_GAUGE = 'gauge';

const getTimestamp = () => parseInt(`${new Date().getTime() / 1000}`, 10);

export interface DataDogStatsReporterOptions {
  apiKey: string;
  metricName: string;
}

export class DataDogStatsReporter {
  private readonly apiKey: string;
  private readonly metricName: string;

  constructor(options: DataDogStatsReporterOptions) {
    this.apiKey = options.apiKey;
    this.metricName = options.metricName;

    this.validateOptions();
  }

  public async send(data: any) {
    try {
      return await axios({
        data: { series: this.parseStats(data) },
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        url: `${API_URL}?api_key=${this.apiKey}`
      });
    } catch (err) {
      throw new Error(`DataDogStatsReporter: ${err.message}`);
    }
  }

  private parseStats(stats: any) {
    const now = getTimestamp();
    return stats.assets
      .filter((asset: any) => /(js|css)$/.test(asset.name))
      .map((asset: any) => ({
        metric: `${this.metricName}${path.extname(asset.name)}`,
        points: [[now, asset.size / 1000 ]],
        tags: [
          `chunk:${asset.chunkNames[0]}`
        ],
        type: METRIC_TYPE_GAUGE
      }));
  }

  private validateOptions() {
    const errors = [];
    if (!this.apiKey) {
      errors.push('apiKey is required.');
    }
    if (!this.metricName) {
      errors.push('metricName is required.');
    }
    if (errors.length !== 0) {
      throw new Error(`DataDogStatsReporter: ${errors.join(' ')}`);
    }
  }
}
