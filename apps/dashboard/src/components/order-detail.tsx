"use client";

import { useModal } from "@/store/use-modal";
import { Badge } from "@repo/ui/components/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { formatCurrency } from "@repo/utils/helpers/formatters";

export function OrderDetail() {
  const { isOpen, closeModal, order } = useModal();

  function calculateTotal(order: IOrder) {
    if (!order.items) return 0;

    return order.items.reduce((acc, item) => {
      return acc + item.product.price * item.amount;
    }, 0);
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Detalhe do pedido
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Mesa</p>
              <p className="text-lg font-semibold">{order?.table}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge>{order?.status}</Badge>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Itens do pedido</h3>
          <div className="space-y-2">
            {order?.items && order?.items.length > 0 ? (
              order?.items.map((item) => {
                const subtotal = item.product.price * item.amount;
                return (
                  <div
                    key={item.id}
                    className="bg-background rounded-md border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold">
                        {item.product.name}
                      </span>
                      <span className="text-sm">Quantidade: {item.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(item.product.price)}
                      </span>
                      <span className="text-base font-semibold">
                        Subtotal: {formatCurrency(subtotal)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-background rounded-md border p-4">
                Nenhum item no pedido
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
