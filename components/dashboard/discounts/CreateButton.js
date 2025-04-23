import { useDispatch } from "react-redux";
import { adminUiActions } from "@/store/admin-ui-store";

const CreateButton = () => {
  const dispatch = useDispatch();

  const modalHandler = () => {
    dispatch(adminUiActions.toggleDiscountModal());
  };
  return <button onClick={modalHandler}>New discount</button>;
};

export default CreateButton;
