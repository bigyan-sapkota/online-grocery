import ProductForm from "@/forms/product-form";

export default function DashboardAddProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Add Product Form</h1>

      <ProductForm className="mt-4 grid grid-cols-3 gap-x-4 gap-y-6 rounded-xl border bg-white p-4 shadow" />
    </div>
  );
}
