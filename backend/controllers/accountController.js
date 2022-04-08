import Account from '../model/accountModel.js';

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

  const employee = await Account.create({
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
  const deletedID = await Account.destroy({
    where: {
      id: id,
    },
  });

  response.status(200)
  .send('success');
}

export async function getAccountByID(request, response) {
  const { id } = request.params;

  const account = await Account.findOne({
    where: {
      id: id,
    },
  });

  response.status(200)
  .send({ account: account });
}

export async function listAccount(request, response) {
  const accounts = await Account.findAll();

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

  await Account.update({
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

  const updateAccount = await Account.findOne({
    where: {
      id: id,
    },
  });

  response.status(200)
  .send({ account: updateAccount });
}





