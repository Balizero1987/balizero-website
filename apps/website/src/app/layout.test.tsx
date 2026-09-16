import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import RootLayout from "./layout";

vi.mock("../components/ZantaraEntry", () => ({
  ZantaraEntry: () => <div />,
}));

const CONSENT_MARKER = "'consent','default'";
const GTAG_LOADER = "googletagmanager.com/gtag/js";

function renderLayout(): string {
  return renderToStaticMarkup(<RootLayout>{null as ReactNode}</RootLayout>);
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("GA4 loader ordering in the served document", () => {
  it("emits the consent default before the gtag.js loader", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TESTID0001");

    const html = renderLayout();
    const consentAt = html.indexOf(CONSENT_MARKER);
    const loaderAt = html.indexOf(GTAG_LOADER);

    expect(consentAt).toBeGreaterThan(-1);
    expect(loaderAt).toBeGreaterThan(-1);
    expect(consentAt).toBeLessThan(loaderAt);
    // A truthy `async` prop makes React 19 hoist the loader ahead of the
    // consent default, so the tag shape itself is part of the contract.
    expect(html).toContain(
      '<script defer="" src="https://www.googletagmanager.com/gtag/js?id=G-TESTID0001">',
    );
  });

  it("configures the measurement id after the loader", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TESTID0001");

    const html = renderLayout();

    expect(html).toContain("gtag('config','G-TESTID0001')");
    expect(html.indexOf(GTAG_LOADER)).toBeLessThan(
      html.indexOf("gtag('config','G-TESTID0001')"),
    );
  });

  it("emits no gtag loader at all without a measurement id", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");

    const html = renderLayout();

    expect(html).not.toContain(GTAG_LOADER);
    expect(html).not.toContain("gtag('config'");
    expect(html).toContain(CONSENT_MARKER);
  });
});
