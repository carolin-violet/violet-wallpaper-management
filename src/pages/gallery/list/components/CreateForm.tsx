import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import type { UploadFile } from 'antd';
import { Button, Form, message, Upload } from 'antd';
import React, { useState } from 'react';
import { uploadWallpaperApiPicturesPost } from '@/services/api/pictures';
import { useCategoryDictionary } from '../hooks/useDictionary';

interface CreateFormProps {
  onSuccess?: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const { categoryOptions } = useCategoryDictionary();

  const { run } = useRequest(
    (body: API.BodyUploadWallpaperApiPictures_post, file?: File) =>
      uploadWallpaperApiPicturesPost(body, file),
    {
      manual: true,
      onSuccess: () => {
        message.success('上传成功');
        form.resetFields();
        setFileList([]);
        onSuccess?.();
      },
      onError: () => {
        message.error('上传失败，请重试');
      },
    },
  );

  const handleFinish = async (values: any) => {
    if (fileList.length === 0) {
      message.warning('请选择要上传的图片');
      return false;
    }

    setLoading(true);
    try {
      const tags = values.tags
        ? values.tags
            .split(',')
            .map((tag: string) => tag.trim())
            .filter((tag: string) => tag.length > 0)
        : [];

      await run(
        {
          category: values.category || '',
          tags,
          file: '', // 类型要求，但实际文件通过第二个参数传递，uploadWallpaperApiPicturesPost 会跳过此字段
        } as API.BodyUploadWallpaperApiPictures_post,
        fileList[0].originFileObj as File,
      );
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalForm
      title="上传图片"
      trigger={
        <Button type="primary" icon={<PlusOutlined />}>
          添加图片
        </Button>
      }
      form={form}
      width={600}
      modalProps={{
        okButtonProps: { loading },
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        label="选择图片"
        rules={[{ required: true, message: '请选择要上传的图片' }]}
      >
        <Upload
          fileList={fileList}
          onChange={({ fileList: newFileList }) => {
            setFileList(newFileList);
          }}
          beforeUpload={() => false}
          maxCount={1}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>选择图片</Button>
        </Upload>
      </Form.Item>

      <ProFormSelect
        name="category"
        label="分类"
        options={categoryOptions}
        placeholder="请选择分类"
        rules={[{ required: true, message: '请选择分类' }]}
      />

      <ProFormText
        name="tags"
        label="标签"
        placeholder="请输入标签，多个标签用逗号分隔"
        extra="多个标签请用逗号分隔，例如：标签1,标签2,标签3"
      />
    </ModalForm>
  );
};

export default CreateForm;
