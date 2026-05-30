import { getProducts } from "@/actions/product";
import { ListHeader } from "@/components/list-header";
import { ProductDialog } from "@/components/forms/product-dialog";
import { Card } from "@repo/ui/components/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <div className="space-y-4">
      <ListHeader
        title="Produto"
        description="Gerencie os itens do seu cadastro"
      >
        <ProductDialog />
      </ListHeader>

      {/* Tabela */}
      <Card className="p-6">
        <DataTable columns={columns} data={products ?? []} />
      </Card>
    </div>
  );
}
