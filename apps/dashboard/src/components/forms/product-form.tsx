"use client";

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadIcon, TrashIcon, toast } from "@repo/ui";

import { Button } from "@repo/ui/components/button";
import { DialogFooter } from "@repo/ui/components/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Spinner } from "@repo/ui/components/spinner";
import { Switch } from "@repo/ui/components/switch";
import { Textarea } from "@repo/ui/components/textarea";

import { createProduct, updateProduct } from "@/actions/product";
import {
  insertProductSchema,
  ProductFormValues,
} from "@repo/utils/validation/product";
import { useUploadThing } from "@/lib/uploadthing";
import { useCategoryStore } from "@/store/use-category";

interface ProductFormProps {
  initialData?: IProduct;
  onSuccess?: () => void;
}

export function ProductForm({ initialData, onSuccess }: ProductFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData;

  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      setFile(null);
    },
  });

  const isLoading = isPending || isUploading;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || 0,
      description: initialData?.description || "",
      image: initialData?.image || "",
      categoryId: initialData?.categoryId || "",
      isActive: initialData?.isActive || undefined,
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    if (!file && !isEditing && !data.image) {
      toast.error("Por favor, selecione uma imagem.");
      return;
    }

    const toastId = toast.loading(
      isEditing ? "Atualizando produto..." : "Criando produto...",
    );

    startTransition(async () => {
      try {
        let finalImageUrl = data.image;

        if (file) {
          toast.loading("Enviando nova imagem para a nuvem...", {
            id: toastId,
          });

          const uploadResult = await startUpload([file]);
          if (!uploadResult || uploadResult.length === 0) {
            toast.error("Falha ao processar a imagem.");
            return;
          }

          finalImageUrl = uploadResult[0]?.ufsUrl;
        }

        const finalData = {
          ...data,
          image: finalImageUrl,
        };

        toast.loading("Salvando dados no banco...", { id: toastId });

        const response = isEditing
          ? await updateProduct(initialData.id, finalData)
          : await createProduct(finalData);

        if (response.success) {
          toast.success(
            isEditing
              ? "Produto atualizado com sucesso!"
              : "Produto cadastrado!",
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
            form.setError(key as keyof ProductFormValues, {
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

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);

      const previewUrl = URL.createObjectURL(f);
      form.setValue("image", previewUrl);
    }
  }

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
                placeholder="Digite o nome do prato"
                disabled={isLoading}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Descrição</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Digite a descrição do prato..."
                disabled={isLoading}
                className="resize-none"
                value={field.value ?? ""}
              />
            </Field>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Preço (R$)</FieldLabel>
                <Input
                  type="number"
                  step="0.10"
                  min={0}
                  placeholder="0.00"
                  aria-invalid={fieldState.invalid}
                  disabled={isLoading}
                  name={field.name}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="categoryId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Categoria</FieldLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </div>

        <Field>
          <FieldLabel htmlFor="image">Imagem</FieldLabel>
          {form.watch("image") && (
            <div className="relative w-full h-48 border rounded-lg overflow-hidden">
              <Image
                src={form.watch("image") || ""}
                alt="Preview"
                fill
                className="object-cover z-10"
              />
              <Button
                type="button"
                size="icon-lg"
                variant="destructive"
                onClick={() => {
                  setFile(null);
                  form.setValue("image", "");
                }}
                className="absolute top-2 right-2 z-20"
                disabled={isLoading}
              >
                <TrashIcon />
              </Button>
            </div>
          )}

          {!form.watch("image") && (
            <div className="border-2 border-dashed rounded-lg p-8 hover:border-primary transition-colors">
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                className="hidden"
                disabled={isLoading}
                onChange={handleChangeImage}
              />
              <Label
                htmlFor="image"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <UploadIcon className="h-8 w-8 mx-auto mb-4" />
                <p className="font-medium">Clique para selecionar uma imagem</p>
                <p className="text-xs text-muted-foreground">
                  Formatos suportados: JPEG, JPG, PNG
                </p>
              </Label>
            </div>
          )}
        </Field>

        <Controller
          name="isActive"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldLabel htmlFor="switch-share">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Item Ativo</FieldTitle>
                </FieldContent>
                <Switch
                  id="switch-share"
                  name={field.name}
                  checked={field.value ?? undefined}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            </FieldLabel>
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
            {isLoading ? <Spinner /> : isEditing ? "Atualizar" : "Criar"}
          </Button>
        </Field>
      </DialogFooter>
    </form>
  );
}
