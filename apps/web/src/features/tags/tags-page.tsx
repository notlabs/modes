import { Card, List, Typography } from 'antd';
import styled from 'styled-components';

export const TagsPage = () => {
  const tags = [] as any[];

  return (
    <Container>
      <Typography.Title level={4} style={{ marginBottom: 16 }}>
        Tags
      </Typography.Title>
      <Card>
        <List
          dataSource={tags}
          renderItem={(tag: any) => (
            <List.Item>
              <List.Item.Meta
                title={tag.id}
                description={`${tag.mediaTags?.length ?? 0} items`}
              />
            </List.Item>
          )}
        />
      </Card>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
`;
