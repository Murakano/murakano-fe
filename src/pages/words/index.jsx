import Header from "@/components/common/organisms/Header";
import WordItem from "@/components/words/atoms/WordItem";

export default function AllWords() {
  return (
    <div>
      <Header />
      {/* 전체 단어 목록 표시 */}
      <WordItem/>
    </div>
  );
}
