import React, { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosInstance
      .get(`/manager/products/${user?.email}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [axiosInstance, user?.email]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="text-left py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Payment Option</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-blue-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={product?.image} alt={product?.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">
                        {product?.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">${product?.price}</td>
                <td className="py-3 px-4 capitalize text-gray-700">
                  {product?.paymentOption}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button className="btn btn-xs bg-red-500 hover:bg-red-600 text-white border-none">
                    Delete
                  </button>
                  <button className="btn btn-xs bg-green-500 hover:bg-green-600 text-white border-none">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
