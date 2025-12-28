/**
 * 设备类型枚举
 */
export enum DeviceType {
  /** PC端壁纸 */
  PC = 1,
  /** 移动端壁纸 */
  MOBILE = 2,
  /** 头像 */
  AVATAR = 3,
}

/**
 * 图片审核状态枚举
 */
export enum PictureStatus {
  /** 未审核 */
  PENDING = 0,
  /** 审核通过 */
  APPROVED = 1,
  /** 审核没通过 */
  REJECTED = 2,
}

/**
 * 设备类型选项（用于下拉框）
 */
export const deviceTypeOptions = [
  { label: 'PC端', value: DeviceType.PC },
  { label: '移动端', value: DeviceType.MOBILE },
  { label: '头像', value: DeviceType.AVATAR },
];

/**
 * 设备类型映射（用于显示）
 */
export const deviceTypeMap: Record<
  DeviceType,
  { text: string; color: string }
> = {
  [DeviceType.PC]: { text: 'PC端', color: 'blue' },
  [DeviceType.MOBILE]: { text: '移动端', color: 'green' },
  [DeviceType.AVATAR]: { text: '头像', color: 'purple' },
};

/**
 * 图片状态映射（用于显示）
 */
export const pictureStatusMap: Record<
  PictureStatus,
  { text: string; status: 'Default' | 'Success' | 'Error' }
> = {
  [PictureStatus.PENDING]: { text: '未审核', status: 'Default' },
  [PictureStatus.APPROVED]: { text: '审核通过', status: 'Success' },
  [PictureStatus.REJECTED]: { text: '审核未通过', status: 'Error' },
};
