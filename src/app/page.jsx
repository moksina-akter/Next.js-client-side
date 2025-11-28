import Banner from "@/Component/Banner";
import Features from "@/Component/Feature";
import Products from "@/Component/Products";
import Testimonials from "@/Component/Testimonials";

export default function Home() {
  return (
    <div className=" min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <Products />
      <Features />
      <Testimonials />
    </div>
  );
}
