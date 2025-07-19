import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CircleCheckBig, FileText, Users } from "lucide-react";

export function KPICards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border">
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total de Solicitudes</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1234</div>
          <p className="text-xs text-muted-foreground">+120 este mes</p>
        </CardContent>
      </Card>
      <Card className="border">
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Solicitudes Resueltas</CardTitle>
          <CircleCheckBig className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">987</div>
          <p className="text-xs text-muted-foreground">Tasa de resolución del 80%</p>
        </CardContent>
      </Card>
      <Card className="border">
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tiempo Promedio Respuesta</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2.5 días</div>
          <p className="text-xs text-muted-foreground">-10% que el mes pasado</p>
        </CardContent>
      </Card>
      <Card className="border">
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45</div>
          <p className="text-xs text-muted-foreground">+5 nuevos esta semana</p>
        </CardContent>
      </Card>
    </div>
  );
}
