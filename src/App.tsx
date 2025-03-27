import React from "react";
import "./App.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AddProductValidation = Yup.object().shape({
  title: Yup.string()
    .min(1, "عنوان محصول حداقل باید 2 کاراکتر داشته باشد")
    .required("وارد کردن نام محصول الزامی است"),
  description: Yup.string()
    .min(2, "عنوان محصول حداقل باید 2 کاراکتر داشته باشد")
    .required("وارد کردن نام محصول الزامی است"),
});

const App = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  console.log("data", data ?? "داده ای دریافت نشده است");

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }).then((item) => item.json()),
  });

  return (
    <div>
      {data ? (
        data.map((item: any) => (
          <div className="mainDiv" key={item.id}>
            <p className="">category:{item.category}</p>
            <p>{item.description}</p>
          </div>
        ))
      ) : (
        <div>
          <p>درحال بارگذاری...</p>
        </div>
      )}

      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={AddProductValidation}
      >
        {() => (
          <Form>
            <div className="text-blue-300 border-red-300">
              <label htmlFor="title">Name</label>
              <Field
                id="title"
                name="title"
                placeholder="Enter your Title of product"
                type="text"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="error text-red-500"
              />
            </div>
            <div>
              <label htmlFor="description">description</label>
              <Field
                id="description"
                name="description"
                placeholder="توضیحات محصول را وارد کنید"
                type="text"
              />
              <ErrorMessage
                name="description"
                className="error text-red-500"
                component="div"
              />
            </div>
            <div>
              <button type="submit">submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
