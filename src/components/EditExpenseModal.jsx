/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import { Modal,Button,Form } from "react-bootstrap"
import { useBudget,uncategorized_budgetId } from "../context/BudgetContext"

export const EditExpenseModal = ({show,handleClose,expense}) => {
    // console.log("desc",expense.description)
    const [description,setDescription]=useState(expense.description)
    const [amount,setAmount]=useState(expense.amount) 
    useEffect(()=>{
        setDescription(expense.description)
        setAmount(expense.amount)
    },[expense.amount,expense.description])
    const descriptionRef=useRef()
    const amountRef=useRef()
    const budgetIdRef=useRef()
    const {editExpense,budgets}=useBudget()
    function handleSubmit(e){
        e.preventDefault()
        const newExpense={
            id:expense.id,
            amount:amountRef.current.value,
            budgetId:budgetIdRef.current.value,
            description:descriptionRef.current.value
        }
        editExpense(newExpense)
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
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}

                    ref={descriptionRef} 
                    type="text" 
                    required/>
                </Form.Group>
                <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                    value={amount} 
                    onChange={(e)=>setAmount(e.target.value)}
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
                    defaultValue={expense.budgetId}
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
                    type="submit">Save Edit</Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>
        
    </Modal>
    </>
  )
}
