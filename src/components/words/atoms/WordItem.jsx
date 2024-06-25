// src/components/words/atoms/WordItem.js
import React from "react";
import styled from "styled-components";
import WordListIcon from "../../../../public/murak_list_icon.svg";
import { useRouter } from 'next/router';

// 전체 단어 목록 
export default function WordItem({name, pron}) {
    const router = useRouter();
    const { query } = router.query;

    // 단어 클릭시, 검색 결과 페이지로 이동 함수 
    const hanldleClick = () => {
        router.push(`/search/${query}`);
    }

    return (
        <ListContainer>
            <ListInnerContainer onClick={hanldleClick}>
                <WordContents>
                    <WordName>
                        <div>{name}</div>
                    </WordName>
                    <WordPron>
                        <div>{pron}</div>
                    </WordPron>
                </WordContents>
                <WordListIconDiv>
                    <WordListIcon/>
                </WordListIconDiv>
            </ListInnerContainer>
        </ListContainer>
    )
}

const ListContainer = styled.div`
    width: 691px;
    height: 85px;
    padding: 6.5px 36px;
    margin-top: 10px;
    border-bottom: 1px solid #CCCCCC;

    &:hover {
    background: #B8D5FF1A;
    }
`;

const ListInnerContainer = styled.div`
    display: inline-block;
    width: 617px;
    height: 79px;
    justify-content: space-between;
    text-decoration: none;
    color: inherit;
`;

const WordContents = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: -55px;
    width:57px; 
    height: 121px;
    padding: 34px 0px;
    margin: 21px 0 21px 10px;
    gap: 10px;
`;

const WordName = styled.div`
    height: 23px;
    margin: 5px 0 10px 0;
    font-size: 15px;
    font-weight: 600;
    line-height: 22.5px;
    letter-spacing: -0.03em;
`;

const WordPron = styled.div`
    height: 20px;
    font-size: 13px;
    font-weight: 300;
    line-height: 19.5px;
    letter-spacing: -0.03em;
`;

const WordListIconDiv = styled.div`
    width: 24px;
    height: 44px;
    margin: 17.5px 10px 17.5px 0;
    padding: 10px 0;
    position:relative;
    top: -150px;
    left: 590px;
`;
