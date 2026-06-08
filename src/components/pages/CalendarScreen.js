import ScreenContainer from "../layout/ScreenContainer";
import PagePlaceholder from "./PagePlaceholder";

const CalendarScreen = () => {
  return (
    <ScreenContainer>
      <PagePlaceholder
        eyebrow="Schedule Tracking"
        title="Calendar"
        description="This will show workload by date so busy pickup days are easy to spot."
        items={["Today", "Upcoming", "Campaign Dates"]}
      />
    </ScreenContainer>
  );
};

export default CalendarScreen;
