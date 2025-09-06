// pages/404.js

import Link from "next/link";

export default function Custom404() {
  return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>404 - Page Not Found</h1>
        <p>We couldn't find the page you're looking for.</p>
        <Link href="/">
          <a style={{ color: "blue", textDecoration: "underline" }}>
            Go back home
          </a>
        </Link>
      </div>
  );
}
