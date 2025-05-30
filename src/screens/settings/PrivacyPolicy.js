import React, { useState } from "react";
import RichTextEditor from "react-rte";

const PrivacyPolicy = () => {
    const  [textState, setTextState] = useState(RichTextEditor.createEmptyValue())
  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="mt-6">
        <RichTextEditor
        value={textState}
        onChange={(value) => setTextState(value)}
        />
      </div>
      <div className="flex justify-end mt-4">
        <button className="primary-bg rounded-[8px] py-[8px] md:py-[12px] px-9 md:px-12 text-white ">
          Submit
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
