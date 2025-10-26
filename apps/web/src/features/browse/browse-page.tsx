import { Modal, Table } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { Page } from '../../shared/ui/page';

const MEDIA_URL = process.env.MEDIA_URL;
export const BrowsePage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const mediaData = {} as any;
  const isLoading = false as any;

  const columns = [
    {
      title: 'Preview',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 100,
      render: (value: string) => (
        <img
          src={`${MEDIA_URL}/${value}`}
          alt="Preview"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '60px',
            objectFit: 'contain',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedImage(value)}
        />
      ),
    },
    {
      title: 'File Name',
      dataIndex: 'originalFileName',
      key: 'originalFileName',
      width: 200,
    },
    { title: 'Type', dataIndex: 'mimeType', key: 'mimeType', width: 130 },
    { title: 'Size', dataIndex: 'fileSize', key: 'fileSize', width: 130 },
    { title: 'Checksum', dataIndex: 'checksum', key: 'checksum', width: 200 },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      render: (tags: string[]) => (tags || []).join(', '),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (value: any) => (value ? new Date(value).toLocaleString() : ''),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 150,
      render: (value: any) => value?.name || value?.email,
    },
  ];

  const rows =
    mediaData?.items?.map((item: any) => ({
      id: item.id,
      thumbnail: item.mediaVersions?.[0]?.processedMedia?.[0]?.path,
      originalFileName: item.originalFileName,
      mimeType: item.mimeType,
      fileSize: item.fileSize,
      checksum: item.checksum,
      tags: item.mediaVersions?.[0]?.mediaTags?.map((mt: any) => mt.tag.value),
      createdAt: item.createdAt,
      createdBy: item.createdBy,
    })) || [];

  return (
    <Page title="Browse">
      <Container>
        <Table
          rowKey="id"
          dataSource={rows}
          columns={columns as any}
          loading={!!isLoading}
          pagination={{
            current: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
            total: mediaData?.totalCount ?? 0,
            onChange: (page, pageSize) =>
              setPaginationModel({ page: page - 1, pageSize }),
          }}
        />
      </Container>

      <Modal
        open={!!selectedImage}
        onCancel={() => setSelectedImage(null)}
        footer={null}
        width="80%"
      >
        {selectedImage && (
          <img
            src={`${MEDIA_URL}/${selectedImage}`}
            alt="Full size preview"
            style={{ maxWidth: '100%', maxHeight: '80vh' }}
          />
        )}
      </Modal>
    </Page>
  );
};

const Container = styled.div`
  height: 600px;
  width: 100%;
`;
