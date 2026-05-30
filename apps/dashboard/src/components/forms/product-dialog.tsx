"use client";

import { useState } from "react";
import { Edit2Icon, PlusIcon } from "@repo/ui";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { ProductForm } from "./product-form";

interface ProductDialogProps {
  product?: IProduct;
}

export function ProductDialog({ product }: ProductDialogProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!product;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="outline" size="icon" className="rounded-full">
            <Edit2Icon />
          </Button>
        ) : (
          <Button size="lg" className="text-secondary">
            <PlusIcon /> Novo Produto
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Produto" : "Nova Produto"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <ProductForm initialData={product} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
