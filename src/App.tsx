import React, { useEffect, useRef, useState } from "react";
import { marketplaceRequest } from "networking/marketplaceRequest";
import { ProgressBar } from "components/ProgressBar";
import { AverageCount } from "components/AverageCount";
import { Filter } from "components/Filter";
import { marketplaceStore } from "store/MarketplaceStore";
import { observer } from "mobx-react";

const App: React.FC = () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const totalPages = useRef(0);

  useEffect(() => {
    marketplaceRequest(page, marketplaceStore.selectedRating).then(
      countOfPages => {
        totalPages.current = countOfPages;
        const lastPageIndex = totalPages.current - 1; // pages are indexed from 0, therefore the latest page index is equal to its count - 1
        setLoading(lastPageIndex > page);

        lastPageIndex > page &&
          setPage(previouslyRequestedPage => previouslyRequestedPage + 1);
      }
    );
  }, [page]);

  return (
    <>
      <Filter
        onFilterChange={(selectedFilterValue: string) => {
          marketplaceStore.setSelectedRating(selectedFilterValue);
          setPage(0);
        }}
        selectedValue={marketplaceStore.selectedRating}
      />
      <ProgressBar current={page + 1} total={totalPages.current} />
      <AverageCount loading={loading} />
    </>
  );
};

export default observer(App);
