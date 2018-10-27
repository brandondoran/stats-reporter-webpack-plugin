import * as webpack from 'webpack';
import { StatsReporterPluginOptions } from './types';

const onAfterEmit = (options: StatsReporterPluginOptions) =>
  async (
    compilation: webpack.compilation.Compilation,
    done: () => void
  ): Promise<any> => {
    const stats = compilation.getStats().toJson();
    try {
      const result = await options.reporter.send(stats);
    } catch(err) {
      compilation.errors.push(new Error(`StatsReporterPlugin: ${err.message}`));
    }
    done()
  };

export class StatsReporterPlugin {
  private options: StatsReporterPluginOptions;

  constructor(options: StatsReporterPluginOptions) {
    this.options = options;
  }

  public apply(compiler: webpack.Compiler) {

    const onAfterEmitCallback = onAfterEmit(this.options);

    if (compiler.hooks) {
      compiler.hooks.afterEmit.tapAsync('StatsReporterPlugin', onAfterEmitCallback)
    } else {
      compiler.plugin('after-emit', onAfterEmitCallback)
    }
  }
}
