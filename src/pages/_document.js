import { Html, Head, Main, NextScript } from 'next/document';
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='/murak-logo-removebg.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div> {/* 모달을 렌더링할 타겟 요소 추가 */}
        </body>
      </Html>
    );
  }
}
