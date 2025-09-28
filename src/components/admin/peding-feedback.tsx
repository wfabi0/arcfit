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
    <Card className="bg-card border-border h-fit">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center space-x-2 text-foreground text-base sm:text-lg">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-chart-1" />
          <span>Feedbacks Pendentes</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Avaliações que precisam de resposta
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
        <div className="space-y-3 sm:space-y-4">
          {pendingFeedback.map((feedback) => (
            <div
              key={feedback.id}
              className="p-3 sm:p-4 rounded-lg border border-border bg-muted/20"
            >
              <div className="flex items-start justify-between mb-2 gap-2">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
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
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-medium text-foreground block truncate">
                      {feedback.client}
                    </span>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: feedback.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-chart-1 text-chart-1"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {feedback.date}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                {feedback.message}
              </p>
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  Pendente
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs px-3 py-1 h-7 hover:cursor-pointer"
                >
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
