import { Typography } from 'antd';
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

type PageProps = {
  title?: string;
  children: ReactNode;
};

export const Page = ({ title, children }: PageProps) => (
  <>
    <Helmet>
      <title>{title ? `${title} | modes` : 'modes'}</title>
    </Helmet>
    <Container>
      {title && <Typography.Title level={4}>{title}</Typography.Title>}
      {children}
    </Container>
  </>
);

const Container = styled.div`
  padding: 24px;
`;
