interface IJobStats {
  interview: number;
  declined: number;
  pending: number;
}

export interface IJobAggregateResponse {
  _id: string;
  count: string;
}

export interface IJobMonthlyApplicationResponse {
  _id: { year: number; month: number };
  count: number;
}

export interface IJobMonthlyApplication {
  date: string;
  count: number;
}

export default IJobStats;
