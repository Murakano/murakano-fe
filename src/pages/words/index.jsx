import styled from 'styled-components';
import { React, useEffect } from 'react';
import WordsPageName from '@/components/words/atoms/WordsPageName';
import { useSearchTermStore } from '@/store/useSearchTermStore';
import WordsSection from '@/components/words/organisms/WordsSection';

export default function AllWords() {
  const { setSearchTerm } = useSearchTermStore();

  useEffect(() => {
    setSearchTerm('');
  }, []);

  return (
    <Section>
      <WordsPageName />
      <WordsSection />
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
