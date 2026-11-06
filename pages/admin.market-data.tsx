import React, { useState } from "react";
import { useAdminMarketData } from "../helpers/useAdminMarketData";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Skeleton } from "../components/Skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/Select";
import { toast } from "sonner";
import { Trash2, Edit2, Plus, Save, X } from "lucide-react";
import styles from "./admin.market-data.module.css";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

export default function AdminMarketData() {
  const { marketDataQuery, createMutation, updateMutation, deleteMutation } = useAdminMarketData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const defaultForm = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    medianPrice: 400000,
    homesSold: 150,
    avgDaysOnMarket: 30,
    activeListings: 400,
    priceChangeYoy: 5.2,
  };

  const [formData, setFormData] = useState(defaultForm);

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      month: item.month,
      year: item.year,
      medianPrice: item.medianPrice,
      homesSold: item.homesSold,
      avgDaysOnMarket: item.avgDaysOnMarket,
      activeListings: item.activeListings,
      priceChangeYoy: Number(item.priceChangeYoy),
    });
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(defaultForm);
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        await createMutation.mutateAsync(formData);
        toast.success("Market data added successfully");
      } else if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success("Market data updated successfully");
      }
      cancelEdit();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this market data entry?")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Market data deleted");
      } catch (error) {
        toast.error("Failed to delete market data");
      }
    }
  };

  const isLoading = marketDataQuery.isLoading;
  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Market Data</h1>
          <p className={styles.subtitle}>Manage monthly real estate statistics for Concord.</p>
        </div>
        {!isAdding && !editingId && (
          <Button onClick={() => { setIsAdding(true); setFormData(defaultForm); }}>
            <Plus size={16} /> Add New Entry
          </Button>
        )}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Month / Year</th>
              <th>Median Price</th>
              <th>Homes Sold</th>
              <th>Days on Market</th>
              <th>Active Listings</th>
              <th>YoY Change (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isAdding || editingId) && (
              <tr className={styles.editRow}>
                <td>
                  <div className={styles.monthYearInputs}>
                    <Select 
                      value={formData.month.toString()} 
                      onValueChange={(v) => setFormData({...formData, month: parseInt(v)})}
                    >
                      <SelectTrigger className={styles.selectTrigger}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {MONTHS.map((m, i) => (
                          <SelectItem key={i+1} value={(i+1).toString()}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      type="number" 
                      value={formData.year} 
                      onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                      className={styles.yearInput}
                    />
                  </div>
                </td>
                <td><Input type="number" value={formData.medianPrice} onChange={(e) => setFormData({...formData, medianPrice: parseInt(e.target.value)})} /></td>
                <td><Input type="number" value={formData.homesSold} onChange={(e) => setFormData({...formData, homesSold: parseInt(e.target.value)})} /></td>
                <td><Input type="number" value={formData.avgDaysOnMarket} onChange={(e) => setFormData({...formData, avgDaysOnMarket: parseInt(e.target.value)})} /></td>
                <td><Input type="number" value={formData.activeListings} onChange={(e) => setFormData({...formData, activeListings: parseInt(e.target.value)})} /></td>
                <td><Input type="number" step="0.1" value={formData.priceChangeYoy} onChange={(e) => setFormData({...formData, priceChangeYoy: parseFloat(e.target.value)})} /></td>
                <td>
                  <div className={styles.actions}>
                    <Button size="icon-md" onClick={handleSave} disabled={isPending} title="Save">
                      <Save size={16} />
                    </Button>
                    <Button size="icon-md" variant="outline" onClick={cancelEdit} disabled={isPending} title="Cancel">
                      <X size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            )}

            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={7}><Skeleton style={{ height: "40px" }} /></td>
                </tr>
              ))
            ) : marketDataQuery.data?.length === 0 && !isAdding ? (
              <tr>
                <td colSpan={7} className={styles.emptyState}>No market data found. Add an entry to get started.</td>
              </tr>
            ) : (
              marketDataQuery.data?.sort((a, b) => b.year - a.year || b.month - a.month).map((item) => (
                item.id !== editingId && (
                  <tr key={item.id}>
                    <td className={styles.fw500}>{MONTHS[item.month - 1]} {item.year}</td>
                    <td>{formatCurrency(item.medianPrice)}</td>
                    <td>{item.homesSold}</td>
                    <td>{item.avgDaysOnMarket}</td>
                    <td>{item.activeListings}</td>
                    <td className={Number(item.priceChangeYoy) >= 0 ? styles.positive : styles.negative}>
                      {Number(item.priceChangeYoy) > 0 ? '+' : ''}{Number(item.priceChangeYoy)}%
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Button size="icon-sm" variant="ghost" onClick={() => startEdit(item)} title="Edit">
                          <Edit2 size={16} />
                        </Button>
                        <Button size="icon-sm" variant="ghost" className={styles.deleteBtn} onClick={() => handleDelete(item.id)} title="Delete">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}