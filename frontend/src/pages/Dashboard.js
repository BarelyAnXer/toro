import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createProduct, getProducts, reset } from '../redux/productSlice';

function Dashboard() {

  const dispatch = useDispatch();

  // const { user } = useSelector((state) => state.auth);
  const {
    products,
    isLoading,
    hasError,
    isSuccess,
    message,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());

    console.log({
      products,
      isLoading,
      hasError,
      message,
    });

    return () => {
      dispatch(reset());
    };

  }, [dispatch]);

  return (
    <>
      <button onClick={() => {
        console.log(products);
      }}>asd
      </button>

      <button onClick={() => {
        dispatch(createProduct({
          name: 'fromAppJs',
          price: 69,
        }));
      }}>create
      </button>


      <section className="heading">
        {/* <h1>Welcome {user && user.name}</h1> */}
        <p>Products Dashboard</p>

        <table>
          <thead>
          <tr>
            <th>name</th>
            <th>price</th>
          </tr>
          </thead>
          <tbody>
          {products.map(product => {
            return (
              <tr key={product.id}>
                <th>{product.name}</th>
                <th>{product.price}</th>
              </tr>
            );
          })}
          </tbody>
        </table>

      </section>
    </>
  );
}

export default Dashboard;
