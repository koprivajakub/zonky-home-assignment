import React, { memo, useMemo } from "react";

interface Props {
  onFilterChange: (value: string) => void;
  selectedValue: string;
}

const ratingMap: Map<string, string> = new Map<string, string>([
  ["AAAAAA", "2.99%"],
  ["AAAAA", "3.99%"],
  ["AAAA", "4.99%"],
  ["AAA", "5.99%"],
  ["AAE", "6.99%"],
  ["AA", "8.49%"],
  ["AE", "9.49%"],
  ["A", "10.99%"],
  ["B", "13.49%"],
  ["C", "15.49%"],
  ["D", "19.99%"],
]);

const getRatingFilterOptions = (): React.ReactNode[] => {
  const ratingMapIterator = ratingMap.entries();
  let ratingMapValue = ratingMapIterator.next();

  const toReturn: React.ReactNode[] = [];

  while (!ratingMapValue.done) {
    toReturn.push(
      <option key={ratingMapValue.value[0]} value={ratingMapValue.value[0]}>
        {ratingMapValue.value[1]}
      </option>
    );
    ratingMapValue = ratingMapIterator.next();
  }

  return toReturn;
};

export const Filter: React.FC<Props> = memo(
  ({ onFilterChange, selectedValue }) => {
    const ratingOptions = useMemo(getRatingFilterOptions, []);

    return (
      <select
        value={selectedValue}
        onChange={e => {
          onFilterChange(e.target.value);
        }}
      >
        <option value={""}>Vše</option>
        {ratingOptions}
      </select>
    );
  }
);
