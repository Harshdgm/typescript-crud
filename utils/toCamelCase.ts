export function toCamelCase(text: string | string[]) {
  if (!text) return "";

  if (Array.isArray(text)) {
    text = text.join(", ");  
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}