import { error } from 'console';
import yargs, { alias, demandOption } from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
  .options({
    b: {
      alias: 'base',
      describe: 'Multiplication table base',
      type: 'number',
      default: 0,
      demandOption: true,
    },
    l: {
      alias: 'limit',
      describe: 'Multiplication table limit',
      type: 'number',
      default: 10,
    },
    s: {
      alias: 'show',
      describe: 'Show multiplication table',
      type: 'boolean',
      default: false,
    },
    n: {
      alias: 'name',
      describe: 'Name of the file',
      type: 'string',
      default: 'multiplication-table',
    },
    p: {
      alias: 'path',
      describe: 'Path to save the file',
      type: 'string',
      default: './outputs/',
    },
  })
  .check((argv) => {
    if (argv.b < 0 || isNaN(argv.b)) throw 'The base must be a positive number';
    if (argv.l < 0 || isNaN(argv.l))
      throw 'The limit must be a positive number';
    return true;
  })
  .parseSync();
