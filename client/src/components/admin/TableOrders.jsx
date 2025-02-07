import React, { useEffect, useState } from "react";
import { getOrderAdmin } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlGetOrder(token);
  }, []);

  const hdlGetOrder = (token) => {
    getOrderAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white p-4 container mx-auto shadow-md">
      {/* Header */}
      <div>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr className="border">
              <th>No.</th>
              <th>User</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item, index) => {
              console.log(item);
              return (
                <tr key={index} className="border">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <p>{item.orderBy.email}</p>
                    <p>{item.orderBy.address}</p>
                  </td>

                  <td className="px-2 py-4">
                    {item.products?.map((product, index) => (
                      <li key={index}>
                        {product.product.title} {"  "}
                        <span className="text-sm text-gray-500">
                          {product.count} x {product.product.price}
                        </span>
                      </li>
                    ))}
                  </td>

                  <td>{item.cartTotal}</td>
                  <td>{item.orderStatus}</td>
                  <td>Action</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
