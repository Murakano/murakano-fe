import React from "react";
import styled from "styled-components";
import WordListIcon from "../../../../public/murak_list_icon.svg";
import Link from "next/link";
import WordItem from "../atoms/WordItem";

export default function WordList() {
    const wordDirectory = [
        {name: "DOM", pron: "돔"},
        {name: "React", pron: "리액트"},
        {name: "yml", pron:"야믈"},
        {name:"Linux", pron:"리눅스"},
    ];

    return(
        <WordListDiv>
            {wordDirectory.map((word, index) => (
                <WordItem key={index} name={word.name} pron={word.pron} />
            ))}
        </WordListDiv>
    );
}

const WordListDiv = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 165px;
    left: 374.5px;
    
`;