interface IJobStats {
  interview: number;
  declined: number;
  pending: number;
}

export interface IJobDefaultAggregate {
  _id: string;
  count: string;
}

export default IJobStats;
