import styled from "styled-components";
import { ChangeEvent, useCallback, memo, HTMLInputTypeAttribute, useState } from "react";
import COLORS from "../Constants/Colors";

interface LabeledInputProps {
  label: string;
  onChange: (itemValue: string) => void;
  type: HTMLInputTypeAttribute;
  validator?: (itemValue: string) => boolean;
  errorMessage?: string;
  placeholder?: string;
}
const OuterContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ErrorContainer = styled.span`
  color: ${COLORS.error};
  font-size: 0.8em;
  align-self: center;
`;
const Label = styled.label`
  margin-right: 10px;
`;

const LabeledInput = memo(function LabeledInput(props: LabeledInputProps) {
  const { onChange, validator } = props;
  const [showError, setShowError] = useState<boolean>(false);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event?.target?.value;
      if (value !== undefined) {
        onChange(value);
        if (validator) setShowError(!validator(value));
      }
    },
    [onChange, validator]
  );

  return (
    <OuterContainer>
      <InnerContainer>
        <Label>{props.label}:</Label>
        <input placeholder={props.placeholder} type={props.type} onChange={onChangeHandler} />
      </InnerContainer>
      {showError && <ErrorContainer>{props.errorMessage}</ErrorContainer>}
    </OuterContainer>
  );
});

export default LabeledInput;
