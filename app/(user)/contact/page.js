import ContactForm from "@/components/user/contact/ContactForm";
import classes from "../../../components/user/Contact.module.css";
const page = () => {
  const email = process.env.EMAIL;
  const number = process.env.NEXT_PUBLIC_NUMBER;
  const address = process.env.NEXT_PUBLIC_ADDRESS;
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <p className={classes.title} id="sent">
          Contact Us
        </p>
        {/* <p>
          Please feel free to contact us through Direct Messages on Instagram
        </p> */}
        <div className="md:flex gap-14">
          <div className="flex-1">
            <ContactForm />
          </div>

          <div className="text-left mt-10 flex flex-col gap-2 ">
            <div>
              <p className="font-medium">Phone Number:</p>
              <p className="text-neutral-600">{number}</p>
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p className="text-neutral-600"> {email}</p>
            </div>
            <div>
              <p className="font-medium">Address:</p>
              <p className="text-neutral-600">{address}</p>
            </div>
          </div>
        </div>

        {/* <div className={classes.bContainer}>
          <a
            href="https://www.instagram.com/lynnenahle/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Our Page
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default page;
