import Image from "next/image";
import Navbar from "./components/Navbar";
import NewestProducts from "./components/NewestProducts";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Fint the best Tailwind</h1>
        <h1 className="text-primary">Templates & Icons</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe error
          repellat, sed voluptate assumenda officiis dolorum ad voluptatibus at
          ex voluptas distinctio facilis corrupti minus libero architecto
          placeat iste debitis?
        </p>
      </div>
      <NewestProducts />
    </section>
  );
}
