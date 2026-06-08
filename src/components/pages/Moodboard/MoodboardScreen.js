import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Grid2, IconButton, Paper, Stack, Typography } from "@mui/material";
import ScreenContainer from "../../layout/ScreenContainer";
import MoodboardIdeaDialog from "./MoodboardIdeaDialog";
import MoodboardNoteCard from "./MoodboardNoteCard";
import {
  applyMoodboardLayout,
  buildMoodboardFormValues,
  buildMoodboardImage,
  emptyMoodboardForm,
  initialMoodboardNotes,
  moodboardStatusOptions,
  moodboardTagOptions,
} from "./moodboardData";

const MoodboardScreen = () => {
  const [notes, setNotes] = useState(initialMoodboardNotes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState(emptyMoodboardForm);
  const [editingNoteId, setEditingNoteId] = useState(null);

  const handleOpenDialog = () => {
    setEditingNoteId(null);
    setFormValues(emptyMoodboardForm);
    setIsDialogOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setFormValues(buildMoodboardFormValues(note));
    setIsDialogOpen(true);
  };

  const handleToggleNoteStatus = (targetNote) => {
    setNotes((current) =>
      current.map((note, index) =>
        note.id === targetNote.id
          ? applyMoodboardLayout(
              {
                ...note,
                status: note.status === "done" ? "active" : "done",
              },
              index,
            )
          : note,
      ),
    );
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingNoteId(null);
    setFormValues(emptyMoodboardForm);
  };

  const handleChange = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSelectField = (field, value) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = formValues.title.trim();
    const trimmedBody = formValues.body.trim();
    const trimmedTag = formValues.tag.trim();
    const trimmedImageUrl = formValues.imageUrl.trim();
    const nextStatus = formValues.status || "active";

    if (!trimmedTitle || !trimmedBody) {
      return;
    }

    if (editingNoteId) {
      setNotes((current) =>
        current.map((note, index) =>
          note.id === editingNoteId
            ? applyMoodboardLayout(
                {
                  ...note,
                  title: trimmedTitle,
                  body: trimmedBody,
                  tag: trimmedTag || "idea",
                  status: nextStatus,
                  image: buildMoodboardImage(trimmedImageUrl),
                },
                index,
              )
            : note,
        ),
      );
      handleCloseDialog();
      return;
    }

    const createdNote = applyMoodboardLayout(
      {
        id: `idea-${Date.now()}`,
        title: trimmedTitle,
        body: trimmedBody,
        tag: trimmedTag || "idea",
        status: nextStatus,
        image: buildMoodboardImage(trimmedImageUrl),
      },
      notes.length,
    );

    setNotes((current) => [createdNote, ...current]);
    handleCloseDialog();
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
    </ScreenContainer>
  );
};

export default MoodboardScreen;
