import React, { useState } from "react";

const Customer = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      <div className="overflow-hidden relative">
        <div className="flex transition-transform duration-500"
             style={{ transform: `translateX(-${currentStep * 100}%)` }}>
          {/* Form 1 */}
          <div className="w-full flex-shrink-0">
            <form className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-xl mb-4 font-semibold">Form 1</h2>
              <label className="block mb-2">First Name</label>
              <input type="text" className="w-full p-2 border rounded-md mb-4" placeholder="Enter your first name" />
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Next
              </button>
            </form>
          </div>

          {/* Form 2 */}
          <div className="w-full flex-shrink-0">
            <form className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-xl mb-4 font-semibold">Form 2</h2>
              <label className="block mb-2">Last Name</label>
              <input type="text" className="w-full p-2 border rounded-md mb-4" placeholder="Enter your last name" />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md">
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  Next
                </button>
              </div>
            </form>
          </div>

          {/* Form 3 */}
          <div className="w-full flex-shrink-0">
            <form className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-xl mb-4 font-semibold">Form 3</h2>
              <label className="block mb-2">Email</label>
              <input type="email" className="w-full p-2 border rounded-md mb-4" placeholder="Enter your email" />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md">
                  Previous
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Customer;
