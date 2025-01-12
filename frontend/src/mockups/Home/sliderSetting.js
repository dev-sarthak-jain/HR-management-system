const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Show 3 slides on larger screens
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

export default sliderSettings;
