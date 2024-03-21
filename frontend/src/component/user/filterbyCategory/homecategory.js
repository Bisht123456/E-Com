import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homecategory } from "../../../Redux/action/categoryWiseAction";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import Subcaregoryfilter from "./SubcaregoryMobilefilter";
import { BiChevronRight } from "react-icons/bi";
import SubCategoryfilter from "./subCategoryfilter";
import { AllFilterationData } from "../../../Redux/action/allFilterationAction";
import Spinner from "../loader/spinner";
import { uploadBasePath } from "../../../Redux/config/Config";

const Homecategory = () => {

  const dispatch = useDispatch();

  const { categoryName, subcategoryName } = useParams();
  console.log(categoryName,subcategoryName, "fasfadsfdas")


  const loading = useSelector((state) => state?.homecategory?.isLoading);

  const filterbyPrice = useSelector(
    (state) => state?.filterationalltype?.listdata?.data
  );

  const data = useSelector((state) => state?.homecategory?.listdata);

  useEffect(() => {
    dispatch(homecategory(categoryName));
    dispatch(
      AllFilterationData({
        subcategoryId: subcategoryName,
      })
    );
  }, [categoryName, subcategoryName]);


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Container fluid>
            <div className="pt-5 container-fluid">
              <Row>
                <Col lg={2} md={4} sm={4}>
                  {" "}
                  <Subcaregoryfilter />
                  <SubCategoryfilter />
                </Col>
                <Col lg={10} md={8} sm={8}>
                  <div className="subcarhide">
                    <div className="subcategory_topcontent">
                      <div>
                        <Link className="home_link" to="/">
                          Home{" "}
                        </Link>
                        <BiChevronRight />
                      </div>
                    </div>
                    <div className="margin_bottom">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    </div>
                    <div></div>
                    <div className="righthome_filter">
                      <h4>Sort By</h4>
                      <h4>Popularity</h4>
                      <h4>Price--Low to High</h4>
                      <h4>Price--High to Low </h4>
                      <h4>Newest First </h4>
                    </div>
                  </div>
                  <Row>
                    {filterbyPrice &&
                      filterbyPrice?.map((item) => {
                        console.log(item, "Fasfasdfd")
                        return (
                          <>                         
                            <Col lg={3} md={4} className="d-flex">
                              <Card className=" forcatcards_htwd ">
                                <Link
                                  className="carddecorationnone_cat text_edit"
                                  reloadDocumen={true}
                                  to={`/productdetail/${item?._id}`}
                                >
                                  <div className="">
                                    <Card.Img
                                      variant="top"
                                      src={
                                        item?.image
                                          ? item?.image
                                          : item?.thumbnail?.split(":").length >
                                            1
                                          ? item?.thumbnail
                                          : `${uploadBasePath}/${item.thumbnail}`
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <Card.Body>
                                    <div className="item_rating">
                                      <p className="homerating_cat">
                                        {item?.category[0]?.category}
                                      </p>
                                    </div>
                                    <Card.Title className="crad_text">
                                      {item?.title}
                                    </Card.Title>
                                    <div className="d-flex justify-content-between">
                                      <Card.Text className="">
                                        <div className="d-flex align-items-start">
                                          <h5>
                                            ₹
                                            {parseInt(item?.totalprice).toFixed(
                                              0
                                            )}
                                          </h5>
                                          <p className="allpro_ductdis">
                                            {item?.discountpercentage}%off
                                          </p>
                                        </div>
                                      </Card.Text>
                                      <Card.Text className="crad_text">
                                        {item.stock > 0 ? (
                                          <h6> </h6>
                                        ) : (
                                          <p className="text-danger">
                                            Out of stock
                                          </p>
                                        )}
                                      </Card.Text>
                                    </div>
                                  </Card.Body>
                                </Link>
                              </Card>
                            </Col>
                          </>
                        );
                      })}
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default Homecategory;
