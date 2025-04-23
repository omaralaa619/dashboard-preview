import { AnimatePresence } from "framer-motion";
import ModalGen from "../../UI/ModalGen";
import classes from "./ItemsModal.module.css";
import ListItem from "./ListItem";

const ItemsModal = ({ groupByUrl, closeModal, modal }) => {
  return (
    <ModalGen open={modal} closeModal={closeModal} className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <p className={classes.title}>Top Pages</p>
          <p className={classes.sub}>VISITORS</p>
        </div>
        <div className={classes.list}>
          {groupByUrl.map((item) => (
            <ListItem key={item.group} item={item} max={groupByUrl[0].count} />
          ))}
        </div>
        <div className={classes.closeContainer}>
          <button className={classes.close} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </ModalGen>
  );
};

export default ItemsModal;
