"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { Plus, X } from "lucide-react";

export function NewSaleDialog() {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }]);
  const [method, setMethod] = useState("cash");
  const [loading, setLoading] = useState(false);

  function addItem() { setItems([...items, { name: "", qty: 1, price: 0 }]); }
  function removeItem(i: number) { setItems(items.filter((_, idx) => idx !== i)); }
  function updateItem(i: number, key: string, val: any) {
    const copy = [...items];
    (copy[i] as any)[key] = val;
    setItems(copy);
  }

  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const invNo = `INV-${Date.now().toString(36).toUpperCase()}`;
      const { data: sale } = await supabase.from("drukbiz_sales").insert({
        invoice_number: invNo,
        customer_name: customer,
        total_amount: total,
        paid_amount: method === "credit" ? 0 : total,
        payment_method: method,
        status: method === "credit" ? "pending" : "completed",
      }).select().single();

      if (sale) {
        await supabase.from("drukbiz_sale_items").insert(
          items.filter(i => i.name).map(i => ({
            sale_id: sale.id,
            product_name: i.name,
            quantity: i.qty,
            unit_price: i.price,
            total: i.qty * i.price,
          }))
        );
      }
      setOpen(false);
      window.location.reload();
    } catch {}
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="mr-1 h-4 w-4" /> New Sale</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New Sale</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Customer name" value={customer} onChange={(e) => setCustomer(e.target.value)} />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Items</p>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>+ Add Item</Button>
            </div>
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Product name" value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)} className="flex-1" />
                <Input type="number" placeholder="Qty" value={item.qty} onChange={(e) => updateItem(i, "qty", parseInt(e.target.value) || 0)} className="w-16" />
                <Input type="number" placeholder="Price" value={item.price} onChange={(e) => updateItem(i, "price", parseFloat(e.target.value) || 0)} className="w-24" />
                {items.length > 1 && (
                  <button type="button" onClick={() => removeItem(i)} className="text-muted-foreground hover:text-red-500"><X className="h-4 w-4" /></button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Total: Nu. {total.toLocaleString()}</span>
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="rounded border px-2 py-1 text-sm">
              <option value="cash">Cash</option>
              <option value="bank">Bank Transfer</option>
              <option value="mobile">Mobile Payment</option>
              <option value="credit">Credit</option>
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Record Sale"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
