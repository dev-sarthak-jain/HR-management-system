import React from "react";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import sliderData from "../../mockups/Home/sliderData";
// import sliderSettings from "../../mockups/Home/sliderSetting";

const CarouselComponent = () => {
  return (
    // <Slider {...sliderSettings}>
    <div className="flex justify-center flex-wrap">
      {sliderData.map((item, index) => (
        <Card key={index} {...item} />
      ))}
      </div>
    // </Slider>
  );
};

export default CarouselComponent;
