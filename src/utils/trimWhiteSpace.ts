export const trimWhiteSpace = (text: string) =>
  text
    .trim()
    .split('\n')
    .map(s => s.trim())
    .join('\n');
