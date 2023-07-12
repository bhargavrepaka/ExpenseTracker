/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";


const BudgetsContext=createContext(undefined)
export const uncategorized_budgetId="Uncategorized_Id"
export function useBudget(){
    return useContext(BudgetsContext)
}
export function BudgetsProvider({children}){

    const[ budgets,setBudgets]=useLocalStorage("budgets",[]);
    const[ expenses,setExpenses]=useLocalStorage("expenses",[]);

    function getBudgetExpenses(budgetId){
        return expenses.filter(expense=>expense.budgetId===budgetId)
    }

    function addExpense({amount,description,budgetId}){
        setExpenses((prevExpenses)=>{
            return [...prevExpenses, {id:uuidV4(),amount,description,budgetId}]
        })
    }

    function addBudget({name,max}){
        setBudgets((prevBudgets)=>{

            if(prevBudgets.find((budget)=>budget.name===name)) return prevBudgets

            return [...prevBudgets,{id:uuidV4(),name,max}]
        })
    }

    function deleteBudget({id}){
       //changes expenses to uncategoriez after delete
        setExpenses((prevExpenses)=>{
            return prevExpenses.map((expense)=>{
                if(expense.budgetId!==id) return expense
                return {...expense,budgetId:uncategorized_budgetId}
            })
        })
        setBudgets((prevBudgets)=>{
            return prevBudgets.filter((budget)=>{
                return budget.id!==id
            })
        })

    }

    function deleteExpense({id}){
        setExpenses((prevExpenses)=>{
            return prevExpenses.filter((expense)=>{
                return expense.id!==id
            })
        })

    }

    function editExpense(expense){
        const editId=expense.id
       const editItemIdx= expenses.findIndex((expense)=>{
        return expense.id===editId
       })
       const tempExpenses=[...expenses]
       tempExpenses[editItemIdx]=expense
       setExpenses(tempExpenses)
  
    }



    return (
    <BudgetsContext.Provider 
    value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        editExpense
    }}>
        {children}
    </BudgetsContext.Provider>
)}