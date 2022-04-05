import Joi from 'joi';
import Product from '../model/productModel.js';

export async function readAllProduct(request, response) {
  const products = await Product.findAll();

  response.status(200)
  .json(products);
}

export async function readOneProduct(request, response) {
  const { id } = request.params;

  const product = await Product.findAll({
    where: {
      id: id,
    },
  });

  response.status(200)
  .json(product);
}

export async function createOneProduct(request, response) {
  const {
    name,
    price,
  } = request.body;
  const product = await Product.create({
    name,
    price,
  });

  response.send(product);
}

export async function deleteOneProduct(request, response) {
  const { id } = request.params;
  const deletedID = await Product.destroy({
    where: {
      id: id,
    },
  });
  response.status(200)
  .send({ id });
}

export async function updateOneProduct(request, response) {
  const { id } = request.params;
  const updatedProduct = await Product.update({
    name: 'name',
    price: 13,
  }, {
    where: {
      id: id,
    },
    returning: true,
  });

  response.status(200)
  .send(updatedProduct);

}

export async function createUser(request, response) {
  const seed = 'seed';
  response.status(200)
  .send();

  // await UserModel.create({
  //   name: "testName",
  //   email: "testEmail",
  //   avatar: `https://avatars.dicebear.com/api/bottts/${seed}.svg`,
  //   products: [],
  // })
}
