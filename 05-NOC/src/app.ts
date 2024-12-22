import { envs } from './config/plugins/envs.plugin';
import { Server } from './presentation/server';

(async () => {
  main();
})();

function main() {
  // Server.start();
  process.loadEnvFile();
  console.log(envs);
}
