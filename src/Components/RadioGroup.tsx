import styled from "styled-components";
import { ChangeEvent, useCallback, memo } from "react";

interface RadioItem {
  text: string;
  value: string;
}
interface RadioGroupProps {
  options: RadioItem[];
  groupLabel: string;
  onChange: (itemValue: string) => void;
}
const RadioGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: max-content;
`;

const RadioGroupLabel = styled.label`
  font-weight: 500;
  align-self: flex-start;
`;
const RadioItemInput = styled.input`
  margin: 0 10px;
`;

const StyledRadioItem = styled.div`
  margin: 3px 0;
`;

const RadioGroup = memo(function RadioGroup(props: RadioGroupProps) {
  const { onChange } = props;
  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
    [onChange]
  );
  return (
    <RadioGroupContainer onChange={onChangeHandler}>
      <RadioGroupLabel>{props.groupLabel}:</RadioGroupLabel>
      {props.options.map((item: RadioItem) => {
        return (
          <StyledRadioItem key={item.value}>
            <RadioItemInput type="radio" id={item.value} name={props.groupLabel} value={item.value} />
            <label htmlFor={item.value}>{item.text}</label>
          </StyledRadioItem>
        );
      })}
    </RadioGroupContainer>
  );
});

export default RadioGroup;
