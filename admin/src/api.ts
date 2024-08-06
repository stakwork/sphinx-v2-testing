import * as store from "./store";
import { get } from "./utils";

export const ADMIN_TOKEN = "xyzxyzxyz";
export const ROOT = "http://localhost:8888/admin";

interface UserRes {
  users: store.User[];
}

export async function get_users(): Promise<UserRes> {
  const res = await get<UserRes>("all");
  store.users.set(res.users);
  console.log("get_users", res);
  return res;
}

export async function get_payments(pk: string): Promise<store.Pmt[]> {
  const res = await get<store.Pmt[]>(`payments/${pk}`);
  console.log("get_payments", res);
  return res;
}
