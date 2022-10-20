import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { EmployeeContext } from '../context/EmployeeContext';

const AddForm = ({changeAlert}) => {

    const { dispatch } = useContext(EmployeeContext);
   
    const [employeeValues, setEmployeeValues] = useState({ name : "", email : "", address : "", phone : "" });
    
    const handleEmployeeValues = (e) => {
        setEmployeeValues({...employeeValues, [e.target.name] : e.target.value})
};

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type: "add_employee", payload: employeeValues});
    changeAlert();
    setTimeout(() => {
      changeAlert();
    }, 3000);
  };

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Control name="name" value={employeeValues.name} onChange={handleEmployeeValues} className='mb-3' type='text' placeholder='Name *' required /> 
        </Form.Group>
        <Form.Group>
            <Form.Control name="email" value={employeeValues.email} onChange={handleEmployeeValues} className='mb-3' type='email' placeholder='Email *' required />
        </Form.Group>
        <Form.Group>
            <Form.Control name="address" value={employeeValues.address} onChange={handleEmployeeValues} className='mb-3' as="textarea" placeholder="Address" />
        </Form.Group>
        <Form.Group>
            <Form.Control name="phone" value={employeeValues.phone} onChange={handleEmployeeValues} className='mb-3' type="text" placeholder="Phone" />
        </Form.Group>
        <Button className="w-100" variant="success" type="submit">Add New Employee</Button>
    </Form>
  )
}

export default AddForm;