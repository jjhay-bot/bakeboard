import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const MoodboardIdeaDialog = ({
  open,
  formValues,
  isEditing,
  onClose,
  onChange,
  onSelectField,
  onSubmit,
  statusOptions,
  tagOptions,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1 }}>
        <Stack spacing={0.5}>
          <Typography color="secondary.main" fontSize={24} fontWeight={700}>
            {isEditing ? "Update idea" : "Add idea"}
          </Typography>
          <Typography color="#8a6a5c" fontSize={14}>
            Keep it quick. You can attach an image URL and mark whether the note
            is still active or already done.
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: "8px !important" }}>
        <Stack component="form" spacing={1.5} onSubmit={onSubmit}>
          <TextField
            label="Title"
            value={formValues.title}
            onChange={onChange("title")}
            required
            fullWidth
          />
          <TextField
            label="Idea"
            value={formValues.body}
            onChange={onChange("body")}
            required
            fullWidth
            multiline
            minRows={4}
          />
          <Stack spacing={0.75}>
            <Typography color="secondary.main" fontSize={14} fontWeight={700}>
              Tag
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {tagOptions.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  clickable
                  onClick={() => onSelectField("tag", option.value)}
                  sx={{
                    bgcolor:
                      formValues.tag === option.value ? "#ffe5dc" : "#fff6f0",
                    border: "1px solid #f2d7ca",
                    color:
                      formValues.tag === option.value ? "#c85027" : "#8a6a5c",
                    fontWeight: 700,
                  }}
                />
              ))}
            </Stack>
          </Stack>
          <Stack spacing={0.75}>
            <Typography color="secondary.main" fontSize={14} fontWeight={700}>
              Status
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {statusOptions.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  clickable
                  onClick={() => onSelectField("status", option.value)}
                  sx={{
                    bgcolor:
                      formValues.status === option.value
                        ? "#ffe5dc"
                        : "#fff6f0",
                    border: "1px solid #f2d7ca",
                    color:
                      formValues.status === option.value
                        ? "#c85027"
                        : "#8a6a5c",
                    fontWeight: 700,
                  }}
                />
              ))}
            </Stack>
          </Stack>
          
          <TextField
            label="Image URL"
            value={formValues.imageUrl}
            onChange={onChange("imageUrl")}
            placeholder="https://..."
            fullWidth
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end" pt={1}>
            <Button type="button" onClick={onClose} variant="boardSecondary">
              Cancel
            </Button>
            <Button type="submit" variant="boardPrimary">
              {isEditing ? "Update idea" : "Save idea"}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default MoodboardIdeaDialog;
