import { React, useEffect } from 'react';

import { useSearchTermStore } from '@/store/useSearchTermStore';

import styled from 'styled-components';
import WordsPageName from '@/components/words/atoms/WordsPageName';
import WordsSection from '@/components/words/organisms/WordsSection';
import TopScrollBtn from '@/components/common/atoms/TopScrollBtn';

export const getServerSideProps = async (context) => {
  const referer = context.req.headers.referer || null;
  return {
    props: {
      referer,
    },
  };
};

export default function AllWords({ referer }) {
  const { setSearchTerm } = useSearchTermStore();

  useEffect(() => {
    setSearchTerm('');
  }, []);

  return (
    <Section>
      <WordsPageName />
      <ScrollContainer>
        <TopScrollBtn />
      </ScrollContainer>
      <WordsSection referer={referer} />
    </Section>
  );
}

//   height: calc(100vh - 130px);
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  max-width: 100vw;
`;

const ScrollContainer = styled.div`
  position: absolute;
  z-index: 10;
  right: 15%;
  bottom: 10%;
`;
