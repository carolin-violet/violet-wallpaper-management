import { useRequest } from '@umijs/max';
import { useMemo } from 'react';
import { getAllDictionariesApiDictionariesGet } from '@/services/api/dictionaries';

export function useCategoryDictionary() {
  const { data, loading } = useRequest<API.DictionaryQueryResponse>(
    () => getAllDictionariesApiDictionariesGet(),
    {
      formatResult: (response: any) => {
        // 如果响应是 { success: true, data: {...} } 格式，提取 data
        if (response && typeof response === 'object' && 'data' in response) {
          return response.data;
        }
        // 如果响应直接就是 DictionaryQueryResponse 格式，直接返回
        return response;
      },
    },
  );

  const categoryOptions = useMemo(() => {
    if (!data) return [];

    const response = data as API.DictionaryQueryResponse;
    if (!response.records) return [];

    return response.records
      .filter((item: API.DictionaryResponse) => {
        // 只保留分类类型（type === 0）且有 code 的项
        return item.type === 0 && item.code;
      })
      .map((item: API.DictionaryResponse) => {
        return {
          label: item.name_cn || item.name_en || item.code || '',
          value: item.code,
        };
      });
  }, [data]);

  const getCategoryLabel = (value: string | null | undefined): string => {
    if (!value) return '-';
    const option = categoryOptions.find(
      (opt: { label: string; value: string }) => opt.value === value,
    );
    return option?.label || value;
  };

  return {
    categoryOptions,
    loading,
    getCategoryLabel,
  };
}
