// Log events to Discord via webhook

import { env } from "@/lib/private-env";
import { DiscordEmbed, EmbedColors } from "@/types/logging/discord-types";
import {
  CheckoutSessionCreationEvent,
  PasswordChangeEvent,
  PasswordResetEvent,
  PasswordResetRequestEvent,
  PurchaseEvent,
} from "@/types/logging/event-types";

interface LoggerConstructor {
  passwordChangeWebhookUrl: string;
  passwordResetWebhookUrl: string;
  purchaseWebhookUrl: string;
  checkoutSessionWebhookUrl: string;
}

class Logger {
  private passwordChangeWebhookUrl: string;
  private passwordResetWebhookUrl: string;
  private purchaseWebhookUrl: string;
  private isLoggingEnabled: boolean = env.IS_LOGGING_ENABLED === "true";
  private checkoutSessionWebhookUrl: string;

  constructor(params: LoggerConstructor) {
    this.passwordChangeWebhookUrl = params.passwordChangeWebhookUrl;
    this.passwordResetWebhookUrl = params.passwordResetWebhookUrl;
    this.purchaseWebhookUrl = params.purchaseWebhookUrl;
    this.checkoutSessionWebhookUrl = params.checkoutSessionWebhookUrl;
  }

  async logPasswordChange(event: PasswordChangeEvent) {
    if (!this.isLoggingEnabled) return;

    const embed: DiscordEmbed = {
      title: "An user has changed their password",
      description: `User with email ${event.userEmail} has changed their password.`,
      footer: {
        text: `Timestamp: ${event.timestamp}`,
      },
      color: EmbedColors.SUCCESS,
    };

    await fetch(`${this.passwordChangeWebhookUrl}?wait=true`, {
      method: "POST",
      body: JSON.stringify({ embeds: [embed] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async logPasswordReset(event: PasswordResetEvent) {
    if (!this.isLoggingEnabled) return;

    const embed: DiscordEmbed = {
      title: "An user has reset their password",
      description: `User with email ${event.userEmail} has reset their password.`,
      footer: {
        text: `Timestamp: ${event.timestamp}`,
      },
      color: EmbedColors.SUCCESS,
    };

    await fetch(`${this.passwordResetWebhookUrl}?wait=true`, {
      method: "POST",
      body: JSON.stringify({ embeds: [embed] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async logPasswordResetRequest(event: PasswordResetRequestEvent) {
    if (!this.isLoggingEnabled) return;

    const embed: DiscordEmbed = {
      title: "A user has requested a password reset",
      description: `User with email ${event.userEmail} has requested a password reset. An e-mail was sent to them containing the password reset link.`,
      footer: {
        text: `Timestamp: ${event.timestamp}`,
      },
      color: EmbedColors.SUCCESS,
    };

    await fetch(`${this.passwordResetWebhookUrl}?wait=true`, {
      method: "POST",
      body: JSON.stringify({ embeds: [embed] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async logPurchase(event: PurchaseEvent) {
    if (!this.isLoggingEnabled) return;

    const embed: DiscordEmbed = {
      title: "A user has purchased a plan",
      description: `User with email ${event.customerEmail} has purchased the ${event.plan} plan.\nPayment gateway: ${event.paymentGateway}`,
      footer: {
        text: `Timestamp: ${event.timestamp}`,
      },
      color: EmbedColors.SUCCESS,
    };

    await fetch(`${this.purchaseWebhookUrl}?wait=true`, {
      method: "POST",
      body: JSON.stringify({ embeds: [embed] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async logCheckoutSessionCreation(event: CheckoutSessionCreationEvent) {
    if (!this.isLoggingEnabled) return;

    const embed: DiscordEmbed = {
      title: "A checkout session has been created",
      description: `User with email ${event.customerEmail} has created a checkout session for the ${event.plan} plan.\nPayment gateway: ${event.paymentGateway}`,
      footer: {
        text: `Timestamp: ${event.timestamp}`,
      },
      color: EmbedColors.SUCCESS,
    };

    await fetch(`${this.checkoutSessionWebhookUrl}?wait=true`, {
      method: "POST",
      body: JSON.stringify({ embeds: [embed] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const logger = new Logger({
  passwordChangeWebhookUrl: env.PASSWORD_CHANGE_WEBHOOK_URL,
  passwordResetWebhookUrl: env.PASSWORD_RESET_WEBHOOK_URL,
  purchaseWebhookUrl: env.PURCHASE_WEBHOOK_URL,
  checkoutSessionWebhookUrl: env.CHECKOUT_SESSION_WEBHOOK_URL,
});
