import { BACKEND_URI } from '../config/index.ts';
import { SerializedRecord } from '../controllers/types.ts';
import { URLRecord } from '../database/types.ts';

/**
 * Serialize the URLRecord data
 * @param {URLRecord} record - database record
 * @returns {SerializedRecord}
 */
export default (record: URLRecord): SerializedRecord => ({
  clicks: record.clicks,
  id: record._id['$oid'],
  link: `${BACKEND_URI}/go/${record.short}`,
  url: record.url,
  updated: record.updated,
});
