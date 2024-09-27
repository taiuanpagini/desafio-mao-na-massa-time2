import styled from "styled-components";
 

export const Container = styled.div `
    height: 80%;
    width: 80%;
    padding: 0;
    margin: 0 auto;
    opacity: 90%;
    background: #FFFFFF;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;

    scrollbar-width: thin;
    scrollbar-color: #F5E2DC #ffffff;

	&::-webkit-scrollbar {
		width: 0.75rem;
	}

	&::-webkit-scrollbar-track {
		background: #ffffff;
        
	}

	&::-webkit-scrollbar-thumb {
		background-color: #B3B3B3;
		border-radius: 0.625rem;
		border: 0.188rem solid #ffffff;
	}
    
`;

export const DivInput = styled.div `
    display:flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

export const ButtonCard = styled.button`
    background-color: #FFDEF6;
    width: 120px;
    height: 30px;
    cursor: pointer;
    border-radius: 8px;

    font-family: Roboto;
    font-size: 14px;
    line-height: 18.96px;

    &:hover {
        background-color: #FFFFFF;
    }

`;

export const MessageBackend = styled.div `
    max-width: 544px;
    height: auto;
    background-color: #FFDEF6;
    word-wrap: break-word;
    color: #000;
    padding: 16px 16px;
    margin: 16px 0px 16px 86px;
    border-radius: 7px;
    align-self: start;
   
    font-family: Roboto;
    font-size: 16px;
    line-height: 18.96px;
`;
 
export const MessageFront = styled.div `
    background-color: #68009F;
    height: auto;
    color: #fff;
    max-width: 544px;
    word-wrap: break-word;
    width: fit-content;
    padding: 16px 16px;
    margin: 16px 86px 16px 0px;
    border-radius: 7px;
    align-self: end;

    font-family: Roboto;
    font-size: 16px;
    line-height: 18.96px;
`;

export const ImageFront = styled.img `
    max-height: 200px;
    width: 200px;

`;

export const ImageButtonFront = styled.button `
    cursor: pointer;
`