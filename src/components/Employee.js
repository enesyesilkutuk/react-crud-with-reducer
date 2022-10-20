import { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditForm from "./EditForm";

const Employee = ({employee, changeAlert}) => {

    const { dispatch, alert } = useContext(EmployeeContext);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose();
    }, [employee]);

    const deleteEmployee = () => {
        dispatch({type:"remove_employee", payload: employee.id});
        changeAlert(alert);
        setTimeout(() => {
            changeAlert(alert);
          }, 3000);
    };
    
    return (
        <>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.address}</td>
            <td>{employee.phone}</td>
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button className="btn text-warning btn-act" onClick={handleShow} data-toggle="modal"><i className='material-icons'>&#xE254;</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <button className="btn text-danger" onClick={deleteEmployee} data-toggle="modal"><i className='material-icons'>&#xE872;</i></button>
                </OverlayTrigger>
            </td>
        
        <Modal show={show} onHide={handleClose}>
           <Modal.Header className="modal-header" closeButton>
                <Modal.Title>Update Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditForm theEmployee={employee} changeAlert={changeAlert} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>Close Modal</Button>
            </Modal.Footer>
      </Modal>
        </>
  )
}

export default Employee;