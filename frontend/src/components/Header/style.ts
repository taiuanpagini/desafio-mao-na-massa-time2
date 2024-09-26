import styled from "styled-components";

export const Container = styled.div`
  
    opacity: 100%;
    width: 100%;
    margin: 0px auto;
    height: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


export const TitleContainer= styled.div `
    width: 100%;
    height: 100%;

    background-color: #fff;
    display:flex;
    justify-content: center;
    gap: 16px;
    flex-direction: row;
    align-items: center;
`;

export const Spacer = styled.div`
  width: 100%;
  margin-top: 5px;
  height: 4px;
  background-color: #68009F;
`;

export const FirstTitle = styled.div`
    color: #68009F;
    font-family: Roboto;
    font-size: 56px;
    font-weight: 300;
    line-height: 53.07px;
    letter-spacing: -0.04em;
    text-align: center;
`;

export const SecondTitle = styled.div`
    color: #D2006F;
    font-family: Roboto;
    font-size: 56px;
    font-weight: 700;
    line-height: 53.07px;
    letter-spacing: -0.04em;
    text-align: center;
`;


