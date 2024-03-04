import { listChartByPageUsingPost } from '@/services/levibi/chartController';
import { useModel } from '@umijs/max';
import React, { useEffect, useState } from 'react';



const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');


  useEffect(() => {
    listChartByPageUsingPost({}).then((res) => {
      console.error('res', res);
    });
  });

  return (
    <div className="add-chart">
     添加图表
    </div>
  );
};
export default Login;
