export default function capitalizeAndAddSpaces(inputText: string) {
  const text = inputText.toLowerCase();
  let result = '';
  result += text.charAt(0).toUpperCase();
  for (let i = 1; i < text.length; i++) {
    let currentChar = text.charAt(i);
    const previousChar = text.charAt(i - 1);
    if (previousChar === ' ') {
      result += currentChar.toUpperCase();
    } else result += currentChar;
  }

  return result;
}
