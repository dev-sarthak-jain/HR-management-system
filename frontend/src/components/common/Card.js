const Card = ({ title, description, imageUrl }) => (
  <div className="w-full sm:w-[45%] lg:w-[30%] m-3">
    <div className="flex justify-between sm:justify-center flex-wrap items-center bg-white p-2.5 rounded-xl shadow h-full">
    <div className="w-[60%]">
      <h3 className="text-lg sm:text-xl font-bold my-2 text-left sm:text-center text-black font-inter">
        {title}
      </h3>
      <p className="text-sm text-blue-800 text-left sm:text-center italic font-inter font-bold">
        {description}
      </p>
      </div>
      <div className="w-[35%] sm:w-[90%] ">
      <img
        src={imageUrl}
        alt={title}
        className="sm:my-2.5 mx-auto w-full h-[100px] sm:h-32 object-cover rounded-2xl2"
      />
      </div>
    </div>
  </div>
);
export default Card;
