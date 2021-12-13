var express=require("express")
var route = express.Router();
var model = require('../orm/model')
const jwt=require("jsonwebtoken");
const sequelize = require('sequelize');
const { softlock } = require("../orm/model");

route.post("/signin",async function(request,response){
    const {username,password}=request.body 
try{
   console.log(request.body);   
   const user = await model.user.findOne({where:{username:username}})
   console.log(user.dataValues);
   let result = user.dataValues
   
   if(result.password===password) 
      {
         console.log('static 2 password  matched');
         response.json(
            {
               username: username,
               usertype: result.role,
               token: jwt.sign({username:username,password:password},"node-app-22")               
            }
         )
      }
      else
           response.status(401).send("Username or Password incorrect")
         //   console.log(response);
}
catch(e)
{
   console.log(e,'user')
        response.status(500)
}

})

route.post("/manager",async function(request,response){
   const man=request.body.manager 
try{
   console.log(request.body.manager);
   console.log('--------');
   const employees = await model.skillmap.findAll({
      group: ['employee_id'],
      // attributes: ['employee_id'],
      include: [{
         model: model.employee,
         attributes: ['name', 'experience', 'manager'],
         required: true,
         where: { manager: man, lockstatus: 'not_requested' }
      }
         , {
         model: model.skill,
         attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.col('skill.name')), 'skills']],
         require: true
      }
      ]
   })

      console.log('employees:',employees);
   let managers = [];
   employees.map(employee => {
      let manager = {
         EmployeeId: employee.dataValues.employee_id,
         Name: employee.dataValues.employee.name,
         Skills: employee.dataValues.skill.dataValues.skills,
         Experience: employee.dataValues.employee.experience,
         Manager: employee.dataValues.employee.manager         
      }
      managers.push(manager)
   });
   if (managers.length > 0) {
      response.json(managers)
   }
   else
      response.status(401).send("Failed")
   }
   catch (e) {
      console.log(e)
      response.status(500)
   }

})


route.post("/updateEmployeeStatus", async function (request, response) {
   let employee_id = request.body.employee_id
   let manager = request.body.manager
   let requestmessage = request.body.requestmessage;
   console.log(request.body)
   try {
      let employee = await model.employee.findOne({ where: { employee_id: employee_id } })
      console.log(employee.name);
      employee.lockstatus = 'request_waiting';
      await employee.save();
      await model.softlock.create({ employee_id: employee_id, manager: manager, requestmessage: requestmessage })
      await employee.reload();
      response.status(200)
      console.log(response);
   } catch (e) {
      console.log(e)
      response.status(500)
   }
 })
 

 route.post("/updatewfmApprovalStatus", async function (request, response) {
   let employee_id = request.body.employee_id
   let manager = request.body.manager
   let managerstatus = request.body.managerstatus;
   console.log(request.body)
   try {    
      let employee = await model.employee.findOne({ where: { employee_id: employee_id }})
      
      console.log('printing employee----------------------------------',employee.dataValues)
      if(managerstatus==="Approve"){
         console.log('inside if approve');
         employee.lockstatus = 'locked';
         managerstatus = "Approved";
      }      
      else{
         employee.lockstatus = 'Rejected';
         managerstatus = "Rejected";
      }
      await employee.save();
      // let employeedetails ={
      //    employee_id:employee_id,
      //    lockstatus:employee.lockstatus
      // }
      // console.log('pls come--------------------',employeedetails);
   
      // employee.update(employeedetails, {
      //    where: { employee_id: employee_id }})

      //employeeupdate(employeedetails);

      softlock.update(request.body, {
         where: { employee_id: employee_id }})

      // let softlock = await model.softlock.findOne({where: { employee_id: employee_id }})
      // console.log(employee.name);
      // softlock.managerstatus = requestmessage;
      // await softlock.save();

      // await employee.reload();
      // await softlock.reload();
      response.status(200)
      console.log(response);
      response.status(201).send(request.body);
   } catch (e) {
      console.log(e)
      response.status(500)
   }
 })

//   async function employeeupdate(request){
//      console.log('inside employeeupdate function');
//      employee.update(request, {
//         where: {employee_id: request.employee_id }})
//    }

 route.post("/getwfmManager", async function (request, response) {
    try {
       let wfm_man = request.body.wfm_manager;
       //wfm_man = 'lokesh'
       console.log('wfm:', wfm_man);

       const manager_requests = await model.softlock.findAll({
         group: ['employee_id'],
          attributes: ['employee_id','reqdate','requestmessage','managerstatus'],
          required: true,
         
          include: [{
            model: model.employee,
            attributes: [ 'manager', 'wfm_manager'],
            required: true,
            where: { wfm_manager: wfm_man, lockstatus: 'request_waiting' }
         }]
   
       })
      console.log(manager_requests);
      console.log('Static console');
       let wfm_managers = [];
       manager_requests.map(employee => {
          let wfm_manager = {
             EmployeeId: employee.dataValues.employee_id,
             Manager: employee.dataValues.employee.manager,
             reqDate: employee.dataValues.reqdate,
             wfm_manager: employee.dataValues.employee.wfm_manager,
             Description: employee.dataValues.requestmessage,
             Status: employee.dataValues.managerstatus
          }
          wfm_managers.push(wfm_manager)
       });
       console.log('wfm-managers:', wfm_managers);

       if (wfm_managers.length > 0) {
          response.json(wfm_managers)
       }
       else
          response.status(401).send("Failed")
    }

    catch (e) {
       console.log(e)
       response.status(500)
    }

})

module.exports=  route