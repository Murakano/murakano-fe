export function getCookie() {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];
  console.log(1);
  return token;
}
