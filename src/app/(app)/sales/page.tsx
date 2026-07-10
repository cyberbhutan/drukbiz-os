import { Card, CardContent } from "@/components/ui/card";
import { NewSaleDialog } from "@/components/new-sale-dialog";

export default function SalesPage() {
  const sales = [
    { inv: "INV-001", customer: "Sonam Wangchuk", items: 3, amount: "Nu. 3,600", method: "Cash", status: "Paid", date: "Today" },
    { inv: "INV-002", customer: "Pema Dorji", items: 6, amount: "Nu. 480", method: "Cash", status: "Paid", date: "Today" },
    { inv: "INV-003", customer: "Dechen Lhamo", items: 2, amount: "Nu. 870", method: "Credit", status: "Credit", date: "Today" },
    { inv: "INV-004", customer: "Karma Tshering", items: 1, amount: "Nu. 720", method: "Cash", status: "Paid", date: "Yesterday" },
    { inv: "INV-005", customer: "Tandin Wangmo", items: 5, amount: "Nu. 2,300", method: "Credit", status: "Credit", date: "Yesterday" },
    { inv: "INV-006", customer: "Dorji Wangchuk", items: 2, amount: "Nu. 1,560", method: "Mobile", status: "Paid", date: "10 Jul" },
    { inv: "INV-007", customer: "Sonam Choden", items: 4, amount: "Nu. 3,200", method: "Cash", status: "Paid", date: "9 Jul" },
    { inv: "INV-008", customer: "Pema Lhamo", items: 1, amount: "Nu. 12,000", method: "Bank", status: "Paid", date: "8 Jul" },
  ];

  const total = sales.reduce((sum, s) => sum + parseInt(s.amount.replace(/[^0-9]/g, "")), 0);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales</h1>
          <p className="text-sm text-muted-foreground">Record and track every sale.</p>
        </div>
        <NewSaleDialog />
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Today</p><p className="text-xl font-bold">Nu. 45,800</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">This Week</p><p className="text-xl font-bold">Nu. 2,34,500</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">This Month</p><p className="text-xl font-bold">Nu. 8,92,000</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Credit Outstanding</p><p className="text-xl font-bold text-amber-600">Nu. 27,800</p></CardContent></Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-muted-foreground">
              <th className="p-4 font-medium">Invoice</th><th className="p-4 font-medium">Customer</th><th className="p-4 font-medium">Items</th>
              <th className="p-4 font-medium">Amount</th><th className="p-4 font-medium">Payment</th><th className="p-4 font-medium">Status</th><th className="p-4 font-medium">Date</th>
            </tr></thead>
            <tbody>
              {sales.map((s, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">{s.inv}</td>
                  <td className="p-4">{s.customer}</td>
                  <td className="p-4">{s.items}</td>
                  <td className="p-4 font-medium">{s.amount}</td>
                  <td className="p-4 text-xs text-muted-foreground">{s.method}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      s.status === "Paid" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>{s.status}</span>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
