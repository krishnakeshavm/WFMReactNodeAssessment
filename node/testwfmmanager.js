var model = require('./orm/model')

var sequelize = require('./orm/connection');

const { employee } = require('./orm/model');

async function getemployee() {



  try {

    // let employees=await model.softlock.create({ employee_id:1022, manager: "rohit",requestmessage:'I need this employee' })

    let employee = await model.employee.findOne({ where: { employee_id: 1001 } })

    employee.lockstatus = 'locked'

    await employee.save();

    console.log('employees:', employee);

  } catch (e) {

    console.log(e)



  }

}

getemployee()