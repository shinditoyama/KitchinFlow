"use client";

import { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@repo/ui";

import { Button } from "@repo/ui/components/button";
import { DialogFooter } from "@repo/ui/components/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { Spinner } from "@repo/ui/components/spinner";

import { createCategory, updateCategory } from "@/actions/category";
import {
  CategoryFormValues,
  insertCategorySchema,
} from "@repo/utils/validation/category";

interface CategoryFormProps {
  initialData?: ICategory;
  onSuccess?: () => void;
}

export function CategoryForm({ initialData, onSuccess }: CategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: { name: initialData?.name || "" },
  });

  const onSubmit = (data: CategoryFormValues) => {
    const toastId = toast.loading(
      isEditing ? "Atualizando categoria..." : "Criando categoria...",
    );

    startTransition(async () => {
      try {
        const response = isEditing
          ? await updateCategory(initialData.id, data)
          : await createCategory(data);

        if (response.success) {
          toast.success(
            isEditing
              ? "Categoria atualizado com sucesso!"
              : "Categoria cadastrado!",
            {
              id: toastId,
            },
          );
          if (onSuccess) onSuccess();
        } else {
          toast.error(response.error, { id: toastId });
        }

        // Se o servidor retornou erros específicos de campos, joga de volta pro Hook Form
        if (response.errors) {
          Object.entries(response.errors).forEach(([key, messages]) => {
            form.setError(key as keyof CategoryFormValues, {
              type: "server",
              message: messages?.[0],
            });
          });
        }
      } catch (error) {
        toast.error("Ocorreu um erro inesperado no processo.", { id: toastId });
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Digite o nome da categoria"
                disabled={isPending}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <DialogFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="flex-1"
          >
            Resetar
          </Button>
          <Button type="submit" className="flex-1">
            {isPending ? <Spinner /> : isEditing ? "Atualizar" : "Criar"}
          </Button>
        </Field>
      </DialogFooter>
    </form>
  );
}
