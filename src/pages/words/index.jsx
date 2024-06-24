import Header from "@/components/common/organisms/Header";
import { Container } from "@/styles/commonStyles";
import WordsPageName from "@/components/words/atoms/WordsPageName";

export default function AllWords() {
  return (
    <Container>
      <Header />
      <WordsPageName/>
    </Container>
  );
}
