import ScreenContainer from "../layout/ScreenContainer";
import PagePlaceholder from "./PagePlaceholder";

const PaymentsScreen = () => {
  return (
    <ScreenContainer>
      <PagePlaceholder
        eyebrow="Follow Up"
        title="Payments"
        description="This will separate unpaid and downpayment orders for quick reminders and collection."
        items={["Unpaid", "Downpayment", "Mark Fully Paid"]}
      />
    </ScreenContainer>
  );
};

export default PaymentsScreen;
