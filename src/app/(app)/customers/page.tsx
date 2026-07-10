import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CustomersPage() {
  const customers = [
    { name: "Sonam Wangchuk", phone: "+975 17 123 456", purchases: 12, total: "Nu. 45,800", outstanding: "Nu. 3,500", last: "10 Jul 2026" },
    { name: "Pema Dorji", phone: "+975 17 789 012", purchases: 8, total: "Nu. 28,600", outstanding: "Nu. 0", last: "9 Jul 2026" },
    { name: "Dechen Lhamo", phone: "+975 17 345 678", purchases: 15, total: "Nu. 1,20,500", outstanding: "Nu. 8,200", last: "7 Jul 2026" },
    { name: "Karma Tshering", phone: "+975 17 901 234", purchases: 5, total: "Nu. 12,400", outstanding: "Nu. 1,200", last: "5 Jul 2026" },
    { name: "Tandin Wangmo", phone: "+975 17 567 890", purchases: 20, total: "Nu. 2,10,000", outstanding: "Nu. 15,000", last: "3 Jul 2026" },
    { name: "Dorji Wangchuk", phone: "+975 17 432 109", purchases: 3, total: "Nu. 5,600", outstanding: "Nu. 0", last: "1 Jul 2026" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground">Track purchase history, credit, and loyalty.</p>
        </div>
        <Button><Plus className="mr-1 h-4 w-4" /> Add Customer</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Customers</p><p className="text-xl font-bold">128</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">With Credit</p><p className="text-xl font-bold text-amber-600">18</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Credit</p><p className="text-xl font-bold text-amber-600">Nu. 27,800</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Repeat Rate</p><p className="text-xl font-bold">68%</p></CardContent></Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-muted-foreground">
              <th className="p-4 font-medium">Name</th><th className="p-4 font-medium">Contact</th><th className="p-4 font-medium">Purchases</th>
              <th className="p-4 font-medium">Total Spent</th><th className="p-4 font-medium">Outstanding</th><th className="p-4 font-medium">Last Purchase</th>
            </tr></thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">{c.name}</td>
                  <td className="p-4 text-xs text-muted-foreground">{c.phone}</td>
                  <td className="p-4">{c.purchases}</td>
                  <td className="p-4">{c.total}</td>
                  <td className="p-4">
                    <span className={c.outstanding === "Nu. 0" ? "text-emerald-600" : "font-medium text-amber-600"}>
                      {c.outstanding}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">{c.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
