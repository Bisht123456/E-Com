// StaticExample.js
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { editProductdetail } from "../../../Redux/action/getAllProductListing";
import { updateProduct } from "../../../Redux/action/updateProductAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import { apiBasePath } from "../../../Redux/config/Config";

function MydModalWithGrid(props) {
  const dispatch = useDispatch();

  const [selectedImagesforpost, setselectedImagesforpost] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const single = useSelector((state) => state?.updateProductData?.listdata);
  console.log(single, "rraa");

  const list = useSelector((state) => {
    if (state?.GetAdminProductAllListData?.singledata?.products?.length > 0) {
      return state?.GetAdminProductAllListData?.singledata?.products[0];
    }
  });
  console.log(list, "listof");

  console.log(list?._id, "vaikskw");

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("userData", JSON.stringify(values));
    dispatch(updateProduct(formData)).then((res) => {
      console.log(res?.meta?.requestStatus);
      if (res?.meta?.requestStatus === "fulfilled") {
        dispatch(editProductdetail());
        toast.success("Update Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        props.onClose(false);
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  const initialValues = {
    brand: list?.brand[0]?.brand,
    description: list?.description,
    discountpercentage: list?.discountpercentage,
    id: list?._id,
    price: list?.price,
    rating: list?.rating,
    stock: list?.stock,
    subcategory: list?.subcategory[0]?.subcategory,
    typesubcategory: list?.typeSubcategory[0]?.typesubcategory,
  };
  console.log(initialValues, "initialValues");
  return (
    <>
      <Modal
        className="modal-size"
        show={props.show}
        onHide={props.handleClose}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Row>
            <Col className="" lg={12}>
              <h3> Update Product</h3>
            </Col>
          </Row>
        </Modal.Header>

        <Form onSubmit={handleSubmit} initialValues={initialValues}>
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <div className="left_update_product">
                    {/* <div className="update_product">
                      <label htmlFor="category">
                        <h5>Category</h5>
                      </label>
                      <Field
                        className="descirption_box"
                        name="category"
                        component="select"
                        required
                      >
                        <option>Electronics</option>
                        <option>Men</option>
                        <option>Home & kitchen</option>
                        <option>Appliances</option>
                        <option>Sports & More</option>
                        <option>Women</option>
                      </Field>
                    </div> */}

                    <div className="update_product">
                      <label htmlFor="subcategory">
                        <h5>subcategory:</h5>
                      </label>
                      <Field
                        className="descirption_box"
                        name="subcategory"
                        component="input"
                        type="text"
                        placeholder="subcategory"
                        required
                        disabled
                      />
                    </div>
                    <div className="update_product">
                      <label htmlFor="brand">
                        <h5>Brand Name:</h5>
                      </label>
                      <Field
                        className="descirption_box"
                        name="brand"
                        component="input"
                        type="text"
                        placeholder="Brand Name"
                        required
                        disabled
                      />
                    </div>
                    <div className="update_product">
                      <label htmlFor="typesubcategory">
                        <h5>Type Subcategory</h5>
                      </label>
                      <Field
                        className="descirption_box"
                        name="typesubcategory"
                        component="input"
                        type="text"
                        placeholder="Typesubcategory Name"
                        required
                        // disabled
                      />
                    </div>
                    <div className="update_product">
                      <label htmlFor="price">
                        <h5>Price</h5>
                      </label>
                      <Field
                        className="descirption_box"
                        name="price"
                        component="input"
                        type="number"
                        step="0.01"
                        placeholder="$"
                        required
                      />
                    </div>
                    <div className="update_product">
                      <label htmlFor="rating">
                        <h5>Rating:</h5>
                      </label>
                      <Field
                        className="descirption_box"
                        name="rating"
                        component="input"
                        type="text"
                        placeholder="Rating:"
                        required
                      />
                    </div>
                    <div className="update_product">
                      <label htmlFor="stock">
                        <h5>Avalaible Stocks:</h5>
                      </label>
                      <Field
                        className="descirption_box"
                        name="stock"
                        component="input"
                        type="text"
                        placeholder="avalaible stocks"
                        required
                      />
                    </div>
                    <div className="update_product">
                      <label htmlFor="discountpercentage">
                        <h5>Discount Percentage:</h5>
                      </label>
                      <Field
                        className="descirption_box"
                        name="discountpercentage"
                        component="input"
                        type="text"
                        placeholder="discount percentage"
                        required
                      />
                    </div>
                    <div className="update_product">
                      <label htmlFor="description">
                        <h5>description</h5>
                      </label>
                      <Field
                        className="descirption_box"
                        name="description"
                        component="input"
                        type="text"
                        placeholder="description"
                        required
                      />
                    </div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <div className="mainupdate_pro">
                    <div className="update_product">
                      <div className="margin_bottom">
                        <h4>Upload image</h4>
                        <div>
                          <input
                            name="images"
                            type="file"
                            className="form-control signup_form_input margin_bottom"
                            // onChange={handleImgeFile}
                          />
                          <div>
                            <h4>Selected Images:</h4>

                            {list?.images?.length > 0 && (
                              <>
                                <div className="position-relative">
                                  <Row>
                                    {list?.images?.map((item, index) => {
                                      return (
                                        <Col lg={6} md={6} sm={12} xs={6}>
                                          <div className="d-flex justify-content-end">
                                            <MdCancel className="editimagedelte" />
                                          </div>
                                          <li
                                            key={index}
                                            className=" productupload_item col-md-3"
                                          >
                                            <img
                                              key={index}
                                              className="edit_product-img mb-2"
                                              src={
                                                item?.split("https").length > 1
                                                  ? item
                                                  : `$/{apiBasePath}/uploads/${item}`
                                              }
                                              alt=""
                                            />
                                          </li>
                                        </Col>
                                      );
                                      // }
                                    })}
                                  </Row>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4>Upload thumbnail</h4>
                      <input
                        name="images"
                        type="file"
                        className="form-control signup_form_input"
                        // onChange={handlethumbnalfile}
                      />
                      <div>
                        <h4>Selected Images:</h4>
                        <ul className="row">
                          <li className=" productupload_item col-md-3">
                            {
                              <img
                                className="edit_product-img"
                                src={`${apiBasePath}/uploads/${list?.thumbnail}`}
                              />
                            }
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="updatebutton_div">
                    <button className="update_product_button" type="submit">
                      Update Product
                    </button>
                  </div>
                </Col>
              </Row>
            </form>
          )}
        </Form>
        <Modal.Body className="grid-example">{props.content}</Modal.Body>
      </Modal>
    </>
  );
}

export default MydModalWithGrid;
