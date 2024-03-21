import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import { getProductAction } from "../../../../Redux/action/getProductDetailAction";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AiFillRightCircle } from "react-icons/ai";
import { allCategoryList } from "../../../../Redux/action/getCategoryAction";
import { adminGetSlider } from "../../../../Redux/action/getSliderAction";
import Spinner from "../../loader/spinner";
import Scrolltotopbutton from "../../ScoolToTop/scrolltotopbutton";
import { AllFilterationData } from "../../../../Redux/action/allFilterationAction";
import { allSubCategoryList } from "../../../../Redux/action/getSubcategoryAction";
import { typesubcategoryget } from "../../../../Redux/action/typesubcatpost";
import {catBasePath,sliderBasePath,uploadBasePath} from "../../../../Redux/config/Config";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const data = useSelector((state) => state?.getproductdata?.listdata);

  const loading = useSelector((state) => state?.getproductdata?.isLoading);

  const categorydata = useSelector((state) => state?.getproductdata?.listdata);

  const allcatgorydata = useSelector(
    (state) => state?.getcategorylistdata?.listdata?.data
  );

  const dataslider = useSelector(
    (state) => state?.getsliderdata?.listdata?.data
  );

  const subcatalldata = useSelector(
    (state) => state?.getsubsategorylistdata?.listdata?.data
  );

  const typesubcatgory = useSelector(
    (state) => state?.typesubcategory?.typesublist?.data?.data
  );

  useEffect(() => {
    dispatch(getProductAction());
    dispatch(allCategoryList()).then((res, i) => {
      if (res && res?.payload?.data && res?.payload?.data[2]?._id) {
        const id = res?.payload?.data;
        dispatch(allSubCategoryList({ category_id: id })).then((res, i) => {
          if (res && res?.payload?.data && res.payload.data[0]?._id) {
            const subcatid = res.payload.data[i]?._id;
            dispatch(typesubcategoryget({ subcategory_id: subcatid }));
          }
        });
      }
    });
    dispatch(allCategoryList());
    dispatch(adminGetSlider());
  }, []);


  const productClicks = (subcategoryid, categoryid) => {
    dispatch(AllFilterationData({ subcategoryId: subcategoryid }));
    navigate(`/category/${categoryid}/${subcategoryid}`);
  };

  const handleExplore = (categoryId) => {
    dispatch(AllFilterationData({ categoryId: categoryId }));
    dispatch(allSubCategoryList({ category_id: categoryId }));
    navigate(`/category/${categoryId}`);
  };

  const toAllCategory = () => {
    navigate("/allcategory");
  };

  const banner = [
    {
      value: "Shop Now ",
      bannerImage:
        "https://lh3.googleusercontent.com/p/AF1QipOIpf8JlYXIwJFw8A0a7FLgwvvkoGsSpgbvMGAF=w1080-h608-p-no-v0",
    },
    {
      value: "Shop Now ",
      bannerImage:
        "https://trends.co/wp-content/uploads/2021/06/trends_deal_directory_shareable.png",
    },
    {
      value: "Shop Now ",
      bannerImage:
        "https://braze-images.com/appboy/communication/assets/image_assets/images/642cb57fffb3180b8c80c73a/original.png?1680651647",
    },
  ];

  let women =
    data?.products?.filter((item) => item?.category[0]?.category === "women") ||
    [];

  let men =
    data?.products?.filter((item) => item.category?.[0]?.category === "Men") ||
    [];

  let furniture =
    data?.products?.filter(
      (item) => item.category?.[0]?.category === "Home &Furniture"
    ) || [];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className=" container-fluid slider_col margin_bottom">
            <div>
              <div className="category_borderdiv margin_bottom">
                <Container>
                  <Row>
                    <Col lg={11}>
                      <Row>
                        {allcatgorydata &&
                          allcatgorydata
                            ?.filter((item) => item)
                            ?.slice(0, 6)
                            ?.map((data, index) => {
                              const Id = data?._id;
                              return (
                                <Col lg={2} className="catborder_align">
                                  <div
                                    className={` ${
                                      index === allcatgorydata.length - 1
                                        ? "lastSwepper"
                                        : ""
                                    }`}
                                    key={data?.id}
                                    onClick={() => handleExplore(Id)}
                                  >
                                    <Card className="cat_card_homep hovered">
                                      <div className="HoveredText">
                                        <ul className="HoveredTextHeight">
                                          {subcatalldata &&
                                            subcatalldata?.map((item) => {
                                              return (
                                                item?.category_id === Id && (
                                                  <>
                                                    <li className="catlist_align">
                                                      <div className="ItemSubCategary">
                                                        <p
                                                          onMouseOver={(e) => {
                                                            dispatch(
                                                              typesubcategoryget(
                                                                {
                                                                  subcategory_id:
                                                                    item?._id,
                                                                }
                                                              )
                                                            ).then((res) => {});
                                                          }}
                                                        >
                                                          {item?.subcategory}
                                                        </p>
                                                        <ul className="ItemSubCategaryUL">
                                                          {typesubcatgory &&
                                                            typesubcatgory?.map(
                                                              (item) => {
                                                                return (
                                                                  <>
                                                                    <li>
                                                                      {
                                                                        item?.typesubcategory
                                                                      }
                                                                    </li>
                                                                  </>
                                                                );
                                                              }
                                                            )}
                                                        </ul>
                                                      </div>
                                                    </li>
                                                  </>
                                                )
                                              );
                                            })}
                                        </ul>
                                      </div>
                                      <div className="top_catcard">
                                        <div className="pos_catimage">
                                          <img
                                            className="topcatimage_home"
                                            src={`${catBasePath}/${data.images}`}
                                            alt=""
                                          />
                                        </div>
                                        <p>{data?.category}</p>
                                      </div>
                                    </Card>
                                  </div>
                                </Col>
                              );
                            })}
                      </Row>
                    </Col>
                    <Col lg={1}>
                      <div
                        className="top_catcard"
                        onClick={toAllCategory}
                        style={{ cursor: "pointer" }}
                      >
                        <FaArrowCircleRight
                          className="topcatimage_home"
                          style={{ color: "#4EB529" }}
                        />
                        <div className="viewallcat_egory">
                          <p>View All</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
            <div className="slider">
              <Row>
                <Col lg={12}>
                  <Carousel>
                    {dataslider &&
                      dataslider.length > 0 &&
                      dataslider?.map((item, index) => {
                        return (
                          <Carousel.Item interval={1000}>
                            <div className="margin_bottom">
                              <a href={item?.url}>
                                <img
                                  className="slide_img"
                                  src={`${sliderBasePath}/${item?.images[0]}`}
                                  alt="Second sslide"
                                />
                              </a>
                            </div>
                          </Carousel.Item>
                        );
                      })}
                  </Carousel>
                </Col>
              </Row>
            </div>
            <div className="homeelectnics_carouse margin_bottom">
              <Row>
                <Col lg={2} className="fistcardof_elct">
                  <Card className=" ">
                    {allcatgorydata?.map((e) => {
                      if (e?.category === "Electronics") {
                        const categoryId = e?._id;
                        return (
                          <>
                            <div className="fistcardof_elct">
                              <div className="viewallcard_div">
                                <Card.Text className="text-center">
                                  <h5> Electronics</h5>
                                </Card.Text>
                                <button
                                  onClick={() => handleExplore(categoryId)}
                                  className="electrnicswiewall_button"
                                  type="button"
                                >
                                  VIEW ALL
                                </button>
                                <div className="viewimg_hide">
                                  <Card.Body>
                                    <img
                                      className="homedecor_image"
                                      src="https://img.freepik.com/free-vector/hand-drawn-phone-cartoon-illustration_23-2150588452.jpg?w=2000"
                                      alt=""
                                    />
                                  </Card.Body>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })}
                  </Card>
                </Col>
                <Col lg={10}>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                      },
                      480: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 5,
                      },
                    }}
                  >
                    {categorydata &&
                      categorydata?.products
                        ?.filter(
                          (item) =>
                            item?.category?.[0]?.category === "Electronics"
                        )
                        .slice(0, 6)
                        .map((item, index) => {
                          const subcategoryid = item?.subcategory[0]?._id;
                          const categoryid = item?.category[0]?._id;
                          return (
                            <>
                              <SwiperSlide
                                className="shopping_card"
                                key={index}
                              >
                                <Card
                                  className="shoppingcard_bor"
                                  onClick={() =>
                                    productClicks(subcategoryid, categoryid)
                                  }
                                >
                                  <div className="img_div">
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
                                    />
                                  </div>
                                  <Card.Body>
                                    <Card.Title className="crad_text">
                                      {item?.title}
                                    </Card.Title>
                                    <Card.Text className="crad_text">
                                      <h6>
                                        ₹
                                        {parseInt(item?.totalprice)?.toFixed(0)}
                                      </h6>
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                              </SwiperSlide>
                            </>
                          );
                        })}
                  </Swiper>
                </Col>
              </Row>
            </div>
            <div className="homeelectnics_carouse margin_bottom ">
              <Row>
                <Col lg={2} className="fistcardof_elct">
                  <Card className=" ">
                    {allcatgorydata?.map((e) => {
                      if (e?.category === "Home &Furniture") {
                        const categoryId = e?._id;
                        return (
                          <>
                            <div className="fistcardof_elct">
                              <div className="viewallcard_div">
                                <Card.Text className="text-center">
                                  <h5> Home Appliances</h5>
                                </Card.Text>

                                <button
                                  className="electrnicswiewall_button"
                                  type="submit"
                                  onClick={() => handleExplore(categoryId)}
                                >
                                  VIEW ALL
                                </button>
                                <div className="viewimg_hide">
                                  <Card.Body>
                                    <img
                                      className="homedecor_image"
                                      src="https://ouch-cdn2.icons8.com/rQiKaijxXLYiyqOYF9br0qlt89qoLZjE7uM8zvq2L_w/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTAy/Lzg1MzQwOTM5LTkw/Y2MtNDQzNC04MTcx/LTZlMjExMDI0OGFj/Ni5zdmc.png"
                                      alt=""
                                    />
                                  </Card.Body>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })}
                  </Card>
                </Col>
                <Col lg={10}>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                      },
                      480: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 5,
                      },
                    }}
                  >
                    {categorydata &&
                      categorydata?.products?.map((e, index) => {
                        if (e?.category?.[0]?.category === "Home &Furniture") {
                          const subcategoryid = e?.subcategory[0]?._id;
                          const categoryid = e?.category[0]?._id;
                          return (
                            <SwiperSlide className="shopping_card" key={index}>
                              <Card
                                className="shoppingcard_bor"
                                onClick={() =>
                                  productClicks(subcategoryid, categoryid)
                                }
                              >
                                <div className="img_div">
                                  <Card.Img
                                    variant="top"
                                    src={
                                      e?.image
                                        ? e?.image
                                        : e?.thumbnail?.split(":").length > 1
                                        ? e?.thumbnail
                                        : `${uploadBasePath}/${e.thumbnail}`
                                    }
                                  />
                                </div>
                                <Card.Body>
                                  <Card.Title className="crad_text">
                                    {e?.title}
                                  </Card.Title>

                                  <Card.Text className="crad_text">
                                    <h6>
                                      {" "}
                                      ₹ {parseInt(e?.totalprice)?.toFixed(0)}
                                    </h6>
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </SwiperSlide>
                          );
                        }
                      })}
                  </Swiper>
                </Col>
              </Row>
            </div>
            <div className="homeelectnics_carouse ">
              <Row>
                <Col lg={2} className="fistcardof_elct">
                  <Card className=" ">
                    {allcatgorydata?.map((e) => {
                      if (e?.category === "Books &More") {
                        const categoryId = e?._id;
                        return (
                          <>
                            <div className="fistcardof_elct">
                              <div className="viewallcard_div">
                                <Card.Text className="text-center">
                                  <h5>Books & More</h5>
                                </Card.Text>
                                <button
                                  className="electrnicswiewall_button"
                                  type="submit"
                                  onClick={() => handleExplore(categoryId)}
                                >
                                  VIEW ALL
                                </button>
                                <div className="viewimg_hide">
                                  <Card.Body>
                                    <img
                                      className="homedecor_image"
                                      src="https://cdni.iconscout.com/illustration/premium/thumb/education-stationery-5806839-4841999.png "
                                      alt=""
                                    />
                                  </Card.Body>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })}
                  </Card>
                </Col>
                <Col lg={10}>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                      },
                      480: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 5,
                      },
                    }}
                  >
                    {data &&
                      data?.products
                        ?.filter(
                          (item) =>
                            item?.category?.[0]?.category === "Books &More"
                        )
                        ?.slice(0, 6)
                        ?.map((e, index) => {
                          const subcategoryid = e?.subcategory[0]?._id;
                          const categoryid = e?.category[0]?._id;
                          return (
                            <>
                              <SwiperSlide
                                className="shopping_card"
                                key={e?.id}
                              >
                                <Card
                                  className="shoppingcard_bor"
                                  onClick={() =>
                                    productClicks(subcategoryid, categoryid)
                                  }
                                >
                                  <div className="img_div">
                                    <Card.Img
                                      variant="top"
                                      src={
                                        e?.image
                                          ? e?.image
                                          : e?.thumbnail?.split(":").length > 1
                                          ? e?.thumbnail
                                          : `${uploadBasePath}/${e.thumbnail}`
                                      }
                                    />
                                  </div>
                                  <Card.Body>
                                    <Card.Title className="crad_text">
                                      {e?.title}
                                    </Card.Title>

                                    <Card.Text className="crad_text">
                                      <h6>
                                        ₹ {parseInt(e?.totalprice)?.toFixed(0)}
                                      </h6>
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                              </SwiperSlide>
                            </>
                          );
                        })}
                  </Swiper>
                </Col>
              </Row>
            </div>
            <div className="my-2">
              <Row>
                <Col lg={4} md={6}>
                  <div className="homefashion_border">
                    {allcatgorydata?.map((e) => {
                      if (e?.category === "Men") {
                        const categoryId = e?._id;
                        return (
                          <>
                            <div
                              className="d-flex justify-content-between"
                              onClick={() => handleExplore(categoryId)}
                            >
                              <h5>Men's Fashion</h5>
                              <AiFillRightCircle className="topcategoies_icon" />
                            </div>
                          </>
                        );
                      }
                    })}
                    <Row>
                      {men?.map((item, index) => {
                        return (
                          index < 4 && (
                            <Col lg={6} md={6}>
                              <div
                                className="my-2 onhovermen"
                                key={index}
                                onClick={() =>
                                  navigate(`/productdetail/${item?._id}`)
                                }
                              >
                                <div className="hometop_fashionbo_der">
                                  <img
                                    className="homedecorimag_e margin_bottom"
                                    variant="top"
                                    src={
                                      item?.image
                                        ? item?.image
                                        : item?.thumbnail?.split(":").length > 1
                                        ? item?.thumbnail
                                        : `${uploadBasePath}/${item.thumbnail}`
                                    }
                                  />
                                  <div className="cloths_detail">
                                    <p className="top_cattitle">
                                      {item?.title}
                                    </p>
                                    <p className="discoun-t_per">
                                      {" "}
                                      {item?.discountpercentage}% off
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          )
                        );
                      })}
                    </Row>
                  </div>
                </Col>
                <Col lg={4} md={6}>
                  <div className="homefashion_border">
                    {allcatgorydata?.map((e) => {
                      if (e?.category === "women") {
                        const categoryId = e?._id;
                        return (
                          <>
                            <div
                              className="d-flex justify-content-between"
                              onClick={() => handleExplore(categoryId)}
                            >
                              <h5>Women's Fashion</h5>
                              <AiFillRightCircle className="topcategoies_icon" />
                            </div>
                          </>
                        );
                      }
                    })}

                    <Row>
                      {women?.map((item, index) => {
                        return (
                          index < 4 && (
                            <Col lg={6} md={6}>
                              <div
                                className="my-2 onhovermen"
                                key={index}
                                onClick={() =>
                                  navigate(`/productdetail/${item?._id}`)
                                }
                              >
                                <div className="hometop_fashionbo_der">
                                  <img
                                    className="homedecorimag_e margin_bottom"
                                    variant="top"
                                    src={
                                      item?.image
                                        ? item?.image
                                        : item?.thumbnail?.split(":").length > 1
                                        ? item?.thumbnail
                                        : `${uploadBasePath}/${item.thumbnail}`
                                    }
                                    alt=""
                                  />
                                  <div className="cloths_detail">
                                    <p className="top_cattitle">
                                      {item?.title}
                                    </p>
                                    <p className="discoun-t_per">
                                      {item?.discountpercentage}% off
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          )
                        );
                      })}
                    </Row>
                  </div>
                </Col>
                {allcatgorydata?.map((e) => {
                  if (e?.category === "Sports") {
                    const categoryId = e?._id;
                    return (
                      <>
                        <Col lg={4} md={12}>
                          <div className="homefashion_border newbackimage p-0">
                            <div
                              className="sportscontent_align p-4"
                              onClick={() => handleExplore(categoryId)}
                            >
                              <div>
                                <h2 style={{ color: "#fff" }}>
                                  Stay Fit & Active
                                </h2>
                              </div>
                              <div className="margin_bottom shop_roe">
                                <p style={{ color: "#fff", fontSize: "18px" }}>
                                  Shop from our Fitness & Sports Equipment
                                  Collection
                                </p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </>
                    );
                  }
                })}
              </Row>
            </div>
            <div className="homeelectnics_carouse margin_bottom">
              <Row>
                <Col lg={2} className="fistcardof_elct">
                  <Card className=" ">
                    {allcatgorydata?.map((e) => {
                      if (e?.category === "Men") {
                        const categoryId = e?._id;
                        return (
                          <>
                            <div className="fistcardof_elct">
                              <div className="viewallcard_div">
                                <Card.Text className="text-center">
                                  <h5> Mens Fashion</h5>
                                </Card.Text>
                                <button
                                  className="electrnicswiewall_button"
                                  type="button"
                                  onClick={() => handleExplore(categoryId)}
                                >
                                  VIEW ALL
                                </button>
                                <div className="viewimg_hide">
                                  <Card.Body>
                                    <img
                                      className="homedecor_image"
                                      src="https://png.pngtree.com/png-clipart/20210430/ourmid/pngtree-charm-fashion-men-wearing-png-image_3251052.jpg"
                                      alt=""
                                    />
                                  </Card.Body>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })}
                  </Card>
                </Col>
                <Col lg={10}>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                      },
                      480: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 5,
                      },
                    }}
                  >
                    {categorydata &&
                      categorydata?.products
                        ?.filter(
                          (item) => item?.category?.[0]?.category === "Men"
                        )
                        .slice(0, 6)
                        .map((item, index) => {
                          const subcategoryid = item?.subcategory[0]?._id;
                          const categoryid = item?.category[0]?._id;
                          return (
                            <>
                              <SwiperSlide
                                className="shopping_card"
                                key={index}
                              >
                                <Card
                                  className="shoppingcard_bor"
                                  onClick={() =>
                                    productClicks(subcategoryid, categoryid)
                                  }
                                >
                                  <div className="img_div">
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
                                    />
                                  </div>
                                  <Card.Body>
                                    <Card.Title className="crad_text">
                                      {item?.title}
                                    </Card.Title>
                                    <Card.Text className="crad_text">
                                      <h6> ₹ {item?.totalprice}</h6>
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                              </SwiperSlide>
                            </>
                          );
                        })}
                  </Swiper>
                </Col>
              </Row>
            </div>
            <div className="homeelectnics_carouse margin_bottom">
              <Row>
                <Col lg={2} className="fistcardof_elct">
                  <Card className=" ">
                    {allcatgorydata?.map((e) => {
                      if (e?.category === "women") {
                        const categoryId = e?._id;
                        return (
                          <>
                            <div className="fistcardof_elct">
                              <div className="viewallcard_div">
                                <Card.Text className="text-center">
                                  <h5> Women's Fashion</h5>
                                </Card.Text>
                                <button
                                  className="electrnicswiewall_button"
                                  type="button"
                                  onClick={() => handleExplore(categoryId)}
                                >
                                  VIEW ALL
                                </button>
                                <div className="viewimg_hide">
                                  <Card.Body>
                                    <img
                                      className="homedecor_image"
                                      src="https://image.similarpng.com/very-thumbnail/2021/09/Red-fashion-women-shoes-and-handbag-on-transparent-background-PNG.png"
                                      alt=""
                                    />
                                  </Card.Body>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })}
                  </Card>
                </Col>
                <Col lg={10}>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                      },
                      480: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 5,
                      },
                    }}
                  >
                    {categorydata &&
                      categorydata?.products
                        ?.filter(
                          (item) => item?.category?.[0]?.category === "women"
                        )
                        .slice(0, 6)
                        .map((item, index) => {
                          const subcategoryid = item?.subcategory[0]?._id;
                          const categoryid = item?.category[0]?._id;
                          return (
                            <>
                              <SwiperSlide
                                className="shopping_card"
                                key={index}
                              >
                                <Card
                                  className="shoppingcard_bor"
                                  onClick={() =>
                                    productClicks(subcategoryid, categoryid)
                                  }
                                >
                                  <div className="img_div">
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
                                    />
                                  </div>
                                  <Card.Body>
                                    <Card.Title className="crad_text">
                                      {item?.title}
                                    </Card.Title>
                                    <Card.Text className="crad_text">
                                      <h6> ₹ {item?.totalprice}</h6>
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                              </SwiperSlide>
                            </>
                          );
                        })}
                  </Swiper>
                </Col>
              </Row>
            </div>
            <div className="my-2">
              <Row>
                {allcatgorydata?.map((e) => {
                  if (e?.category === "Electronics") {
                    const categoryId = e?._id;
                    return (
                      <>
                        <Col lg={8} md={6} sm={12}>
                          <div
                            className=" homefashion_borderalign p-0"
                            onClick={() => handleExplore(categoryId)}
                          >
                            <div className="sportscontent_align newshop_roe">
                              <div>
                                <h2>Selling Electronics</h2>
                              </div>
                              <div className="margin_bottom shop_roe ">
                                <p>Latest Technology & Best Brands</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </>
                    );
                  }
                })}
                <Col lg={4} md={6} sm={12}>
                  <div className="homefashion_border">
                    {allcatgorydata?.map((e) => {
                      if (e?.category === "Home &Furniture") {
                        const categoryId = e?._id;
                        return (
                          <>
                            <div
                              className="d-flex justify-content-between "
                              onClick={() => handleExplore(categoryId)}
                            >
                              <h5>Home Decor & Furnishings</h5>
                              <AiFillRightCircle className="topcategoies_icon" />
                            </div>
                          </>
                        );
                      }
                    })}
                    <Row>
                      {furniture?.map((item, index) => {
                        return (
                          index < 4 && (
                            <Col lg={6} md={6} sm={6}>
                              <div
                                className="my-2 onhovermen"
                                key={index}
                                onClick={() =>
                                  navigate(`/productdetail/${item?._id}`)
                                }
                              >
                                <div className="hometop_fashionbo_der">
                                  <img
                                    className="homedecorimag_e margin_bottom"
                                    variant="top"
                                    src={
                                      item?.image
                                        ? item?.image
                                        : item?.thumbnail?.split(":").length > 1
                                        ? item?.thumbnail
                                        : `${uploadBasePath}/${item.thumbnail}`
                                    }
                                  />
                                  <div className="cloths_detail">
                                    <p className="top_cattitle">
                                      {item?.title}
                                    </p>
                                    <p className="discoun-t_per">
                                      {item?.discountpercentage}% off
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          )
                        );
                      })}
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <Scrolltotopbutton />
        </>
      )}
    </>
  );
};

export default Home;
