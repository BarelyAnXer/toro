import Employee from '../model/employeeModel.js';
import PayRoll from '../model/payrollModel.js';

export async function saveEmployee(request, response) {
  const {
    firstName,
    lastName,
    position,
    sickLeaveCredits,
    vacationLeaveCredits,
    hourlyRate,
  } = request.body;

  const employee = await Employee.create({
    firstName,
    lastName,
    position,
    sickLeaveCredits,
    vacationLeaveCredits,
    hourlyRate,
  });

  response.status(200)
  .json(employee);
}

export async function getEmployeeByID(request, response) {
  const { id } = request.params;

  const employee = await Employee.findOne({
    where: {
      id: id,
    },
  });

  response.status(200)
  .send({ employee: employee });
}

export async function listEmployees(request, response) {
  const employees = await Employee.findAll();

  response.status(200)
  .send({ account: employees });
}

export async function deleteEmployeeByID(request, response) {
  const { id } = request.params;
  const deletedID = await Employee.destroy({
    where: {
      id: id,
    },
  });

  response.sendStatus(200);
}

export async function updateEmployeeByID(request, response) {
  const {
    firstName,
    lastName,
    position,
    sickLeaveCredits,
    vacationLeaveCredits,
    hourlyRate,
  } = request.body;

  const { id } = request.params;

  await Employee.update({
    firstName,
    lastName,
    position,
    sickLeaveCredits,
    vacationLeaveCredits,
    hourlyRate,
  }, {
    where: {
      id: id,
    },
  });

  const updatedEmployee = await Employee.findOne({
    where: {
      id: id,
    },
  });

  response.status(200)
  .send({ employee: updatedEmployee });
}

export async function calculatePayrollByStartAndEndDate(request, response) {

  const { id } = request.params;

  const {
    startDate,
    endDate,
  } = request.body;

  const start = new Date(startDate);
  const end = new Date(endDate);

  let daysWorked = 0;
  for (let startDate = start; startDate <= end; startDate.setDate(startDate.getDate() + 1)) {
    if ((startDate.getDay() === 6) || (startDate.getDay() === 0)) {
      continue;
    } else {
      daysWorked = daysWorked + 1;
    }
  }

  const employee = await Employee.findOne({
    where: {
      id: id,
    },
  });

  const payrolls = await PayRoll.findAll({
    where: {
      employeeId: id,
    },
  });

  for (let i = 0; i < payrolls.length; i++) {
    console.log(payrolls[i].timeInDate, payrolls[i].timeOutDate);
  }

  const hourlyRate = employee.hourlyRate;
  const normalHours = 0;
  const leaveHours = 0;
  const overtimeAndHolidayHours = 0;
  const holidayHoursAndOvertimeHours = 0;

  const salary = daysWorked * hourlyRate;

  response.status(200)
  .send({ salary: payrolls });
}

export async function userTimeInWithDateAndTime(request, response) {
  const { id } = request.params;
  const {
    timeInDate,
  } = request.body;

  // get timeInDate date formatted in MM/dd/yyyy
  let timeInDateFormatted = new Date(timeInDate);
  let currentDate = ((timeInDateFormatted.getMonth() > 8)
      ? (timeInDateFormatted.getMonth() + 1)
      : ('0' +
        (timeInDateFormatted.getMonth() + 1))) + '/' +
    ((timeInDateFormatted.getDate() > 9) ? timeInDateFormatted.getDate() : ('0' +
      timeInDateFormatted.getDate())) + '/' + timeInDateFormatted.getFullYear();

  const temp = await PayRoll.findOne({
    where: {
      employeeId: id,
      currentDate: currentDate,
    },
  });

  // check if the day for user already exist and has time in data
  if (temp !== null) {
    console.log('hindi null');
    await PayRoll.update({
      timeInDate: timeInDate,
    }, {
      where: {
        employeeId: id,
        currentDate: currentDate,
      },
    });
    return response.status(200)
    .send('updated');
  }

  const payroll = await PayRoll.create({
    employeeId: id,
    currentDate: currentDate,
    timeInDate,
  });

  response.status(200)
  .send('timein');
}

export async function userTimeOutWithDateAndTime(request, response) {
  const { id } = request.params;
  const {
    timeOutDate,
  } = request.body;

  // get timeInDate date formatted in MM/dd/yyyy
  let timeOutDateFormatted = new Date(timeOutDate);
  let currentDate = ((timeOutDateFormatted.getMonth() > 8)
      ? (timeOutDateFormatted.getMonth() + 1)
      : ('0' +
        (timeOutDateFormatted.getMonth() + 1))) + '/' +
    ((timeOutDateFormatted.getDate() > 9) ? timeOutDateFormatted.getDate() : ('0' +
      timeOutDateFormatted.getDate())) + '/' + timeOutDateFormatted.getFullYear();

  const temp = await PayRoll.findOne({
    where: {
      employeeId: id,
      currentDate: currentDate,
    },
  });

  // check if the day for user already exist and has time in data
  if (temp !== null) {
    await PayRoll.update({
      timeOutDate: currentDate,
    }, {
      where: {
        employeeId: id,
        currentDate: currentDate,
      },
    });
    return response.status(200)
    .send('updated2');
  }

  const payroll = await PayRoll.create({
    employeeId: id,
    timeOutDate,
  });

  response.status(200)
  .send('timeout');
}

export async function markEmployeeLeave(request, response) {
  const {
    markDate,
    type,
  } = request.body;

  response.status(200)
  .send('leave');
}

const Holidays = [
  '01/01/22',
  '23/01/22',
  '01/02/22',
  '02/02/22',
  '15/02/22',
  '25/02/22',
  '09/04/22',
  '14/04/22',
  '15/04/22',
  '16/04/22',
  '17/04/22',
  '27/04/22',
  '01/05/22',
  '02/05/22',
  '12/06/22',
  '19/06/22',
  '09/07/22',
  '27/07/22',
  '30/07/22',
  '21/08/22',
  '29/08/22',
  '10/09/22',
  '08/10/22',
  '01/11/22',
  '02/11/22',
  '30/11/22',
  '08/12/22',
  '24/12/22',
  '25/12/22',
  '30/12/22',
  '31/12/22',
];


