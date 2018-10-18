import * as path from 'path';
import * as webpack from 'webpack';
import { StatsReporterPluginOptions } from './types';

const onEmit = (options: StatsReporterPluginOptions) =>
  async (
    compilation: webpack.compilation.Compilation,
    done: () => void
  ): Promise<any> => {
    const stats = compilation.getStats().toJson();
    try {
      await options.reporter.send(stats);
    } catch(err) {
      compilation.errors.push(err);
    }
    done()
  };

export class StatsReporterPlugin {
  private options: StatsReporterPluginOptions;

  constructor(options: StatsReporterPluginOptions) {
    this.options = options;
  }

  public apply(compiler: webpack.Compiler) {

    const onEmitCallback = onEmit(this.options);

    if (compiler.hooks) {
      compiler.hooks.emit.tapAsync('StatsReporterPlugin', onEmitCallback)
    } else {
      compiler.plugin('emit', onEmitCallback)
    }
  }
}
