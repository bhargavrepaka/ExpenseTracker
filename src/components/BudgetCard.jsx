/* eslint-disable react/prop-types */
import { Card ,ProgressBar,Button,Stack} from "react-bootstrap";
import { currenyFormatter } from "../untils";

export default function BudgetCard({name,amount,max ,gray,handleAddExpense,hideButtons,handleViewExpense}) {
    const classNames=[]
    if(amount>max){
        classNames.push("bg-danger","bg-opacity-10")
    }else if(gray) {
        classNames.push("bg-light")
    }
  return (
    <Card className={classNames.join(" ")}>
        <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3"> 
                <div>{name}</div>
                <div className="d-flex align-items-baseline">{ currenyFormatter.format(amount)} 
                 { max && <span className=" text-muted fs-6 ms-1 " > /{currenyFormatter.format(max)} </span>} 
                </div>
                    
            </Card.Title>

           {max && <ProgressBar className="rounded-pill"
            variant={getProgressBarVariant(amount,max)}
            min={0}
            max={max}
            now={amount}
            />}
            {!hideButtons && <Stack direction="horizontal" gap={2} className="mt-3 d-flex justify-content-end" >
                <Button variant="outline-primary" onClick={handleAddExpense} >Add Expense</Button>
                <Button variant="outline-secondary " onClick={handleViewExpense}>View Expenses </Button>
            </Stack>}
        </Card.Body>
    </Card> 
  )
}

function getProgressBarVariant(amount,max){
    const ratio= amount/max
    if (ratio<0.5) return "primary"
    if (ratio<0.75) return "warning"
    return "danger"
}
