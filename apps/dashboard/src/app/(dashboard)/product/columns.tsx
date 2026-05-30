"use client";

import { useState, useTransition } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AlertModal } from "@/components/alert-modal";
import { toast } from "@repo/ui";
import { ProductDialog } from "@/components/forms/product-dialog";
import { deleteProduct, toggleProduct } from "@/actions/product";
import { formatCurrency } from "@repo/utils/helpers/formatters";
import { Avatar, AvatarImage } from "@repo/ui/components/avatar";
import { Switch } from "@repo/ui/components/switch";

export const columns: ColumnDef<IProduct>[] = [
  {
    id: "ID",
    header: "#",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "name",
    header: "Produto",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar
          size="lg"
          className="overflow-hidden rounded-sm after:rounded-[inherit]"
        >
          <AvatarImage
            src={row.original.image}
            alt={row.original.name}
            className="rounded-none!"
          />
        </Avatar>
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => <strong>{formatCurrency(row.original.price)}</strong>,
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => <div>{row.original.category?.name}</div>,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      const [isPending, startTransition] = useTransition();

      const handleToggle = (checked: boolean) => {
        startTransition(async () => {
          const response = await toggleProduct(product.id, checked);

          if (response.success) {
            toast.success(checked ? "Produto ativado!" : "Produto desativado!");
          } else {
            toast.error(response.error || "Erro ao mudar status.");
          }
        });
      };

      return (
        <div className="flex items-center space-x-2">
          <Switch
            checked={product.isActive}
            onCheckedChange={handleToggle}
            disabled={isPending}
          />
          <span className="text-xs text-muted-foreground">
            {isPending ? "Salvando..." : product.isActive ? "Ativo" : "Inativo"}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const [isDeleting, setIsDeleting] = useState(false);

      async function onDelete() {
        try {
          setIsDeleting(true);
          await deleteProduct(product.id);
          toast.success("Produto excluído com sucesso!");
        } catch (error) {
          toast.error("Erro ao excluir produto.");
        } finally {
          setIsDeleting(false);
        }
      }

      return (
        <div className="flex justify-end gap-2">
          <ProductDialog product={product} />
          <AlertModal
            name={product.name}
            isDeleting={isDeleting}
            onDelete={onDelete}
          />
        </div>
      );
    },
  },
];
