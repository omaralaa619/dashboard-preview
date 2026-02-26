const page = () => {
  return (
    <div className="min-h-[100vh] bg-gray-50 text-gray-800">
      <div className="max-w-[1300px] m-auto pt-32 py-8 pb-8">
        <div class="bg-gray-50 text-gray-800 font-sans max-w-xl mx-auto p-6 ">
          <h1 class="text-3xl font-bold text-center mb-6">Delivery Policy</h1>
          <h2 class="text-xl font-bold mb-4">Delivery Time</h2>
          <p class="mb-4">
            After completing the purchase from our website, our sales
            representatives will send you a direct message to confirm your order
            through Instagram or you will receive your confirmation via email.
          </p>
          <p>
            The order will be delivered within{" "}
            <span class="font-bold">one to three working days</span> after the
            confirmation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
