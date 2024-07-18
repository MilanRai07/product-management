import { useState } from "react";
import { useUpdateProductMutation } from "../api/ProductApi";
import { FormikErrors, useFormik } from "formik";
import { product } from "../type/product"

const EditProducts = (props: any) => {
  const { setIsEdit, editItem } = props;
  const { id, title, price, description, image, category, date } = editItem;
  const [updateProduct] = useUpdateProductMutation();
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const categories: string[] = ['mobile', 'laptops', 'others']

  const initialValues: product = {
    id: id,
    title: title,
    price: price,
    description: description,
    image: image,
    category: category,
    date: date
  }
  const validate = (values: product): FormikErrors<product> => {
    let error: FormikErrors<product> = {};
    if (!values.title) {
      error.title = 'at least a title is needed'
    }
    return error;
  }
  const onSubmit = async (values: product, onSubmitProps: any) => {
    const productData = new FormData();
    if (values.id !== null) {
      productData.append('id', values.id.toString())
    }
    productData.append('title', values.title);
    productData.append('price', values.price?.toString() || '');
    productData.append('description', values.description);
    productData.append('category', values.category);
    productData.append('date', values.date);

    if (values.image instanceof File) {
      productData.append('image', values.image);
    } else {
      productData.append('image', values.image);
    }

    console.log(productData);

    setIsEditing(true);
    try {
      await updateProduct({ id: values.id, formData: productData }).unwrap();
      setImagePreview(null);
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
      setIsEdit(false);
    } catch (error) {
      console.error('Failed to update the product:', error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      formik.setFieldValue('image', file);
      console.log(file)
    }
  }
  const formik = useFormik<product>({
    initialValues,
    onSubmit,
    validate
  });

  return (
    <>
      <form className='Form' onSubmit={formik.handleSubmit}>
        <div className="flex gap-36">
          <div className="FlexBetween flex-col items-center">
            <div className="ImageContainer">
              <img src={imagePreview ?? image} className="h-full w-full object-fill"></img>
            </div>
            <label htmlFor="image" className="ImageLabel">Upload Image</label>
            <input type="file"
              id="image"
              className="hidden"
              accept="image/jpeg, image/png, image/jpg, image/webp"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <input type="text"
              placeholder='Product name'
              className="mb-1"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}>
            </input>
            <div className="Error">{formik.errors.title ? formik.errors.title : ''}</div><br></br>
            <input type='number'
              placeholder='Price'
              name='price'
              onChange={formik.handleChange}
              value={formik.values.price ?? ''}>
            </input><br></br>
            <div className="text-center mt-3">
              {
                categories.map((item: string) => {
                  return (
                    <label key={item} className="mr-4 text-sm font-semibold">
                      <input
                        type="radio"
                        className="radio"
                        name="category"
                        value={item}
                        onChange={formik.handleChange}
                        checked={formik.values.category === item}
                      />
                      {item}
                    </label>
                  )
                })
              }
            </div>
          </div>
        </div>
        <textarea
          placeholder='Description'
          name='description'
          onChange={formik.handleChange}
          value={formik.values.description}>
        </textarea>
        <button type='submit' className="Button" disabled={!formik.isValid || formik.isSubmitting}>
          {
            isEditing ? 'Editing...' : 'Edit'
          }
        </button>
      </form>
    </>
  )
}

export default EditProducts