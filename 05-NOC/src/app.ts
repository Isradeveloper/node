import { envs } from './config/plugins/envs.plugin';
import { Server } from './presentation/server';

(async () => {
  main();
})();

function main() {
  Server.start();
  // console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);
}
