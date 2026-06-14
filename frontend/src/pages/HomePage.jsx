import CategoryExpenseChart from "@/components/global/CategoryExpenseChart";
import DashboardStats from "@/components/global/DashboardStats";
import ExpenseList from "@/components/global/ExpenseList";
import ExpenseModal from "@/components/global/ExpenseModal";
import TotalExpenseChart from "@/components/global/TotalExpenseChart";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const openCreateModal = () => {
    setSelectedExpense(null);
    setModalOpen(true);
  };

  const openEditModal = (expense) => {
    setSelectedExpense(expense);
    setModalOpen(true);
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-4 mb-14 md:px-6 md:py-6">
        <div className="space-y-6">
          {/* Stats */}
          <DashboardStats />

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TotalExpenseChart />
            <CategoryExpenseChart />
          </div>

          {/* Expense Table */}
          <ExpenseList onEdit={openEditModal} />
        </div>
      </section>

      <Button
        onClick={openCreateModal}
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
      >
        Add Expense
        <PlusIcon />
      </Button>

      <ExpenseModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        expense={selectedExpense}
      />
    </>
  );
}