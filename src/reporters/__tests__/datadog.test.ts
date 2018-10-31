import axios from 'axios';
import { DataDogStatsReporter, DataDogStatsReporterOptions } from '../datadog';

jest.mock('axios');

describe('DataDogStatsReporter', () => {
  let reporter: DataDogStatsReporter;
  let options: DataDogStatsReporterOptions;

  beforeEach(() => {
    options = {
      apiKey: 'test-key',
      gzipSize: true,
      metricName: 'testapp.assets'
    };
    reporter = new DataDogStatsReporter(options);
  });

  describe('constructor', () => {
    it('should be an instance of DataDogStatsReporter', () => {
      expect(reporter).toBeInstanceOf(DataDogStatsReporter);
    });

    it('should throw if options.apiKey is missing', () => {
      delete options.apiKey;
      expect(
        () => new DataDogStatsReporter(options)
      ).toThrowErrorMatchingSnapshot();
    });

    it('should throw if options.metricName is missing', () => {
      delete options.metricName;
      expect(
        () => new DataDogStatsReporter(options)
      ).toThrowErrorMatchingSnapshot();
    });

    it('should throw if multiple options are missing', () => {
      delete options.apiKey;
      delete options.metricName;
      expect(
        () => new DataDogStatsReporter(options)
      ).toThrowErrorMatchingSnapshot();
    });
  });
});
