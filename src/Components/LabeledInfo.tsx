import styled from "styled-components";
import { memo } from "react";
import COLORS from "../Constants/Colors";

interface LabeledInfoProps {
  label: string;
  info: string;
}

const LabeledInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: row;
  margin: 10px;
`;
const InfoContainer = styled.div`
  width: 100%;
  flex: 1;
  padding: 5px;
  flex-grow: 2;
  background-color: ${COLORS.secondary};
  border-radius: 4px;
`;
const LabelContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  flex: 3;
  flex-shrink: 2;
  text-align: left;
  padding: 5px;
  padding-left: 5%;
  background-color: ${COLORS.primary};
`;

const LabeledInfo = memo(function LabeledInfo(props: LabeledInfoProps) {
  return (
    <LabeledInfoContainer>
      <LabelContainer>{props.label}</LabelContainer>
      <InfoContainer>{props.info}</InfoContainer>
    </LabeledInfoContainer>
  );
});

export default LabeledInfo;
