import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function EmployeesPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Employees</h1><p className="text-sm text-muted-foreground">Manage staff, attendance, and salaries.</p></div>
        <Button><Plus className="mr-1 h-4 w-4" /> Add Employee</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-5">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">8</p><p className="text-xs text-muted-foreground">Total Staff</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-emerald-600">6</p><p className="text-xs text-muted-foreground">Present Today</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-amber-600">1</p><p className="text-xs text-muted-foreground">On Leave</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-red-600">1</p><p className="text-xs text-muted-foreground">Absent</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">Nu. 48,000</p><p className="text-xs text-muted-foreground">Monthly Payroll</p></CardContent></Card>
      </div>
      <Card className="mt-6"><CardContent className="p-0">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-muted-foreground">
            <th className="p-4 font-medium">Name</th><th className="p-4 font-medium">Role</th><th className="p-4 font-medium">Salary</th><th className="p-4 font-medium">Today</th><th className="p-4 font-medium">This Month</th><th className="p-4 font-medium">Status</th>
          </tr></thead>
          <tbody>
            {[
              { name: "Dorji Wangchuk", role: "Cashier", salary: "Nu. 12,000", today: "✅", month: "24/24", status: "Active" },
              { name: "Sonam Choden", role: "Waiter", salary: "Nu. 8,000", today: "✅", month: "22/24", status: "Active" },
              { name: "Pema Lhamo", role: "Cook", salary: "Nu. 15,000", today: "✅", month: "24/24", status: "Active" },
              { name: "Kinzang Dorji", role: "Delivery", salary: "Nu. 7,000", today: "❌", month: "18/24", status: "Absent" },
              { name: "Tandin Wangmo", role: "Cleaner", salary: "Nu. 6,000", today: "✅", month: "20/24", status: "Active" },
            ].map((e, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4 font-medium">{e.name}</td><td className="p-4 text-muted-foreground">{e.role}</td>
                <td className="p-4">{e.salary}</td><td className="p-4">{e.today}</td><td className="p-4">{e.month}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${e.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}>{e.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}
