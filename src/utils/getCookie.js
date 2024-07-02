import Cookies from 'js-cookie';

export function getCookie() {
  const token = Cookies.get('accessToken');
  console.log(token, 'getCookie-jscookie-csr', 555);
  return token;
}
