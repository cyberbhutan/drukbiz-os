import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingDown, TrendingUp } from "lucide-react";

export default function ExpensesPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Expenses</h1><p className="text-sm text-muted-foreground">Track all business expenses and costs.</p></div>
        <Button><Plus className="mr-1 h-4 w-4" /> Add Expense</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Today</p><p className="text-xl font-bold text-red-600">Nu. 12,500</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">This Month</p><p className="text-xl font-bold text-red-600">Nu. 3,45,000</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">vs Last Month</p><p className="text-xl font-bold text-emerald-600">-8% <TrendingDown className="inline h-4 w-4" /></p></CardContent></Card>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-muted-foreground">
              <th className="p-4 font-medium">Date</th><th className="p-4 font-medium">Category</th><th className="p-4 font-medium">Description</th><th className="p-4 font-medium">Amount</th><th className="p-4 font-medium">Payment</th>
            </tr></thead>
            <tbody>
              {[
                { date: "Today", cat: "Supplies", desc: "Cleaning products", amt: "Nu. 2,500", method: "Cash" },
                { date: "Today", cat: "Utilities", desc: "Electricity bill", amt: "Nu. 8,000", method: "Bank" },
                { date: "Today", cat: "Transport", desc: "Delivery fuel", amt: "Nu. 2,000", method: "Cash" },
                { date: "Yesterday", cat: "Salary", desc: "Staff payroll", amt: "Nu. 48,000", method: "Bank" },
                { date: "Yesterday", cat: "Supplies", desc: "Packaging materials", amt: "Nu. 3,200", method: "Cash" },
                { date: "8 Jul", cat: "Marketing", desc: "Social media ads", amt: "Nu. 5,000", method: "Mobile" },
              ].map((e, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="p-4 text-xs text-muted-foreground">{e.date}</td><td className="p-4">{e.cat}</td>
                  <td className="p-4 text-muted-foreground">{e.desc}</td><td className="p-4 font-medium text-red-600">{e.amt}</td>
                  <td className="p-4 text-xs text-muted-foreground">{e.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <h3 className="font-semibold">By Category</h3>
          <div className="mt-4 space-y-3">
            {[
              { cat: "Salary", amt: "Nu. 48,000", pct: "40%" },
              { cat: "Supplies", amt: "Nu. 24,000", pct: "20%" },
              { cat: "Utilities", amt: "Nu. 18,000", pct: "15%" },
              { cat: "Transport", amt: "Nu. 12,000", pct: "10%" },
              { cat: "Marketing", amt: "Nu. 10,000", pct: "8%" },
            ].map((c) => (
              <div key={c.cat}>
                <div className="flex items-center justify-between text-sm"><span>{c.cat}</span><span className="font-medium">{c.amt}</span></div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-muted"><div className="h-1.5 rounded-full bg-red-500" style={{ width: c.pct }} /></div>
              </div>
            ))}
          </div>
        </CardContent></Card>
      </div>
    </div>
  );
}
