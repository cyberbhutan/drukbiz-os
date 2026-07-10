import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function ReportsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-sm text-muted-foreground">Understand your business performance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5">
          <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Revenue (This Month)</p><DollarSign className="h-4 w-4 text-emerald-500" /></div>
          <p className="mt-2 text-2xl font-bold">Nu. 8,92,000</p>
          <p className="mt-1 text-xs text-emerald-600">+15% vs last month <TrendingUp className="inline h-3 w-3" /></p>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Expenses</p><TrendingDown className="h-4 w-4 text-red-500" /></div>
          <p className="mt-2 text-2xl font-bold">Nu. 3,45,000</p>
          <p className="mt-1 text-xs text-emerald-600">-8% vs last month <TrendingDown className="inline h-3 w-3" /></p>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Net Profit</p><TrendingUp className="h-4 w-4 text-emerald-500" /></div>
          <p className="mt-2 text-2xl font-bold">Nu. 5,47,000</p>
          <p className="mt-1 text-xs text-emerald-600">Margin: 61%</p>
        </CardContent></Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card><CardContent className="p-5">
          <h3 className="font-semibold">Monthly Revenue</h3>
          <div className="mt-4 space-y-2">
            {[
              { month: "Jul 2026", revenue: "Nu. 8,92,000", expense: "Nu. 3,45,000", profit: "Nu. 5,47,000" },
              { month: "Jun 2026", revenue: "Nu. 7,75,000", expense: "Nu. 3,75,000", profit: "Nu. 4,00,000" },
              { month: "May 2026", revenue: "Nu. 6,50,000", expense: "Nu. 3,20,000", profit: "Nu. 3,30,000" },
              { month: "Apr 2026", revenue: "Nu. 5,80,000", expense: "Nu. 2,90,000", profit: "Nu. 2,90,000" },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-2 text-sm last:border-0 last:pb-0">
                <span className="font-medium">{m.month}</span>
                <div className="flex gap-4 text-right">
                  <div><p className="text-muted-foreground">Revenue</p><p className="font-medium text-emerald-600">{m.revenue}</p></div>
                  <div><p className="text-muted-foreground">Expense</p><p className="font-medium text-red-600">{m.expense}</p></div>
                  <div><p className="text-muted-foreground">Profit</p><p className="font-medium">{m.profit}</p></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent></Card>

        <Card><CardContent className="p-5">
          <h3 className="font-semibold">Business Snapshot</h3>
          <div className="mt-4 space-y-4">
            {[
              { label: "Best Selling Product", value: "Rice 25kg — 142 units" },
              { label: "Best Customer", value: "Tandin Wangmo — Nu. 2,10,000" },
              { label: "Average Daily Revenue", value: "Nu. 29,733" },
              { label: "Average Transaction", value: "Nu. 820" },
              { label: "Top Expense Category", value: "Salary — Nu. 48,000/mo" },
              { label: "Cash vs Credit", value: "70% Cash / 18% Credit / 12% Mobile" },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-2 text-sm last:border-0 last:pb-0">
                <span className="text-muted-foreground">{d.label}</span>
                <span className="font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </CardContent></Card>
      </div>
    </div>
  );
}
