import Logout from "../Logout"
// import axios from "axios"
 import { useEffect, useState,useRef, MutableRefObject } from "react"
// import RequestManager from './Request'
import { Modal, Button } from 'react-bootstrap'
// import './home.scss';

type Employee={
    EmployeeId:number;
    Name: string; 
  Skills:string; 
  Experience: number;
Manager:string
}




type emp={
    employeeData:[];
    getEmployee:()=>{};
    sendRequest:() => {};
}

 const ManagerHome=({employeeData,getEmployee,sendRequest}:any)=>{
    const [enableRequest, setenableRequest] = useState(false);
    const [employeeList, setemployeeList] = useState<any>({});  
    const [textmessage, settextmessage] = useState('');
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    const submit = () => {
      setShow(false);
      console.log('submit',employeeList,typeof(employeeList));

      sendRequest({
        employee_id : employeeList.x.EmployeeId,
        manager : employeeList.x.Manager,
        requestmessage : textmessage
      });
      console.log(employeeList.x.EmployeeId,employeeList.x.Manager)
    }
  

    useEffect(()=>{
        console.log('getEmployee')
         // let username= localStorage.getItem("username");
        // console.log('user:',username);
        
    getEmployee()
    },[]
    )

    function textmsg(e:any){
        console.log(e.target.value,'value of textbox');
        settextmessage(e.target.value);

    }
    function enableSoftLock(employee:any){

        console.log('requestmanager',employee);
        setemployeeList(employee);
        setenableRequest(true);
        setShow(true);
    }
    console.log('enableRequest:',enableRequest);
    console.log('employeeList',employeeList);
    
//     const [peopleData,setPeopleData] =useState([])
    console.log(employeeData)
    return (
        <div>

        <div className = "px-3 py-2 bg-gray text-white">
            <div className = "d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-light text-decoration-none">
                  <h1 className="textcolor">Employee Details</h1>
            </div>
            {/* <div><Logout></Logout></div> */}
        </div>
            <br/>
       
        
        {/* <button className="btn btn-success" onClick={getEmployee}>
              Get Employee</button> */}
        <table className="table">
                <thead className="tablecolor">
                    <tr >
                    <th className="text-center">Employee id</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Skills</th>
                    <th className="text-center">Experience</th>
                    <th className="text-center">Manager</th>
                    <th className="text-center"> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employeeData.map((x:Employee)=>{
                        return(
                            <tr key={x.EmployeeId}>
                                <td className="text-center">{x.EmployeeId}</td>
                                <td className="text-center">{x.Name}</td>
                                <td className="text-center">{x.Skills}</td>
                                <td className="text-center">{x.Experience}</td>
                                <td className="text-center">{x.Manager}</td>
                                <td className="text-center"><button className="btn btn-primary" onClick={() => enableSoftLock({x})}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                </svg>
                                Request Lock</button></td>
                            </tr>
                        )
                        })
                    }
                </tbody>
        </table>
        <div>
            { enableRequest ? 
            //  <RequestManager
            //     employeeList = {employeeList}
            //  /> 
            <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>Request</Modal.Title>
      </Modal.Header>

                        <Modal.Body>
                            {/* <h3>Emp ID: {employeeList.x.EmployeeId}</h3> */}
                            <div className="form-outline">
                                <div className="form-group">
                                    <label className="textcolor">Emp ID:</label> <span>{employeeList.x.EmployeeId}</span>
                                </div>
                                <div className="form-group">
                                    <label className="textcolor">Name :</label> <span>{employeeList.x.Name}</span>
                                </div>
                                <label className="form-group">Type Your comments:</label>
                                <textarea className="form-control" onChange={textmsg.bind(this)}></textarea>

                            </div>


      </Modal.Body>

      <Modal.Footer>

        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={submit}>Submit</Button>

      </Modal.Footer>

    </Modal>
            
            
            : null
            }
        </div>
        </div>
    )
}

export default ManagerHome