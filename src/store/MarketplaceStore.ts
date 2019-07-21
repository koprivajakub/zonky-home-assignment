import { computed, observable } from "mobx";
import { MarketplaceItem } from "networking/marketplaceRequest";

class MarketplaceStore {
  @observable marketplaceItems: Map<string, MarketplaceItem> = new Map();
  @observable selectedRating: string = "D";


  @computed get marketplaceItemsArray(): MarketplaceItem[] {
    const marketplaceItemsIterator = this.marketplaceItems.values();
    let nextItem = marketplaceItemsIterator.next();

    const toReturn = [];
    while(!nextItem.done) {
      toReturn.push(nextItem.value);
      nextItem = marketplaceItemsIterator.next();
    }

    return toReturn;
  }

  @computed get marketplaceItemsCount(): number {
    return this.marketplaceItemsArray.filter(this.isLoanSelectedRating).length;
  }

  @computed get averageLoan(): string {
    if (this.marketplaceItemsCount === 0) {
      return "0 Kč";
    }

    const sum = this.marketplaceItemsArray.reduce(
      (previousValue, currentValue) =>
        previousValue +
        (this.isLoanSelectedRating(currentValue) ? currentValue.amount : 0),
      0
    );
    return `${(sum / this.marketplaceItemsCount).toFixed(2)} Kč`;
  }

  isLoanSelectedRating = (item: MarketplaceItem) => {
    return (
      this.selectedRating === item.rating || this.selectedRating.length === 0
    );
  };

  addLoan = (loan: MarketplaceItem) => {
    this.marketplaceItems.set(loan.id, {
      amount: loan.amount,
      rating: loan.rating,
      id: loan.id
    });
  };

  addMarketplaceItems(loans: MarketplaceItem[]) {
    loans.forEach(this.addLoan);
  }

  setSelectedRating(selectedFilterValue: string) {
    this.selectedRating = selectedFilterValue;
  }
}

export const marketplaceStore = new MarketplaceStore();
