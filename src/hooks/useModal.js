import { useState } from "react";

export const useModal = (initialState = false) => {
  const [modal, showModal] = useState(initialState);

  const setModal = () => showModal(!modal);

  return { modal, setModal };
};
