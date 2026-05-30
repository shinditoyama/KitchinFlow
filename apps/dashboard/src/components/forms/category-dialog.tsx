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
import { CategoryForm } from "./category-form";

interface CategoryDialogProps {
  category?: ICategory;
}

export function CategoryDialog({ category }: CategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!category;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="outline" size="icon" className="rounded-full">
            <Edit2Icon />
          </Button>
        ) : (
          <Button size="lg" className="text-secondary">
            <PlusIcon /> Nova Categoria
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Categoria" : "Nova Categoria"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <CategoryForm initialData={category} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
