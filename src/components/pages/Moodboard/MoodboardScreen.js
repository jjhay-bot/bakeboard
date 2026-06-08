import { useRef } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { Grid2, IconButton, Paper, Stack, Typography } from "@mui/material";
import ScreenContainer from "../../layout/ScreenContainer";
import MoodboardIdeaDialog from "./MoodboardIdeaDialog";
import MoodboardImportDialog from "./MoodboardImportDialog";
import MoodboardNoteCard from "./MoodboardNoteCard";
import {
  moodboardStatusOptions,
  moodboardTagOptions,
} from "./moodboardData";
import useMoodboardNotes from "./useMoodboardNotes";

const MoodboardScreen = () => {
  const importInputRef = useRef(null);
  const {
    notes,
    isDialogOpen,
    isImportDialogOpen,
    formValues,
    editingNoteId,
    importText,
    handleDownloadNotes,
    handleOpenDialog,
    handleEditNote,
    handleOpenImportDialog,
    handleCloseImportDialog,
    handleImportFile,
    handleImportTextChange,
    handleImportTextSubmit,
    handleResetNotes,
    handleToggleNoteStatus,
    handleCloseDialog,
    handleChange,
    handleSelectField,
    handleSubmit,
  } = useMoodboardNotes();

  const handleOpenImportFilePicker = () => {
    importInputRef.current?.click();
  };

  const handleImportInputChange = async (event) => {
    const [file] = event.target.files || [];

    await handleImportFile(file);
    event.target.value = "";
  };

  return (
    <ScreenContainer sx={{ bgcolor: "#fffaf6" }}>
      <Stack spacing={2} px={2} py={2}>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Stack spacing={0.5}>
            <Typography color="#8a5640" fontSize={12} fontWeight={700}>
              Sticky ideas
            </Typography>
            <Typography color="secondary.main" fontSize={28} fontWeight={700}>
              Moodboard
            </Typography>
            <Typography color="#7f655b" fontSize={14}>
              A simple wall for quick thoughts, saved inspo, and ideas worth
              revisiting later.
            </Typography>
          </Stack>

          <IconButton
            onClick={handleOpenDialog}
            aria-label="Add new idea"
            variant="boardAction"
            size="small"
          >
            <AddRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>

        <Paper variant="boardPanel" elevation={0} sx={{ p: 2 }}>
          <Stack spacing={0.5}>
            <Typography color="secondary.main" fontSize={16} fontWeight={700}>
              Quick note
            </Typography>
            <Typography color="#9a7a6a" fontSize={14}>
              Tap the plus button to add a fresh thought. Image URL is optional.
            </Typography>
          </Stack>
        </Paper>

        {notes.length > 0 ? (
          <Grid2 container spacing={1.5}>
            {notes.map((note) => (
              <Grid2 key={note.id} size={note.size}>
                <MoodboardNoteCard
                  note={note}
                  onEdit={handleEditNote}
                  onToggleStatus={handleToggleNoteStatus}
                />
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <Paper variant="boardPanel" elevation={0} sx={{ p: 2 }}>
            <Stack spacing={0.5}>
              <Typography color="secondary.main" fontSize={16} fontWeight={700}>
                No ideas yet
              </Typography>
              <Typography color="#9a7a6a" fontSize={14}>
                Add a new idea to start building your moodboard again.
              </Typography>
            </Stack>
          </Paper>
        )}

        <Paper variant="boardPanel" elevation={0} sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="secondary.main" fontSize={16} fontWeight={700}>
              Board actions
            </Typography>

            <Stack direction="row" spacing={1}>
              <input
                ref={importInputRef}
                type="file"
                accept="application/json,.json"
                onChange={handleImportInputChange}
                hidden
              />
              <IconButton
                aria-label="Import ideas"
                onClick={handleOpenImportDialog}
                sx={{
                  borderRadius: "14px",
                  bgcolor: "#fff6f0",
                  color: "secondary.main",
                  border: "1px solid #f2d7ca",
                  "&:hover": {
                    bgcolor: "#ffece3",
                  },
                }}
              >
                <FileUploadRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                aria-label="Download ideas as JSON"
                onClick={handleDownloadNotes}
                sx={{
                  borderRadius: "14px",
                  bgcolor: "#fff6f0",
                  color: "secondary.main",
                  border: "1px solid #f2d7ca",
                  "&:hover": {
                    bgcolor: "#ffece3",
                  },
                }}
              >
                <FileDownloadRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                aria-label="Delete all ideas"
                onClick={handleResetNotes}
                sx={{
                  borderRadius: "14px",
                  bgcolor: "#fff6f0",
                  color: "#c85027",
                  border: "1px solid #f2d7ca",
                  "&:hover": {
                    bgcolor: "#ffece3",
                  },
                }}
              >
                <RestartAltRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <MoodboardIdeaDialog
        open={isDialogOpen}
        formValues={formValues}
        isEditing={Boolean(editingNoteId)}
        onClose={handleCloseDialog}
        onChange={handleChange}
        onSelectField={handleSelectField}
        onSubmit={handleSubmit}
        statusOptions={moodboardStatusOptions}
        tagOptions={moodboardTagOptions}
      />
      <MoodboardImportDialog
        open={isImportDialogOpen}
        importText={importText}
        onChange={handleImportTextChange}
        onClose={handleCloseImportDialog}
        onChooseFile={handleOpenImportFilePicker}
        onSubmit={handleImportTextSubmit}
      />
    </ScreenContainer>
  );
};

export default MoodboardScreen;
