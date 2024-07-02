// pages/api/get-cookie.js
import cookies from 'next-cookies';

export default function handler(req, res) {
  const allCookies = cookies({ req });
  const accessToken = allCookies.accessToken;
  console.log(accessToken, 'get-cookie-ssr', 1001);
  res.status(200).json({ accessToken });
}
