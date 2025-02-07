import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/User";
import useEcomStore from "../../store/ecom-store";

const HistoryCard = () => {
  const [order, setOrder] = useState([]);
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    //code
    hdlgetOrders(token);
  }, []);

  const hdlgetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        //console.log(res)
        setOrder(res.data.orders);
      })
      .catch((err) => console.log(err));
  };

 
  return (
    <div>
      <h1 className="text-2xl font-bold">HistoryBuy</h1>

      {/* All */}
      <div className="space-y-4">
        {/* Card Loop Order */}
        {order?.map((item, index) => {
          //console.log(item)
          return (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-md shadow-md mt-2"
            >
              {/* header */}
              <div className="flex justify-between">
                {/* left */}
                <div>
                  <p className="text-sm">Order Date</p>
                  <p className="font-bold">{item.updatedAt}</p>
                </div>
                {/* right */}
                <div>{item.orderStatus}</div>
              </div>

              {/* table */}
              <div>
                <table className="border w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th>Product</th>
                      <th>Price</th>
                      <th>Count</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {item.products?.map((product, index) => {
                      //console.log(product);
                      return (
                        <tr key={index}>
                          <td>{product.product.title}</td>
                          <td>{product.product.price}</td>
                          <td>{product.count}</td>
                          <td>{product.count * product.product.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div>
                {}
                <div className="text-right">
                  <p>TotalAll</p>
                  <p>{item.cartTotal}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
