import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Package, Users, TrendingUp, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your business at a glance.</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Today's Sales", value: "Nu. 45,800", icon: ShoppingCart, change: "+12% vs yesterday", color: "text-emerald-500" },
          { label: "Total Products", value: "342", icon: Package, change: "5 added this week", color: "text-blue-500" },
          { label: "Active Customers", value: "128", icon: Users, change: "+3 today", color: "text-violet-500" },
          { label: "Estimated Profit", value: "Nu. 18,300", icon: TrendingUp, change: "Margin: 40%", color: "text-amber-500" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="mt-2 text-2xl font-bold">{s.value}</p>
              <p className={`mt-0.5 text-xs ${s.color}`}>{s.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Low stock alerts */}
      <Card className="mt-6 border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
        <CardContent className="p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h3 className="font-semibold text-amber-800 dark:text-amber-300">Low Stock Alerts</h3>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {[
              { name: "Coca Cola 500ml", stock: 5, min: 20, supplier: "ABC Supplier" },
              { name: "Rice 25kg", stock: 3, min: 10, supplier: "Bhutan Mill" },
              { name: "Cooking Oil 5L", stock: 2, min: 8, supplier: "Oil Traders" },
            ].map((item) => (
              <div key={item.name} className="rounded-lg border bg-white p-3 text-sm dark:bg-card">
                <p className="font-medium">{item.name}</p>
                <p className="mt-1 text-muted-foreground">{item.stock} / {item.min} remaining</p>
                <p className="text-xs text-muted-foreground">Order: {item.supplier}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold">Recent Sales</h3>
            <div className="mt-4 space-y-3">
              {[
                { name: "Sonam Wangchuk", item: "Rice 25kg × 2", amount: "Nu. 3,600", time: "10 min ago" },
                { name: "Pema Dorji", item: "Coke 500ml × 6", amount: "Nu. 480", time: "25 min ago" },
                { name: "Dechen Lhamo", item: "Cooking Oil + Noodles", amount: "Nu. 870", time: "1 hr ago" },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.item} · {s.time}</p>
                  </div>
                  <p className="text-sm font-semibold">{s.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold">Today's Overview</h3>
            <div className="mt-4 space-y-3">
              {[
                { label: "Total Sales", value: "Nu. 45,800", pct: "100%" },
                { label: "Total Expenses", value: "Nu. 12,500", pct: "27%" },
                { label: "Estimated Profit", value: "Nu. 18,300", pct: "40%" },
                { label: "Credit Sales", value: "Nu. 8,200", pct: "18%" },
              ].map((d) => (
                <div key={d.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{d.label}</span>
                    <span className="font-medium">{d.value}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full bg-primary"
                      style={{ width: d.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
