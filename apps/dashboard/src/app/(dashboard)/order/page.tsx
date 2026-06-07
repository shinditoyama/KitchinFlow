import { getOrders } from "@/actions/order";
import { Utensils } from "@repo/ui";
import { Card } from "@repo/ui/components/card";
import { OrderCard } from "@/components/order-card";
import { OrderDetail } from "@/components/order-detail";

export default async function OrderPage() {
  const orders = await getOrders();
  console.log(orders);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {orders?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {!orders && (
        <Card className="text-center space-y-4 p-12">
          <Utensils className="w-16 h-16 mx-auto opacity-40" />
          <p className="text-xl">Nenhum pedido encontrado</p>
        </Card>
      )}

      <OrderDetail />
    </div>
  );
}
