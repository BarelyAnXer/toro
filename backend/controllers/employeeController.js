import Employee from '../model/employeeModel.js';

// change all employee to account

export async function createAccount(request, response) {
  const {
    firstName,
    lastName,
    email,
    password,
    clearanceLevel,
  } = request.body;
  console.log(request.body, 'Request Body');

  const employee = await Employee.create({
    firstName,
    lastName,
    email,
    password,
    clearanceLevel,
  });

  response.status(200)
  .json(employee);
}

export async function deleteAccountByID(request, response) {
  const { id } = request.params;
  const deletedID = await Employee.destroy({
    where: {
      id: id,
    },
  });

  response.status(200)
  .send('success');
}

export async function getAccountByID(request, response) {
  const { id } = request.params;

  const account = await Employee.findOne({
    where: {
      id: id,
    },
  });

  response.status(200)
  .send({ account: account });
}

export async function listAccount(request, response) {
  const accounts = await Employee.findAll();

  response.status(200)
  .send({ account: accounts });
}

export async function updateAccountByID(request, response) {
  const {
    firstName,
    lastName,
    email,
    password,
    clearanceLevel,
  } = request.body;

  const { id } = request.params;

  await Employee.update({
    firstName,
    lastName,
    email,
    password,
    clearanceLevel,
  }, {
    where: {
      id: id,
    },
  });

  const updateAccount = await Employee.findOne({
    where: {
      id: id,
    },
  });

  response.status(200)
  .send({ account: updateAccount });
}





