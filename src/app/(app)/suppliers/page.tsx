import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SuppliersPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Suppliers</h1><p className="text-sm text-muted-foreground">Manage your suppliers and purchase orders.</p></div>
        <Button><Plus className="mr-1 h-4 w-4" /> Add Supplier</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Suppliers</p><p className="text-xl font-bold">12</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Active Orders</p><p className="text-xl font-bold">5</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">This Month Purchases</p><p className="text-xl font-bold">Nu. 1,20,000</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Outstanding Payments</p><p className="text-xl font-bold text-amber-600">Nu. 45,000</p></CardContent></Card>
      </div>
      <Card className="mt-6"><CardContent className="p-0">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-muted-foreground">
            <th className="p-4 font-medium">Supplier</th><th className="p-4 font-medium">Contact</th><th className="p-4 font-medium">Products</th><th className="p-4 font-medium">Last Order</th><th className="p-4 font-medium">Status</th>
          </tr></thead>
          <tbody>
            {[
              { name: "ABC Supplier", contact: "+975 17 111 222", products: 24, last: "Today", status: "Active" },
              { name: "Bhutan Mill", contact: "+975 17 333 444", products: 8, last: "Yesterday", status: "Active" },
              { name: "Oil Traders", contact: "+975 17 555 666", products: 6, last: "3 days ago", status: "Active" },
              { name: "Food Distributors", contact: "+975 17 777 888", products: 35, last: "1 week ago", status: "Active" },
            ].map((s, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4 font-medium">{s.name}</td><td className="p-4 text-xs text-muted-foreground">{s.contact}</td>
                <td className="p-4">{s.products}</td><td className="p-4 text-xs text-muted-foreground">{s.last}</td>
                <td className="p-4"><span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}
