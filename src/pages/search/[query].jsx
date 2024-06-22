// 코드예시.
// 검색어에 따른 동적 라우팅 페이지

import { useRouter } from "next/router";

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;

  return <div>{query}</div>;
}
