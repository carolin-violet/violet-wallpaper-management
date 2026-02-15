import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Image, message, Popconfirm, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import {
  deleteWallpaperApiPicturesPictureIdDelete,
  listWallpapersApiPicturesListGet,
} from '@/services/api/pictures';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {
  type DeviceType,
  deviceTypeMap,
  deviceTypeOptions,
  PictureStatus,
  pictureStatusMap,
} from './constants';
import { useCategoryDictionary } from './hooks/useDictionary';

const PictureList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.PictureResponseInfo>();
  const { categoryOptions, getCategoryLabel } = useCategoryDictionary();

  const { run: deleteRun } = useRequest(
    (params: API.deleteWallpaperApiPicturesPictureIdDeleteParams) =>
      deleteWallpaperApiPicturesPictureIdDelete(params),
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
        actionRef.current?.reload();
      },
      onError: () => {
        message.error('删除失败，请重试');
      },
    },
  );

  const handleDelete = (record: API.PictureResponseInfo) => {
    deleteRun({ picture_id: record.id });
  };

  const columns: ProColumns<API.PictureResponseInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      hideInSearch: true,
    },
    {
      title: '缩略图',
      dataIndex: 'thumbnail_url',
      width: 120,
      hideInSearch: true,
      render: (_, record) => {
        if (record.thumbnail_url) {
          return (
            <Image
              src={record.thumbnail_url || ''}
              alt={record.original_filename || ''}
              width={80}
              height={80}
              style={{ objectFit: 'cover' }}
            />
          );
        }
        return '-';
      },
    },
    {
      title: '文件名',
      dataIndex: 'original_filename',
      ellipsis: true,
      width: 200,
      hideInSearch: true,
    },
    {
      title: '尺寸',
      dataIndex: 'width',
      width: 120,
      hideInSearch: true,
      render: (_, record) => `${record.width} × ${record.height}`,
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: categoryOptions,
        placeholder: '请选择分类',
        allowClear: true,
      },
      render: (_, record) => {
        const label = getCategoryLabel(record.category);
        return label !== '-' ? <Tag color="blue">{label}</Tag> : '-';
      },
    },
    {
      title: '设备类型',
      dataIndex: 'device_type',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: deviceTypeOptions,
        placeholder: '请选择设备类型',
        allowClear: true,
      },
      render: (_, record) => {
        if (record.device_type === null || record.device_type === undefined) {
          return '-';
        }
        const deviceInfo = deviceTypeMap[record.device_type as DeviceType];
        if (deviceInfo) {
          return <Tag color={deviceInfo.color}>{deviceInfo.text}</Tag>;
        }
        return record.device_type;
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      width: 200,
      hideInSearch: true,
      render: (_, record) => {
        const tags = record.tags;
        if (!tags || tags.length === 0) return '-';
        return (
          <Space wrap>
            {tags.map((tag) => (
              <Tag key={tag} color="green">
                {tag}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '未审核', value: PictureStatus.PENDING },
          { label: '审核通过', value: PictureStatus.APPROVED },
          { label: '审核未通过', value: PictureStatus.REJECTED },
        ],
        placeholder: '请选择状态',
        allowClear: true,
      },
      valueEnum: {
        [PictureStatus.PENDING]: pictureStatusMap[PictureStatus.PENDING],
        [PictureStatus.APPROVED]: pictureStatusMap[PictureStatus.APPROVED],
        [PictureStatus.REJECTED]: pictureStatusMap[PictureStatus.REJECTED],
      },
    },
    {
      title: '精选',
      dataIndex: 'is_featured',
      width: 100,
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '否', value: 0 },
          { label: '是', value: 1 },
        ],
        placeholder: '请选择',
        allowClear: true,
      },
      render: (_, record) => {
        if (record.is_featured === 1) {
          return <Tag color="gold">是</Tag>;
        }
        return <Tag>否</Tag>;
      },
    },
    {
      title: '预览次数',
      dataIndex: 'view_count',
      width: 100,
      hideInSearch: true,
    },
    {
      title: '下载次数',
      dataIndex: 'download_count',
      width: 100,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 180,
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 180,
      fixed: 'right',
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          size="small"
          onClick={() => {
            setCurrentRow(record);
            setUpdateModalVisible(true);
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确定要删除这张图片吗？"
          description="删除后无法恢复，请谨慎操作"
          onConfirm={() => handleDelete(record)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" size="small" danger>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.PictureResponseInfo>
        headerTitle="图片列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <CreateForm
            key="create"
            onSuccess={() => {
              actionRef.current?.reload();
            }}
          />,
        ]}
        request={async (params, sort, filter) => {
          try {
            const response = await listWallpapersApiPicturesListGet({
              page_num: params.current || 1,
              page_size: params.pageSize || 20,
              category: params.category
                ? (params.category as string)
                : undefined,
              status:
                params.status !== undefined
                  ? (params.status as number)
                  : undefined,
              device_type:
                params.device_type !== undefined
                  ? (params.device_type as number)
                  : undefined,
              is_featured:
                params.is_featured !== undefined
                  ? (params.is_featured as number)
                  : undefined,
            });
            return {
              data: response.records || [],
              success: true,
              total: response.total || 0,
            };
          } catch (error) {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
        scroll={{ x: 1500 }}
      />
      <UpdateForm
        open={updateModalVisible}
        onOpenChange={setUpdateModalVisible}
        current={currentRow}
        onSuccess={() => {
          setUpdateModalVisible(false);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default PictureList;
