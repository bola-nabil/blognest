export const getExcerpt = (html, wordLimit = 30) => {
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.split(' ');
  return (
    words.slice(0, wordLimit).join(' ') +
    (words.length > wordLimit ? '...' : '')
  );
};
