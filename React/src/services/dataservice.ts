import http from "../http-common";
import IUsersData from "../types/users";

const getAllUsers = () => {
    return http.get<Array<IUsersData>>("/manager");
  };

  const UserDataService = {
    getAllUsers
  };
  
  export default UserDataService;