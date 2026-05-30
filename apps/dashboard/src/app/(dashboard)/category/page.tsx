import { getCategories } from "@/actions/category";
import { CategoryDialog } from "@/components/forms/category-dialog";
import { ListHeader } from "@/components/list-header";
import { Card } from "@repo/ui/components/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function CategoryPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-4">
      <ListHeader
        title="Categoria"
        description="Gerencie os itens do seu cadastro"
      >
        <CategoryDialog />
      </ListHeader>

      <Card className="p-6">
        <DataTable columns={columns} data={categories ?? []} />
      </Card>
    </div>
  );
}
