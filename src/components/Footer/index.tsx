import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '利瓦伊科技有限公司出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Levi智能BI',
          title: 'Levi智能BI',
          href: 'https://hello.tech-openai.work',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/namezzy/LeviBI-frontend',
          blankTarget: true,
        },
        {
          key: 'Levi智能BI',
          title: 'Levi智能BI',
          href: 'https://github.com/namezzy/LeviBI-frontend',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
