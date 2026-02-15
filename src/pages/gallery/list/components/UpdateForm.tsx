import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Form, message } from 'antd';
import React, { useEffect } from 'react';
import { updateWallpaperApiPicturesPictureIdPut } from '@/services/api/pictures';
import { useCategoryDictionary } from '../hooks/useDictionary';

interface UpdateFormProps {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  current?: API.PictureResponseInfo;
  onSuccess?: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  open,
  onOpenChange,
  current,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { categoryOptions } = useCategoryDictionary();

  const { run, loading } = useRequest(
    (
      params: API.updateWallpaperApiPicturesPictureIdPutParams,
      body: API.PictureUpdateRequest,
    ) => updateWallpaperApiPicturesPictureIdPut(params, body),
    {
      manual: true,
      onSuccess: () => {
        message.success('更新成功');
        onOpenChange(false);
        onSuccess?.();
      },
      onError: () => {
        message.error('更新失败，请重试');
      },
    },
  );

  useEffect(() => {
    if (open && current) {
      form.setFieldsValue({
        category: current.category,
        tags: current.tags?.join(',') || '',
        status: (current as any).status,
        is_featured: current.is_featured,
      });
    }
  }, [open, current, form]);

  const handleFinish = async (values: any) => {
    if (!current) return false;

    const tags = values.tags
      ? values.tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0)
      : [];

    await run(
      { picture_id: current.id },
      {
        category: values.category || null,
        tags: tags.length > 0 ? tags : null,
        status: values.status !== undefined ? values.status : null,
        is_featured:
          values.is_featured !== undefined ? values.is_featured : null,
      },
    );

    return true;
  };

  const statusOptions = [
    { label: '未审核', value: 0 },
    { label: '通过', value: 1 },
    { label: '未通过', value: 2 },
  ];

  const featuredOptions = [
    { label: '否', value: 0 },
    { label: '是', value: 1 },
  ];

  return (
    <ModalForm
      title="编辑图片"
      open={open}
      onOpenChange={onOpenChange}
      form={form}
      width={600}
      modalProps={{
        okButtonProps: { loading },
      }}
      onFinish={handleFinish}
    >
      <ProFormSelect
        name="category"
        label="分类"
        options={categoryOptions}
        placeholder="请选择分类"
      />

      <ProFormText
        name="tags"
        label="标签"
        placeholder="请输入标签，多个标签用逗号分隔"
        extra="多个标签请用逗号分隔，例如：标签1,标签2,标签3"
      />

      <ProFormSelect
        name="status"
        label="状态"
        options={statusOptions}
        placeholder="请选择状态"
      />

      <ProFormSelect
        name="is_featured"
        label="精选"
        options={featuredOptions}
        placeholder="请选择"
      />
    </ModalForm>
  );
};

export default UpdateForm;
