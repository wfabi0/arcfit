import { currencyFormatter } from "@/utils/formatters";
import { Check, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type TipoPlano = "mensal" | "trimestral" | "semestral" | "anual";

type Plan = {
  id: string;
  name: string;
  description: string;
  tipo: TipoPlano;
  valor: number;
  valor_original: number;
  desconto_percentual: number;
  beneficios: string[];
  horario_permitido_inicio: string;
  horario_permitido_fim: string;
  limite_acessos_mes: number;
  status: "ativo" | "inativo";
  created_at: string;
  updated_at: string;
  popular?: boolean;
};

const plans: Plan[] = [
  {
    id: "1",
    name: "Plano A",
    description: "Acesso completo por 1 mês",
    tipo: "mensal",
    valor: 150.0,
    valor_original: 150.0,
    desconto_percentual: 0,
    beneficios: [
      "Acesso livre às instalações",
      "1 sessão com personal trainer",
      "Aulas grupais ilimitadas",
      "Consulta inicial com nutricionista",
    ],
    horario_permitido_inicio: "06:00",
    horario_permitido_fim: "22:00",
    limite_acessos_mes: 30,
    status: "ativo",
    created_at: "2023-10-01T10:00:00Z",
    updated_at: "2023-10-01T10:00:00Z",
    popular: true,
  },
  {
    id: "2",
    name: "Plano B",
    description: "Acesso completo por 3 meses",
    tipo: "trimestral",
    valor: 400.0,
    valor_original: 450.0,
    desconto_percentual: 10,
    beneficios: [
      "Acesso livre às instalações",
      "2 sessões com personal trainer",
      "Aulas grupais ilimitadas",
      "Consulta inicial com nutricionista",
      "Avaliação física mensal",
    ],
    horario_permitido_inicio: "06:00",
    horario_permitido_fim: "22:00",
    limite_acessos_mes: 90,
    status: "ativo",
    created_at: "2023-10-01T10:00:00Z",
    updated_at: "2023-10-01T10:00:00Z",
  },
  {
    id: "3",
    name: "Plano C",
    description: "Acesso completo por 6 meses",
    tipo: "semestral",
    valor: 750.0,
    valor_original: 900.0,
    desconto_percentual: 15,
    beneficios: [
      "Acesso livre às instalações",
      "4 sessões com personal trainer",
      "Aulas grupais ilimitadas",
      "Consulta inicial com nutricionista",
      "Avaliação física mensal",
      "Plano alimentar personalizado",
    ],
    horario_permitido_inicio: "06:00",
    horario_permitido_fim: "22:00",
    limite_acessos_mes: 180,
    status: "ativo",
    created_at: "2023-10-01T10:00:00Z",
    updated_at: "2023-10-01T10:00:00Z",
  },
  {
    id: "4",
    name: "Plano D",
    description: "Acesso completo por 12 meses",
    tipo: "anual",
    valor: 1400.0,
    valor_original: 1750.0,
    desconto_percentual: 20,
    beneficios: [
      "Acesso livre às instalações",
      "8 sessões com personal trainer",
      "Aulas grupais ilimitadas",
      "Consulta inicial com nutricionista",
      "Avaliação física mensal",
      "Plano alimentar personalizado",
      "Acesso a workshops exclusivos",
      "Descontos em produtos da loja",
    ],
    horario_permitido_inicio: "06:00",
    horario_permitido_fim: "22:00",
    limite_acessos_mes: 360,
    status: "ativo",
    created_at: "2023-10-01T10:00:00Z",
    updated_at: "2023-10-01T10:00:00Z",
  },
];

export default function Plans() {
  return (
    <section id="planos" className="py-20 lg:py-28">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Planos que se Adaptam ao seu Ritmo
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Escolha o plano ideal para sua jornada fitness com tecnologia de
            ponta e acompanhamento personalizado
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 group hover:shadow-xl flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg scale-[1.02] ring-2 ring-primary/10"
                  : "border-border hover:border-primary/30 hover:scale-[1.02]"
              } transition-all duration-500 hover:-translate-y-1`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-primary from-primary to-primary/80 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    Mais Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-4 px-2">
                  {plan.description}
                </p>
                <div className="flex flex-col items-center justify-center gap-1">
                  {plan.desconto_percentual > 0 && (
                    <span className="text-sm text-muted-foreground line-through">
                      {currencyFormatter(plan.valor_original)}
                    </span>
                  )}
                  <span className="text-2xl lg:text-3xl font-bold text-foreground">
                    {currencyFormatter(plan.valor)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {plan.tipo}
                </span>
              </CardHeader>

              <CardContent className="space-y-4 px-6 pb-8 flex-1 flex flex-col">
                <ul className="space-y-2.5 flex-1">
                  {plan.beneficios
                    .slice(0, 4)
                    .map((feature: any, featureIndex: number) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-2.5"
                      >
                        <Check
                          className="text-primary mt-0.5 flex-shrink-0"
                          size={16}
                        />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  {plan.beneficios.length > 4 && (
                    <li className="text-xs text-center text-muted-foreground pt-2">
                      +{plan.beneficios.length - 4} benefícios adicionais
                    </li>
                  )}
                </ul>

                <div className="mt-auto pt-4">
                  <Button className="w-full py-3 font-medium transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl">
                    Assinar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
