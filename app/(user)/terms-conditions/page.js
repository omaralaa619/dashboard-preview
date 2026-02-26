const page = () => {
  const brand = process.env.NEXT_PUBLIC_BRAND_NAME;

  const email = process.env.EMAIL;
  return (
    <div className="min-h-[100vh] bg-gray-50 text-gray-800">
      <div className="max-w-[1300px] m-auto pt-32 py-8 pb-8">
        <div class="font-sans max-w-3xl mx-auto p-6 ">
          <h1 class="text-2xl font-bold text-center mb-6">Terms of Service</h1>

          <h2 class="font-semibold text-lg mb-2">Introduction</h2>
          <p class="mb-4">
            Welcome to <span class="font-bold uppercase">{brand}</span>. By
            accessing or using our e-commerce store, you agree to comply with
            and be bound by the following Terms of Service. Please read these
            terms carefully before using our website.
          </p>

          <h2 class="font-semibold text-lg mb-2">User Responsibilities</h2>

          <p class="mb-4">
            <span class="font-bold">Accuracy of Information:</span> You agree to
            provide accurate and complete information during the registration
            and checkout processes.
          </p>

          <h2 class="font-semibold text-lg mb-2">Product Information</h2>
          <p class="mb-2">
            <span class="font-bold">Product Descriptions:</span>{" "}
            <span class="font-bold uppercase">{brand}</span> strives to provide
            accurate and up-to-date product information. However, we do not
            warrant that product descriptions or other content on our site are
            error-free, complete, reliable, or current.
          </p>
          <p class="mb-4">
            <span class="font-bold">Availability:</span> All products are
            subject to availability.{" "}
            <span class="font-bold uppercase">{brand}</span> reserves the right
            to discontinue any product at any time.
          </p>

          <h2 class="font-semibold text-lg mb-2">Ordering and Shipping</h2>
          <p class="mb-2">
            <span class="font-bold">Order Confirmation:</span> Once you place an
            order, you will receive an order confirmation email. This email
            serves as acknowledgment that we have received your order but does
            not confirm acceptance.
          </p>
          <p class="mb-4">
            <span class="font-bold">Shipping:</span>{" "}
            <span class="font-bold uppercase">{brand}</span> collaborates with
            trusted partners like Sharex to ensure seamless and fast delivery.
            Please refer to our shipping policy for more details.
          </p>

          <h2 class="font-semibold text-lg mb-2">Privacy Policy</h2>
          <p class="mb-4">
            <span class="font-bold">Personal Information:</span> Your submission
            of personal information through our store is governed by our Privacy
            Policy. Please review this policy to understand our practices.
          </p>

          <h2 class="font-semibold text-lg mb-2">
            Modifications to Terms of Service
          </h2>
          <p class="mb-4">
            <span class="font-bold uppercase">{brand}</span> reserves the right
            to update, change, or replace any part of these Terms of Service. It
            is your responsibility to check our website periodically for
            changes. Your continued use of or access to our website following
            the posting of any changes constitutes acceptance of those changes.
          </p>

          <h2 class="font-semibold text-lg mb-2">Contact Information</h2>
          <p class="mb-4">
            For any inquiries or concerns regarding these Terms of Service,
            please contact our customer service at{" "}
            <a href={`mailto:${email}`} class="text-blue-600 underline">
              {email}
            </a>
            .
          </p>

          <p class="italic text-center">
            Thank you for choosing {brand}. Happy shopping!
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
