import { useBudget,uncategorized_budgetId } from "../context/BudgetContext"
import BudgetCard from "./BudgetCard"

export const UncategorizedCard = (props) => {
    const {getBudgetExpenses}=useBudget()
    const amount=getBudgetExpenses(uncategorized_budgetId).reduce((total,expense)=>total+expense.amount,0)

  return <BudgetCard amount={amount} name="Uncategorized" gray {...props}/>
  
}
