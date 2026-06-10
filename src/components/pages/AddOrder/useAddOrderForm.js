// useAddOrderForm — owns all stateful behavior for the Add Order form so the
// component stays render-only. Takes the save callback, returns the values,
// handlers, derived preview, and flags the form needs to render.
import { useMemo, useState } from "react";
import {
  addOrderValueLabelMap,
  emptyAddOrderForm,
  formatAddOrderPickupDate,
  getAddOrderQuickDateOptions,
} from "./addOrderData";
import { createOrder } from "../../../services/orders/ordersService";
import {
  formatPaymentAmount,
  getPaymentStatus,
  getProductLabel,
} from "../../../services/orders/orderModel";
import { useSnackbar } from "../../feedback/SnackbarProvider";

const useAddOrderForm = ({ onSaveSuccess } = {}) => {
  const { showSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState(emptyAddOrderForm);
  const [savedOrder, setSavedOrder] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const quickDateOptions = useMemo(() => getAddOrderQuickDateOptions(), []);

  // Merge a partial update into the form. Pass one field — updateForm({ flavor })
  // — or several that change together — updateForm({ product, flavor: "" }).
  const updateForm = (patch) => {
    setFormValues((current) => ({
      ...current,
      ...patch,
    }));
  };

  const orderPreview = useMemo(
    () => ({
      customerName: formValues.customerName.trim() || "Customer name",
      product: getProductLabel(formValues.product),
      flavor: addOrderValueLabelMap[formValues.flavor],
      paymentStatus: getPaymentStatus(
        formValues.product,
        formValues.paymentAmount,
      ),
      paymentAmount: formatPaymentAmount(formValues.paymentAmount),
      pickupSlot: addOrderValueLabelMap[formValues.pickupSlot],
      pickupDate: formatAddOrderPickupDate(formValues.pickupDate),
      themeNotes: formValues.themeNotes.trim() || "No theme notes yet",
    }),
    [formValues],
  );

  const canSave =
    formValues.customerName.trim() &&
    formValues.pickupDate &&
    formValues.product &&
    formValues.flavor;

  const handleSaveDraft = async () => {
    if (!canSave || isSaving) {
      return;
    }

    try {
      setIsSaving(true);
      const createdOrder = await createOrder(formValues);

      showSnackbar({
        type: "success",
        message: `Order saved for ${createdOrder.customerName}.`,
      });

      if (onSaveSuccess) {
        onSaveSuccess(createdOrder);
        return;
      }

      setSavedOrder(createdOrder);
    } catch (error) {
      console.error("Failed to save order", error);
      showSnackbar({
        type: "error",
        message: "Couldn't save the order. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    formValues,
    isSaving,
    savedOrder,
    quickDateOptions,
    updateForm,
    orderPreview,
    canSave,
    handleSaveDraft,
  };
};

export default useAddOrderForm;
