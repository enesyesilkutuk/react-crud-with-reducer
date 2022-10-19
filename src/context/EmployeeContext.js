import { createContext, useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const EmployeeContext = createContext();

const EmployeeContextProvider = ({children}) => {

    const [alert, setAlert] = useState(false);
    const localDataEmployees = JSON.parse(localStorage.getItem('employees'));
    
    const initialState = [
        {id:uuidv4(), name: 'Thomas Hardy', email: 'thomashardy@mail.com', address: '89 Chiaroscuro Rd, Portland, USA', phone: '(171) 555-2222'},
        {id:uuidv4(), name: 'Dominique Perrier', email: 'dominiqueperrier@mail.com', address: 'Obere Str. 57, Berlin, Germany', phone: '(313) 555-5735'},
        {id:uuidv4(), name: 'Maria Anders', email: 'mariaanders@mail.com', address: '25, rue Lauriston, Paris, France', phone: '(503) 555-9931'},
        {id:uuidv4(), name: 'Fran Wilson', email: 'franwilson@mail.com', address: 'C/ Araquil, 67, Madrid, Spain', phone: '(204) 619-5731'},
        {id:uuidv4(), name: 'Martin Blank', email: 'martinblank@mail.com', address: 'Via Monte Bianco 34, Turin, Italy', phone: '(480) 631-2097'}];
    
    const reducer = (employees, action) => {
        switch(action.type) {
            
            case "add_employee" :
                return [...employees, { 
                    id : uuidv4(),
                    name : action.payload.name,
                    email : action.payload.email,
                    address : action.payload.address,
                    phone : action.payload.phone,
                }];
            
                case "remove_employee" :
                return employees.filter((employee) => employee.id !== action.payload);
            
                case "update_employee" :
                return employees.map((employee) => employee.id === action.payload.id ? action.payload : employee)
            
                default :
                return employees;
        }
    };

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    });
    
    const [employees, dispatch] = useReducer(reducer, [], () => {
            return !localDataEmployees ? initialState : localDataEmployees
    });
    
    const sortedEmployees = employees.sort((a,b) => a.name < b.name ? -1 : 1);

    return <EmployeeContext.Provider value={{sortedEmployees, dispatch, alert, setAlert}}>{children}</EmployeeContext.Provider>
}

export default EmployeeContextProvider;
