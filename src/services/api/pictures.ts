// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 上传壁纸 上传新壁纸，提取图片属性，并返回预签名下载链接和元数据。

返回的元数据包括：
- width, height: 图片尺寸（像素）
- format: 图片格式（JPEG, PNG 等）
- mode: 颜色模式（RGB, RGBA 等）
- size_bytes: 文件大小
- md5: 文件 MD5 哈希（用于去重）
- dpi: 分辨率（如果有） POST /api/pictures/ */
export async function uploadWallpaperApiPicturesPost(
  body: API.BodyUploadWallpaperApiPictures_post,
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(
            ele,
            new Blob([JSON.stringify(item)], { type: "application/json" })
          );
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.PictureUploadResponse>("/api/pictures/", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** 查询单个图片详情 根据图片ID查询单个图片的所有信息。 GET /api/pictures/${param0} */
export async function getPictureApiPicturesPictureIdGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPictureApiPicturesPictureIdGetParams,
  options?: { [key: string]: any }
) {
  const { picture_id: param0, ...queryParams } = params;
  return request<API.PictureUploadResponse>(`/api/pictures/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 编辑壁纸信息 编辑壁纸信息，主要修改标签、分类、审核状态。 PUT /api/pictures/${param0} */
export async function updateWallpaperApiPicturesPictureIdPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateWallpaperApiPicturesPictureIdPutParams,
  body: API.PictureUpdateRequest,
  options?: { [key: string]: any }
) {
  const { picture_id: param0, ...queryParams } = params;
  return request<API.PictureResponseInfo>(`/api/pictures/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除壁纸 删除指定壁纸。先删除 MinIO 文件，再删除数据库记录。 DELETE /api/pictures/${param0} */
export async function deleteWallpaperApiPicturesPictureIdDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteWallpaperApiPicturesPictureIdDeleteParams,
  options?: { [key: string]: any }
) {
  const { picture_id: param0, ...queryParams } = params;
  return request<any>(`/api/pictures/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 下载图片 根据图片ID下载图片，返回图片流。 GET /api/pictures/${param0}/download */
export async function downloadPictureApiPicturesPictureIdDownloadGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadPictureApiPicturesPictureIdDownloadGetParams,
  options?: { [key: string]: any }
) {
  const { picture_id: param0, ...queryParams } = params;
  return request<any>(`/api/pictures/${param0}/download`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 增加图片预览次数 增加图片的预览次数。 POST /api/pictures/${param0}/view */
export async function incrementPictureViewApiPicturesPictureIdViewPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.incrementPictureViewApiPicturesPictureIdViewPostParams,
  options?: { [key: string]: any }
) {
  const { picture_id: param0, ...queryParams } = params;
  return request<any>(`/api/pictures/${param0}/view`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页查询壁纸列表 分页查询壁纸列表，按创建时间倒序排列。 GET /api/pictures/list */
export async function listWallpapersApiPicturesListGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listWallpapersApiPicturesListGetParams,
  options?: { [key: string]: any }
) {
  return request<API.PictureQueryResponse>("/api/pictures/list", {
    method: "GET",
    params: {
      // page_num has a default value: 1
      page_num: "1",
      // page_size has a default value: 20
      page_size: "20",

      ...params,
    },
    ...(options || {}),
  });
}
