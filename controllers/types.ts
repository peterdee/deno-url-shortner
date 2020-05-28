export interface CreateURLData {
  secret?: string;
  url?: string;
};

export interface DeleteURLData {
  secret?: string;
};

export interface SerializedRecord {
  clicks: number;
  id: string;
  link: string;
  updated: string;
  url: string;
};
