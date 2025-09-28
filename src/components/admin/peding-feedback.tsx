import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Star } from "lucide-react";

const pendingFeedback = [
  {
    id: "1",
    client: "Sandra Lima",
    avatar: "/placeholder.svg?height=32&width=32",
    message: "Excelente atendimento! Gostaria de sugerir mais aulas de yoga.",
    rating: 5,
    date: "2 horas atrás",
    status: "pending" as const,
  },
  {
    id: "2",
    client: "Marcos Souza",
    avatar: "/placeholder.svg?height=32&width=32",
    message:
      "Academia muito boa, mas o ar condicionado da área de musculação...",
    rating: 4,
    date: "1 dia atrás",
    status: "pending" as const,
  },
  {
    id: "3",
    client: "Julia Ferreira",
    avatar: "/placeholder.svg?height=32&width=32",
    message: "Adorei a nova área de funcional! Parabéns pela renovação.",
    rating: 5,
    date: "2 dias atrás",
    status: "pending" as const,
  },
];

export function PendingFeedback() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <MessageSquare className="w-5 h-5 text-chart-1" />
          <span>Feedbacks Pendentes</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Avaliações que precisam de resposta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingFeedback.map((feedback) => (
            <div
              key={feedback.id}
              className="p-3 rounded-lg border border-border bg-muted/20"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={feedback.avatar || "/placeholder.svg"}
                      alt={feedback.client}
                    />
                    <AvatarFallback className="text-xs">
                      {feedback.client
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">
                    {feedback.client}
                  </span>
                  <div className="flex items-center">
                    {Array.from({ length: feedback.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-chart-1 text-chart-1"
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {feedback.date}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {feedback.message}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Pendente</Badge>
                <Button variant="ghost" size="sm" className="text-xs">
                  Responder
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
