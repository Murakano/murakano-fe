import Header from "@/components/common/organisms/Header";
import { Container } from "@/styles/commonStyles";
import WordsPageName from "@/components/words/atoms/WordsPageName";
import WordList from "@/components/words/molecules/WordList";

export default function AllWords() {
  return (
    <Container>
      <Header />
      <WordsPageName/>
      <WordList />
    </Container>
  );
}
