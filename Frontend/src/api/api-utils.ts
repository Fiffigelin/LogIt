export function requireMessage(msg?: string): string {
  return msg ?? "Ett okänt serverfel inträffade";
}
