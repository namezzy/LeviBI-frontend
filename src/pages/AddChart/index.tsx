import { genChartByAiUsingPost, listChartByPageUsingPost } from '@/services/levibi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Row, Select, Space, Spin, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactECharts from 'echarts-for-react';
import { divide } from 'lodash';
import React, { useEffect, useState } from 'react';

/**
 * 添加图表功能
 * @returns
 */
const AddChart: React.FC = () => {
  const [chart, setChart] = useState<API.BiResponse>();
  const [option, setOption] = useState<any>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    listChartByPageUsingPost({}).then((res) => {
      console.error('res', res);
    });
  });

  /**
   * 提交数据
   * @param values
   */
  const onFinish = async (values: any) => {
    console.log(values.file);
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    setChart(undefined);
    setOption(undefined);

    // console.log('用户提交表单: ', values);
    // Todo 对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };

    try {
      const res = await genChartByAiUsingPost(params, {}, values.file.file.originFileObj);
      console.log(res);
      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析成功');
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('图表代码解析错误');
        } else {
          setChart(res.data);
          setOption(chartOption);
        }
      }
    } catch (e: any) {
      message.error('分析失败', e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <Row gutter={28}>
        <Col span={12}>
          <Card title="智能分析">
            <Form
              name="addChart"
              labelAlign="left"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              initialValues={{}}
            >
              <Form.Item
                name="goal"
                label="分析目标"
                rules={[{ required: true, message: '请输入分析目标' }]}
              >
                <TextArea placeholder="请输入你的分析需求: 比如：分析网站用户的增长情况" />
              </Form.Item>

              <Form.Item name="name" label="图表名称">
                <TextArea placeholder="请输入图表名称" />
              </Form.Item>

              <Form.Item name="chartType" label="图表类型">
                <Select
                  options={[
                    { value: '折线图', label: '折线图' },
                    { value: '柱状图', label: '柱状图' },
                    { value: '堆叠图', label: '堆叠图' },
                    { value: '饼图', label: '饼图' },
                    { value: '雷达图', label: '雷达图' },
                    { value: '散列图', label: '散列图 ' },
                  ]}
                />
              </Form.Item>
              <Form.Item name="file" label="原始数据">
                <Upload name="file" maxCount={1}>
                  <Button icon={<UploadOutlined />}>上传表格文件</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="分析结论">
            {/* {chart?.genResult ?? <div>请现在左侧进行提交</div>} */}
            {!submitting && (chart?.genResult ?? <div>请现在左侧进行提交</div>)}
            {submitting && <div>AI正在分析数据得出结论中...</div>}
            {<Spin spinning={submitting} />}
          </Card>
          <Card title="可视化图表">
            {!submitting && (option ? <ReactECharts option={option} /> : <div>请现在左侧进行提交</div>)}
            {submitting && <div>AI正在渲染图表中...</div>}
            {<Spin spinning={submitting} />}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;
