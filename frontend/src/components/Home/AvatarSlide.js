import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AvatarSlide = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 slide on smaller screens
        },
      },
    ],
  };

  const avatars = [
    {
      name: "John Doe",
      title: "Software Engineer",
      imageUrl: "./assets/avatar/avatar1.jpeg",
      alt: "John Doe",
    },
    {
      name: "Jane Smith",
      title: "UX Designer",
      imageUrl: "./assets/avatar/avatar2.jpeg",
      alt: "Jane Smith",
    },
    {
      name: "Bob Johnson",
      title: "Product Manager",
      imageUrl: "./assets/avatar/avatar3.png",
      alt: "Bob Johnson",
    },
  ];

  return (
    <div className="py-8 bg-backgroundColor">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl text-purpleCustom text-center font-bold font-inter my-10">
          Meet the <span className="text-white font-inter">Team</span>
        </h1>
        <Slider {...sliderSettings}>
          {avatars.map((avatar, index) => (
            <div key={index} className="px-2 relative">
              <Avatar {...avatar} />
              <div className="absolute left-14 top-2 z-[-1]">
                <div className="flex flex-col items-center h-[160px] w-[160px] rounded-xl bg-purpleCustom">
                  <p className="text-lg text-white font-semibold text-center"></p>
                  <p className="text-gray-700 text-center"></p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
const Avatar = ({ name, title, imageUrl }) => (
  <div className="flex flex-col items-center">
    <img
      src={imageUrl}
      alt={name}
      className="w-40 h-40 rounded-xl object-cover mb-4"
    />
    <p className="text-lg text-white font-semibold text-center">{name}</p>
    <p className="text-gray-300 text-center">{title}</p>
  </div>
);
export default AvatarSlide;
