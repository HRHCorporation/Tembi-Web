"use client";
import { useMemo } from "react";

export function useHtmlParser(html: string | undefined) {
  return useMemo(() => {
    if (!html) {
      return {
        strongText: "",
        remainingText: "",
        hasContent: false,
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const strongElements = doc.querySelectorAll("strong");
    const strongText = Array.from(strongElements)
      .map((el) => el.textContent)
      .join(" ");

    const tempDiv = doc.body.cloneNode(true) as HTMLElement;
    tempDiv.querySelectorAll("strong").forEach((el) => el.remove());
    const remainingText = tempDiv.textContent?.trim() || "";

    return {
      strongText,
      remainingText,
      hasContent: !!(strongText || remainingText),
    };
  }, [html]);
}