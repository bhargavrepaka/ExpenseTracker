import { Container } from "react-bootstrap"
import {Stack,Button} from "react-bootstrap"
import BudgetCard from "./components/BudgetCard.jsx"
import { UncategorizedCard } from "./components/UncategorizedCard.jsx"
import { TotalCard } from "./components/TotalCard.jsx"
import { AddBudgetModal } from "./components/AddBudgetModal.jsx"
import { AddExpenseModal } from "./components/AddExpenseModal.jsx"
import { useState } from "react"
import { uncategorized_budgetId, useBudget } from "./context/BudgetContext.jsx"
import { ViewExpenseModal } from "./components/ViewExpenseModal.jsx"
import { EditExpenseModal } from "./components/EditExpenseModal.jsx"

function App() {
  const [showAddBudgetModal,setShowAddBudgetModal]=useState(false)
  const [showAddExpenseModal,setShowAddExpenseModal]=useState(false)
  const [addExpenseModalBudgetId,setAddExpenseModalBudgetID]=useState()
  const {budgets,getBudgetExpenses}=useBudget()
  const [viewAddExpenseModalId,setviewAddExpenseModalId]=useState()
  const [showEditExpenseModal,setShowEditExpenseModal]=useState(false)
  const [editExpenseItem,setEditExpenseItem]=useState({})

  function openAddExpenseClick(budgetId){
    setAddExpenseModalBudgetID(budgetId)
    setShowAddExpenseModal(true)
    console.log("beng clicked")

  }

  function openEditExpenseModal(expense){
    console.log("from app",expense)
    setShowEditExpenseModal(true)
    setEditExpenseItem(expense)

  }

  return (<>
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={()=>setShowAddBudgetModal(true)} >Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseClick}>Add Expense</Button>
      </Stack>
      <div style={{display:"grid",
      gridTemplateColumns:"repeat(auto-full,minmax(300px,1fr)",
      gap:"1rem",
      alignItems:"flex-start"}}>
        {budgets.map((budget)=>{
          const amount=getBudgetExpenses(budget.id).reduce((total,expense)=>total+expense.amount,0)
          return <BudgetCard 
            key={budget.id} 
            name={budget.name} 
            gray  
            amount={amount} 
            max={budget.max}
            handleAddExpense={()=>openAddExpenseClick(budget.id)}
            handleViewExpense={()=>setviewAddExpenseModalId(budget.id)}
            >
            
            </BudgetCard>
        })}
        <UncategorizedCard 
              handleAddExpense={()=>openAddExpenseClick(uncategorized_budgetId)}
              handleViewExpense={()=>setviewAddExpenseModalId(uncategorized_budgetId)}>

              </UncategorizedCard>
        <TotalCard></TotalCard>

      </div>
    </Container>

    <AddBudgetModal show={showAddBudgetModal} 
    handleClose={()=>setShowAddBudgetModal(false)}/>

    <AddExpenseModal show={showAddExpenseModal} 
    handleClose={()=>setShowAddExpenseModal(false)} 
    defaultBudgetId={addExpenseModalBudgetId}/>

  <ViewExpenseModal budgetId={viewAddExpenseModalId} handleClose={()=>setviewAddExpenseModalId()} openEditExpense={openEditExpenseModal}></ViewExpenseModal>

 {setShowEditExpenseModal && < EditExpenseModal show={showEditExpenseModal} expense={editExpenseItem} handleClose={()=>setShowEditExpenseModal(false)} />
  }
  </>
    
  )
}

export default App