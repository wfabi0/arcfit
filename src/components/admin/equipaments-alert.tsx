import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Clock, Wrench } from "lucide-react";
import { Badge } from "../ui/badge";

const equipmentAlerts = [
  {
    id: "1",
    name: "Esteira 03",
    issue: "Manutenção preventiva",
    status: "maintenance" as const,
    priority: "medium" as const,
    location: "Área Cardio",
  },
  {
    id: "2",
    name: "Leg Press 45°",
    issue: "Cabo de aço desgastado",
    status: "broken" as const,
    priority: "high" as const,
    location: "Área de Musculação",
  },
  {
    id: "3",
    name: "Bicicleta Ergométrica 07",
    issue: "Display com defeito",
    status: "broken" as const,
    priority: "low" as const,
    location: "Área Cardio",
  },
];

export function EquipmentAlerts() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <span>Alertas de Equipamentos</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Equipamentos que precisam de atenção
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {equipmentAlerts.length === 0 && (
            <>
              <p className="text-sm text-muted-foreground">
                Nenhum alerta pendente
              </p>
            </>
          )}
          {equipmentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start justify-between p-3 rounded-lg border border-border bg-muted/20"
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`p-1 rounded-full ${
                    alert.status === "broken"
                      ? "bg-destructive/20"
                      : "bg-chart-2/20"
                  }`}
                >
                  {alert.status === "broken" ? (
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  ) : (
                    <Clock className="w-4 h-4 text-chart-2" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {alert.name}
                  </p>
                  <p className="text-xs text-muted-foreground py-1">
                    {alert.issue}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {alert.location}
                  </p>
                </div>
              </div>
              <div className="justify-center items-center grid grid-cols-1 space-y-1.5">
                <Badge
                  variant={
                    alert.priority === "high" ? "destructive" : "outline"
                  }
                >
                  {alert.priority === "high"
                    ? "Alta"
                    : alert.priority === "medium"
                    ? "Média"
                    : "Baixa"}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Wrench className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
