import React from "react";

const Products = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>

        <button className="btn btn-primary btn-sm">+ Add Product</button>
      </div>

      {/* Product List Placeholder */}
      <div className="p-6 bg-white rounded-xl shadow text-gray-600">
        <p>No products to display yet.</p>
        <p className="text-sm mt-1">Add products to see them here.</p>
      </div>
    </div>
  );
};

export default Products;
