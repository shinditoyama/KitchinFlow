import Image from "next/image";
import { CheckCircle, XCircle } from "@repo/ui";
import { formatCurrency } from "@repo/utils/helpers/formatters";

import { cn } from "@repo/ui/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { ProductDeleteButton } from "./forms/product-delete";
import { ProductDialog } from "./forms/product-dialog";

interface ProductCardProps {
  item: IProduct;
}

export function ProductCard({ item }: ProductCardProps) {
  return (
    <Card
      className={cn("overflow-hidden p-0 pb-4", !item.isActive && "opacity-60")}
    >
      <div className="relative h-40">
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={200}
          className="w-full h-full object-cover"
          /*onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300";
          }}*/
        />
        <div
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center",
            item.isActive ? "bg-success" : "bg-destructive",
          )}
        >
          {item.isActive ? (
            <CheckCircle size={16} className="text-card" />
          ) : (
            <XCircle size={16} className="text-card" />
          )}
        </div>
      </div>

      <CardHeader className="px-4 -mt-2">
        <CardDescription className="text-xs capitalize">
          {item.category.name}
        </CardDescription>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-2">{item.name}</CardTitle>
          <span className="text-destructive font-bold text-lg">
            {formatCurrency(item.price)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-4 ">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {item.description}
        </p>
      </CardContent>

      <CardFooter className="px-4 flex gap-2 mt-auto">
        <ProductDialog product={item} />
        <ProductDeleteButton id={item.id} />
      </CardFooter>
    </Card>
  );
}
