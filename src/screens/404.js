import React from "react";

const Page404 = () => {
  return (
    <div>
      <section className=" px-[16px] md:px-[60px] md:gap-4 lg:px-[120px] mt-[80px] relative mb-[60px] md:mb-[100px] lg:mb-[120px] ">
        <div>
          <h2 className="text-[24px] md:text-[56px] lg:text-[80px] text-black text-center font-semibold mb-[24px] md:mb-[40px] lg:mb-[80px]">
            Page not found
          </h2>
          <div className="flex items-center justify-center mb-[24px] md:mb-[30px] mx-auto">
            <p className="text-grey-300 text-[14px] md:text-[16px]">
              The page you are looking for doesn’t exist. Don’t fret, your funds
              are safe with us. We are here to stay!
            </p>
            <img src="./assets/sportCar.png" alt="sport car" />
          </div>
          <img src="./assets/404.png" alt="404 cartoon" className="mx-auto h-48" />
        </div>
      </section>
    </div>
  );
};

export default Page404;
