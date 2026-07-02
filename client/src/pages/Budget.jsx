import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createBudget,
  getBudget,
  addExpense,
  deleteExpense,
} from "../services/budgetService";

export default function Budget() {
  const { tripId } = useParams();

  const [budget, setBudget] = useState(null);

  const [budgetForm, setBudgetForm] = useState({
    totalBudget: "",
    currency: "USD",
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
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function saveBudget(e) {
    e.preventDefault();

    await createBudget(tripId, budgetForm);

    load();
  }

  async function saveExpense(e) {
    e.preventDefault();

    await addExpense(tripId, expense);

    setExpense({
      category: "",
      amount: "",
      note: "",
      date: "",
    });

    load();
  }

  return (
    <div className="container">
      <h1 className="page-title">Budget Manager</h1>

      {!budget && (
        <form className="auth-card" onSubmit={saveBudget}>
          <input
            placeholder="Total Budget"
            value={budgetForm.totalBudget}
            onChange={(e) =>
              setBudgetForm({
                ...budgetForm,
                totalBudget: e.target.value,
              })
            }
          />

          <input
            placeholder="Currency"
            value={budgetForm.currency}
            onChange={(e) =>
              setBudgetForm({
                ...budgetForm,
                currency: e.target.value,
              })
            }
          />

          <button>Create Budget</button>
        </form>
      )}

      {budget && (
        <>
          <div className="destination-card">
            <div className="destination-content">
              <h2>Total : {budget.budget.totalBudget}</h2>

              <h3>Spent : {budget.budget.spent}</h3>

              <h3>Remaining : {budget.remaining}</h3>
            </div>
          </div>

          <br />

          <form className="auth-card" onSubmit={saveExpense}>
            <input
              placeholder="Category"
              value={expense.category}
              onChange={(e) =>
                setExpense({ ...expense, category: e.target.value })
              }
            />

            <input
              placeholder="Amount"
              value={expense.amount}
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
            />

            <input
              placeholder="Note"
              value={expense.note}
              onChange={(e) => setExpense({ ...expense, note: e.target.value })}
            />

            <input
              type="date"
              value={expense.date}
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            />

            <button>Add Expense</button>
          </form>

          <br />

          {budget.expenses.map((item) => (
            <div className="destination-card" key={item._id}>
              <div className="destination-content">
                <h3>{item.category}</h3>

                <p>{item.amount}</p>

                <p>{item.note}</p>

                <button
                  className="delete-btn"
                  onClick={async () => {
                    await deleteExpense(tripId, item._id);

                    load();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
