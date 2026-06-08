import { Stack, Typography } from "@mui/material";
import ScreenContainer from "../../layout/ScreenContainer";
import AddOrderForm from "./AddOrderForm";

const AddOrderScreen = () => {
  return (
    <ScreenContainer sx={{ bgcolor: "#fffaf6" }}>
      <Stack spacing={2} px={2} py={2}>
        <Stack spacing={0.5}>
          <Typography color="#8a5640" fontSize={12} fontWeight={700}>
            Capture order
          </Typography>
          <Typography color="secondary.main" fontSize={28} fontWeight={700}>
            Add Order
          </Typography>
          <Typography color="#7f655b" fontSize={14}>
            Keep it fast: type the essentials, tap the repeated choices, then
            review the draft before wiring it into the full order flow.
          </Typography>
        </Stack>
        <AddOrderForm submitLabel="Save Draft" />
      </Stack>
    </ScreenContainer>
  );
};

export default AddOrderScreen;
