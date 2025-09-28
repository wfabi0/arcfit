import { Activity, DollarSign, UserPlus, Users, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { currencyFormatter } from "@/utils/formatters";

type changeTypes = "positive" | "negative" | "neutral";

const cards = [
  {
    title: "Clientes Ativos",
    value: "1,247",
    change: "+12%",
    changeType: "positive" as changeTypes,
    icon: Users,
  },
  {
    title: "Inadimplentes",
    value: "23",
    change: "-8%",
    changeType: "positive" as changeTypes,
    icon: UserX,
  },
  {
    title: "Faturamento do Mês",
    value: `${currencyFormatter(89420)}`,
    subtitle: "Meta: R$ 95.000",
    change: "94%",
    changeType: "neutral" as changeTypes,
    icon: DollarSign,
  },
  {
    title: "Taxa de Ocupação",
    value: "68%",
    change: "+5%",
    changeType: "positive" as changeTypes,
    icon: Activity,
  },
  {
    title: "Novas Matrículas",
    value: "34",
    change: "+18%",
    changeType: "positive" as changeTypes,
    icon: UserPlus,
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {card.value}
            </div>
            {card.subtitle && (
              <p className="text-sm text-muted-foreground mt-1">
                {card.subtitle}
              </p>
            )}
            <p
              className={`text-sm mt-1 ${
                card.changeType === "positive"
                  ? "text-chart-1"
                  : card.changeType === "negative"
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {card.change} em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
