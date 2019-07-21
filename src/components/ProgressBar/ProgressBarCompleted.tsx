import styled from "styled-components";

interface Props {
  percentage: number;
}

export const ProgressBarCompleted = styled.div<Props>`
  width: ${(props) => `${props.percentage}%`};
  height: 100%;
  background: #67ff81;
  position: absolute;
  top: 0;
  left: 0;
`;
