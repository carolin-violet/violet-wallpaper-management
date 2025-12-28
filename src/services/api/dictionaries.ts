// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 查询整个字典表 查询整个字典表，返回所有数据（不分页）。 GET /api/dictionaries/ */
export async function getAllDictionariesApiDictionariesGet(options?: {
  [key: string]: any;
}) {
  return request<API.DictionaryQueryResponse>("/api/dictionaries/", {
    method: "GET",
    ...(options || {}),
  });
}
