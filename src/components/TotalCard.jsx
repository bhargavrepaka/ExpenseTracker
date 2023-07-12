import { useBudget, } from "../context/BudgetContext"
import BudgetCard from "./BudgetCard"

export const TotalCard = () => {
    const {budgets,expenses}=useBudget()
    const max=budgets.reduce((total,budget)=>total+budget.max,0)
    const amount=expenses.reduce((total,expense)=>total+expense.amount,0)

  return <BudgetCard max={max} amount={amount} name="Total" gray hideButtons  />
  
}
