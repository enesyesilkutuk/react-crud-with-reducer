import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { EmployeeContext } from '../context/EmployeeContext';

const EditForm = ({theEmployee, changeAlert}) => {

    const { dispatch } = useContext(EmployeeContext);
  
    const employee = theEmployee;
    const id = employee.id;
    const [name, setName] = useState(employee.name);
    const [email, setEmail] = useState(employee.email);
    const [address, setAddress] = useState(employee.address);
    const [phone, setPhone] = useState(employee.phone);
    const updatedEmployee = {id, name, email, address, phone};

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({type:"update_employee", payload: updatedEmployee});
        changeAlert();
        setTimeout(() => {
            changeAlert();
          }, 3000);
    }
    return (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} name="name" className='mb-3' type='text' placeholder='Name *' required /> 
        </Form.Group>
        <Form.Group>
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} name="email" className='mb-3' type='email' placeholder='Email *' required />
        </Form.Group>
        <Form.Group>
            <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} name="address" className='mb-3' as="textarea" placeholder="Address" />
        </Form.Group>
        <Form.Group>
            <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" className='mb-3' type="text" placeholder="Phone" />
        </Form.Group>
        <Button className="w-100" variant="success" type="submit">Update Employee</Button>
    </Form>
  )
}

export default EditForm;