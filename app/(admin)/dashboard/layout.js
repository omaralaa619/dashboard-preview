import { Poppins } from "next/font/google";
import "../../globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import Sidebar from "@/components/dashboard/navigation/Sidebar";
import AuthProvider from "@/components/auth/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <ReduxProvider>
        <html lang="en">
          <body className={poppins.className} data-theme="dark">
            <Sidebar>{children}</Sidebar>
          </body>
        </html>
      </ReduxProvider>
    </AuthProvider>
  );
}
