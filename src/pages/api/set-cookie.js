// pages/api/set-cookie.js

import cookie from 'cookie';

export default function handler(req, res) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('accessToken', 'your_access_token_value', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
      path: '/',
    })
  );
  console.log('Cookie set- sssr', 1001);

  res.status(200).json({ message: 'Cookie set' });
}
