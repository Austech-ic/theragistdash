import React from 'react';
const ModalLeft = ({ isOpen, onClose, children }) => {
    const modalStyle = {
        display: isOpen ? 'block' : 'none',
    };
    return (
        <div style={modalStyle}  class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  {/* <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  --> */}

  <div class="fixed inset-0 overflow-hidden">

    <div  class="absolute inset-0 overflow-hidden">
    <div onClick={onClose}  class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
       
        <div class="pointer-events-auto relative w-screen  max-w-[350px] md:max-w-[430px] lg:max-w-[617px]">
          <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
            <button onClick={onClose} type="button" class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span class="absolute -inset-2.5"></span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex h-full w-full flex-col overflow-y-scroll bg-white max-w-[350px] md:max-w-[430px] lg:max-w-[617px] shadow-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)
};

export default ModalLeft;