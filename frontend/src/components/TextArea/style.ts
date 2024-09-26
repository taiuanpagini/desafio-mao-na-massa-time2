import styled from "styled-components";

export const TextInput = styled.input `
    width: 851px;
    height: 28px;
    border: #ffffff;
    border-radius: 8px;
    opacity: 0px;
    color: #000000;
    font-family: Mundial;
    font-size: 20px;
    font-weight: 300;
    line-height: 18.96px;
    text-align: left;
    padding: 8px 16px;

    &::placeholder {
        color: #AAAAAA;
    }
`;

export const ContainerInput = styled.div `
    display:flex;
    justify-content: center;
    gap: 16px;
`;

export const Container = styled.div `
    width: 100%;
    height: 10%;
    background: #F5E2DC;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Mic = styled.img `
    cursor: pointer;
`;

export const Plus = styled.img `
    cursor: pointer;
`;