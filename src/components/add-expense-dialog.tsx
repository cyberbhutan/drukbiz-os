"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { Plus } from "lucide-react";

export function AddExpenseDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ category: "supplies", amount: 0, description: "", method: "cash" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from("drukbiz_expenses").insert({
        category: form.category, amount: form.amount,
        description: form.description, payment_method: form.method,
      });
      setOpen(false);
      window.location.reload();
    } catch {}
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        <Button><Plus className="mr-1 h-4 w-4" /> Add Expense</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Expense</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded border px-3 py-2 text-sm">
            <option value="supplies">Supplies</option><option value="utilities">Utilities</option><option value="salary">Salary</option>
            <option value="transport">Transport</option><option value="marketing">Marketing</option><option value="rent">Rent</option><option value="other">Other</option>
          </select>
          <Input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })} required />
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className="w-full rounded border px-3 py-2 text-sm">
            <option value="cash">Cash</option><option value="bank">Bank Transfer</option><option value="mobile">Mobile Payment</option>
          </select>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Saving..." : "Add Expense"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
