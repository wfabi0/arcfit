import Image from "next/image";
import { Button } from "./ui/button";

export default function BannerSection() {
  return (
    <section
      id="inicio"
      className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover w-full h-full"
          src={"/banner-04.png"}
          alt="banner-04"
          fill
          priority
          sizes="100vw"
          style={{
            objectPosition: "center 25%",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black/70 z-[5]"></div>
      <div className="z-10 text-center px-10 space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Sua Jornada Começa Aqui
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400">
            Transforme seu corpo e mente com o ArcFit.
            <br />
            Vamos juntos alcançar seus objetivos!
          </p>
        </div>
        <Button className="transition hover:duration-150 text-md md:px-6 lg:px-6 px-4 py-6 pt-5">
          Conheça nossos planos.
        </Button>
      </div>
    </section>
  );
}
