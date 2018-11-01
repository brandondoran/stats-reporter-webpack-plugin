export interface StatsReporter {
  send: (stats: any) => Promise<any>;
}

export interface StatsReporterPluginOptions {
  reporter: StatsReporter;
}
