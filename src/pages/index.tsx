import Head from "next/head";
import Link from "next/link";
import styles from "../styles/index.module.css";
import auth0 from "../utils/auth0";

import { Button, Divider } from "antd";
import { Button as RSuiteButton } from "rsuite";

export default function Home({ session }) {
  console.log(session);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">Home page</Link>
        <hr />
        <h1>Auth0</h1>
        <p>Basic Login/Logout using Auth0</p>
        {!session ? (
            <Link href="/api/auth0/login">
              <Button>Log In</Button>
            </Link>
        
        ) : (
          <div>
          <img className="user-image" src={session.user.picture} />
          <div>{session.user.nickname}</div>
          <div>{session.user.name}</div>
          <Link href="/api/auth0/logout">
              <Button>Log In</Button>
            </Link>
            </div>
        )}
        <Divider></Divider>
        <h1>CSS Options</h1>
        <h3>Global SCSS/LESS</h3>
        <div className="global-blue">Global SCSS/LESS</div>
        <h3>CSS Modules</h3>
        <div className={styles.red}>CSS Modules</div>
        <h3>Styled JSX</h3>
        <div className="green">Styled JSX</div>
        <Divider></Divider>
        <h1>React Component Libraries</h1>
        <Button>Antd Button</Button>
        <RSuiteButton>RSuite Button</RSuiteButton>
      </main>
      <style jsx>
        {`
          .green {
            color: green;
          }
          .user-image {
            border-radius: 50%;
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps({ res, req }) {
  const session = await auth0.getSession(req);
  console.log("session:", session);

  if (session) {
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();

    console.log(accessToken);
  }
  return {
    props: {
      session,
    },
  };
}
