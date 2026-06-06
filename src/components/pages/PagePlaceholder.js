import { Chip, Stack, Typography } from "@mui/material";

const PagePlaceholder = ({ eyebrow, title, description, items = [] }) => {
  return (
    <Stack spacing={2} px={2} py={3}>
      <Stack spacing={0.5}>
        {eyebrow ? (
          <Typography color="secondary" fontSize={12} fontWeight={700}>
            {eyebrow}
          </Typography>
        ) : null}
        <Typography color="#5b3527" fontSize={28} fontWeight={700}>
          {title}
        </Typography>
        <Typography color="#7f655b" fontSize={14}>
          {description}
        </Typography>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1}>
        {items.map((item) => (
          <Chip
            key={item}
            label={item}
            sx={{
              bgcolor: "#fff1e7",
              border: "1px solid #f2d7ca",
              color: "#8a5640",
              fontWeight: 600,
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default PagePlaceholder;
