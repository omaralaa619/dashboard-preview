"use client";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./NewsletterDetails.module.css";

const NewsletterDetails = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [newsletter, setNewsletter] = useState({});
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/newsletter/${id}`, {
        method: "GET",
      });

      if (response) {
        const data = await response.json();

        setNewsletter(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div>
      <Card className="p-10">
        <div className={classes.container}>
          <h2>THAWB</h2>

          <p class="header">{newsletter.title}</p>

          <div
            id="details"
            className={classes.newsletterBody}
            dangerouslySetInnerHTML={{ __html: newsletter.body }}
          ></div>
        </div>
      </Card>
    </div>
  );
};

export default NewsletterDetails;
