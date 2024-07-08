import { useState } from "react";
import { useDeleteProductMutation, useGetProductsQuery } from "../api/ProductApi"
import { useRefetch } from "../customhook/useRefetch";
import { product } from "../type/product";
import EditProducts from "./EditProducts";

const ManageProduct = () => {
  const { data } = useGetProductsQuery();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<product>();
  const [deleteProduct] = useDeleteProductMutation();
  useRefetch()

  const handleEdit = (item: product) => {
    setEditItem(item);
    setIsEdit(true)
  }
  return (
    <>
      <section>
        <h1 className="PageHeader">Manage Products</h1>
        {isEdit ?
          <div>
            <EditProducts
              setIsEdit={setIsEdit}
              editItem={editItem}
            />
          </div>
          :
          <div>
            <div className="FlexBetween items-center h-10 px-2 font-semibold bg-cyan-700 text-white">
              <p className="ProductHeading">Product</p>
              <p className="ProductHeading">Name</p>
              <p className="ProductHeading">Category</p>
              <p className="ProductHeading">Price</p>
              <p className="ProductHeading">Date</p>
              <p className="ProductHeading">Action</p>
            </div>
            <div className="flex flex-col gap-2 Scrollbar h-[370px] border-b-2 border-cyan-500 py-5 px-1">
              {
                data?.map((item: product) => {
                  const { id, title, image, price, category, date } = item;
                  return (
                    <div key={id} className="FlexBetween items-center h-20">
                      <img src={image} className=" ProductDetail h-full" />
                      <p className="ProductDetail">{title}</p>
                      <p className="ProductDetail">{category}</p>
                      <p className="ProductDetail">{price}</p>
                      <p className="ProductDetail">{date}</p>
                      <div>
                        <button className="CustomButton"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button className="CustomButton bg-red-700 hover:bg-red-800"
                          onClick={() => deleteProduct(id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
      </section>
    </>
  )
}

export default ManageProduct