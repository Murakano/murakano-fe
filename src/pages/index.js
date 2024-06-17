import Link from "next/link";
import GlobalStyles from "@/styles/GlobalStyles";

export default function Home() {
  return (
    <div>
      <GlobalStyles />
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
          <li>
            <Link href="/auth/signup">Sign Up</Link>
          </li>
          <li>
            <Link href="/search">Search</Link>
          </li>
          <li>
            <Link href="/words">All Words</Link>
          </li>
          <li>
            <Link href="/auth/requests">My Requests</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
