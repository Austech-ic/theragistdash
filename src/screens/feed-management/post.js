import React, { useState } from "react";
import TotalCard from "../dashboard/components/TotalCard";
import { SmilePlus } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import RichTextEditor from "react-rte";

const Post = () => {
  const [textState, setTextState] = useState(RichTextEditor.createEmptyValue());



//   const createACatgory = async () => {
//       setIsLoading(true);
//       try {
//         const response = await api.createCategory({
//           name: formValue?.name,
//           amount: formValue?.amount,
//           color: formValue?.color,
//         });
//         enqueueSnackbar("Category Updated Successfully", { variant: "success" });
//         categoryResults.refetch();
//         setIsLoading(false);
//         setIsCreate(false);
//         ClearForm();
//       } catch (error) {
//         enqueueSnackbar(error.message, { variant: "error" });
  
//         setIsLoading(false);
//       }
//     };
  
  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="flex flex-row gap-6 md:gap-8">
        <TotalCard
          icon={Icon}
          iconName={"map:post-box"}
          total={"524"}
          totalLabel={"Daily Post"}
        />
        <TotalCard
          icon={Icon}
          iconName={"mingcute:comment-2-fill"}
          total={"524"}
          totalLabel={"Daily Post"}
        />
        <TotalCard icon={SmilePlus} total={"524"} totalLabel={"Daily Post"} />
      </div>
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

export default Post;
