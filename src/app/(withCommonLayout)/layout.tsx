import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { Toaster } from "sonner";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <main className="min-h-screen">{children}</main>
        <Toaster richColors position="top-center" />
      </div>
      <Footer />
    </>
  );
};

export default CommonLayout;
