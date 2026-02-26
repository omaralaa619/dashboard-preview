import { Nunito } from "next/font/google";
import "../globals.css";

import ReduxProvider from "@/store/ReduxProvider";
import NavBar from "@/components/user/navigation/NavBar";
import PHprovoider from "@/components/posthog/PHprovoider";
import AuthProvider from "@/components/auth/AuthProvider";
import Footer from "@/components/user/footer/Footer";
import FacebookPixel from "@/components/pixel/FacebookPixel";
import MobileNavlinks from "@/components/user/navigation/MobileNavlinks";
import DesktopNavlinks from "@/components/user/navigation/DesktopNavlinks";
import Quickadd from "@/components/user/quickadd/Quickadd";
import Cart from "@/components/user/cart/Cart";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Rose",
  description: "Rose",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={nunito.className}>
          <ReduxProvider>
            <PHprovoider>
              <NavBar />
              <MobileNavlinks />
              <DesktopNavlinks />
              <Quickadd />
              <Cart />
              {children}
              <FacebookPixel />
              <Footer />
            </PHprovoider>
          </ReduxProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
