"use client";

import { useModal } from "@/store/use-modal";
import { CheckCircle, ChefHat, Package, Truck, Utensils } from "@repo/ui";
import { Badge } from "@repo/ui/components/badge";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";
import { motion } from "@repo/ui";
import { formatCurrency, formatDate } from "@repo/utils/helpers/formatters";

const statusSteps = [
  { key: "recebido", label: "Recebido", icon: Package },
  { key: "preparando", label: "Preparando", icon: ChefHat },
  { key: "saiu", label: "Saiu para Entrega", icon: Truck },
  { key: "entregue", label: "Entregue", icon: CheckCircle },
];

interface DeliveryCardProps {
  order: IOrder;
}

export function OrderCard({ order }: DeliveryCardProps) {
  const { openModal } = useModal();

  /*const getStatusColor = (status: string) => {
    switch (status) {
      case "recebido":
        return "bg-warning/20 text-warning border-warning/30";
      case "preparando":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "saiu":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "entregue":
        return "bg-success/20 text-success border-success/30";
      default:
        return "bg-white/10 text-white/60 border-white/10";
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "recebido":
        return 1;
      case "preparando":
        return 2;
      case "saiu":
        return 3;
      case "entregue":
        return 4;
      default:
        return 0;
    }
  };

  const ORDER_STATUS_CONFIG = {
    recebido: "Recebido",
    preparando: "Preparando",
    saiu: "Saiu",
    entregue: "Entregue",
  };*/

  function calculateTotal(order: IOrder) {
    if (!order.items) return 0;

    return order.items.reduce((acc, item) => {
      return acc + item.product.price * item.amount;
    }, 0);
  }

  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
      <Card className="cursor-pointer" onClick={() => openModal(order)}>
        <CardHeader className="border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold"># {order.table}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <Badge variant="default">{order.status}</Badge>
        </CardHeader>

        <CardContent>
          <div className="bg-background rounded-md border p-3">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                ITENS ({order.items.length})
              </p>
              <Separator />
              {order.items.length > 0 ? (
                <div className="flex items-center justify-between font-bold">
                  <span className="text-base">Total:</span>
                  <span className="text-base">
                    {formatCurrency(calculateTotal(order))}
                  </span>
                </div>
              ) : (
                <p className="text-base font-bold">Nenhum item no pedido</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
