import PagePlaceholder from "./PagePlaceholder";

const OrderDetailScreen = () => {
  return (
    <PagePlaceholder
      eyebrow="Order Detail"
      title="Order Details"
      description="This will hold customer info, payment status, notes, and quick order actions."
      items={["Status", "Mark Paid", "Copy Message", "Edit"]}
    />
  );
};

export default OrderDetailScreen;
