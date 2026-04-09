"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema, type ProductSchema } from "./schema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageDownIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAddProduct from "@/mutations/use-add-product";

type ProductFormProps = {
  className?: string;
};

export default function ProductForm({ className }: ProductFormProps) {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      stock: 0,
      discount: 0,
      description: "",
      category: "fruits",
      image: null,
    },
  });

  const [preview, setPreview] = useState<string | null>(null);

  const { mutate, isPending } = useAddProduct();

  const onDrop = (files: File[]) => {
    if (!files.length) return;
    const file = files[0];

    form.setValue("image", file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    form.setValue("image", null);
    setPreview(null);
  };

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const onSubmit = (values: ProductSchema) => {
    console.log(values);
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
          className,
        )}
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Mustang Apple" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="1000"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stock */}
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discount */}
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount (%)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="This is the best product..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="col-span-full">
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className={cn(
                    "relative flex min-h-[220px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed p-6 transition",
                    isDragActive
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400",
                  )}
                >
                  <input {...getInputProps()} />

                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="preview"
                        className="max-h-[180px] object-contain"
                      />

                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-3 right-3 rounded-full bg-black/70 p-1 text-white"
                      >
                        <XIcon size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-center">
                      <ImageDownIcon className="size-12 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {isDragActive
                          ? "Drop your image here..."
                          : "Drag & drop or click to upload"}
                      </p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full">
          <Button className="w-full" disabled={isPending}>
            {isPending ? "Creating Product..." : "Create Product"}{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
}
