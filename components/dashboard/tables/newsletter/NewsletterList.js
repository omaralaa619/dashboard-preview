import classes from "./NewsletterList.module.css";
import Link from "next/link";

const NewsletterList = ({
  newsletters,
  handleCheckboxes,
  checkedNewsletters,
  allHandler,
}) => {
  return (
    <>
      <div className={`${classes.row} ${classes.header} ${classes.container}`}>
        <p>Title</p>
        <p>Subject</p>
        <p>Date</p>
      </div>

      <div>
        {newsletters.map((newsletter) => (
          <Link
            href={`/dashboard/newsletter/${newsletter._id}`}
            key={newsletter._id}
          >
            <div className={`${classes.row} ${classes.container}`}>
              <p>{newsletter.title}</p>
              <p>{newsletter.subject}</p>
              <p>
                {newsletter.date
                  ? new Date(newsletter.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                  : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default NewsletterList;
