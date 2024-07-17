const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "xyzxyzxyz";

type Json = { [k: string]: any };
export async function post<T>(
  root: string,
  path: string,
  body: Json
): Promise<T> {
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

export async function get<T>(root: string, path: string): Promise<T> {
  const headers: Json = {};
  headers["x-admin-token"] = ADMIN_TOKEN;
  const r = await fetch(root + "/" + path, {
    method: "GET",
    headers,
  });
  const j: T = (await r.json()) as T;
  return j;
}
