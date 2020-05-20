export interface URLRecord {
  _id: {
    $oid: string;
  };
  created: number;
  secret: string;
  short: string;
  url: string;
  updated: number;
};
