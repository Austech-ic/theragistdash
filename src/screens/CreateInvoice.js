import { Add } from "iconsax-react";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

const CreateInvoice = () => {
    const [name, setName]= useState("")
    const [date, setDate ]= useState("")
    const [id, setId] =useState("")
    const [address, setAddress] = useState("")

      const [items, setItems] = useState([
    { id: Date.now(), name: "", quantity: 1, price: 0 },
  ]);

  const handleInputChange = (id, field, value) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: "", quantity: 1, price: 0 }]);
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-[20px] bg-[#F2F2F2] min-h-screen ">
      <div className="flex gap-3 ">
        <div className="w-[65%] bg-white  pt-4 pb-7 px-3 md:p-5 md:pb-7 rounded-lg border-[0.2px] border-[#98a2b3] ">
          <div className="flex-between mb-7 md:mb-[52px]">
            <div>
              {" "}
              <h2 className="text-[#000] text-[18px] md:text-[22px] xl:text-[24px] font-semibold mb-[2px]  ">
                Invoice
              </h2>
              <p className="text-[#667185]  text-[16px] md:text-[18px] xl:text-[20px] font-medium  ">
                #00001
              </p>
            </div>
            <img
              src="./assets/logo.png"
              alt="invoice logo"
              className="h-[60px]"
            />
          </div>

          <div className="mb-4 md:mb-7">
            <ul className=" grid grid-cols-3">
              <li className="p-2 md:p-3 border-t-[0.2px] border-b-[0.2px] border-[#98a2b3]">
                <h2 className="text-[#000] text-[16px]   font-semibold mb-[2px]  ">
                  Issue date
                </h2>
                <p className="text-[#667185]  text-[16px]  font-normal  mb-2 ">
                  2nd October 2024{" "}
                </p>

                <h2 className="text-[#000] text-[16px]   font-semibold mb-[2px]  ">
                  Due date
                </h2>
                <p className="text-[#667185]  text-[16px] font-normal  ">
                  31st October 2024{" "}
                </p>
              </li>
              <li className="p-2 md:p-3 border-[0.2px]  border-[#98a2b3]">
                <h2 className="text-[#000] text-[16px]   font-semibold mb-[2px]  ">
                  Billed to
                </h2>
                <p className="text-[#667185]  text-[16px]   font-medium  ">
                  Eaglion HQ
                </p>
                <p className="text-[#667185]  text-[16px]   ffont-normal  ">
                  13, Alhaji Saheed Aregbe street,Okota Lagos
                </p>
                <p className="text-[#667185]  text-[16px]   font-normal  ">
                  10001{" "}
                </p>
              </li>
              <li className="p-2 md:p-3 border-t-[0.2px] border-b-[0.2px] border-[#98a2b3]">
                <h2 className="text-[#000] text-[16px]   font-semibold mb-[2px]  ">
                  From
                </h2>
                <p className="text-[#667185]  text-[16px]   font-medium  ">
                  Vant HQ
                </p>
                <p className="text-[#667185]  text-[16px]   font-normal  ">
                  13, Alhaji Saheed Aregbe street,Okota Lagos
                </p>
                <p className="text-[#667185]  text-[16px]   font-normal  ">
                  10001{" "}
                </p>
              </li>
            </ul>
          </div>
          <div className="overflow-auto">
            <table>
              {" "}
              <thead className="pb-4">
                <tr>
                  <th className="pb-4">Item Name</th>
                  <th className="pb-4">Quantity</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Line total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="pb-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleInputChange(item.id, "name", e.target.value)
                        }
                        placeholder="Enter item name"
                        className="border-[0.2px] w-[200px]  border-[#98a2b3] px-1 py-1 text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[14px]    focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                      />
                    </td>
                    <td className="pb-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleInputChange(item.id, "quantity", e.target.value)
                        }
                        min="1"
                        className="border-[0.2px] min-w-[100px]  border-[#98a2b3] px-1 py-1 text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px]    focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                      />
                    </td>
                    <td className="pb-2">
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleInputChange(item.id, "price", e.target.value)
                        }
                        //min="0"
                        step="0.01"
                        placeholder="Enter price"
                        className="border-[0.2px] min-w-[100px]  border-[#98a2b3] px-1 py-1 text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px]    focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                      />
                    </td>
                    <td className="pb-2">
                      <input
                        type="number"
                        value={(item.price * item.quantity).toFixed(2)}
                        disabled
                        min="0"
                        step="0.01"
                        placeholder="0"
                        className="border-[0.2px] min-w-[100px]  border-[#98a2b3] px-1 py-1 text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px]    focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="text-md mx-auto text-[#26ae5f] flex-item gap-1 mt-4"
            onClick={addItem}
          >
            {" "}
            <Add variant="Linear" color="#26ae5f" size="14" />
            Add New Item
          </button>

          <div className="total mt-[53px] mb-9">
            <ul>
              <li className="border-t-[0.2px] border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                <p className="text-[#667185]  text-[16px]  md:text-[18px]  font-medium  ">
                  Tax
                </p>
                <p className="text-[#667185]  text-[16px]   font-normal  ">
                  0%
                </p>
              </li>
              <li className=" border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                <p className="text-[#667185]  text-[16px] md:text-[18px]    font-medium  ">
                  Subtotal
                </p>
                <NumericFormat
                  value={totalPrice.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => (
                    <p className="text-[#667185]  text-[16px]   font-normal  ">
                      {value}
                    </p>
                  )}
                />
              </li>
              <li className=" border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                <p className="text-[#667185]  text-[16px] md:text-[18px]    font-medium  ">
                  Total
                </p>

                <NumericFormat
                  value={totalPrice.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => (
                    <p className="text-[#667185]  text-[16px]   font-normal  ">
                      {value}
                    </p>
                  )}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className=" w-[35%] bg-white p-3 md:p-5 rounded-lg border-[0.2px] border-[#98a2b3] ">
          <h2 className="text-[#000] text-[18px] md:text-[22px] font-semibold mb-[2px] text-center  ">
            Review
          </h2>
          <div className="mb-[18px]">
            <label className="text-[14px] text-[#667185] leading-[20px] font-medium   mb-[8px] md:mb-[10px]">
              Invoice Id
            </label>
            <div className=" relative    flex items-center">
              <input
                type="text"
                placeholder="01"
                className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="id"
                id="full-name"
                //value=""
                //onChange={() => {}}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="mb-[18px]">
            <label className="text-[14px] text-[#667185] font-medium leading-[20px]   mb-[8px] md:mb-[10px]">
              Customer/Comapany Name
            </label>
            <div className=" relative  flex items-center">
              <input
                type="text"
                placeholder="02"
                className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="id"
                id="full-name"
                //value=""
                //onChange={() => {}}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="mb-[18px]">
            <label className="text-[14px] text-[#667185] font-medium leading-[20px]   mb-[8px] md:mb-[10px]">
              Customer/Comapany email
            </label>
            <div className=" relative  flex items-center">
              <input
                type="email"
                placeholder="02"
                className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="id"
                id="full-name"
                //value=""
                //onChange={() => {}}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="mb-[18px]">
            <label className="text-[14px] text-[#667185] font-medium leading-[20px]   mb-[8px] md:mb-[10px]">
              Due Date
            </label>
            <div className=" relative  flex items-center">
              <input
                type="date"
                placeholder=""
                className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="id"
                id="full-name"
                //value=""
                //onChange={() => {}}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="mb-[18px]">
            <label className="text-[14px] text-[#667185] font-medium leading-[20px]   mb-[8px] md:mb-[10px]">
              Tax(%)
            </label>
            <div className=" relative  flex items-center">
              <input
                type="number"
                placeholder=""
                className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="id"
                id="full-name"
                //value=""
                //onChange={() => {}}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="mb-[18px]">
            <label className="text-[14px] text-[#667185] font-medium leading-[20px]   mb-[8px] md:mb-[10px]">
              Note
            </label>
            <div className=" relative  flex items-center">
              <textarea
                type="number"
                placeholder=""
                className="w-full h-[148px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="id"
                id="full-name"
                //value=""
                //onChange={() => {}}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>

          <div className="border  border-[#98a2b3] my-5" />

          <div className="flex-between ">
            <button className="px-4 py-2 rounded-lg border-[0.2px]  border-[#98a2b3] text-md bg-slate-100">
              Cancel
            </button>
            <button className="px-4 py-2 rounded-lg text-white bg-[#26ae5f] text-md ">
              Send Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
