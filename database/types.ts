export interface URLRecord {
  _id: {
    $oid: string;
  };
  created: string;
  secret: string;
  short: string;
  url: string;
  updated: string;
};
