import { useQuery } from "@tanstack/react-query";
import {
  Add,
  ArrowDown2,
  InfoCircle,
  ProfileCircle,
  RecordCircle,
  SearchNormal1,
  Trash,
} from "iconsax-react";
import React, { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Tooltip } from "react-tooltip";
import api from "../../api";
import { motion as m } from "framer-motion";
import {
  decryptaValue,
  formatDate,
  formatDatewithYear,
  getCurrentDate,
  getTodayDate,
} from "../../utils/helperFunctions";
import { UserContext } from "../../utils/UserProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { ClipLoader } from "react-spinners";

const CreateInvoice = () => {
  const { profile } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const state = location?.state;
  console.log("state=====>", state)
  const inv = state === "undefined" ? "" : state?.invoiceNo

  // const inv = "INV-0010";
  const invoiceNo = () => {
    let prev = "INV-";
    if (!inv) {
      return "INV-0001";
    } else {
      let arr = inv.split("-");
      let num = parseInt(arr[1]);
      num++;
      return prev + ("0000" + num).slice(-4);
    }
  };


  const navigate = useNavigate();
  const [customerVisible, setCustomerVisible] = useState(false);
  const [select, setSelect] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formValue, setFormValue] = useState({
    id: "",
    invoice_no: invoiceNo(),
    title: "",
    customer_email: "",
    customer_phone: "",
    customer_name: "",
    date: "",
    due_date: "",
    amount: "",
    tax: "",
    has_tax: false,
    save_product: false,
    total_amount: "",
    note: "",
    status: "",
    meta: {},
    slug: "",
    currency: "NGN",
    currency_symbol: "",
    discount_type: "",
    discount: "",
    recurring: false,
    recurring_interval: "",
    due_reminder: false,
    due_reminder_interval: "",
    created_at: "",
    updated_at: "",
  });

  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

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

  async function getCustomers(page) {
    const response = await api.getCustomers({
      params: {
        search: searchQuery,
      },
    });
    return response;
  }

  const CustomerQuery = useQuery(["xx"], () => getCustomers(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  let Customers = CustomerQuery?.data?.data;
  const [filteredData, setFilteredData] = useState(Customers || []);
  useEffect(() => {
    setFilteredData(CustomerQuery.data?.data);
  }, [CustomerQuery.data]);

  const handleSearch = (query) => {
    const filteredbanks = CustomerQuery.data.filter((cust) =>
      cust.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredbanks);
  };

  const handleSelectCustomer = (cust) => {
    setSelectedCustomer(cust);
    setFormValue({
      ...formValue,
      customer_email: cust.email,
      customer_name: cust.name,
      customer_phone: cust.phone,
    });
    setCustomerVisible(false);
  };

  const Total = () => {
    if (formValue?.tax) {
      const taxtedPrice = totalPrice.toFixed(2) * (formValue?.tax / 100);
      const price = totalPrice.toFixed(2) + taxtedPrice;
      return price;
    } else {
      return totalPrice.toFixed(2);
    }
  };

  const TotalWithDiscount = () => {
    if (formValue?.discount) {
      const discountPricePercent = Total() * (formValue?.discount / 100);
      const price =
        formValue?.discount_type === "percentage"
          ? Total() - discountPricePercent
          : Total() - formValue?.discount;

      return price;
    } else {
      return Total();
    }
  };

  const onDeleteItemHandler = (index) => {
    let allItem = [...items];
    let eachItem = allItem[index];
    let amount = eachItem.amnt;
    allItem.splice(index, 1);
    setItems(allItem);
  };

  const submitInvoice = async () => {
    setIsLoading(true);
    if(!items[0]?.name) {
      enqueueSnackbar("Please add at least one item", { variant: "warning" });
      setIsLoading(false);
      return;
    }
    try {
      const response = await api.createInvoice({
        invoice_no: formValue?.invoice_no,

        title: formValue?.title,
        date: getTodayDate(),
        due_date: formValue?.due_date,
        amount: totalPrice.toFixed(2),
        tax: formValue?.tax,
        has_tax: formValue?.has_tax,
        save_product: formValue?.save_product,
        customer_email: formValue?.customer_email,
        customer_phone: formValue?.customer_phone,
        customer_name: formValue?.customer_name,
        total_amount: TotalWithDiscount(),
        note: formValue?.note,
        status: "pending",
        meta: "",
        slug: formValue?.slug,
        currency: "NGN",
        currency_symbol: "₦",
        discount_type: formValue?.discount_type,
        discount: formValue?.discount,
        recurring: formValue?.recurring,
        recurring_interval: formValue?.recurring_interval,
        due_reminder: formValue?.due_reminder,
        due_reminder_interval: formValue?.due_reminder_interval,
        created_at: "",
        invoice_items: items.map((item) => ({
          item_name: item.name,
          unit_price: item.price,
          quantity: item.quantity,
          total_price: (item.price * item.quantity).toFixed(2),
        })),
      });

      setIsLoading(false);
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      console.log("invoice response ---->>>", decryptRes);
      navigate("/saved-invoice", {
        state: { invoiceData: decryptRes?.data, profile: profile },
      });
      enqueueSnackbar(decryptRes?.message, { variant: "success" });
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });

      setIsLoading(false);
    }
  };
  return (
    <div className="p-[20px] bg-[#F2F2F2] min-h-screen ">
      <div className="flex gap-3 ">
        <div className="w-full  md:w-[60%] xl:w-[65%]  bg-white  pt-4 pb-7 px-[10px] md:p-4 md:pb-7 rounded-lg border  ">
          <div className="flex-between mb-7 md:mb-[42px]">
            <div>
              {" "}
              <h2 className="text-[#000] text-[18px] md:text-[22px]  font-semibold mb-[1px]  ">
                Invoice
              </h2>
              <p className="text-[#667185]  text-[16px] md:text-[18px] xl:text-[20px] font-medium  ">
                #{formValue?.invoice_no}
              </p>
              <h2 className="text-[#000]  text-[13px] md:text-[16px]   font-semibold  ">
                {formValue.title}
              </h2>
            </div>
                          <img src={profile?.logo} alt="" className="h-7 md:h-10"/>

          </div>

          <div className="mb-4 md:mb-7">
            <ul className=" grid grid-cols-3">
              <li className="p-2 md:p-3 border-t-[0.2px] border-b-[0.2px] border-[#98a2b3]">
                <h2 className="text-[#000] text-[16px]   font-medium mb-[2px]  ">
                  Issue date
                </h2>
                <p className="text-[#667185]  text-[14px]  font-normal  mb-2 ">
                  {formatDatewithYear()}
                </p>

                <h2 className="text-[#000] text-[16px]   font-medium mb-[2px]  ">
                  Due date
                </h2>
                {formValue?.due_date && (
                  <p className="text-[#667185]  text-[14px] font-normal  ">
                    {formatDatewithYear(formValue?.due_date)}
                  </p>
                )}
              </li>
              <li className="p-2 md:p-3 border-[0.2px]  border-[#98a2b3]">
                <h2 className="text-[#000] text-[16px]   font-medium mb-[2px]  ">
                  Billed to
                </h2>
                <p className="text-[#667185]  text-[16px]   font-medium  ">
                  {formValue?.customer_name}
                </p>
                <p className="text-[#667185]  text-[14px] font-normal  ">
                  {formValue?.customer_email}
                </p>
                {formValue?.customer_phone && (
                  <p className="text-[#667185]  text-[14px] font-normal  ">
                    <strong>Tel: </strong> {formValue?.customer_phone}
                  </p>
                )}
              </li>
              <li className="p-2 md:p-3 border-t-[0.2px] border-b-[0.2px] border-[#98a2b3]">
                <h2 className="text-[#000] text-[16px]   font-medium mb-[2px]  ">
                  From
                </h2>
                <p className="text-[#667185]  text-[16px]   font-medium  ">
                  {profile?.name}
                </p>
                <p className="text-[#667185]  text-[14px]   font-normal  ">
                  {profile?.address}
                </p>
                <p className="text-[#667185]  text-[14px] font-normal  ">
                  {profile?.email}
                </p>
                {profile?.phone && (
                  <p className="text-[#667185]  text-[14px] font-normal  ">
                    <strong>Tel: </strong> {profile?.phone}
                  </p>
                )}
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
                        className="border-[0.2px] w-[70px]  border-[#98a2b3] px-1 py-1 text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px]    focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
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
                    {index > 0 && (
                      <td className="pb-2 pl-4">
                        <Trash
                          size={14}
                          onClick={() => onDeleteItemHandler(index)}
                          color="red"
                          className="cursor-pointer "
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className="mt-[10px] flex gap-1 items-center">
              <label className="text-[14px] whitespace-nowrap text-[#353536] leading-[20px] font-medium ">
                Save Product(s) :
              </label>

              <input
                type="checkbox"
                placeholder=""
                className="   text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="save_product"
                value={formValue?.save_product}
                onChange={() =>
                  setFormValue({
                    ...formValue,
                    save_product: !formValue?.save_product,
                  })
                }
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>

          <button
            className="text-md mx-auto text-[#fff] px-3 py-1 hover:-translate-y-1 rounded-md shadow-md  bg-[#26ae5f] flex-item gap-1 mt-4 text-[14px]"
            onClick={addItem}
          >
            {" "}
            <Add variant="Linear" color="#fff" size="16" />
            Add New Item
          </button>

          <div className="total mt-[53px] mb-9">
            <ul>
              <li className="border-t-[0.2px] border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                <p className="text-[#667185]  text-[16px]  md:text-[18px]  font-medium  ">
                  Tax
                </p>
                <p className="text-[#667185]  text-[16px]   font-normal  ">
                  {formValue?.tax}%
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
              {formValue?.discount && (
                <li className=" border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                  <p className="text-[#667185]  text-[16px]  md:text-[18px]  font-medium  ">
                    Discount
                  </p>
                  <p className="text-[#667185]  text-[16px]   font-normal  ">
                    {formValue?.discount}{" "}
                    {formValue?.discount_type === "percentage" ? "%" : ""}
                  </p>
                </li>
              )}
              <li className=" border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                <p className="text-[#667185]  text-[16px] md:text-[18px]    font-medium  ">
                  Total
                </p>

                <NumericFormat
                  value={TotalWithDiscount()}
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
        <div className="w-full h-screen overflow-auto md:w-[40%] xl:w-[35%] flex flex-col gap-5">
          <div className=" w-full bg-white p-3  rounded-lg border-[0.2px] border-[#98a2b3] ">
            <h2 className="text-[#000] text-[18px] md:text-[22px] font-semibold mb-[2px] text-center  ">
              Review
            </h2>
            <div className="mb-[10px]">
              <label className="text-[14px] text-[#353536] leading-[20px] font-medium   mb-[8px] md:mb-[10px]">
                Invoice Number
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder="INV-1001"
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="invoice_no"
                  value={formValue?.invoice_no}
                  onChange={(e) => handleInput(e)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="mb-[10px]">
              <label className="text-[14px] text-[#353536] leading-[20px] font-medium   mb-[8px] md:mb-[10px]">
                Invoice Title
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder="Office Furnitures"
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="title"
                  value={formValue?.title}
                  onChange={(e) => handleInput(e)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>

            <div className="mb-[20px] mt-[20px]">
              <p className="text-[14px] text-[#353536]  font-medium   mb-[4px ">
                Billed To Customer:
              </p>

              <ul className="flex items-center gap-8 justify-center my-2">
                <li
                  onClick={() => setSelect(1)}
                  className="text-[12px] cursor-pointer font-semibold flex items-center gap-2"
                >
                  Select from existing{" "}
                  <div
                    className={`h-4 w-4 p-[2px] rounded-full border-2 ${
                      select === 1 ? "bg-[#26ae5f]" : ""
                    }`}
                  ></div>
                </li>

                <li
                  onClick={() => setSelect(2)}
                  className="text-[12px] cursor-pointer font-semibold flex items-center gap-2"
                >
                  Manual input{" "}
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      select === 2 ? "bg-[#26ae5f]" : ""
                    } `}
                  ></div>
                </li>
              </ul>
              {select === 1 && (
                <>
                  <label className="text-[12px] text-[#353536]  font-medium   mb-[8px] md:mb-[10px]">
                    Select Customer:
                  </label>
                  <div className=" gap-3   flex items-center">
                    <button
                      onClick={() => setCustomerVisible(!customerVisible)}
                      className="w-full h-[38px] pl-[8px] pr-[8px] flex-between py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
                    >
                      <div className="flex-row banks-center">
                        {selectedCustomer ? (
                          <p className="text-[#272F35] font-normal font-i_normal text-[12px] leading-[15px] tracking-[0.028px] ">
                            {selectedCustomer?.name}
                          </p>
                        ) : (
                          <p className="text-[#838383] font-normal font-i_normal text-[12px] leading-[15px]  tracking-[0.028px] ">
                            {"Select a Customer"}
                          </p>
                        )}
                      </div>
                      <ArrowDown2
                        variant="Linear"
                        color={"#838383"}
                        size={14}
                      />
                    </button>

                    <Link
                      to="/customers"
                      className=" text-[#fff] px-2 py-1 hover:-translate-y-1 transition-all duration-200 ease-in-out whitespace-nowrap rounded-md shadow-md  bg-[#26ae5f] flex-item gap-1 text-[12px]"
                      // onClick={addItem}
                    >
                      {" "}
                      <Add variant="Linear" color="#fff" size="16" />
                      Create New
                    </Link>
                  </div>
                  {customerVisible && (
                    <m.div
                      initial={{ y: 10, opacity: 0.4 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        // scale: 1,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="w-full h-[300px] overflow-y-auto  px-2 py-3 text-[14px] text-[#344054] border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
                    >
                      <div className=" relative  w-full mx-auto mb-2  flex items-center">
                        <SearchNormal1
                          size="14"
                          color="#98A2B3"
                          className="absolute left-[16px]"
                        />

                        <input
                          type="text"
                          placeholder="search customer"
                          className="w-full  h-[36px] pl-[44px] py-[12px] text-[14px] text-[#344054]  bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
                          required
                          autoComplete="on"
                          name="email"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value);
                          }}
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                        />
                      </div>
                      {filteredData &&
                        filteredData?.map((cust, index) => (
                          <button
                            onClick={() => handleSelectCustomer(cust)}
                            className="w-full px-[10px] py-2 rounded-[10px] flex items-center flex-row justify-between banks-center mb-2"
                            style={{
                              borderColor: "rgba(18, 3, 58, 0.10)",
                              borderWidth: 0.2,
                            }}
                          >
                            <div className="flex-item">
                              {cust.logo ? (
                                <img
                                  src={cust?.logo}
                                  alt=""
                                  style={{ height: 24, width: 24 }}
                                  className="mr-3 rounded-full"
                                />
                              ) : (
                                <div className="rounded-full bg-[#F6F6F6] border border-[#EDF2F7] py-[5px] px-[5px] mr-3 ">
                                  <ProfileCircle
                                    size="14"
                                    color="#BAB4B2FF"
                                    variant="Bold"
                                  />
                                </div>
                              )}
                              <p className="text-[#272F35] flex-1 font- font-i_medium text-[12px] leading-[15.94px]  tracking-[0.2px]  ">
                                {cust?.email}
                              </p>
                            </div>

                            {selectedCustomer?.id === cust?.id ? (
                              <RecordCircle
                                size="16"
                                color="#26ae5f"
                                variant="Bold"
                              />
                            ) : (
                              <RecordCircle
                                size="16"
                                color="#DEDEDE"
                                variant="Bold"
                              />
                            )}
                          </button>
                        ))}
                    </m.div>
                  )}{" "}
                </>
              )}

              {select === 2 && (
                <>
                  <div className="mb-[10px]">
                    <label className="text-[12px] text-[#353536]  font-medium   mb-[8px] md:mb-[10px]">
                      Customer Name:
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[34px] pl-[8px] py-[5px] text-[13px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                        required
                        name="customer_name"
                        value={formValue?.customer_name}
                        onChange={(e) => handleInput(e)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>

                  <div className="mb-[10px]">
                    <label className="text-[12px] text-[#353536]  font-medium   mb-[8px] ">
                      Customer Email:
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="email"
                        placeholder=""
                        className="w-full h-[34px] pl-[8px] py-[5px] text-[13px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                        required
                        name="customer_email"
                        value={formValue?.customer_email}
                        onChange={(e) => handleInput(e)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>

                  <div className="mb-[10px]">
                    <label className="text-[12px] text-[#353536]  font-medium   mb-[8px] md:mb-[10px]">
                      Customer Address:
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[34px] pl-[8px] py-[5px] text-[13px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                        required
                        name="customer_phone"
                        value={formValue?.customer_phone}
                        onChange={(e) => handleInput(e)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mb-[14px]">
              <label className="text-[14px] text-[#353536]  font-medium   mb-[8px] md:mb-[10px]">
                Currency
              </label>
              <div className=" relative  flex items-center">
                <select
                  type="text"
                  placeholder=""
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  disabled
                  name="id"
                  id="full-name"
                  value="NGN"
                  //onChange={() => {}}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                >
                  <option value="USD" className=" text-[14px]">
                    -- USD --
                  </option>
                  <option value="NGN" className=" text-[14px]">
                    -- NGN --
                  </option>
                </select>
              </div>
            </div>

            <Tooltip id="my-tooltip" />

            <div className="mb-[10px]">
              <label className="text-[14px] text-[#353536] leading-[20px]   mb-[8px] flex items-center gap-1">
                Slug{" "}
                <a
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="If you set your slug to be stationaries, your payment link will look like this https://vantapp.com/pay/stationaries"
                  data-tooltip-place="top"
                >
                  <InfoCircle size="16" color="#667185" variant="Bold" />
                </a>
              </label>
              <div className=" relative   flex items-center">
                <span className="text-[12px] text-[#667185] leading-[20px] absolute left-[16px] pr-2  border-[#D0D5DD] border-r-[0.2px]">
                  https://vantapp.com/pay/
                </span>
                <input
                  type="text"
                  placeholder="stationaries"
                  className="w-full h-[38px] pl-[158px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="slug"
                  value={formValue.slug}
                  onChange={(e) => handleInput(e)}
                />
              </div>
            </div>

            <div className="mb-[18px]">
              <label className="text-[14px] text-[#353536]  font-medium   mb-[8px] md:mb-[10px]">
                Tax(%)
              </label>
              <div className=" relative  flex items-center">
                <input
                  type="number"
                  placeholder=""
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="tax"
                  value={formValue?.tax}
                  onChange={(e) => handleInput(e)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="mb-[18px]">
              <label className="text-[14px] text-[#353536]  font-medium   mb-[8px] md:mb-[10px]">
                Note
              </label>
              <div className=" relative  flex items-center">
                <textarea
                  type="text"
                  placeholder=""
                  className="w-full h-[108px] p-[10px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="note"
                  value={formValue?.note}
                  onChange={(e) => handleInput(e)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
          <div className=" w-full bg-white p-3 md:p-5 rounded-lg border-[0.2px] border-[#98a2b3] ">
            <div className="mb-[10px]">
              <p className="text-[14px] text-[#353536]  font-medium   mb-[8px]">
                Discount:
              </p>

              <label className="text-[14px] text-[#353536]  font-medium   mb-[8px] md:mb-[10px]">
                Discount Type:
              </label>

              <div className=" gap-4   flex items-center">
                <select
                  type="text"
                  placeholder=""
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="discount_type"
                  value={formValue?.discount_type}
                  onChange={(e) => handleInput(e)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                >
                  <option value="">-- select type --</option>
                  <option value="percentage">percentage</option>
                  {/* <option value="value">value</option> */}
                </select>
              </div>

              <div className="mt-[10px]">
                <label className="text-[14px] text-[#353536] leading-[20px] font-medium   mb-[8px] md:mb-[10px]">
                  Discount Amount:
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder="200"
                    className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    disabled={!formValue?.discount_type}
                    name="discount"
                    value={formValue?.discount}
                    onChange={(e) => handleInput(e)}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full bg-white p-3 md:p-5 rounded-lg border-[0.2px] border-[#98a2b3] ">
            <div className="mb-[10px]">
              <p className="text-[14px] text-[#353536]  font-medium   mb-[8px]">
                Recurring Payment:
              </p>

              <div className=" gap-2  flex items-center">
                <label className="text-[14px] text-[#353536]  font-medium">
                  Accept Recurring Payment:
                </label>
                <input
                  type="checkbox"
                  placeholder=""
                  className="   text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="recurring"
                  value={formValue?.recurring}
                  onChange={() =>
                    setFormValue({
                      ...formValue,
                      recurring: !formValue?.recurring,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>

              {formValue?.recurring && (
                <div className="mt-[10px]">
                  <label className="text-[14px] text-[#353536] leading-[20px] font-medium   mb-[8px] md:mb-[10px]">
                    Recurring Interval :
                  </label>
                  <div className=" relative    flex items-center">
                    <select
                      type="text"
                      placeholder=""
                      className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                      name="recurring"
                      value={formValue?.recurring}
                      onChange={(e) => handleInput(e)}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    >
                      <option value="">-- select options --</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className=" w-full bg-white p-3 md:p-5 rounded-lg border-[0.2px] border-[#98a2b3] ">
            <div className="mb-[10px]">
              <p className="text-[14px] text-[#353536]  font-medium   mb-[8px]">
                Invoice Due:
              </p>

              <label className="text-[14px] text-[#353536]  font-medium   mb-[8px] md:mb-[10px]">
                Due Date:
              </label>

              <div className=" gap-4   flex items-center">
                <input
                  type="date"
                  placeholder=""
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  name="due_date"
                  value={formValue?.due_date}
                  onChange={(e) => handleInput(e)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>

              <div className="mt-[10px] flex gap-1 items-center">
                <label className="text-[14px] whitespace-nowrap text-[#353536] leading-[20px] font-medium ">
                  Due Reminder :
                </label>

                <input
                  type="checkbox"
                  placeholder=""
                  className="   text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="due_reminder"
                  value={formValue?.due_reminder}
                  onChange={() =>
                    setFormValue({
                      ...formValue,
                      due_reminder: !formValue?.due_reminder,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
              {formValue?.due_reminder && (
                <div className="mt-[10px]">
                  <label className="text-[14px] text-[#353536] leading-[20px] font-medium   mb-[8px] md:mb-[10px]">
                    Due Reminder Interval :
                  </label>
                  <div className=" relative    flex items-center">
                    <select
                      type="text"
                      placeholder=""
                      className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                      required
                      name="id"
                      id="full-name"
                      //value=""
                      //onChange={() => {}}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    >
                      <option value="">-- select options --</option>
                      <option value="2">2 days</option>
                      <option value="3">3 days</option>
                      <option value="5">5 days</option>
                      <option value="7">7 days</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border  border-[#98a2b3] my-3" />

          <div className="flex-between mb-5 ">
            <button className="px-4 py-2  text-[14px] rounded-lg border-[0.2px]  border-[#98a2b3] text-md bg-slate-100">
              Cancel
            </button>
            <button
              onClick={() => submitInvoice()}
              className="px-4 py-2 text-[14px] rounded-lg text-white bg-[#26ae5f] flex items-center justify-center text-md "
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Submit</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
