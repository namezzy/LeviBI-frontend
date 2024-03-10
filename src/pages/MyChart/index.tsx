import { listMyChartByPageUsingPost } from '@/services/levibi/chartController';
import { message } from  'antd'
import React, { useEffect, useState } from 'react';

/**
 * 我的图表页面
 * @returns
 */
const MyChartPage: React.FC = () => {
  const initSearchParams = {
    pageSize: 12,
  };

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({
    ...initSearchParams,
  });

  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);

  const LoadDate = async () => {
    try {
      const res = await listMyChartByPageUsingPost(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取我的图表失败');
      }
    } catch (error: any) {
      message.error('获取我的图表失败：' + error.message);
    }
  };


  useEffect( () => {
    LoadDate();  
  }, [searchParams]);
  return <div className="my-chart-page">
    数据列表:
    {JSON.stringify(chartList)}
    <br/>
    总数: {total}
  </div>;
};
export default MyChartPage;
