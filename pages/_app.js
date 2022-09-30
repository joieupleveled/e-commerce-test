import { css, Global } from '@emotion/react';
import Header from '../components/Header';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            margin: 0;
          }
        `}
      />
      {/* <Header /> */}
      {/* The "Component" component refers to the current page that is being rendered. It changes based on what is the current page you are looking at - like magic being currently being wished. i.e. Look at about, it will change to about. Look at Team Index, then it will change to team index */}

      <Layout>
        {/* How to pass the infor from myapp to layout component? Ans: add name="karl" inside the Layout*/}

        {/* <footer>This is my footer</footer> */}
        <Component {...pageProps} />
      </Layout>
      {/* How to create props.childre? Wrap using opening and closing tag(see Layout tags above) */}
    </>
  );
}

export default MyApp;
