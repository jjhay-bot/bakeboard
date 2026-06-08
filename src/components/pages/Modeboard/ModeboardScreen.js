import { useState } from "react";
import { Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import ScreenContainer from "../../layout/ScreenContainer";
import ModeboardIdeaDialog from "./ModeboardIdeaDialog";
import ModeboardNoteCard from "./ModeboardNoteCard";
import {
  applyModeboardLayout,
  buildModeboardImage,
  emptyModeboardForm,
  initialModeboardNotes,
} from "./modeboardData";

const ModeboardScreen = () => {
  const [notes, setNotes] = useState(initialModeboardNotes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState(emptyModeboardForm);

  const handleOpenDialog = () => setIsDialogOpen(true);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormValues(emptyModeboardForm);
  };

  const handleChange = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = formValues.title.trim();
    const trimmedBody = formValues.body.trim();
    const trimmedTag = formValues.tag.trim();
    const trimmedImageUrl = formValues.imageUrl.trim();

    if (!trimmedTitle || !trimmedBody) {
      return;
    }

    const createdNote = applyModeboardLayout(
      {
        id: `idea-${Date.now()}`,
        title: trimmedTitle,
        body: trimmedBody,
        tag: trimmedTag || "idea",
        image: buildModeboardImage(trimmedImageUrl),
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
            <Typography color="#5b3527" fontSize={28} fontWeight={700}>
              Modeboard
            </Typography>
            <Typography color="#7f655b" fontSize={14}>
              A simple wall for quick thoughts, saved inspo, and ideas worth
              revisiting later.
            </Typography>
          </Stack>

          <Button
            onClick={handleOpenDialog}
            aria-label="Add new idea"
            sx={{
              minWidth: 52,
              width: 52,
              height: 52,
              borderRadius: "18px",
              bgcolor: "#ed5a29",
              color: "#fffaf6",
              fontSize: 28,
              lineHeight: 1,
              fontWeight: 700,
              boxShadow: "0 10px 20px rgba(237, 90, 41, 0.22)",
              "&:hover": {
                bgcolor: "#d84d1f",
              },
            }}
          >
            +
          </Button>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: "18px",
            bgcolor: "#fffdf8",
            border: "1px dashed #e5c9b9",
          }}
        >
          <Stack spacing={0.5}>
            <Typography color="#6e3f2f" fontSize={16} fontWeight={700}>
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
              <ModeboardNoteCard note={note} />
            </Grid2>
          ))}
        </Grid2>
      </Stack>

      <ModeboardIdeaDialog
        open={isDialogOpen}
        formValues={formValues}
        onClose={handleCloseDialog}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </ScreenContainer>
  );
};

export default ModeboardScreen;
