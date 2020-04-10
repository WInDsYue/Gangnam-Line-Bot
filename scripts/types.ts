import { exec } from 'child_process';

const [, , ...args] = process.argv;

const install = (pkg: string) => {
  return `yarn add ${pkg} && yarn add --dev @types/${pkg}`;
};

interface ExecException extends Error {
  cmd?: string;
  killed?: boolean;
  code?: number;
  signal?: string;
}

const execPromise = (command: string) => {
  return new Promise((resolve, reject) => {
    const cmd = exec(command, (error: ExecException | null, stdout: string) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });

    cmd.stdout &&
      cmd.stdout.on('data', data => {
        console.log(data.trim()); // tslint:disable-line
      });
  });
};

const promises = args.map((pkg: string) => execPromise(install(pkg)));

Promise.all(promises).then(() => {
  process.exit(0);
});
