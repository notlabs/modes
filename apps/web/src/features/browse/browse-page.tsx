import { Box } from '@mui/material';
import { DataGrid, type GridRenderCellParams } from '@mui/x-data-grid';
import { Page } from '../../shared/ui/page';
import { trpc } from '../../trpc';

const MEDIA_URL = process.env.MEDIA_URL;

export const BrowsePage = () => {
  const { data: mediaItems } = trpc.media.listMediaItems.useQuery({
    page: 0,
    limit: 100,
  });

  const columns = [
    {
      field: 'thumbnail',
      headerName: 'Preview',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={`${MEDIA_URL}/${params.value}`}
          alt="Preview"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '60px',
            objectFit: 'contain',
          }}
        />
      ),
    },
    { field: 'originalFileName', headerName: 'File Name', width: 200 },
    { field: 'mimeType', headerName: 'Type', width: 130 },
    { field: 'fileSize', headerName: 'Size', width: 130 },
    { field: 'checksum', headerName: 'Checksum', width: 200 },

    {
      field: 'tags',
      headerName: 'Tags',
      width: 200,

      valueFormatter: (params: GridRenderCellParams) => {
        const tags = params.value || [];
        return tags.join(', ');
      },
    },
  ];

  const rows =
    mediaItems?.map((item) => ({
      id: item.id,
      thumbnail: item.mediaVersions[0]?.processedMedia[0]?.path,
      originalFileName: item.originalFileName,
      mimeType: item.mimeType,
      fileSize: item.fileSize,
      checksum: item.checksum,
      tags: item.mediaVersions[0]?.mediaTags?.map((mt) => mt.tag.value),
    })) || [];
  return (
    <Page title="Browse">
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Box>
    </Page>
  );
};
