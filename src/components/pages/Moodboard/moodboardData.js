const noteColors = [
  "#fff2a8",
  "#ffd7d1",
  "#d9f0dc",
  "#dcebff",
  "#ffe8bf",
  "#f5d7f1",
];

const noteLayouts = [
  {
    size: { xs: 12, sm: 6 },
    minHeight: 168,
    rotation: "-2deg",
    tapeOffset: { top: 10, right: 18 },
  },
  {
    size: { xs: 12, sm: 6 },
    minHeight: 250,
    rotation: "1.5deg",
    tapeOffset: { top: 12, right: 16 },
  },
  {
    size: { xs: 12, sm: 4 },
    minHeight: 182,
    rotation: "-1deg",
    tapeOffset: { top: 8, right: 14 },
  },
  {
    size: { xs: 12, sm: 8 },
    minHeight: 176,
    rotation: "2deg",
    tapeOffset: { top: 10, right: 22 },
  },
  {
    size: { xs: 12, sm: 5 },
    minHeight: 286,
    rotation: "-1.5deg",
    tapeOffset: { top: 12, right: 18 },
  },
  {
    size: { xs: 12, sm: 3 },
    minHeight: 148,
    rotation: "1deg",
    tapeOffset: { top: 8, right: 12 },
  },
];

const imageBackgrounds = [
  "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.1)), linear-gradient(120deg, #f7b6a6, #f5e2c8 55%, #d98d74)",
  "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0)), radial-gradient(circle at top left, #fff1d6, transparent 35%), linear-gradient(135deg, #d88f52, #f3c899 58%, #fff2df)",
];

export const emptyMoodboardForm = {
  title: "",
  body: "",
  tag: "idea",
  imageUrl: "",
  status: "active",
};

export const moodboardStatusOptions = [
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];

export const moodboardTagOptions = [
  { value: "idea", label: "Idea" },
  { value: "inspo", label: "Inspo" },
  { value: "feature", label: "Feature" },
  { value: "ux", label: "UX" },
  { value: "visual", label: "Visual" },
  { value: "note", label: "Note" },
];

export const applyMoodboardLayout = (note, index) => {
  const layout = noteLayouts[index % noteLayouts.length];

  return {
    ...note,
    status: note.status || "active",
    tone: note.tone || noteColors[index % noteColors.length],
    size: note.size || layout.size,
    minHeight: note.minHeight || layout.minHeight,
    rotation: note.rotation || layout.rotation,
    tapeOffset: note.tapeOffset || layout.tapeOffset,
  };
};

export const buildMoodboardFormValues = (note) => ({
  title: note.title || "",
  body: note.body || "",
  tag: note.tag || "",
  imageUrl: note.image?.src || "",
  status: note.status || "active",
});

export const buildMoodboardImage = (imageUrl) => {
  if (!imageUrl) {
    return null;
  }

  return {
    label: "Attached image",
    src: imageUrl,
  };
};

export const initialMoodboardNotes = [
  {
    id: "idea-1",
    title: "Midnight capture",
    body: "Need a one-tap way to throw in ideas before context switching kills them.",
    tag: "idea",
  },
  {
    id: "idea-2",
    title: "Cake peg wall",
    body: "Collect textured cakes, color combos, and packaging pegs for custom orders later.",
    tag: "inspo",
    // image: {
    //   label: "Reference collage",
    //   background: imageBackgrounds[0],
    // },
    image: {
      label: "Attached image",
      src: "https://plus.unsplash.com/premium_photo-1770393605567-c3a5673a42ee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: "idea-3",
    title: "Pinned later",
    body: "Strong ideas should stay floating at the top until I either build them or kill them.",
    tag: "feature",
    status: "done",
  },
  {
    id: "idea-4",
    title: "Home widget",
    body: "The newest note should always stay visible from the first screen.",
    tag: "ux",
  },
  {
    id: "idea-5",
    title: "Packaging inspo",
    body: "Some notes can carry an image preview so visual references are not just text.",
    tag: "visual",
    image: {
      label: "Attached image",
      src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: "idea-6",
    title: "Tiny reminder",
    body: "Keep drafts messy. Polishing can happen later.",
    tag: "note",
    status: "done",
  },
].map(applyMoodboardLayout);
