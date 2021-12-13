import axios from "axios";

export const loginReducer=(state={username:"NA",token:"NA",usertype:"NA",message:""},action)=>{
    switch(action.type){
        case "LOGIN_SUCCESS":
            console.log(action.data)
            return {...action.data,message:""};
        case "LOGIN_FAILURE":
            console.log(action)
            return {...state,message:"Login Credentials incorrect"}
        default:
            return state
    }
}


export const managerReducer = (state = { employeeData: [] }, action) => {
    switch (action.type) {
        case "LOAD_EMPLOYEE":
            console.log('load-emp:', action.data);
            return { employeeData: action.data };
        default:
            return state;
    }
}

export const wfmReducer = (state = { wfmData: [] }, action) => {
    switch (action.type) {
        case "LOAD_WFM_MANAGER":
            return { wfmData: action.data };
        default:
            return state;
    }
}