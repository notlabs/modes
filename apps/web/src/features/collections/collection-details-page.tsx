import { Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

export const CollectionDetailsPage = () => (
  <Container>
    <Helmet>
      <title>Collection | modes</title>
    </Helmet>
    <Typography.Title level={4}>Collection Details</Typography.Title>
    <Typography.Paragraph>Placeholder</Typography.Paragraph>
  </Container>
);

const Container = styled.div`
  padding: 24px;
`;
