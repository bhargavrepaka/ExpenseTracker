/* eslint-disable react/prop-types */
import { useRef } from "react"
import { Modal,Button,Form } from "react-bootstrap"
import { useBudget } from "../context/BudgetContext"

export const AddBudgetModal = ({show,handleClose}) => {
    const nameRef=useRef()
    const maxRef=useRef()
    const {addBudget}=useBudget()
    function handleSubmit(e){
        e.preventDefault()
        addBudget(
            {name:nameRef.current.value,
            max:parseFloat(maxRef.current.value)
            })
        handleClose()
    }
    
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    ref={nameRef} 
                    type="text" 
                    required/>
                </Form.Group>
                <Form.Group controlId="max">
                    <Form.Label>Maximum Spending</Form.Label>
                    <Form.Control 
                    ref={maxRef} 
                    type="number" 
                    required 
                    min={0} 
                    step={0.01}/>
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
