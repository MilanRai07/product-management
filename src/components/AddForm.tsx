import { FormikErrors, useFormik } from "formik";
import { product } from "../type/product"
import { useState } from "react";
import { v4 as uuid } from 'uuid';
import { useAddProductMutation } from "../api/ProductApi";

const AddForm = () => {
  const [addProducts] = useAddProductMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories: string[] = ['mobile', 'laptops', 'others']

  const initialValues: product = {
    id: null,
    title: '',
    price: null,
    description: '',
    image: '',
    category: '',
    date:''
  }
  const validate = (values: product): FormikErrors<product> => {
    let error: FormikErrors<product> = {};
    if (!values.title) {
      error.title = 'at least a title is needed'
    }
    return error;
  }
  const onSubmit = async (values: product, onSubmitProps: any) => {
    //for random id
    const randomId: any = uuid();
    const numberId = parseInt(randomId.replace(/[^0-9]/g, ''), 10);

    //for dates
    const today=new Date();
    const date=`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

    const productData = new FormData();
    productData.append('id', numberId.toString());
    productData.append('title', values.title);
    productData.append('price', values.price?.toString() || '');
    productData.append('description', values.description);
    productData.append('category', values.category);
    productData.append('date',date.toString())
    if (values.image) {
      productData.append('image', values.image);
    }

    await addProducts(productData);
    setImagePreview(null);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  }
  const formik = useFormik<product>({
    initialValues,
    onSubmit,
    validate
  });
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      formik.setFieldValue('image', file);
    }
  };
  return (
    <>
      <form className='Form' onSubmit={formik.handleSubmit}>
        <div className="flex gap-36">
          <div className="FlexBetween flex-col items-center">
            <div className="ImageContainer">
              <img src={imagePreview ?? '/images/img.png'} className="h-full w-full object-fill"></img>
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
            formik.isSubmitting ? 'Adding...' : 'Add'
          }
        </button>
      </form>
    </>
  )
}

export default AddForm

