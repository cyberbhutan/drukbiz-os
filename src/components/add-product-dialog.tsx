"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { Plus } from "lucide-react";

export function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", sku: "", category: "", price: 0, cost: 0, stock: 0, min: 5 });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from("drukbiz_products").insert({
        name: form.name,
        sku: form.sku,
        category: form.category,
        selling_price: form.price,
        purchase_price: form.cost,
        stock: form.stock,
        low_stock_threshold: form.min,
      });
      setOpen(false);
      window.location.reload();
    } catch {}
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        <Button><Plus className="mr-1 h-4 w-4" /> Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Product</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="SKU (optional)" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input type="number" placeholder="Selling price" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} required />
            <Input type="number" placeholder="Cost price" value={form.cost} onChange={(e) => setForm({ ...form, cost: parseFloat(e.target.value) || 0 })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input type="number" placeholder="Initial stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} />
            <Input type="number" placeholder="Min stock alert" value={form.min} onChange={(e) => setForm({ ...form, min: parseInt(e.target.value) || 0 })} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Saving..." : "Add Product"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
