import { ArrowRight2 } from "iconsax-react";
import React, { useState } from "react";
import Categories from "./component/Categories";
import Tag from "./component/Tag";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const Config = () => {
  const [staged, setStaged] = useState("Category");

  const Stages = [
    { id: 1, name: "Category" },
    { id: 2, name: "Tag" },
  ];
  return (
    <div className="p-[10px] md:p-[16px] xl:p-[20px]   bg-[#F2F2F2] min-h-screen ">
    
    <div className="md:hidden">
    <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab  _selected={{ color: 'white', bg: 'green.400' }}>Category</Tab>
          <Tab  _selected={{ color: 'white', bg: 'green.400' }}>Tag</Tab>
        </TabList>
        <TabPanels>
          <TabPanel >
            <Categories />
          </TabPanel>
          <TabPanel>
            <Tag />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
      
      <div className=" hidden md:flex  flex-col md:flex-row justify-between gap-[30px] ">
        <div className=" w-[36%] rounded-lg overflow-hidden ">
          {Stages &&
            Stages.map((stage, index) => (
              <button
                onClick={() => setStaged(stage.name)}
                className={`py-[16px] w-full px-[28px] text-sm flex-between  ${
                  stage.name === staged
                    ? "bg-[#26ae5f] text-[#fff] "
                    : "bg-[#fff] text-[#000000]"
                } `}
              >
                {stage?.name}
                <ArrowRight2 variant="Linear" size="16" />
              </button>
            ))}
        </div>
        <div className="w-[64%] ">
          {staged === "Category" ? (
            <Categories />
          ) : staged === "Tag" ? (
            <Tag />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Config;
