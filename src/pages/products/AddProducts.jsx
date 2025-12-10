import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";

const categories = ["shirt", "pant", "jacket", "accessories"];
const paymentOptions = ["cash on delivery", "payFirst"];
const axiosInstance = useAxios();

const AddProducts = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    minOrder: "",
    image: null,
    paymentOption: "",
    showOnHome: false,
    managerEmail: user?.email,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      toast.error("Please upload a product image.");
      return;
    }

    try {
      // Upload image to ImgBB
      const imageData = new FormData();
      imageData.append("image", form.image);

      const imgbbKey = "19c7a7e2bec3f8ca2d8fd552c47beced";
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        imageData
      );

      const imageUrl = imgbbRes.data.data.url;

      // Prepare product data
      const productData = {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
        minOrder: Number(form.minOrder),
        image: imageUrl,
      };

      // Send product to backend
      await axiosInstance.post("/products", productData);
      toast.success("Product added successfully!");

      // Reset form
      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        minOrder: "",
        image: null,
        paymentOption: "",
        showOnHome: false,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    }
  };

  // Reusable input component
  const Input = ({ label, ...props }) => (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <input className="input input-bordered w-full" {...props} />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg space-y-4">
      <h1 className="text-2xl font-bold text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col gap-1">
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="" disabled hidden>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <Input
            name="quantity"
            type="number"
            placeholder="Available Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
          <Input
            name="minOrder"
            type="number"
            placeholder="Minimum Order"
            value={form.minOrder}
            onChange={handleChange}
            required
          />
          <select
            name="paymentOption"
            value={form.paymentOption}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled hidden>
              Select Payment Option
            </option>
            {paymentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="file-input file-input-bordered w-full"
          accept="image/*"
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="showOnHome"
            checked={form.showOnHome}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          Show on Home Page
        </label>

        <button type="submit" className="btn btn-primary w-full">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
