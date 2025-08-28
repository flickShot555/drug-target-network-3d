import React, { useEffect, useState, useRef } from "react";

/**
 * SmartFooterAwareFloatingButton
 * - Auto-detects the footer element (no prop required)
 * - Keeps the button positioned above the footer on the Y-axis
 * - Hover: scale up by 20% (scale(1.2)) with 0.2s transition, cursor: pointer
 * - Opens `url` in a new tab (default: https://example.com)
 */
export default function SmartFooterAwareFloatingButton({
  url = "https://example.com",
  padding = 20, // finger-wide padding from edges / footer in px
  minWidth = 160,
}) {
  const [isHover, setIsHover] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(padding);
  const footerRef = useRef(null);
  const rafRef = useRef(null);
  const observerRef = useRef(null);

  // Attempts to find the page footer element intelligently.
  const findFooterElement = () => {
    // Prefer semantic/footer selectors first
    const selectors = [
      "footer",
      '[role="contentinfo"]',
      "[data-footer]",
      "#footer",
      ".footer",
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }

    // Fallback: assume the last element in body is the footer (common)
    const children = Array.from(document.body.children || []);
    for (let i = children.length - 1; i >= 0; i--) {
      const el = children[i];
      // ignore script/style/meta elements
      if (!el || el.tagName === "SCRIPT" || el.tagName === "STYLE" || el.tagName === "LINK") continue;
      // choose a DIV or FOOTER-like element near the end
      if (el.tagName === "DIV" || el.tagName === "FOOTER" || el.tagName === "SECTION") return el;
    }

    return null;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // find and store footer element
    footerRef.current = findFooterElement();

    // update offset with requestAnimationFrame for smooth batching
    const scheduleUpdate = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const footer = footerRef.current || findFooterElement();
        footerRef.current = footer;

        if (!footer) {
          setBottomOffset(padding);
          return;
        }

        const rect = footer.getBoundingClientRect();
        // visible height of footer overlapping viewport bottom
        const overlap = Math.max(0, window.innerHeight - rect.top);
        setBottomOffset(Math.ceil(overlap + padding));
      });
    };

    // initial calculation
    scheduleUpdate();

    // listeners
    const onScroll = () => scheduleUpdate();
    const onResize = () => scheduleUpdate();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Observe mutations in the body to detect when footer is added/removed/resized
    if ("MutationObserver" in window) {
      observerRef.current = new MutationObserver(() => {
        // re-find footer and recalc
        footerRef.current = findFooterElement();
        scheduleUpdate();
      });
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    // Also observe footer size changes via ResizeObserver (when available)
    let resizeObs;
    if (footerRef.current && "ResizeObserver" in window) {
      resizeObs = new ResizeObserver(() => scheduleUpdate());
      resizeObs.observe(footerRef.current);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (observerRef.current) observerRef.current.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeObs && footerRef.current) resizeObs.unobserve(footerRef.current);
    };
  }, [padding]); // padding rarely changes

  const baseStyle = {
    position: "fixed",
    right: `${padding}px`,
    bottom: `${bottomOffset}px`,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 18px",
    minWidth: `${minWidth}px`,
    borderRadius: "8px",
    background: "#1f8ef1", // chosen color (blue)
    color: "#fff",
    fontWeight: 600,
    fontSize: "14px",
    textDecoration: "none",
    boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
    transform: isHover ? "scale(1.2)" : "scale(1)",
    transition: "transform 0.2s ease",
    cursor: "pointer",
    zIndex: 9999,
    userSelect: "none",
  };

  const focusStyle = {
    outline: "2px solid rgba(255,255,255,0.25)",
    outlineOffset: "4px",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View in basic 2D (opens in new tab)"
      style={{
        ...baseStyle,
        ...(isHover ? focusStyle : {}),
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
    >
      view in basic 2D
    </a>
  );
}
