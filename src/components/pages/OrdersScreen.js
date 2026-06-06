import ScreenContainer from "../layout/ScreenContainer";
import PagePlaceholder from "./PagePlaceholder";

const OrdersScreen = () => {
  return (
    <ScreenContainer>
      <PagePlaceholder
        eyebrow="Main Working Screen"
        title="Orders"
        description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quod eum, explicabo magni cupiditate repudiandae numquam expedita provident adipisci, quaerat voluptatibus atque quam doloribus aliquam quos optio quas, ipsa eaque.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quod eum, explicabo magni cupiditate repudiandae numquam expedita provident adipisci, quaerat voluptatibus atque quam doloribus aliquam quos optio quas, ipsa eaque."
        items={["All", "Due Soon", "Unpaid", "Ready"]}
      />
    </ScreenContainer>
  );
};

export default OrdersScreen;
