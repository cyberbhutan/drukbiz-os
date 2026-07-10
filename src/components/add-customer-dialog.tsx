"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { Plus } from "lucide-react";

export function AddCustomerDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", notes: "", credit: 0 });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from("drukbiz_customers").insert({
        name: form.name, phone: form.phone, email: form.email,
        address: form.address, notes: form.notes, credit_limit: form.credit,
      });
      setOpen(false);
      window.location.reload();
    } catch {}
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button><Plus className="mr-1 h-4 w-4" /> Add Customer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Customer</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <Textarea placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <Input type="number" placeholder="Credit limit (0 = no credit)" value={form.credit} onChange={(e) => setForm({ ...form, credit: parseFloat(e.target.value) || 0 })} />
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Saving..." : "Add Customer"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
