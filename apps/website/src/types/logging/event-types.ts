export type PasswordChangeEvent = {
  userEmail: string;
  timestamp: string;
};

export type PasswordResetEvent = {
  userEmail: string;
  timestamp: string;
};

export type PasswordResetRequestEvent = {
  userEmail: string;
  timestamp: string;
};

export type PurchaseEvent = {
  customerEmail: string;
  plan: "BASIC" | "COMPLETE" | "CREDIT";
  timestamp: string;
  paymentGateway: "STRIPE" | "MERCADOPAGO";
};

export type CheckoutSessionCreationEvent = {
  customerEmail: string;
  plan: "BASIC" | "COMPLETE" | "CREDIT";
  timestamp: string;
  paymentGateway: "STRIPE" | "MERCADOPAGO";
};
