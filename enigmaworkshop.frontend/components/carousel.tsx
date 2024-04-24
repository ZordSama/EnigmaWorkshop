"use client";
import React from "react";
import Slider from "react-slick";

export const SimpleSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots bg-default-500"
  };
  return (
    <Slider {...settings}>
      <div className="bg-red-500">
        <h3>1</h3>
      </div>
      <div className="bg-red-500">
        <h3>2</h3>
      </div>
      <div className="bg-red-500">
        <h3>3</h3>
      </div>
      <div className="bg-red-500">
        <h3>4</h3>
      </div>
      <div className="bg-red-500">
        <h3>5</h3>
      </div>
      <div className="bg-red-500">
        <h3>6</h3>
      </div>
    </Slider>
  );
};
