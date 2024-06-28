import Header from "@/components/common/organisms/Header";
import styled from "styled-components";
import { Container } from "@/styles/commonStyles";
import WordsPageName from "@/components/words/atoms/WordsPageName";
import WordList from "@/components/words/molecules/WordList";
import WordDropdown from "@/components/words/molecules/WordDropdown";
import ComDropdown from "@/components/common/molecules/ComDropdown";


export default function AllWords() {
  return (
    <Container>
      <Header />
      <WordsPageName/>
      <DropdownContainer>
        <WordDropdown />
        <ComDropdown />
      </DropdownContainer>
      <WordList />
    </Container>
  );
}

const DropdownContainer = styled.div`
    display: flex;
    flex-start: left;
    width: 691px;
    height: 35px;
    gap: 20px;
`;