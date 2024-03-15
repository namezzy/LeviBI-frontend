import { genChartByAiAsyncMqUsingPost, genChartByAiAsyncUsingPost, genChartByAiUsingPost, listChartByPageUsingPost } from '@/services/levibi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Row, Select, Space, Upload, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';

/**
 * 添加图表(异步)页面功能
 * @returns
 */
const AddChartAsync: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] =  useForm();

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

    // console.log('用户提交表单: ', values);
    // Todo 对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };

    try {
      const res = await genChartByAiAsyncMqUsingPost(params, {}, values.file.file.originFileObj);
      console.log(res);
      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析任务提交成功, 稍后请在我的图表页面查看');
        form.resetFields(); 
      }
    } catch (e: any) {
      message.error('分析失败', e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart-async">
          <Card title="智能分析">
            <Form
              form={form}    
              name="addChartAsync"
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
    </div>
  );
};
export default AddChartAsync;
