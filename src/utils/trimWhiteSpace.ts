export const trimWhiteSpace = (text: string) =>
  text.trim().replace(/^ {2}/gm, '');
