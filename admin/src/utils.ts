import { ADMIN_TOKEN, ROOT } from "./api";

type Json = { [k: string]: any };
export async function post<T>(path: string, body: Json): Promise<T> {
  const headers: Json = {
    "Content-Type": "application/json",
  };
  if (path !== "authorize") {
    headers["x-admin-token"] = ADMIN_TOKEN;
  }
  const r = await fetch(ROOT + "/" + path, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const j: T = await r.json();
  return j;
}

export async function get<T>(path: string): Promise<T> {
  const headers: Json = {};
  if (path !== "authorize") {
    headers["x-admin-token"] = ADMIN_TOKEN;
  }
  const r = await fetch(ROOT + "/" + path, {
    method: "GET",
    headers,
  });
  const j: T = await r.json();
  return j;
}
