export interface PayInvoiceBody {
  bolt11: string;
}
export interface InvoiceBody {
  amt_msat: number;
}
export interface InvoiceResponse {
  bolt11: string;
  payment_hash: string;
}
export interface CheckInvoiceBody {
  payment_hash: string;
}
