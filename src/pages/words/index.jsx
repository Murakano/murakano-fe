import styled from 'styled-components';
import { React, useEffect } from 'react';
import WordsPageName from '@/components/words/atoms/WordsPageName';
import WordList from '@/components/words/molecules/WordList';
import SortDropdown from '@/components/words/molecules/SortDropdown';
import { useSearchTermStore } from '@/store/useSearchTermStore';

export default function AllWords() {
  const { setSearchTerm } = useSearchTermStore();

  useEffect(() => {
    setSearchTerm('');
  }, []);

  return (
    <Section>
      <WordsPageName />
      <DropdownContainer>
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
