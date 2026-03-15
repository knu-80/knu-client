export const formatLikeCount = (count: number) => {
  if (count < 1000) return count.toString();

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(count);
};
