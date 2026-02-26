import classes from "../../../components/user/Contact.module.css";

const page = () => {
  const brand = process.env.NEXT_PUBLIC_BRAND_NAME;
  const email = process.env.EMAIL;

  return (
    <div className="min-h-[100vh] bg-gray-50 text-gray-800">
      <div className="max-w-[1300px] m-auto pt-32 py-8 pb-8">
        <div class=" font-sans">
          <div class="max-w-3xl mx-auto p-6">
            <h1 class="text-3xl font-bold text-center mb-8">PRIVACY POLICY</h1>

            <p class="mb-4">
              This Privacy Policy describes how your personal information is
              collected, used, and shared when you visit or make a purchase from
              our website (<span class="font-semibold">{brand}</span>).
            </p>

            <h2 class="text-xl font-semibold mt-6 mb-2">
              Information We Collect
            </h2>
            <p class="mb-2">
              We collect information about you when you visit our Site, place an
              order, or contact us.
            </p>
            <p class="mb-2">The information we collect may include:</p>
            <ul class="list-disc list-inside mb-4 space-y-1">
              <li>
                Your name, email address, phone number, and mailing address
              </li>
              <li>
                Your payment information (such as your credit card number)
              </li>
              <li>Your IP address and browser information</li>
            </ul>

            <h2 class="text-xl font-semibold mt-6 mb-2">
              How We Use Your Information
            </h2>
            <p class="mb-2">
              We use the information we collect in a variety of ways, including:
            </p>
            <ul class="list-disc list-inside mb-4 space-y-1">
              <li>To process your orders and payments</li>
              <li>To provide you with customer service</li>
              <li>To send you marketing and promotional materials</li>
              <li>To personalize your experience on our Site</li>
              <li>To improve our Site and products</li>
              <li>To prevent fraud and protect our legal rights</li>
            </ul>

            <h2 class="text-xl font-semibold mt-6 mb-2">
              Sharing Your Information
            </h2>
            <p class="mb-2">
              We may share your information with third parties for the purposes
              of processing your orders, providing customer service, and
              improving our Site and products. These third parties may include:
            </p>
            <ul class="list-disc list-inside mb-4 space-y-1">
              <li>Shipping companies</li>
              <li>Payment processors</li>
              <li>Marketing and advertising partners</li>
            </ul>
            <p class="mb-4">
              We may also share your information if we are required to do so by
              law or if we believe that sharing is necessary to protect our
              legal rights or the safety of our customers.
            </p>

            <h2 class="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
            <p class="mb-4">
              You have the right to access the information we collect about you.
              You also have the right to correct, delete, or restrict the use of
              your information. You can exercise these rights by contacting us
              at <span class="italic">[email protected]</span>.
            </p>

            <h2 class="text-xl font-semibold mt-6 mb-2">Cookies</h2>
            <p class="mb-2">
              We use cookies to collect information about you when you visit our
              Site. Cookies are small files that are stored on your computer or
              mobile device. We use cookies to:
            </p>
            <ul class="list-disc list-inside mb-4 space-y-1">
              <li>Remember your preferences</li>
              <li>Track your shopping activity</li>
              <li>Improve our Site and products</li>
            </ul>
            <p class="mb-4">
              You can choose to disable cookies on your computer or mobile
              device. However, if you disable cookies, you may not be able to
              use all of the features of our Site.
            </p>

            <h2 class="text-xl font-semibold mt-6 mb-2">Security</h2>
            <p class="mb-4">
              We take precautions to protect your information. We use secure
              servers to store your information and we encrypt sensitive
              information.
            </p>

            <h2 class="text-xl font-semibold mt-6 mb-2">
              Changes to This Privacy Policy
            </h2>
            <p class="mb-4">
              We may update this Privacy Policy from time to time. Any changes
              to this Privacy Policy will be posted on this page.
            </p>

            <h2 class="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
            <p class="mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href={`mailto:${email}`}
                class="text-blue-600 font-medium hover:underline"
              >
                {email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
