import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Table, Button, Input, Col, Row } from 'reactstrap';

function EmployeeDirectory(props) {
    const employeesNum = 30;

    const [employees, setEmployees] = useState([]);
    const [sortDirection, setSortDirection] = useState(0);
    const [filteredArray, setFilteredArray] = useState([]);

    useEffect(async () => {
        console.log("useEffect");
        try {
            const resp = await axios.get(`https://randomuser.me/api/?results=${employeesNum}`);
            setEmployees(resp.data.results.map(user => ({
               gender: user.gender,
               firstName: user.name.first,
               lastName: user.name.last,
               email: user.email,
               phone: user.phone
            })));
            setFilteredArray(resp.data.results.map(user => ({
               gender: user.gender,
               firstName: user.name.first,
               lastName: user.name.last,
               email: user.email,
               phone: user.phone
            })));
        } catch (ex) {
            console.error("API request is wrong");
        }
    }, []);

    const onFieldClick = () => {
        if (sortDirection == 0) {
            const t = employees.sort((emp1, emp2) => emp1.firstName.localeCompare(emp2.firstName));
            setEmployees([...t]);
            setSortDirection(1);
        } else if (sortDirection == 1) {
            const t = employees.sort((emp1, emp2) => emp2.firstName.localeCompare(emp1.firstName));
            setEmployees([...t]);
            setSortDirection(0);
        }
    };

    const onFieldFilter = event => {
        const f = employees.filter((e) => e.email.includes(event.target.value));
            setFilteredArray([...f]);

    }

    return (
        <Table striped>
            <thead>
                <tr>
                    <th><Button onClick={onFieldClick} color="link">First Name</Button></th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>
                        <Row>
                            <Col>
                                Email
                            </Col>
                            <Col>
                                <Input placeholder="Filter" type="text" onChange={onFieldFilter} />
                            </Col>
                        </Row>
                    </th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {filteredArray.map((e, i) => (
                    <tr key={i}>
                        <td>
                            {e.firstName}
                        </td>
                        <td>
                            {e.lastName}
                        </td>
                        <td>
                            {e.gender}
                        </td>
                        <td>
                            {e.email}
                        </td>
                        <td>
                            {e.phone}
                        </td>
                    </tr>
                ))}

            </tbody>
        </Table>
    );

}

export default EmployeeDirectory;