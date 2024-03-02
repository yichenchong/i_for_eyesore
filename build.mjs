import * as esbuild from 'esbuild'
import chalk from 'chalk';

await esbuild.build({
  entryPoints: [
    'src/service_workers/*',
    'src/content_scripts/*'
  ],
  bundle: true,
  outdir: 'dist',
  // splitting: true,
  // format: 'esm',
});

console.log(chalk.green('Build complete!'));
