import { CheckCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 lg:py-28 border-t-1 border-t-zinc-800">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Sobre a ArcFit
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A ArcFit é mais que uma academia - é um espaço onde você encontra
              motivação, suporte e tecnologia de ponta para transformar seu
              estilo de vida. Nossa missão é ajudar você a alcançar seus
              objetivos fitness de forma sustentável e prazerosa.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-teal-500 w-6 h-6 flex-shrink-0" />
                <span className="text-foreground">
                  Equipamentos de última geração
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-teal-500 w-6 h-6 flex-shrink-0" />
                <span className="text-foreground">
                  Profissionais qualificados
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-teal-500 w-6 h-6 flex-shrink-0" />
                <span className="text-foreground">
                  Ambiente motivador e acolhedor
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-teal-500 w-6 h-6 flex-shrink-0" />
                <span className="text-foreground">Horários flexíveis</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-teal-500 w-6 h-6 flex-shrink-0" />
                <span className="text-foreground">
                  Aplicativo de última geração
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Nossa História
              </h3>
              <p className="text-muted-foreground">
                Fundada em 2025, a ArcFit nasceu da paixão por fitness e
                bem-estar. Começamos como uma pequena academia local e hoje
                somos referência em qualidade e inovação no setor fitness.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Nossa Visão
              </h3>
              <p className="text-muted-foreground">
                Ser a academia que transforma vidas através do movimento,
                oferecendo experiências únicas que inspiram e motivam nossos
                alunos a superarem seus limites todos os dias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
