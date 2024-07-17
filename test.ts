import type {
  InvoiceResponse,
  InvoiceBody,
  CheckInvoiceBody,
  PayInvoiceBody,
} from "./types.ts";
import { post } from "./utils";

async function go() {
  const alice = "http://localhost:3001";
  const bob = "http://localhost:3002";

  const invRes: InvoiceResponse = await post(alice, "invoice", <InvoiceBody>{
    amt_msat: 1000000,
  });
  console.log("invRes", invRes);

  const checkRes1 = await post(alice, "check_invoice", <CheckInvoiceBody>{
    payment_hash: invRes.payment_hash,
  });
  console.log("checkRes1", checkRes1);

  const payRes = await post(bob, "pay_invoice", <PayInvoiceBody>{
    bolt11: invRes.bolt11,
  });
  console.log("payRes", payRes);

  await sleep(500);

  const checkRes = await post(alice, "check_invoice", <CheckInvoiceBody>{
    payment_hash: invRes.payment_hash,
  });
  console.log("checkRes", checkRes);
}

go();

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
