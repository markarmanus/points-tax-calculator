import styled from "styled-components";
import COLORS from "../Constants/Colors";
import { memo } from "react";
interface ButtonProps {
  text: string;
  onClick?: () => void;
  containerStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const StyledButton = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: ${COLORS.primary};
  cursor: pointer;
  transition: border-color 0.25s;
  &:hover {
    border-color: ${COLORS.highlight};
  }
`;

const Button = memo(function Button(props: ButtonProps) {
  return (
    <ButtonContainer style={props.containerStyle}>
      <StyledButton style={props.buttonStyle} onClick={props.onClick}>
        {props.text}
      </StyledButton>
    </ButtonContainer>
  );
});

export default Button;
