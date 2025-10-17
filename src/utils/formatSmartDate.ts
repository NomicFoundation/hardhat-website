export function formatSmartDate(dateString: Date | string) {
  const now = new Date();
  const date = new Date(dateString);

  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const isSameYear = now.getFullYear() === date.getFullYear();

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "Last week";
  if (diffDays < 21) return "2 weeks ago";

  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();

  const monthDiff = (nowYear - dateYear) * 12 + (nowMonth - dateMonth);
  if (monthDiff === 1) return "Last month";

  if (isSameYear) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
