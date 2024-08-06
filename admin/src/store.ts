import { writable } from "svelte/store";

export interface User {
  root: string;
  scids: number[];
  ok_key: string;
  msg_count: number;
  active: number;
  pmt_count: number;
}

export const users = writable<User[]>([]);

export interface Pmt {
  scid: number;
  amt_msat: number;
  rhash: string;
  ts: number;
  remote: boolean;
  msg_idx?: number;
  error?: string;
}
