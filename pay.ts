import { post } from "./utils";

async function go() {
  if (process.argv.length === 2) {
    console.error("Expected at least one argument!");
    process.exit(1);
  }

  const bob = "http://localhost:3002";

  const bolt11 = process.argv[2];

  await post(bob, "pay_invoice", { bolt11 });
}

go();
