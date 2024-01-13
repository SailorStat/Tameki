const generateHexColor = (text: string): string => {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  const c = (hash & 0x00ffffff).toString(16).toUpperCase();

  return `#${"00000".substring(0, 6 - c.length) + c}`;
};

export default generateHexColor;
