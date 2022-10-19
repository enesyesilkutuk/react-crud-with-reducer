import Employee from "./Employee";
import { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { Button, Modal, Alert } from "react-bootstrap";
import AddForm from "./AddForm";
import Pagination from "./Pagination";

const EmployeeList = () => {
  const { sortedEmployees, alert, setAlert } = useContext(EmployeeContext);
  //const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(3);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const changeAlert = (prev) => setAlert((prev) => !prev);

  useEffect(() => {
    handleClose();
   },[sortedEmployees]);

   const indexOfLastEmployee = currentPage * employeesPerPage;
   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
   const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
   const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage);
 
  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>Manage <b>Employees</b></h2>
          </div>
          <div className="col-sm-6">
            <Button onClick={handleShow} className="btn btn-success text-white" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Add New Employee</span>
            </Button>
          </div>
        </div>
      </div>
     { alert && <Alert className="text-primary" variant="success" onClose={() => setAlert(false)} dismissible>Employee List Successfully Updated</Alert> }
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Adress</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <Employee employee={employee} changeAlert={changeAlert} />
            </tr>
          ))}
        </tbody>
      </table> 
      <Pagination pages={totalPagesNum} setCurrentPage={setCurrentPage} currentEmployees={currentEmployees} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm changeAlert={changeAlert} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Close Modal</Button>
        </Modal.Footer>
      </Modal>
     </>
  );
};

export default EmployeeList;
