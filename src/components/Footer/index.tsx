import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
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
