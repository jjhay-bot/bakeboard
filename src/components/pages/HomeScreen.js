import { Stack } from "@mui/material";
import { useState } from "react";
import ScreenContainer from "../layout/ScreenContainer";
import MuiSelect from "../atoms/MuiSelect";

const studentOptions = [
  { id: 1, label: "Test" },
  { id: 2, label: "Test 2" },
  { id: 3, label: "Skills" },
];

const HomeScreen = () => {
  const [selectedStudent, setSelectedStudent] = useState(studentOptions[1]);

  return (
    <ScreenContainer sx={{ bgcolor: "#f0f0" }} className="red" vh="100dvh">
      <Stack px={2} py={2}>
        <MuiSelect
          name="student"
          options={studentOptions}
          value={selectedStudent}
          onChange={(_, value) => {
            if (Array.isArray(value)) {
              return;
            }

            setSelectedStudent(value);
          }}
        />
      </Stack>
    </ScreenContainer>
  );
};

export default HomeScreen;
