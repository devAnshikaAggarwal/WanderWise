import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createBudget,
  getBudget,
  addExpense,
  deleteExpense,
} from "../services/budgetService";

const CATEGORIES = [
  "Flights",
  "Hotels",
  "Food",
  "Transport",
  "Activities",
  "Shopping",
  "Other",
];

const CATEGORY_ICONS = {
  Flights: "✈️",
  Hotels: "🏨",
  Food: "🍜",
  Transport: "🚕",
  Activities: "🎟️",
  Shopping: "🛍️",
  Other: "📦",
};

export default function Budget() {
  const { tripId } = useParams();
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [budgetForm, setBudgetForm] = useState({
    totalBudget: "",
    currency: "INR",
  });

  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    note: "",
    date: "",
  });

  async function load() {
    try {
      const data = await getBudget(tripId);
      setBudget(data);
    } catch {
      setBudget(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function saveBudget(e) {
    e.preventDefault();
    setError("");
    if (!budgetForm.totalBudget || Number(budgetForm.totalBudget) <= 0)
      return setError("Enter a valid budget amount.");
    await createBudget(tripId, budgetForm);
    load();
  }

  async function saveExpense(e) {
    e.preventDefault();
    setError("");
    if (!expense.category) return setError("Pick a category.");
    if (!expense.amount || Number(expense.amount) <= 0)
      return setError("Enter a valid amount.");
    await addExpense(tripId, expense);
    setExpense({ category: "", amount: "", note: "", date: "" });
    load();
  }

  if (loading) return <p className="page-status">Loading budget...</p>;

  const cur = budget?.budget?.currency || budgetForm.currency;
  const total = budget?.budget?.totalBudget || 0;
  const spent = budget?.budget?.spent || 0;
  const pct = total ? Math.min((spent / total) * 100, 100) : 0;
  const barClass = pct >= 90 ? "danger" : pct >= 65 ? "warn" : "";

  return (
    <div className="container budget-page">
      <div className="page-head">
        <h1 className="page-title">Budget Manager</h1>
        <p className="page-subtitle">Track every expense and stay on target.</p>
      </div>

      {!budget ? (
        /* ===== CREATE BUDGET ===== */
        <form className="budget-create" onSubmit={saveBudget}>
          <h3>Set a budget for this trip</h3>
          {error && <div className="form-error">⚠ {error}</div>}
          <div className="form-row">
            <label className="form-field">
              <span>Total Budget</span>
              <input
                type="number"
                min="1"
                placeholder="e.g. 50000"
                value={budgetForm.totalBudget}
                onChange={(e) =>
                  setBudgetForm({ ...budgetForm, totalBudget: e.target.value })
                }
              />
            </label>
            <label className="form-field">
              <span>Currency</span>
              <select
                value={budgetForm.currency}
                onChange={(e) =>
                  setBudgetForm({ ...budgetForm, currency: e.target.value })
                }
              >
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </label>
          </div>
          <button className="btn-primary trip-submit">Create Budget</button>
        </form>
      ) : (
        <>
          {/* ===== SUMMARY ===== */}
          <div className="budget-summary">
            <div className="budget-tile">
              <p>Total Budget</p>
              <h2>
                {cur} {total.toLocaleString()}
              </h2>
            </div>
            <div className="budget-tile">
              <p>Spent</p>
              <h2 className="spent">
                {cur} {spent.toLocaleString()}
              </h2>
            </div>
            <div className="budget-tile">
              <p>Remaining</p>
              <h2 className="remaining">
                {cur} {(budget.remaining ?? total - spent).toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="budget-bar">
            <div
              className={`budget-bar-fill ${barClass}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="budget-bar-label">{pct.toFixed(0)}% of budget used</p>

          {/* ===== ADD EXPENSE ===== */}
          <form className="expense-form" onSubmit={saveExpense}>
            {error && <div className="form-error">⚠ {error}</div>}
            <select
              value={expense.category}
              onChange={(e) =>
                setExpense({ ...expense, category: e.target.value })
              }
            >
              <option value="">Category...</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              placeholder="Amount"
              value={expense.amount}
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
            />
            <input
              placeholder="Note (optional)"
              value={expense.note}
              onChange={(e) => setExpense({ ...expense, note: e.target.value })}
            />
            <input
              type="date"
              value={expense.date}
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            />
            <button className="btn-primary">+ Add</button>
          </form>

          {/* ===== EXPENSE LIST ===== */}
          {budget.expenses.length === 0 ? (
            <p className="page-status">
              No expenses yet — add your first one above.
            </p>
          ) : (
            <div className="expense-list">
              {budget.expenses.map((item) => (
                <div className="expense-row" key={item._id}>
                  <span className="expense-icon">
                    {CATEGORY_ICONS[item.category] || "📦"}
                  </span>
                  <div className="expense-info">
                    <strong>{item.category}</strong>
                    {item.note && <p>{item.note}</p>}
                  </div>
                  <span className="expense-date">
                    {item.date?.substring(0, 10)}
                  </span>
                  <span className="expense-amount">
                    {cur} {Number(item.amount).toLocaleString()}
                  </span>
                  <button
                    className="expense-delete"
                    onClick={async () => {
                      await deleteExpense(tripId, item._id);
                      load();
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
