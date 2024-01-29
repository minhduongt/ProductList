export type BaseReponse<T> = {
  data: T[];
  limit: number;
  skip: number;
  total: number;
};

export type TRequestParams = {
  limit?: number;
  skip?: number;
  searchKey?: string;
};
