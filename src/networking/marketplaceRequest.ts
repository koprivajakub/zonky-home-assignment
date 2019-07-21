import { axiosInstance } from "lib/axiosFactory";
import { marketplaceStore } from "store/MarketplaceStore";
import { AxiosResponse } from "axios";

export type MarketplaceItem = {
  id: string;
  amount: number;
  rating: string;
};

type marketplaceRequestFn = (page: number, filter: string) => Promise<number>;

type RequestParams = {
  fields?: string;
  rating__eq?: string;
};

const pageSize = 100;

export const marketplaceRequest: marketplaceRequestFn = async (
  page,
  filter
) => {
  const params: RequestParams = {
    fields: "id,amount,rating"
  };

  if (filter.length > 0) {
    params.rating__eq = filter;
  }

  const response: AxiosResponse<{
    [key: string]: MarketplaceItem;
  }> = await axiosInstance.get(`/loans/marketplace`, {
    params,
    headers: {
      "x-size": pageSize,
      "x-page": page,
      "x-order": "-datePublished"
    }
  });

  const { data, headers } = response;
  const items = Object.values(data);
  marketplaceStore.addMarketplaceItems(items);

  const totalNumberOfItems = headers["x-total"];
  return Math.ceil(totalNumberOfItems / pageSize);
};
