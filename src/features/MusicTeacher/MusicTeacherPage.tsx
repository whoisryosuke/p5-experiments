import { KEYBOARD_HEIGHT } from "@/components/KeyboardUI/KeyboardKeyStyled";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import MusicTeacher from "./MusicTeacher";
import KeyboardUI from "@/components/KeyboardUI/KeyboardUI";

const PageContainer = styled.div`
  padding: ${KEYBOARD_HEIGHT}px 3rem;
`;

const GlobalStyles = createGlobalStyle`
html{
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  font-family: Inter Tight, Inter, Helvetica, Arial, sans-serif;
}
`;

type Props = {};

const MusicTeacherPage = (props: Props) => {
  return (
    <PageContainer>
      <GlobalStyles />
      <h1>Chord Practice</h1>
      <MusicTeacher />
      <KeyboardUI type="app" />
      <KeyboardUI type="user" />
    </PageContainer>
  );
};

export default MusicTeacherPage;
