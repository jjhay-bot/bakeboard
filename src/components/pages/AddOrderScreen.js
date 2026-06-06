import PagePlaceholder from "./PagePlaceholder";

const AddOrderScreen = () => {
  return (
    <PagePlaceholder
      eyebrow="Capture Order"
      title="Add Order"
      description="This will become the quick mobile form for customer, product, pickup, and payment details."
      items={["Customer", "Product", "Pickup", "Payment"]}
    />
  );
};

export default AddOrderScreen;
