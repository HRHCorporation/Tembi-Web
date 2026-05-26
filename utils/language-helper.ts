export function getLocalizedField<T extends Record<string, any>>(
  obj: T | null | undefined,
  baseField: string,
  language: "id" | "en"
): string {
  if (!obj) return "";

  const fieldInd = `${baseField}_ind`;
  const fieldEng = `${baseField}_eng`;

  if (language === "id" && fieldInd in obj) {
    return String(obj[fieldInd] || "");
  }

  if (language === "en" && fieldEng in obj) {
    return String(obj[fieldEng] || obj[fieldInd] || "");
  }

  return "";
}