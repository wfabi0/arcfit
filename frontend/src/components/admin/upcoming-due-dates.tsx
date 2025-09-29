import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

const upcomingDueDates = [
  {
    id: "1",
    client: "Roberto Alves",
    avatar: "/placeholder.svg?height=32&width=32",
    amount: "R$ 89,90",
    dueDate: "Amanhã",
    daysOverdue: 0,
    status: "due_tomorrow" as const,
    telefone: "(99) 99999-9999",
  },
  {
    id: "2",
    client: "Fernanda Rocha",
    avatar: "/placeholder.svg?height=32&width=32",
    amount: "R$ 129,90",
    dueDate: "Em 2 dias",
    daysOverdue: 0,
    status: "due_soon" as const,
    telefone: "(99) 99999-9999",
  },
  {
    id: "3",
    client: "Carlos Pereira",
    avatar: "/placeholder.svg?height=32&width=32",
    amount: "R$ 59,90",
    dueDate: "3 dias atrás",
    daysOverdue: 3,
    status: "overdue" as const,
    telefone: "(99) 99999-9999",
  },
  {
    id: "4",
    client: "Lucia Martins",
    avatar: "/placeholder.svg?height=32&width=32",
    amount: "R$ 89,90",
    dueDate: "1 dia atrás",
    daysOverdue: 1,
    status: "overdue" as const,
  },
  {
    id: "5",
    client: "Bruno Oliveira",
    avatar: "/placeholder.svg?height=32&width=32",
    amount: "R$ 129,90",
    dueDate: "Em 5 dias",
    daysOverdue: 0,
    status: "due_soon" as const,
    telefone: "(99) 99999-9999",
  },
];

export function UpcomingDueDates() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Próximos Vencimentos</CardTitle>
        <CardDescription className="text-muted-foreground">
          Pagamentos com vencimento próximo ou em atraso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingDueDates.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={item.avatar || "/placeholder.svg"}
                    alt={item.client}
                  />
                  <AvatarFallback>
                    {item.client
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.client}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.amount} • {item.dueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    item.status === "overdue"
                      ? "destructive"
                      : item.status === "due_tomorrow"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {item.status === "overdue"
                    ? "Em atraso"
                    : item.status === "due_tomorrow"
                    ? "Vence amanhã"
                    : "A vencer"}
                </Badge>
                <div className="flex space-x-1">
                  <Link
                    href={`https://wa.me/5599999999999?text=Olá Roberto gostariamos de lembrar que seu pagamento de ${item.amount} está com vencimento ${item.dueDate}. Por favor, entre em contato conosco para mais informações.`}
                    className=""
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
