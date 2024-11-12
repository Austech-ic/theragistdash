import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useOutletContext } from "react-router-dom";

const Webhook = () => {
  const [webhook, setWebhook] = useState("");
  const profileData = useOutletContext();

  useEffect(() => {
    //If there's no profile data, set selectedInfo to 1
    if (profileData) {
      setWebhook(profileData.webhook_url);
    }
  }, [profileData]);

  return (
    <div className="p-4 md:p-6">
      {" "}
      <div className="border-[0.2px] overflow-hidden flex-1 border-[#98a2b3] relative rounded-[8px] bg-[#fff]    p-[16px] md:p-[20px] ">
        <m.div
          initial={{ x: 30, opacity: 0.4 }}
          animate={{
            // x: selectedInfo === 1 ? 0 : 100,
            x: 0,
            opacity: 1,
            // scale: 1,
          }}
          transition={{
            duration: 0.9,
          }}
        >
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#373636] mb-[8px]">
              Integrate API webhooks to alert your application instantly when
              specific events, like payment updates, inventory changes, or
              timecard actions, take place. These notifications are usually
              delivered within milliseconds of the event.
            </label>
          </div>

          <div className="mb-[16px] md:mb-[20px] w-full md:w-[70%] xl:w-[50%]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              Webhook
            </label>
            <div className=" relative    flex items-center">
              <input
                type="text"
                placeholder="https://mywebhook.com"
                className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="firstName"
                value={webhook}
                onChange={(e) => {
                  setWebhook(e.target.value);
                }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default Webhook;
