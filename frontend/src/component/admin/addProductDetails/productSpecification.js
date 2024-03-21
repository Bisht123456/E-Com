import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Field, Form as FinalForm } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { spacificAction } from "../../../Redux/action/productAction";
import { useParams } from "react-router-dom";

const ProductSpecification = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const data1 = useSelector((state) => state?.spacificationdata?.listdata);
  console.log(data1, "datacheck");

  const data = useSelector((state) => state?.spacificationdata?.listdata);
  console.log(data, "spacificationdata");

  const handleSubmit = (values) => {
    values.ProductID = params.id;
    dispatch(spacificAction(values));
  };

  const validate = (values) => {};


  return (
    <>
      <FinalForm
        onSubmit={handleSubmit}
        validate={validate}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <Row>
              <Col className="Admin_dashboard margin_bottom" lg={12}>
                <h3> Product Specification</h3>
              </Col>
            </Row>
            <Row>
              <Col lg={8}>
                <div className=" Addnewpeoduct margin_bottom">
                  <h3 className="margin_bottom"> </h3>
                  <div className="margin_bottom">
                    <h5 className="margin_bottom">Specification</h5>
                    <div className="d-flex newpeo_div">
                    </div>
                    <div className="d-flex newpeo_div">
                      <Field name="color">
                        {({ input, meta }) => (
                          <select
                            className="addnewproduct_changes right_Addnew"
                            component="select"
                            onChange={(e) => {}}
                          >
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                          </select>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex newpeo_div">
                      <Field name="size">
                        {({ input, meta }) => (
                          <select
                            className="addnewproduct_changes right_Addnew"
                            component="select"
                            onChange={(e) => {}}
                          >
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                          </select>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex newpeo_div">
                      <Field name="Material">
                        {({ input, meta }) => (
                          <select
                            className="addnewproduct_changes right_Addnew"
                            component="select"
                            onChange={(e) => {}}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex newpeo_div">
                      <Field name="SizeChart">
                        {({ input, meta }) => (
                          <select
                            className="addnewproduct_changes right_Addnew"
                            component="select"
                            onChange={(e) => {}}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex newpeo_div">
                      <Field name="DesignStyle">
                        {({ input, meta }) => (
                          <select
                            className="addnewproduct_changes right_Addnew"
                            component="select"
                            onChange={(e) => {}}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex newpeo_div">
                      <Field name="category">
                        {({ input, meta }) => (
                          <select
                            className="addnewproduct_changes right_Addnew"
                            component="select"
                            onChange={(e) => {}}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex newpeo_div">
                      <Field name="category">
                        {({ input, meta }) => (
                          <select
                            className="addnewproduct_changes right_Addnew"
                            component="select"
                            onChange={(e) => {}}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex newpeo_div">
                      <Field name="category">
                        {({ input, meta }) => (
                          <select
                            className="addnewproduct_changes right_Addnew"
                            component="select"
                            onChange={(e) => {}}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        )}
                      </Field>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Button className="addproduct_button margin_bottom" type="submit">
              Add product
            </Button>
          </form>
        )}
      />
    </>
  );
};

export default ProductSpecification;
