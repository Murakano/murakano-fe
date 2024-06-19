import { useRouter } from "next/router";

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;

  return (
    <div>
      <h1>Search Results for:hkhjkk {query}</h1>
      {/* 검색 결과 표시 */}
    </div>
  );
}
