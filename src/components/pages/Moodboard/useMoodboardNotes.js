import { useEffect, useState } from "react";
import { getForage, setForage } from "../../../utils/forage";
import {
  applyMoodboardLayout,
  buildMoodboardFormValues,
  buildMoodboardImage,
  emptyMoodboardForm,
  extractMoodboardImportNotes,
  initialMoodboardNotes,
  moodboardStorageKey,
  normalizeMoodboardNotes,
} from "./moodboardData";

const useMoodboardNotes = () => {
  const [notes, setNotes] = useState(initialMoodboardNotes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState(emptyMoodboardForm);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPersistenceEnabled, setIsPersistenceEnabled] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importText, setImportText] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMoodboardNotes = async () => {
      try {
        // API-ready note:
        // If a backend moodboard endpoint is introduced later, move this read
        // behind a dedicated service module and replace the localforage call
        // there, e.g. listMoodboardNotes -> GET /moodboard-notes.
        const storedNotes = await getForage(moodboardStorageKey);

        if (!isMounted) {
          return;
        }

        if (storedNotes !== null) {
          setNotes(normalizeMoodboardNotes(storedNotes));
          setIsPersistenceEnabled(true);
        }
      } catch (error) {
        console.error("Failed to load moodboard notes", error);
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    };

    loadMoodboardNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated || !isPersistenceEnabled) {
      return;
    }

    const persistMoodboardNotes = async () => {
      try {
        // API-ready note:
        // Replace this local persistence call through a service boundary when
        // backend CRUD is ready, e.g. saveMoodboardNotes -> PUT/POST endpoint.
        await setForage(moodboardStorageKey, notes);
      } catch (error) {
        console.error("Failed to save moodboard notes", error);
      }
    };

    persistMoodboardNotes();
  }, [isHydrated, isPersistenceEnabled, notes]);

  const handleDownloadNotes = () => {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      notes,
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json",
    });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = objectUrl;
    anchor.download = `moodboard-${new Date().toISOString()}.json`;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  };

  const replaceNotesFromImport = (payload) => {
    const importedNotes = extractMoodboardImportNotes(payload);

    if (importedNotes === null) {
      throw new Error("Invalid moodboard JSON format");
    }

    setIsPersistenceEnabled(true);
    setNotes(normalizeMoodboardNotes(importedNotes));
    setIsDialogOpen(false);
    setEditingNoteId(null);
    setFormValues(emptyMoodboardForm);
    setIsImportDialogOpen(false);
    setImportText("");
  };

  const handleOpenImportDialog = () => {
    setIsImportDialogOpen(true);
  };

  const handleCloseImportDialog = () => {
    setIsImportDialogOpen(false);
    setImportText("");
  };

  const handleImportTextChange = (event) => {
    setImportText(event.target.value);
  };

  const handleImportTextSubmit = (event) => {
    event.preventDefault();

    try {
      replaceNotesFromImport(JSON.parse(importText));
    } catch (error) {
      window.alert("Could not import moodboard JSON. Check the format and try again.");
    }
  };

  const handleImportFile = async (file) => {
    if (!file) {
      return;
    }

    try {
      const fileText = await file.text();
      replaceNotesFromImport(JSON.parse(fileText));
    } catch (error) {
      window.alert("Could not import moodboard JSON file.");
    }
  };

  const handleResetNotes = () => {
    const shouldReset = window.confirm(
      "Delete all current moodboard ideas?",
    );

    if (!shouldReset) {
      return;
    }

    setIsPersistenceEnabled(true);
    setNotes([]);
    setIsDialogOpen(false);
    setEditingNoteId(null);
    setFormValues(emptyMoodboardForm);
  };

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
    setIsPersistenceEnabled(true);
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

    setIsPersistenceEnabled(true);

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

  return {
    notes,
    isDialogOpen,
    isImportDialogOpen,
    formValues,
    editingNoteId,
    importText,
    handleOpenDialog,
    handleDownloadNotes,
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
  };
};

export default useMoodboardNotes;
