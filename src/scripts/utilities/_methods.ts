export const hasInvalidChars = (str: string) => {
  const invalid = ["\\", "/", ":", "*", "?", "\"", "<", ">", "|"];
  return invalid.some(char => str.includes(char));
};

export const getCurrentFolderId = (): string => {
  const match = window.location.hash.match(/^#\/folder\/([^/]+)/);
  return match ? match[1] : "root";
};