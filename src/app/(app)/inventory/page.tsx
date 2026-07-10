import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle, Search } from "lucide-react";

export default function InventoryPage() {
  const products = [
    { name: "Coca Cola 500ml", sku: "COKE-500", category: "Beverages", stock: 5, min: 20, price: "Nu. 80", status: "Low" },
    { name: "Rice 25kg Bag", sku: "RICE-25", category: "Grains", stock: 3, min: 10, price: "Nu. 1,800", status: "Low" },
    { name: "Cooking Oil 5L", sku: "OIL-5L", category: "Essentials", stock: 2, min: 8, price: "Nu. 650", status: "Low" },
    { name: "Mineral Water 1L", sku: "WATER-1L", category: "Beverages", stock: 48, min: 30, price: "Nu. 25", status: "OK" },
    { name: "Noodles Pack", sku: "NOOD-REG", category: "Snacks", stock: 85, min: 15, price: "Nu. 18", status: "OK" },
    { name: "Flour 10kg", sku: "FLOUR-10", category: "Grains", stock: 12, min: 8, price: "Nu. 720", status: "OK" },
    { name: "Sugar 1kg", sku: "SUGR-1K", category: "Essentials", stock: 22, min: 15, price: "Nu. 95", status: "OK" },
    { name: "Tea 100g", sku: "TEA-100", category: "Beverages", stock: 35, min: 20, price: "Nu. 120", status: "OK" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-sm text-muted-foreground">Track stock levels and manage products.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Search className="mr-1 h-4 w-4" /> Search</Button>
          <Button><Plus className="mr-1 h-4 w-4" /> Add Product</Button>
        </div>
      </div>

      {/* Categories */}
      <div className="grid gap-4 sm:grid-cols-5">
        {[
          { name: "Beverages", count: 45, value: "Nu. 34,000" },
          { name: "Grains & Rice", count: 28, value: "Nu. 1,20,000" },
          { name: "Essentials", count: 62, value: "Nu. 78,000" },
          { name: "Snacks", count: 95, value: "Nu. 45,000" },
          { name: "Household", count: 112, value: "Nu. 2,10,000" },
        ].map((cat) => (
          <Card key={cat.name}><CardContent className="p-4 text-center">
            <p className="text-lg font-bold">{cat.count}</p>
            <p className="text-xs text-muted-foreground">{cat.name}</p>
            <p className="text-xs text-muted-foreground">{cat.value}</p>
          </CardContent></Card>
        ))}
      </div>

      {/* Low stock alert */}
      {products.filter(p => p.status === "Low").length > 0 && (
        <Card className="mt-6 border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                {products.filter(p => p.status === "Low").length} products below minimum stock
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product table */}
      <Card className="mt-4">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-muted-foreground">
              <th className="p-4 font-medium">Product</th><th className="p-4 font-medium">SKU</th><th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Stock</th><th className="p-4 font-medium">Min</th><th className="p-4 font-medium">Price</th><th className="p-4 font-medium">Status</th>
            </tr></thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i} className={`border-b last:border-0 hover:bg-muted/50 ${p.status === "Low" ? "bg-red-50/50 dark:bg-red-950/10" : ""}`}>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 text-xs text-muted-foreground">{p.sku}</td>
                  <td className="p-4 text-xs">{p.category}</td>
                  <td className={`p-4 font-medium ${p.stock <= p.min ? "text-red-600" : ""}`}>{p.stock}</td>
                  <td className="p-4 text-muted-foreground">{p.min}</td>
                  <td className="p-4">{p.price}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.status === "Low"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    }`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
