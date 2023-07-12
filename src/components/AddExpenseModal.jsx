/* eslint-disable react/prop-types */
import { useRef } from "react"
import { Modal,Button,Form } from "react-bootstrap"
import { useBudget,uncategorized_budgetId } from "../context/BudgetContext"

export const AddExpenseModal = ({show,handleClose,defaultBudgetId }) => {
    const descriptionRef=useRef()
    const amountRef=useRef()
    const budgetIdRef=useRef()
    const {addExpense,budgets}=useBudget()
    function handleSubmit(e){
        e.preventDefault()
        addExpense(
            {description:descriptionRef.current.value,
            amount:parseFloat(amountRef.current.value),
            budgetId:budgetIdRef.current.value
            })
        handleClose()
    }
    
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    ref={descriptionRef} 
                    type="text" 
                    required/>
                </Form.Group>
                <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                    ref={amountRef} 
                    type="number" 
                    required 
                    min={0} 
                    step={0.01}/>
                </Form.Group>
                <Form.Group controlId="budgetId">
                    <Form.Label>Budget</Form.Label>
                    <Form.Select
                    ref={budgetIdRef}
                    defaultValue={defaultBudgetId}
                    >
                        
                        <option key={uncategorized_budgetId} value={uncategorized_budgetId}>Uncategorized</option>
                        {budgets.map((budget)=>{
                            return <option key={budget.id} value={budget.id}>{budget.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Modal.Footer>
                    <Button 
                    variant="primary" 
                    type="submit">Add</Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>
        
    </Modal>
    </>
  )
}
