import React from 'react'

const Details = ({title, details}) => {
  return (
    <div>
    <p classsName="text-sm mb-1 text-[#2e2e2e]">
      {title} <sup className="">*</sup>
    </p>
    <div className="border border-[#E1E1E1] min-h-[30px] md:min-h-[38px] w-full rounded-[4px] px-2 py-1 md:py-2 text-[#6F6F6F] text-sm">
      {details}
    </div>
  </div>  )
}

export default Details