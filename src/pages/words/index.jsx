import Header from '@/components/common/organisms/Header';
import styled from 'styled-components';
import { Container } from '@/styles/commonStyles';
import WordsPageName from '@/components/words/atoms/WordsPageName';
import WordList from '@/components/words/molecules/WordList';
import WordDropdown from '@/components/words/molecules/WordDropdown';
import SortDropdown from '@/components/words/molecules/SortDropdown';

export default function AllWords() {
  return (
    <Section>
      <WordsPageName />
      <DropdownContainer>
        <WordDropdown />
        <SortDropdown />
      </DropdownContainer>
      <WordList />
    </Section>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  height: calc(100vh - 130px);
  max-width: 100vw;
`;

const DropdownContainer = styled.div`
  display: flex;
  width: 691px;
  height: 35px;
  gap: 20px;
  margin-bottom: 10px;
`;
