const page = () => {
  return (
    <div className="min-h-[100vh] bg-gray-50 text-gray-800">
      <div className="max-w-[1300px] m-auto pt-32 py-8 pb-8">
        <div class=" font-sans max-w-3xl mx-auto p-6 ">
          <h1 class="text-3xl font-bold text-center mb-6">
            Refund & Exchange Policy
          </h1>

          <p class="mb-4">
            We don&apos;t do refunds. You can check the product while the
            courier is waiting outside. If the item didn&apos;t fit you, you
            will be only responsible for the shipping fees. Once the courier
            leaves, there&apos;s no refund — you can only exchange sizes.
          </p>

          <p class="mb-4">
            Note that exchanges must be requested within{" "}
            <span class="font-semibold">48 hours maximum</span> from receiving
            your order, and the item must be in its original condition with
            labels.
          </p>

          <p class="mb-4">
            If there&apos;s any issues, feel free to reach us through our DMs or
            email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
