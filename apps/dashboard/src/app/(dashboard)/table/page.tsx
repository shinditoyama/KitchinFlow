"use client";

import { MapPin, Users } from "@repo/ui";
import { useState } from "react";
import { Progress } from "@repo/ui/components/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";
//import { StatisticsCard } from "@/components/statistics-card";
import { useRestaurantStore } from "@/store/use-table";
import { motion } from "@repo/ui";

export default function Table() {
  const { mesas, atualizarMesa } = useRestaurantStore();
  const [mesaSelecionada, setMesaSelecionada] = useState<IMesa | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<string>("todas");

  const getStatusColor = (status: IMesa["status"]) => {
    switch (status) {
      case "disponivel":
        return "bg-success/20 border-success/40 text-success/80";
      case "ocupada":
        return "bg-destructive/20 border-destructive/40 text-destructive/80";
      case "reservada":
        return "bg-warning/20 border-warning/40 text-warning/80";
      default:
        return "bg-white/10 border-white/10 text-white/60";
    }
  };

  const mesasFiltradas =
    filtroStatus === "todas"
      ? mesas
      : mesas.filter((m) => m.status === filtroStatus);

  const handleMesaClick = (mesa: IMesa) => {
    setMesaSelecionada(mesa);
  };

  // Estatísticas
  const disponiveis = mesas.filter((m) => m.status === "disponivel").length;
  const ocupadas = mesas.filter((m) => m.status === "ocupada").length;
  const reservadas = mesas.filter((m) => m.status === "reservada").length;
  const capacidadeTotal = mesas.reduce((acc, m) => acc + m.capacity, 0);
  const capacidadeOcupada = mesas
    .filter((m) => m.status === "ocupada")
    .reduce((acc, m) => acc + m.capacity, 0);

  return (
    <div className="space-y-4">
      {/* Info Cards 
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatisticsCard
          title="Ocupação do Salão"
          value={`${Math.round((ocupadas / mesas.length) * 100)}%`}
        >
          <Progress value={(ocupadas / mesas.length) * 100} className="mt-4" />
        </StatisticsCard>
        <StatisticsCard
          title="Capacidade Total"
          value={`${capacidadeOcupada}/${capacidadeTotal}`}
        >
          <p className="text-sm text-muted-foreground">pessoas no momento</p>
        </StatisticsCard>
        <StatisticsCard title="Mesas Reservadas Hoje" value={reservadas}>
          <p className="text-sm text-muted-foreground">
            de {mesas.length} mesas disponíveis
          </p>
        </StatisticsCard>
      </section>*/}

      {/* Mapa do Salão */}
      <Card>
        <CardHeader className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <section className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-lg bg-success/40 border border-success/60" />
              <span className="text-sm">Disponível ({disponiveis})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-lg bg-destructive/40 border border-destructive/60" />
              <span className="text-sm">Ocupada ({ocupadas})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-lg bg-warning/40 border border-warning/60" />
              <span className="text-sm">Reservada ({reservadas})</span>
            </div>
          </section>

          <Select
            defaultValue="todas"
            value={filtroStatus}
            onValueChange={(val) => setFiltroStatus(val)}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="todas">Todas as Mesas</SelectItem>
                <SelectItem value="disponivel">Apenas Disponíveis</SelectItem>
                <SelectItem value="ocupada">Apenas Ocupadas</SelectItem>
                <SelectItem value="reservada">Apenas Reservadas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {mesasFiltradas.map((mesa) => (
              <motion.button
                key={mesa.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMesaClick(mesa)}
                className={cn(
                  "aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer hover:shadow-lg",
                  getStatusColor(mesa.status),
                )}
              >
                <MapPin />
                <span className="font-bold text-lg">{mesa.number}</span>
                <div className="flex items-center gap-1 text-xs opacity-70">
                  <Users size={12} />
                  <span>{mesa.capacity}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {mesasFiltradas.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">Nenhuma mesa com este filtro</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
