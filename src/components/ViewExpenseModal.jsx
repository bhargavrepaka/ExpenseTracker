/* eslint-disable react/prop-types */

import { Modal,Button,Stack } from "react-bootstrap"
import { useBudget,uncategorized_budgetId } from "../context/BudgetContext"
import { currenyFormatter } from "../untils"

export const ViewExpenseModal = ({handleClose,budgetId,openEditExpense }) => {
    const {budgets,getBudgetExpenses,deleteExpense,deleteBudget}=useBudget()
    const budget= budgetId===uncategorized_budgetId
                    ? {name:"Uncategorized",id:uncategorized_budgetId}
                    :  budgets.find((single)=>single.id===budgetId)
    const expenses=getBudgetExpenses(budgetId)
  return (
    <>
    <Modal show={budgetId!=null} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>Expenses - {budget?.name}</Modal.Title>
           {budgetId!=uncategorized_budgetId && 
           <Button 
           variant="outline-danger" 
           className="ms-3" 
           onClick={()=>{
                deleteBudget(budget)
                handleClose()
           }}>Del</Button>}
        </Modal.Header>
        <Stack direction="vertical" gap={3} className="px-3 pt-2">
            {expenses.length==0?" No expenses to show...": expenses.map((expense)=>{
                return <Stack key={expense.id} gap={3} direction="horizontal">
                    <div className="me-auto fs-5">{expense.description}</div>
                    <div className="fs-5">{currenyFormatter.format(expense.amount) }</div>
                    <Button size="sm" variant="outline-warning" onClick={()=>openEditExpense(expense)}>Edit</Button>
                    <Button size="sm" variant="outline-danger" onClick={()=>deleteExpense(expense)}>&times;</Button>
                </Stack>
            })}

        </Stack>

        <Modal.Body>
            
        </Modal.Body>
        
    </Modal>
    </>
  )
}
