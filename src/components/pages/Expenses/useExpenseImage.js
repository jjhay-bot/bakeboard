import { useEffect, useState } from "react";
import { getExpenseImage } from "./expensesImageStore";

// Loads a single expense's stored receipt blob and exposes it as an object URL,
// revoking the URL on cleanup / when the expense changes. Returns null when the
// expense has no image (or the blob is missing, e.g. after an import).
const useExpenseImage = (expense) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!expense?.hasImage) {
      setImageUrl(null);
      return undefined;
    }

    let objectUrl = null;
    let isActive = true;

    const loadImage = async () => {
      const blob = await getExpenseImage(expense.id);

      if (!isActive || !blob) {
        return;
      }

      objectUrl = URL.createObjectURL(blob);
      setImageUrl(objectUrl);
    };

    loadImage();

    return () => {
      isActive = false;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [expense?.id, expense?.hasImage]);

  return imageUrl;
};

export default useExpenseImage;
