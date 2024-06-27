import React from "react";
import styled from "styled-components";
import WordItem from "../atoms/WordItem";
import { useRouter } from "next/router";

const wordDirectory = [
    {name: "DOM", pron: "돔"},
    {name: "React", pron: "리액트"},
    {name: "yml", pron:"야믈"},
    {name:"Linux", pron:"리눅스"},
];

export default function WordList() {
    const router = useRouter();

    const handleWordClick = (name) => {
        if(name) {
            router.push(`/search/${name}`);
        }
    }

    return (
        <WordListContainer>
            {wordDirectory.map((word, index
            ) => (
                <WordListDiv key = {index} onClick = {() => handleWordClick(word.name)} >
                    <WordItem name={word.name} pron={word.pron} />
                </WordListDiv>
            ))}
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


