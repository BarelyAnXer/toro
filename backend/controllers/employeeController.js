import Employee from '../model/employeeModel.js';
import PayRoll from '../model/payrollModel.js';
import moment from 'moment';

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
  .json({ employee: employee });
}

export async function getEmployeeByID(request, response) {
  const { id } = request.params;

  const employee = await Employee.findOne({
    where: {
      id: id,
    },
  });

  if (employee === null) {
    return response.sendStatus(404);
  }

  response.status(200)
  .send({ employee: employee });
}

export async function listEmployees(request, response) {
  const employees = await Employee.findAll();

  response.status(200)
  .send({ employee: employees });
}

export async function deleteEmployeeByID(request, response) {
  const { id } = request.params;

  const employee = await Employee.findOne({
    where: {
      id: id,
    },
  });

  if (employee === null) {
    return response.sendStatus(404);
  }

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

  const employee = await Employee.findOne({
    where: {
      id: id,
    },
  });

  if (employee === null) {
    return response.sendStatus(404);
  }

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

  let hoursWorked = 0;
  let minWorked = 0;
  let overtime = 0;
  for (let i = 0; i < payrolls.length; i++) {
    console.log(payrolls[i].timeInDate, payrolls[i].timeOutDate);

    let timeStart = new Date(payrolls[i].timeInDate).getTime();
    let timeEnd = new Date(payrolls[i].timeOutDate).getTime();
    let hourDiff = timeEnd - timeStart; //in ms
    let secDiff = hourDiff / 1000; //in s
    let minDiff = hourDiff / 60 / 1000; //in minutes
    let hDiff = hourDiff / 3600 / 1000; //in hours
    let humanReadable = {};
    humanReadable.hours = Math.floor(hDiff);
    humanReadable.minutes = minDiff - 60 * humanReadable.hours;

    console.log(humanReadable.hours, humanReadable.minutes);
    if (humanReadable.hours > 8) {
      overtime = overtime + ((humanReadable.hours - 8) + humanReadable.minutes / 60);
    }

    hoursWorked = hoursWorked + humanReadable.hours;
    minWorked = minWorked + humanReadable.minutes;

  }

  console.log(hoursWorked, minWorked, overtime);

  const minWorkedToDecimal = minWorked / 60;
  const hoursWorkedFinal = minWorkedToDecimal + hoursWorked;

  const hourlyRate = employee.hourlyRate;
  const overtimeHours = overtime * 1.5;
  // const leaveHours = 0;
  // const overtimeAndHolidayHours = 0;
  // const holidayHoursAndOvertimeHours = 0;

  const salary = (hoursWorkedFinal) * overtimeHours * hourlyRate;

  response.status(200)
  .send({
    payroll: {
      salary: salary,
    },
  });
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
  const { id } = request.params;
  const {
    markDate,
    type,
  } = request.body;

  const employee = await Employee.findOne({
    where: {
      id: id,
    },
  });

  if (employee === null) {
    return response.sendStatus(404);
  }

  if (moment(markDate, 'MM/dd/yyyy')
  .isValid()) {
    if (type === 'sick') {
      await Employee.decrement('sickLeaveCredits', {
        by: 1,
        where: { id: id },
      });
    } else {
      await Employee.decrement('vacationLeaveCredits', {
        by: 1,
        where: { id: id },
      });
    }

    const updatedEmployee = await Employee.findOne({
      where: { id: id },
    });

    return response.status(200)
    .send({ employee: updatedEmployee });
  } else {
    console.log('here');
    return response.sendStatus(400);
  }
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


