"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AlertModal } from "@/components/alert-modal";
import { CategoryDialog } from "@/components/forms/category-dialog";
import { deleteCategory } from "@/actions/category";
import { toast } from "@repo/ui";

export const columns: ColumnDef<ICategory>[] = [
  {
    id: "ID",
    header: "#",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "count",
    header: "Qtd. Produtos",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      const [isDeleting, setIsDeleting] = useState(false);

      async function onDelete() {
        try {
          setIsDeleting(true);
          await deleteCategory(category.id);
          toast.success("Categoria excluído com sucesso!");
        } catch (error) {
          toast.error("Erro ao excluir categoria.");
        } finally {
          setIsDeleting(false);
        }
      }

      return (
        <div className="flex justify-end gap-2">
          <CategoryDialog category={category} />
          <AlertModal
            name={category.name}
            isDeleting={isDeleting}
            onDelete={onDelete}
          />
        </div>
      );
    },
  },
];
