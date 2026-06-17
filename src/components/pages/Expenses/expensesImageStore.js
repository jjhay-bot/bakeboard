import { getForage, removeForage, setForage } from "../../../utils/forage";

// Receipt images are stored OUTSIDE the main expenses array, one blob per key,
// so editing/saving an expense never rewrites every image. The expense object
// only carries a `hasImage` flag; the blob is fetched on demand by id.
//
// API-ready note:
// If a backend is introduced, swap these for upload/fetch/delete calls against
// an object store (e.g. POST /expenses/:id/receipt) — callers stay the same.

const buildImageKey = (expenseId) => `expense-image-${expenseId}`;

export const saveExpenseImage = async (expenseId, blob) => {
  if (!expenseId || !blob) {
    return;
  }

  try {
    await setForage(buildImageKey(expenseId), blob);
  } catch (error) {
    console.error("Failed to save expense image", error);
    throw error;
  }
};

export const getExpenseImage = async (expenseId) => {
  if (!expenseId) {
    return null;
  }

  try {
    return await getForage(buildImageKey(expenseId));
  } catch (error) {
    console.error("Failed to load expense image", error);
    return null;
  }
};

export const removeExpenseImage = async (expenseId) => {
  if (!expenseId) {
    return;
  }

  try {
    await removeForage(buildImageKey(expenseId));
  } catch (error) {
    console.error("Failed to remove expense image", error);
  }
};
