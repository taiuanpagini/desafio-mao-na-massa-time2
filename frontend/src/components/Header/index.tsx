import React from "react";
import { Container, FirstTitle, SecondTitle, Spacer, TitleContainer } from "./style";

const Header: React.FC = () => {
    return (
        <Container>
            <TitleContainer>
            <FirstTitle>Chat |</FirstTitle>
            <SecondTitle>Mão na Massa</SecondTitle>
            </TitleContainer>
           
            <Spacer></Spacer>
        </Container>
    );
}

export default Header;