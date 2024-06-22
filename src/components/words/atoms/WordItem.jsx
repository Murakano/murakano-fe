// src/components/words/atoms/WordItem.js
import React from "react";
import styled from "styled-components";
import WordListIcon from "../../../../public/murak_list_icon.svg";
import Link from "next/link";

/*
TO-DO
드롭다운 - 전체 + 영역 나눠서 + 스타일 (후버, 커서효과)
목록 내 아이콘, 제목, 내용 + 리스트 한칸 
*/

// 전체 단어 목록 
export default function WordItem({name, pron}) {
    return (
        <ListRow>
            <WordContents>
                <WordName>
                    <h1>{name}</h1>
                </WordName>
                <WordPron>
                    <h1>{pron}</h1>
                </WordPron>
            </WordContents>
            <WordListIconDiv href="/search">
                <WordListIcon/>
            </WordListIconDiv>
            <ListBottomLine>
                <div></div>
            </ListBottomLine>
        </ListRow>
    )
}

const ListRow = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    display: flex;

    width: 691px;
    height: 92px;
    padding: 10px 0px 0px 0px;
    &:hover {
    background: #B8D5FF1A;
    }

`;

const WordContents = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    left : 110px;
`;

const WordName = styled.div`
    width: 34px;
    height: 23px;
    margin: 5px 0 10px 0;
    font-size: 15px;
    font-weight: 600;
    line-height: 22.5px;
    letter-spacing: -0.03em;
`;

const WordPron = styled.div`
    width: 50px;
    height: 20px;
    font-size: 13px;
    font-weight: 300;
    line-height: 19.5px;
    letter-spacing: -0.03em;
`;

const WordListIconDiv = styled(Link)`
    width: 24px;
    height: 24px;
    position:relative;
    left: 580px;
    top: 20px;
    text-decoration: none;
    color: inherit;
`;

const ListBottomLine = styled.div`
    width: 691px;
    border-bottom: 1px solid #CCCCCC
`;