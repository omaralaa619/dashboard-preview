import classes from "../../../components/user/Contact.module.css";
const page = () => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <p className={classes.title}>Contact</p>
        <p>
          Please feel free to contact us through Direct Messages on Instagram
        </p>

        <div className={classes.bContainer}>
          <a
            href="https://www.instagram.com/lynnenahle/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Our Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
