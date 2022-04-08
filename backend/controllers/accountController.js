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

  const account = await Account.create({
    firstName,
    lastName,
    email,
    password,
    clearanceLevel,
  });

  response.status(200)
  .json({ account: account });
}

export async function deleteAccountByID(request, response) {
  const { id } = request.params;
  const deletedID = await Account.destroy({
    where: {
      id: id,
    },
  });

  console.log(deletedID);

  if (deletedID === 0) {
    return response.sendStatus(400);
  }

  response.sendStatus(200);
}

export async function getAccountByID(request, response) {
  const { id } = request.params;

  const account = await Account.findOne({
    where: {
      id: id,
    },
  });

  console.log(account);

  if (account === null) {
    return response.sendStatus(400);
  }

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

  const account = await Account.findOne({
    where: {
      id: id,
    },
  });

  if (account === null) {
    return response.sendStatus(400);
  }

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





