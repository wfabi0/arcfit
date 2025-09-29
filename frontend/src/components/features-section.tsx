import { Brain, Users, Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Users,
    title: "Lotação em Tempo Real",
    description:
      "Monitore a ocupação da academia em tempo real através do nosso app e evite horários de pico.",
  },
  {
    icon: Zap,
    title: "Equipamentos de Qualidade",
    description:
      "Variedade de equipamentos que atendem desde iniciantes até atletas avançados.",
  },
  {
    icon: Brain,
    title: "Instrutores de Qualidade",
    description:
      "Equipe de instrutores qualificados para orientar e motivar você em sua jornada fitness.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="vantagens" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Tecnologia que Transforma
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubra como a inovação pode revolucionar sua experiência fitness
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="text-primary" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-pretty">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
