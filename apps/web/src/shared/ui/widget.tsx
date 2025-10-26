import { Card, Typography } from 'antd';
import type { ReactNode } from 'react';
import styled from 'styled-components';

type WidgetProps = {
  title: string;
  children: ReactNode;
};

export const Widget = ({ title, children }: WidgetProps) => (
  <CardStyled>
    <Typography.Title level={5} style={{ marginBottom: 16 }}>
      {title}
    </Typography.Title>
    <div>{children}</div>
  </CardStyled>
);

const CardStyled = styled(Card)`
  height: 100%;
  border-radius: 8px;
`;
