"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

const galleryImages = [
  {
    id: 1,
    src: "/area-musculacao.png",
    alt: "Academia ArcFit - Área de musculação com equipamentos modernos",
    title: "Área de Musculação",
    description:
      "Equipamentos de última geração para treinos de força e hipertrofia",
  },
  {
    id: 2,
    src: "/area-cardio.png",
    alt: "Academia ArcFit - Área cardio com esteiras e bicicletas",
    title: "Área Cardio",
    description: "Espaço amplo com equipamentos cardiovasculares modernos",
  },
  {
    id: 3,
    src: "/area-funcional.png",
    alt: "Academia ArcFit - Área funcional para treinos dinâmicos",
    title: "Área Funcional",
    description: "Espaço versátil para treinos funcionais e em grupo",
  },
  {
    id: 4,
    src: "/area-treino.png",
    alt: "Academia ArcFit - Área de treino personalizado",
    title: "Área de Treino",
    description:
      "Ambiente dedicado para treinos personalizados e acompanhamento",
  },
  {
    id: 5,
    src: "/area-banheiro.png",
    alt: "Academia ArcFit - Vestiários modernos e limpos",
    title: "Vestiários",
    description: "Vestiários amplos e modernos com toda comodidade",
  },
  {
    id: 6,
    src: "/area-recepcao.png",
    alt: "Academia ArcFit - Recepção acolhedora",
    title: "Recepção",
    description: "Ambiente acolhedor para receber nossos alunos",
  },
];

export default function GallerySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (api && isModalOpen) {
      api.scrollTo(currentImageIndex);
    }
  }, [api, isModalOpen, currentImageIndex]);

  const openModal = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  return (
    <section
      id="galeria"
      className="py-20 lg:py-28 border-t-1 border-t-zinc-800"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Venha se juntar a nós
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Conheça nossos espaços e veja por que a ArcFit é o lugar perfeito
            para sua transformação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => openModal(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[100%] p-6 bg-black/98 border-zinc-800 overflow-hidden">
            <DialogTitle className="sr-only">
              Galeria de Imagens - {galleryImages[current - 1]?.title}
            </DialogTitle>

            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <div className="w-full max-w-5xl mx-auto">
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent className="h-[70vh]">
                    {galleryImages.map((image, index) => (
                      <CarouselItem key={image.id} className="basis-full">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="relative w-full h-full max-h-[70vh]">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-contain rounded-lg"
                              sizes="90vw"
                              priority={index === currentImageIndex}
                              quality={95}
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-white w-12 h-12" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-white w-12 h-12" />
                </Carousel>
              </div>

              <div className="flex items-center flex-col text-center">
                <h3 className="text-white text-xl font-semibold mb-1">
                  {galleryImages[current - 1]?.title}
                </h3>
                <p className="text-white/80 text-sm mb-2 text-center">
                  {galleryImages[current - 1]?.description}
                </p>
                <p className="text-teal-400 text-xs text-center">
                  {current} de {count}
                </p>
              </div>

              <div className="hidden lg:block z-40 pt-5">
                <div className="flex space-x-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      className={`relative w-16 h-12 rounded overflow-hidden transition-all duration-300 ${
                        index === current - 1
                          ? "ring-2 ring-teal-500 opacity-100"
                          : "opacity-60 hover:opacity-80"
                      }`}
                      onClick={() => api?.scrollTo(index)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
