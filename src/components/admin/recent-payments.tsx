import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currencyFormatter } from "@/utils/formatters";

const recentPayments = [
  {
    id: "1",
    client: "Maria Silva",
    avatar: "/placeholder.svg?height=32&width=32",
    amount: 150.0,
    plan: "Plano A",
    date: "Hoje, 14:30",
    status: "confirmed" as const,
  },
  {
    id: "2",
    client: "João Santos",
    avatar: "/placeholder.svg?height=32&width=32",
    amount: 400.0,
    plan: "Plano B",
    date: "Hoje, 12:15",
    status: "confirmed" as const,
  },
  {
    id: "3",
    client: "Ana Costa",
    avatar: "/placeholder.svg?height=32&width=32",
    amount: 1400.0,
    plan: "Plano D",
    date: "Ontem, 18:45",
    status: "confirmed" as const,
  },
  {
    id: "4",
    client: "Pedro Lima",
    avatar: "/placeholder.svg?height=32&width=32",
    amount: 750.0,
    plan: "Plano C",
    date: "Ontem, 16:20",
    status: "pending" as const,
  },
  {
    id: "5",
    client: "Carla Mendes",
    avatar: "/placeholder.svg?height=32&width=32",
    amount: 150.0,
    plan: "Plano A",
    date: "Ontem, 10:30",
    status: "confirmed" as const,
  },
];

export function RecentPayments() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Últimos Pagamentos</CardTitle>
        <CardDescription className="text-muted-foreground">
          Pagamentos registrados recentemente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={payment.avatar || "/placeholder.svg"}
                    alt={payment.client}
                  />
                  <AvatarFallback>
                    {payment.client
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {payment.client}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.plan} • {payment.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">
                  {currencyFormatter(payment.amount)}
                </span>
                <Badge
                  variant={
                    payment.status === "confirmed" ? "default" : "secondary"
                  }
                  className={
                    payment.status === "confirmed"
                      ? "bg-chart-1 text-primary-foreground"
                      : ""
                  }
                >
                  {payment.status === "confirmed" ? "Confirmado" : "Pendente"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
