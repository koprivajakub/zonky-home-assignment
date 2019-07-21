import React from "react";
import { AverageCountLabel } from "components/AverageCount/AverageCountLabel";
import { AverageCountValue } from "components/AverageCount/AverageCountValue";
import { marketplaceStore } from "store/MarketplaceStore";
import { observer } from "mobx-react";

interface Props {
  loading: boolean
}

const AverageCountComponent: React.FC<Props> = ({loading}) => (
  <>
    <AverageCountLabel>
      Aktuální průměr půjček na Zonky marketplace{loading ? " (data se aktualizují)" : ""}:
    </AverageCountLabel>
    <AverageCountValue>{marketplaceStore.averageLoan}</AverageCountValue>
  </>
);

export const AverageCount = observer(AverageCountComponent);
