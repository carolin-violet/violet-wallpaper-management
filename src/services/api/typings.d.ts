declare namespace API {
  type BodyUploadWallpaperApiPictures_post = {
    /** File 壁纸文件 */
    file: string;
    /** Tags 标签 */
    tags?: string[];
    /** Category 分类 */
    category: string;
  };

  type deleteTagApiTagsTagIdDeleteParams = {
    tag_id: number;
  };

  type deleteWallpaperApiPicturesPictureIdDeleteParams = {
    picture_id: number;
  };

  type downloadPictureApiPicturesPictureIdDownloadGetParams = {
    picture_id: number;
  };

  type getAllDictionariesApiDictionariesGetParams = {
    type?: number | null;
  };

  type getPictureApiPicturesPictureIdGetParams = {
    picture_id: number;
  };

  type HTTPValidationError = {
    /** Problem title */
    title: string;
    /** Problem type */
    type: string;
    /** Status code */
    status: number;
    errors: ValidationError[];
  };

  type incrementPictureViewApiPicturesPictureIdViewPostParams = {
    picture_id: number;
  };

  type listWallpapersApiPicturesListGetParams = {
    /** 页码，从 1 开始 */
    page_num?: number;
    /** 每页数量，最大 100 */
    page_size?: number;
    /** 图片格式筛选（如 JPEG、PNG） */
    format?: string | null;
    /** 最小宽度（px） */
    min_width?: number | null;
    /** 最大宽度（px） */
    max_width?: number | null;
    /** 最小高度（px） */
    min_height?: number | null;
    /** 最大高度（px） */
    max_height?: number | null;
    /** 原始文件名（模糊匹配） */
    original_filename?: string | null;
    /** 设备类型：1=PC端，2=移动端，3=头像 */
    device_type?: number | null;
    /** 审核状态：0=未审核，1=通过，2=未通过 */
    status?: number | null;
    /** 是否精选：0=否，1=是 */
    is_featured?: number | null;
    /** 分类 */
    category?: string | null;
    /** 标签列表 */
    tags?: string[] | null;
  };

  type PictureQueryResponse = {
    /** Page Num 页码，从 1 开始 */
    page_num?: number;
    /** Page Size 每页数量，最大 100 */
    page_size?: number;
    /** Records 图片列表 */
    records: PictureResponseInfo[];
    /** Total 总记录数 */
    total: number;
  };

  type PictureResponseInfo = {
    /** Id 主键 */
    id: number;
    /** Original Filename 原始文件名 */
    original_filename?: string | null;
    /** Width 图片宽度（px） */
    width: number;
    /** Height 图片高度（px） */
    height: number;
    /** Webp Url 压缩WebP预签名预览链接 */
    webp_url?: string | null;
    /** Thumbnail Url 缩略图WebP预签名预览链接 */
    thumbnail_url?: string | null;
    /** Device Type 设备类型：1=PC端，2=移动端，3=头像 */
    device_type?: number | null;
    /** Category 分类 */
    category?: string | null;
    /** View Count 预览次数 */
    view_count?: number;
    /** Download Count 下载次数 */
    download_count?: number;
    /** Tags 标签列表 */
    tags?: string[] | null;
    /** Created At 创建时间 */
    created_at: string;
    /** Updated At 更新时间 */
    updated_at: string;
    /** Status 审核状态：0=未审核，1=通过，2=未通过 */
    status: number;
    /** Is Featured 是否精选：0=否，1=是 */
    is_featured?: number;
  };

  type PictureUpdateRequest = {
    /** Status 审核状态：0=未审核，1=通过，2=未通过 */
    status?: number | null;
    /** Is Featured 是否精选：0=否，1=是 */
    is_featured?: number | null;
    /** Category 分类 */
    category?: string | null;
    /** Tags 标签列表 */
    tags?: string[] | null;
  };

  type PictureUploadResponse = {
    /** Id 主键 */
    id: number;
    /** Bucket 对象存储桶名称 */
    bucket: string;
    /** Object Name 原图对象名（MinIO key） */
    object_name: string;
    /** Original Filename 原始文件名 */
    original_filename?: string | null;
    /** Width 图片宽度（px） */
    width: number;
    /** Height 图片高度（px） */
    height: number;
    /** Format 图片格式（JPEG/PNG等） */
    format: string;
    /** Mode 颜色模式（RGB/RGBA等） */
    mode: string;
    /** Size Bytes 文件大小（字节） */
    size_bytes: number;
    /** Md5 文件 MD5，用于去重 */
    md5: string;
    /** Dpi DPI 信息（JSON） */
    dpi?: Record<string, any> | null;
    /** Url 原图预签名预览链接 */
    url?: string | null;
    /** Webp Object Name 压缩WebP对象名 */
    webp_object_name?: string | null;
    /** Webp Url 压缩WebP预签名预览链接 */
    webp_url?: string | null;
    /** Thumbnail Object Name 缩略图WebP对象名 */
    thumbnail_object_name?: string | null;
    /** Thumbnail Url 缩略图WebP预签名预览链接 */
    thumbnail_url?: string | null;
    /** Device Type 设备类型：1=PC端，2=移动端，3=头像 */
    device_type?: number | null;
    /** Status 审核状态：0=未审核，1=通过，2=未通过 */
    status?: number;
    /** Is Featured 是否精选：0=否，1=是 */
    is_featured?: number;
    /** Category 分类 */
    category?: string | null;
    /** View Count 预览次数 */
    view_count?: number;
    /** Download Count 下载次数 */
    download_count?: number;
    /** Tags 标签列表 */
    tags?: string[] | null;
    /** Created At 创建时间 */
    created_at: string;
    /** Updated At 更新时间 */
    updated_at: string;
  };

  type Problem = {
    /** Problem title */
    title: string;
    /** Problem type */
    type: string;
    /** Status code */
    status: number;
    /** Problem detail */
    detail?: string | null;
  };

  type TagCreateRequest = {
    /** Name 标签名称 */
    name: string;
  };

  type TagResponse = {
    /** Id 主键 */
    id: number;
    /** Name 标签名称 */
    name: string;
    /** Click Count 点击次数 */
    click_count: number;
    /** Created At 创建时间 */
    created_at: string;
    /** Updated At 更新时间 */
    updated_at: string;
  };

  type updateWallpaperApiPicturesPictureIdPutParams = {
    picture_id: number;
  };

  type ValidationError = {
    /** Location */
    loc: (string | number)[];
    /** Message */
    msg: string;
    /** Error Type */
    type: string;
  };
}
