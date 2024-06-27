import React, { useState } from "react";
import styled from "styled-components";
import WordItem from "../atoms/WordItem";

const wordDirectory = [
    {name: "DOM", pron: "돔", Category: "브라우저"},
    {name: "React", pron: "리액트", Category: "프레임워크"},
    {name: "yml", pron:"야믈", Category: "형식"},
    {name:"Linux", pron:"리눅스", Category: "OS"},
];

export default function WordList() {

    return (
        <WordListContainer>
            <WordListDiv>
            {wordDirectory.map((word, index) => (
                <WordItem key={index} name={word.name} pron={word.pron} />
            ))}
            </WordListDiv>
        </WordListContainer>
    );
}

const WordListContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 780px;
    height: auto;
    padding: 165px 44.5px 10 44.5px;
`;

const WordListDiv = styled.div`
    width: 691px;
    height: auto;
`;


