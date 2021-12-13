import Logout from "../Logout"
import { useEffect, useState } from "react"
import { Modal, Button } from 'react-bootstrap'

// type Employee = {
//     EmployeeId: number;
//     Name: string;
//     Skills: string;
//     Experience: number;
//     Manager: string

// }

type wfm = {
    wfmData: [];
    getWFM_manager:()=>{};
    sendWFM_Request:()=>{};
}

const WFMHome = ({ wfmData, getWFM_manager,sendWFM_Request }: any) => {
    const [enableRequest, setenableRequest] = useState(false);
    const [employeeList, setemployeeList] = useState<any>({});
    const [show, setShow] = useState(true);
    const [ddStatusValue, setddStatusValue] = useState('');

    const handleClose = () => setShow(false);
    const submit=() => {
        console.log('inside submit wfm');
        setShow(false);
        console.log('submit',employeeList,typeof(employeeList));
  
        sendWFM_Request({
            employee_id : employeeList.x.EmployeeId,
            manager : employeeList.x.Manager,
            managerstatus :ddStatusValue ==='' ? 'Approve' :  ddStatusValue           
          });
        console.log(employeeList.x.Status)
      }
    
    useEffect(() => {
        console.log('getEmployee')
        // let username= localStorage.getItem("username");
        // console.log('user:',username);
        getWFM_manager()
    }, []
    )

    function ddvalue(e:any){
        console.log(e.target.value,'value of Status DD');
        setddStatusValue(e.target.value);

    }

    function approvesoftlock(employee: any) {

        console.log('requestmanager', employee);
        setemployeeList(employee);
        setenableRequest(true);
        setShow(true);
    }

    console.log(wfmData);
    return (
        <div>

            <div className="px-3 py-2 bg-light text-white">
                <div className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
                    <h1 className="textcolor">WFM Manager</h1>

                </div>
                {/* <div><Logout></Logout></div> */}
            </div>
            <br />
            <table className="table">
                <thead className="tablecolor">
                    <tr >
                        <th className="text-center">Employee id</th>
                        <th className="text-center">Requestee</th>
                        <th className="text-center">Request Date</th>
                        <th className="text-center">WFM Manager</th>
                        <th className="text-center"> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        wfmData.map((x: any) => {
                            return (
                                <tr key={x.EmployeeId}>
                                    <td className="text-center">{x.EmployeeId}</td>
                                    <td className="text-center">{x.Manager}</td>
                                    <td className="text-center">{x.reqDate}</td>
                                    <td className="text-center">{x.wfm_manager}</td>
                                    <td className="text-center"><button className="btn btn-primary" onClick={() => approvesoftlock({ x })} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                                    </svg>
                                        View Details</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                {enableRequest ?
                    //  <RequestManager
                    //     employeeList = {employeeList}
                    //  /> 
                    <Modal show={show} onHide={handleClose}>

                        <Modal.Header closeButton>
                            <Modal.Title className="modalcolor">Soft lock Request Confirmation</Modal.Title>                            
                        </Modal.Header>

                        <Modal.Body>
                        <label className="headerlbl">Status Update for Request lock</label>
                        <div className="form-group">
                            <label className="textcolor">Emp ID:</label> <span>{employeeList.x.EmployeeId}</span>
                        </div>
                        <div className="form-group">
                            <label className="textcolor">Requestee: </label> <span>{employeeList.x.Manager}</span>
                        </div>
                        <div className="form-group">
                            <label className="textcolor">Employee Manager: </label> <span>{employeeList.x.wfm_manager}</span>
                        </div>
                        <div className="form-group">
                            <label className="textcolor">Request Description: </label><span>{employeeList.x.Description}</span>
                        </div>
                        <div className="form-group">
                            <label className="textcolor">Status:</label>
                            <select onChange={ddvalue.bind(this)} className="statusDD">
                                {/* <option>--Select--</option> */}
                                <option>Approve</option>
                                <option>Reject</option>
                            </select>
                        </div>
                            {/* <div className="form-outline">
                                <textarea className="form-control" ></textarea>

                            </div> */}


                        </Modal.Body>

                        <Modal.Footer>

                            <Button variant="secondary" className="cancelbtn" onClick={handleClose}>Cancel</Button>
                            <Button variant="primary" className="submitbtn" onClick={submit}>Submit</Button>

                        </Modal.Footer>

                    </Modal>


                    : null
                }
            </div>
        </div>

    )
}


export default WFMHome