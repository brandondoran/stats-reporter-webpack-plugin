export interface Reporter {
  send: (stats: any) => Promise<any>;
}

export interface StatsReporterPluginOptions {
  reporter: Reporter;
};
