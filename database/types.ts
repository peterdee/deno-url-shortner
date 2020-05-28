export interface URLRecord {
  _id: {
    $oid: string;
  };
  clicks: number;
  created: string;
  secret: string;
  short: string;
  updated: string;
  url: string;
};
