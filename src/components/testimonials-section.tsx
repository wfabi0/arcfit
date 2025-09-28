import { Star } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "João",
    avatar: "/treinando-01.png",
    rating: 5,
    quote:
      "A melhor academia da cidade! Profissionais atenciosos e equipamentos de ponta.",
  },
  {
    name: "Maria",
    avatar: "/treinando-02.png",
    rating: 4,
    quote: "Estou adorando os treinos! O ambiente é super motivador.",
  },
  {
    name: "Carlos",
    avatar: "/treinando-03.png",
    rating: 5,
    quote: "Resultados incríveis em pouco tempo. Recomendo a todos!",
  },
  {
    name: "Ana",
    avatar: "/treinando-04.png",
    rating: 5,
    quote: "Aulas de grupo fantásticas e uma comunidade acolhedora.",
  },
  {
    name: "Pedro",
    avatar: "/treinando-01.png",
    rating: 4,
    quote: "Infraestrutura excelente e ótimos instrutores. Vale muito a pena!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              O que nossos clientes dizem
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Veja os depoimentos de pessoas que transformaram suas vidas com a
              gente.
            </p>
          </div>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xl mx-auto mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <Image
                        alt={testimonial.name}
                        className="rounded-full mb-4"
                        height={80}
                        src={testimonial.avatar}
                        style={{
                          aspectRatio: "80/80",
                          objectFit: "cover",
                        }}
                        width={80}
                      />
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-5 ${
                              i < testimonial.rating
                                ? "text-primary fill-primary"
                                : "text-muted-foreground/50"
                            }`}
                          />
                        ))}
                      </div>
                      <blockquote className="text-lg font-semibold leading-snug mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <p className="text-sm font-medium text-muted-foreground">
                        {testimonial.name}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
