const ADMIN_TOKEN = "xyzxyzxyz";

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

type Json = { [k: string]: any };
async function post<T>(root: string, path: string, body: Json): Promise<T> {
  const headers: Json = {
    "Content-Type": "application/json",
  };
  headers["x-admin-token"] = ADMIN_TOKEN;
  const r = await fetch(root + "/" + path, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const j: T = (await r.json()) as T;
  return j;
}

async function get<T>(root: string, path: string): Promise<T> {
  const headers: Json = {};
  headers["x-admin-token"] = ADMIN_TOKEN;
  const r = await fetch(root + "/" + path, {
    method: "GET",
    headers,
  });
  const j: T = (await r.json()) as T;
  return j;
}

go();

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface PayInvoiceBody {
  bolt11: string;
}
interface InvoiceBody {
  amt_msat: number;
}
interface InvoiceResponse {
  bolt11: string;
  payment_hash: string;
}
interface CheckInvoiceBody {
  payment_hash: string;
}
