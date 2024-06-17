import { useState } from "react";
import { useRouter } from "next/router";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search?query=${searchTerm}`);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      {router.query.query && (
        <div>
          <h2>Results for: {router.query.query}</h2>
          {/* 검색 결과 표시 */}
        </div>
      )}
    </div>
  );
}
