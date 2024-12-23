import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { trpc } from '../../trpc';

export const TagsPage = () => {
  const { data: tags } = trpc.tags.listTags.useQuery();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Tags
      </Typography>
      <Paper>
        <List>
          {tags?.map((tag) => (
            <ListItem key={tag.id}>
              <ListItemText
                primary={tag.id}
                secondary={`${tag.mediaTags.length} items`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};
