import Header from "@/components/common/organisms/Header";
import WordList from "@/components/words/molecules/WordList";
import WordDropdown from "@/components/words/molecules/WordDropdown";
import WordsPageName from "@/components/words/atoms/WordsPageName";

export default function AllWords() {

  return (
    <Container>
      <Header />
      <WordsPageName/>
      <WordDropdown />
      {/* 전체 단어 목록 표시 */}
    </Container>
  );
}
