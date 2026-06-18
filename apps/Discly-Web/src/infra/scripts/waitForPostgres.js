import { exec } from "node:child_process";

function waitForPostgres() {
  exec("docker exec Postgres pg_isready -h localhost", checkPostgresReady);

  function checkPostgresReady(error, stdout) {
    // string not found in command output
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      waitForPostgres();
      return;
    }

    process.stdout.write(
      "\n\n🟢 PostgreSQL container accepting connections!\n",
    );
  }
}

process.stdout.write(
  "\n\n🔴 Waiting for PostgreSQL container to accept connections",
);

waitForPostgres();
