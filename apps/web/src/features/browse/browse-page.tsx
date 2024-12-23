import { Box, Dialog } from '@mui/material';
import { DataGrid, type GridRenderCellParams } from '@mui/x-data-grid';
import { User } from 'apps/api/src/types';
import { useState } from 'react';
import { Page } from '../../shared/ui/page';
import { trpc } from '../../trpc';

const MEDIA_URL = process.env.MEDIA_URL;
export const BrowsePage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const { data: mediaData, isLoading } = trpc.media.listMediaItems.useQuery(
    {
      page: paginationModel.page,
      limit: paginationModel.pageSize,
    },
    {
      keepPreviousData: true,
    }
  );

  const columns = [
    {
      field: 'thumbnail',
      headerName: 'Preview',
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={`${MEDIA_URL}/${params.value}`}
          alt="Preview"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '60px',
            objectFit: 'contain',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedImage(params.value)}
        />
      ),
    },

    {
      field: 'originalFileName',
      headerName: 'File Name',
      width: 200,
      sortable: true,
    },
    { field: 'mimeType', headerName: 'Type', width: 130, sortable: true },
    { field: 'fileSize', headerName: 'Size', width: 130, sortable: true },
    { field: 'checksum', headerName: 'Checksum', width: 200, sortable: true },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 200,
      sortable: false,
      valueFormatter: (params: string[]) => params.join(', '),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,

      valueFormatter: (date: string) => new Date(date).toLocaleString(),
      type: 'dateTime',
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      width: 150,

      valueGetter: (params: User) => params?.name || params?.email,
    },
  ];

  const rows =
    mediaData?.items.map((item) => ({
      id: item.id,
      thumbnail: item.mediaVersions[0]?.processedMedia[0]?.path,
      originalFileName: item.originalFileName,
      mimeType: item.mimeType,
      fileSize: item.fileSize,
      checksum: item.checksum,
      tags: item.mediaVersions[0]?.mediaTags?.map((mt) => mt.tag.value),
      createdAt: item.createdAt,
      createdBy: item.createdBy,
    })) || [];

  return (
    <Page title="Browse">
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={mediaData?.totalCount ?? 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          paginationMode="server"
          loading={isLoading}
        />
      </Box>

      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="lg"
      >
        {selectedImage && (
          <img
            src={`${MEDIA_URL}/${selectedImage}`}
            alt="Full size preview"
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
            }}
          />
        )}
      </Dialog>
    </Page>
  );
};
