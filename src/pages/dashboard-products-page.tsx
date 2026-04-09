import { Link } from "react-router-dom";
import useProducts from "@/queries/use-products";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import ApiError from "@/components/api-error";

export default function DashboardProductsPage() {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isError) {
    return <ApiError message={error.message} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>

        <Button asChild>
          <Link
            to="/dashboard/products/add"
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Products
          </Link>
        </Button>
      </div>

      <div className="bg-background rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center">
                  Loading products...
                </TableCell>
              </TableRow>
            )}

            {!isLoading && products?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center">
                  No products found
                </TableCell>
              </TableRow>
            )}

            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.image ? (
                    <img
                      src={product.image}
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    <div className="bg-muted flex h-12 w-12 items-center justify-center rounded text-xs">
                      N/A
                    </div>
                  )}
                </TableCell>

                <TableCell className="font-medium">{product.title}</TableCell>

                <TableCell>
                  <Badge variant="secondary">{product.category}</Badge>
                </TableCell>

                <TableCell>Rs. {product.price}</TableCell>

                <TableCell>{product.stock}</TableCell>

                <TableCell className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" asChild>
                    <Link to={`/products/${product.id}`}>
                      <Eye size={16} />
                    </Link>
                  </Button>

                  <Button size="icon" variant="ghost" asChild>
                    <Link to={`/dashboard/products/${product.id}/edit`}>
                      <Pencil size={16} />
                    </Link>
                  </Button>

                  <Button size="icon" variant="ghost">
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
