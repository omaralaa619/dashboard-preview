import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./DeliveryInfo.module.css";
import { useRouter } from "next/navigation";

const Paymob = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getPaymobToken = async () => {
    setLoading(true);
    const response = await fetch("/api/paymob", {
      method: "POST",

      body: JSON.stringify({}),
    });

    const { client_secret } = await response.json();

    router.push(
      `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PAYMOB_PUBLIC}&clientSecret=${client_secret}`
    );

    setLoading(false);
  };
  return (
    <button
      className={classes.button}
      //   disabled={loading}
      type="button"
      onClick={getPaymobToken}
    >
      {!loading && <p>Pay Now</p>}
      {loading && <LoadingSpinner size={20} />}
    </button>
  );
};

export default Paymob;
