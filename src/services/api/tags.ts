// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 创建标签 创建新标签。 POST /api/tags/ */
export async function createTagApiTagsPost(
  body: API.TagCreateRequest,
  options?: { [key: string]: any }
) {
  return request<API.TagResponse>("/api/tags/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除标签 删除指定标签。 DELETE /api/tags/${param0} */
export async function deleteTagApiTagsTagIdDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTagApiTagsTagIdDeleteParams,
  options?: { [key: string]: any }
) {
  const { tag_id: param0, ...queryParams } = params;
  return request<any>(`/api/tags/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询所有标签列表 查询所有标签列表，按点击次数倒序排列。 GET /api/tags/list */
export async function listTagsApiTagsListGet(options?: { [key: string]: any }) {
  return request<any>("/api/tags/list", {
    method: "GET",
    ...(options || {}),
  });
}
