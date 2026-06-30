// Client-side device identity via the open-source FingerprintJS. Computes a
// browser fingerprint entirely client-side (no API key, no network to a
// fingerprint vendor) and is used to limit AI report generation per device.
// Fails open: any error returns null and the caller lets the submission through.
import FingerprintJS, { type Agent } from "@fingerprintjs/fingerprintjs";

export interface Visitor {
  visitorId: string;
}

let agentPromise: Promise<Agent> | null = null;

// Returns the device's visitorId, or null when fingerprinting is unavailable
// (ad-blocker, error). Never throws.
export async function getVisitor(): Promise<Visitor | null> {
  try {
    if (!agentPromise) agentPromise = FingerprintJS.load();
    const result = await (await agentPromise).get();
    return { visitorId: result.visitorId };
  } catch (err) {
    console.warn("Fingerprint unavailable, allowing submission:", err);
    return null;
  }
}
