const generateSoftRgbColor = (text: string): string => {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  const rgbArray = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    rgbArray[i] = (hash >> (i * 8)) & 255;

    // Увеличение яркости для темных цветов
    if (rgbArray[i] < 128) {
      rgbArray[i] += 128;
    }
  }

  return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
};

export default generateSoftRgbColor;
