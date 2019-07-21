import React from "react";
import { ProgressBarWrapper } from "components/ProgressBar/ProgressBarWrapper";
import { ProgressBarCompleted } from "components/ProgressBar/ProgressBarCompleted";
import {ProgressBarText} from "components/ProgressBar/ProgressBarText";

interface Props {
  total: number;
  current: number;
}

const ProgressBar: React.FC<Props> = ({ total = 0, current = 0 }) => {
  return (
    <ProgressBarWrapper>
      <ProgressBarCompleted percentage={(current / total) * 100} />
      <ProgressBarText>aktualizuji data ze stránky <strong>{current}</strong> z celkem <strong>{total}</strong> stránek na Zonky marketplace</ProgressBarText>
    </ProgressBarWrapper>
  );
};


export {
  ProgressBar
}
