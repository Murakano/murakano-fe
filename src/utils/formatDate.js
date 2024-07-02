// utils/formatDate.js
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/. /g, '.')
    .slice(0, -1); // 마지막 문자 제거
}
