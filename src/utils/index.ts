export { default as chakraMarkdownHeadings } from './chakraMarkdownHeadings';

export const shortenText = (text: string, maxWords: number): string => {
  const words = text.split(' ');
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(' ') + '...';
};
