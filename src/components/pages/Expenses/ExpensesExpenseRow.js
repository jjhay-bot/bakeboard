import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import {
  formatExpenseDate,
  formatPeso,
  getCategoryLabel,
  getPaymentChannelLabel,
} from "./expensesData";
import useExpenseImage from "./useExpenseImage";

const ExpensesExpenseRow = ({ expense, onEdit, onDelete }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const imageUrl = useExpenseImage(expense);

  const handleOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    onEdit(expense);
  };

  const handleDelete = () => {
    handleCloseMenu();
    onDelete(expense);
  };

  return (
    <Paper
      variant="boardPanel"
      elevation={0}
      sx={{ p: 2, py: 1.25 }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="flex-start"
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={`${getCategoryLabel(expense.category)} receipt`}
            sx={{
              width: 48,
              height: 48,
              flexShrink: 0,
              borderRadius: "10px",
              objectFit: "cover",
              border: "1px solid #f2d7ca",
            }}
          />
        ) : null}

        <Stack
          spacing={0.75}
          flexGrow={1}
          minWidth={0}
        >
          <Typography
            color="secondary.main"
            fontSize={16}
            fontWeight={700}
          >
            {getCategoryLabel(expense.category)}
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            alignItems="center"
          >
            <Box
              sx={{
                display: "inline-flex",
                px: 1,
                py: 0.25,
                borderRadius: "999px",
                bgcolor: "#fff1e7",
                border: "1px solid #f2d7ca",
                color: "#8a5640",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {getPaymentChannelLabel(expense.paymentChannel)}
            </Box>
            <Typography
              color="#9a7a6a"
              fontSize={13}
            >
              {formatExpenseDate(expense.date)}
            </Typography>
          </Stack>

          {expense.note ? (
            <Typography
              color="#6f5a4f"
              fontSize={14}
              lineHeight={1.5}
            >
              {expense.note}
            </Typography>
          ) : null}
        </Stack>

        <Stack
          spacing={0.5}
          alignItems="flex-end"
        >
          <Typography
            color="secondary.main"
            fontSize={18}
            fontWeight={700}
            whiteSpace="nowrap"
          >
            {formatPeso(expense.amount)}
          </Typography>
          <IconButton
            aria-label={`More actions for ${getCategoryLabel(expense.category)}`}
            onClick={handleOpenMenu}
            size="small"
            sx={{ color: "#9a7a6a", mt: -0.5, mr: -0.5 }}
          >
            <MoreVertRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>
      </Stack>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{ color: "#c85027" }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default ExpensesExpenseRow;
