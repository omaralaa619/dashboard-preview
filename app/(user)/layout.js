import { IBM_Plex_Sans } from "next/font/google";
import "../globals.css";

import ReduxProvider from "@/store/ReduxProvider";
import NavBar from "@/components/user/navigation/NavBar";
import Footer from "@/components/user/footer/Footer";
import PHprovoider from "@/components/posthog/PHprovoider";
import AuthProvider from "@/components/auth/AuthProvider";
const poppins = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Lynne",
  description: "Lynne",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={poppins.className}>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
