export function getCookie(name) {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];
  return token;
}
