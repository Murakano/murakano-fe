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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 780px;
  position: relative;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ScrollContainer = styled.div`
  position: absolute;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 10;
  right: 10px;
  width: 40px;
  height: 40px;
  @media (max-width: 600px) {
    right: 13%;
  }
`;
