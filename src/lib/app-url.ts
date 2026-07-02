/**
 * Destination for the primary "Get Started" CTA — the retaind product app.
 *
 * Configured via NEXT_PUBLIC_APP_URL so prod and dev can point at different
 * hosts. Both environments currently target the dev app (dev.retaind.ai);
 * change the prod environment's value once the prod app is live.
 */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://dev.retaind.ai";

/** Sign-in page on the product app (used by the navbar Login links). */
export const SIGNIN_URL = `${APP_URL}/signin`;

/** Sign-up page on the product app (used by account-creation CTAs). */
export const SIGNUP_URL = `${APP_URL}/signup`;
