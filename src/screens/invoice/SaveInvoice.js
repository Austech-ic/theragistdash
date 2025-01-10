import React, { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useLocation } from "react-router-dom";
import { formatDatewithYear } from "../../utils/helperFunctions";
import { ClipLoader } from "react-spinners";
import html2pdf from "html2pdf.js";
import { PayInvoiceUrl } from "../../utils/config";

const SaveInvoice = () => {
  const location = useLocation();
  const invoiceRef = useRef(null);
  const downloadInvoice = () => {
    setIsLoading(true);
    if (invoiceRef.current) {
      const pdfOptions = {
        margin: 10,
        filename: "invoice.pdf",
        image: { type: "img", quality: 1 },
        toPdf: { useCORS: true, scale: 1 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf(invoiceRef.current, pdfOptions);
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const { invoiceData, profile } = location.state;
  // console.log(invoiceData)

  return (
    <div className="px-[20px] pb-[20px] pt-[10px]   bg-[#F2F2F2] min-h-screen ">
      <div className="w-full flex justify-between items-center mb-[14px]">
        <div className="flex items-center mb-3">
          <Link to="/createinvoice">
            <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
              Create Invoice /
            </p>
          </Link>

          <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
            &nbsp; Saved Invoice
          </p>
        </div>
        <button
          onClick={downloadInvoice}
          className="px-4 py-2 text-[14px] rounded-lg text-white bg-[#26ae5f] hover:bg-opacity-80 flex items-center justify-center text-md "
        >
          {isLoading ? (
            <ClipLoader color={"white"} size={20} />
          ) : (
            <> Download PDF</>
          )}
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div
          ref={invoiceRef}
          className="w-full    bg-white  pt-4 pb-7 px-[10px] md:p-4 md:pb-7 rounded-lg border-[0.2px] border-[#98a2b3] "
        >
          <div className="flex-between mb-7 md:mb-[42px]">
            <div>
              {" "}
              <h2 className="text-[#000] text-[18px] md:text-[22px]  font-semibold mb-[1px]  ">
                Invoice
              </h2>
              <p className="text-[#667185]  text-[16px] md:text-[18px] xl:text-[20px] font-medium  ">
                #{invoiceData?.invoice_no}
              </p>
              <h2 className="text-[#000]  text-[13px] md:text-[16px]   font-semibold  ">
                {invoiceData.title}
              </h2>
            </div>
            <img src={profile?.logo} alt="" className="h-7 md:h-12" />
          </div>

          <div className="mb-4 md:mb-7">
            <ul className=" grid grid-cols-3">
              <li className="p-2 md:p-3 border-t-[0.2px] border-b-[0.2px] border-[#98a2b3]">
                <h2 className="text-[#000] text-[16px]   font-medium mb-[2px]  ">
                  Issue date
                </h2>
                <p className="text-[#667185]  text-[14px]  font-normal  mb-2 ">
                  {invoiceData?.date}
                </p>

                <h2 className="text-[#000] text-[16px]   font-medium mb-[2px]  ">
                  Due date
                </h2>
                {invoiceData?.due_date && (
                  <p className="text-[#667185]  text-[14px] font-normal  ">
                    {invoiceData?.due_date}
                  </p>
                )}
              </li>
              <li className="p-2 md:p-3 border-[0.2px]  border-[#98a2b3]">
                <h2 className="text-[#000] text-[16px]   font-medium mb-[2px]  ">
                  Billed to
                </h2>
                <p className="text-[#667185]  text-[16px]   font-medium  ">
                  {invoiceData?.customer?.name}
                </p>
                <p className="text-[#667185]  text-[14px] font-normal  ">
                  {invoiceData?.customer?.email}
                </p>
                <p className="text-[#667185]  text-[14px] font-normal  ">
                  {invoiceData?.customer?.address}
                </p>
                {invoiceData?.customer?.phone && (
                  <p className="text-[#667185]  text-[14px] font-normal  ">
                    <strong>Tel: </strong> {invoiceData?.customer?.phone}
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
          <div className="overflow-auto mt-6">
            <table className="w-full">
              {" "}
              <thead className="pb-4">
                <tr>
                  <th className="pb-1 border-b-[0.2px] ">Item Name</th>
                  <th className="pb-1 border-b-[0.2px] ">Quantity</th>
                  <th className="pb-1 border-b-[0.2px] ">Price</th>
                  <th className="pb-1 border-b-[0.2px] ">Line total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData?.invoice_items?.map((item, index) => (
                  <tr key={item.id}>
                    <td className="py-2 text-center">{item.item_name}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-center">{item.unit_price}</td>
                    <td className="py-2 text-center ">{item.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row gap-5 mt-[43px] mb-9">
            <div className="w-full md:w-[40%] border rounded-lg p-2 bg-slate-100 min-h-[100px] md:min-h-[130px]">
              <p className="text-[12px] md:text-[14px]">
                Note: {invoiceData?.note}
              </p>
            </div>

            <div className="total  w-full md:w-[60%]">
              <ul>
                <li className="border-t-[0.2px] border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                  <p className="text-[#667185]  text-[16px]  md:text-[18px]  font-medium  ">
                    Tax
                  </p>
                  <p className="text-[#667185]  text-[16px]   font-normal  ">
                    {invoiceData?.tax}%
                  </p>
                </li>
                <li className=" border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                  <p className="text-[#667185]  text-[16px] md:text-[18px]    font-medium  ">
                    Subtotal
                  </p>
                  <NumericFormat
                    value={invoiceData?.amount}
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
                {invoiceData?.discount && (
                  <li className=" border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                    <p className="text-[#667185]  text-[16px]  md:text-[18px]  font-medium  ">
                      Discount
                    </p>
                    <p className="text-[#667185]  text-[16px]   font-normal  ">
                      {invoiceData?.discount}{" "}
                      {invoiceData?.discount_type === "percentage" ? "%" : ""}
                    </p>
                  </li>
                )}
                <li className=" border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                  <p className="text-[#667185]  text-[16px] md:text-[18px]    font-medium  ">
                    Total
                  </p>

                  <NumericFormat
                    value={invoiceData?.total_amount}
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

          <div className="w-full flex justify-center my-[54px]">
            <a
              href={PayInvoiceUrl + invoiceData?.slug}
              rel="noreferrer"
              target="_blank"
              style={{ paddingTop: "8px", paddingBottom: "8px" }}
              className="px-4  flex flex-col  justify-center text-[14px] rounded-lg text-white bg-[#26ae5f] hover:bg-opacity-80  items-center  text-md "
            >
              <p
                style={{ paddingTop: "8px", matginBottom: "8px" }}
                className=" "
              >
                Click To Pay
              </p>
            </a>
          </div>
        </div>

        <div className="w-full lg:w-[30%] grid grid-cols-1 gap-3  bg-white p-3  rounded-lg border-[0.2px] border-[#98a2b3] h-full ">
          <div>
            <h3 className="text-[13px]">
              <span className="font-semibold">Currency:</span>{" "}
              {invoiceData?.currency}
            </h3>
          </div>

          {invoiceData?.discount_type && (
            <div>
              <h3 className="text-[13px]">
                <span className="font-semibold">Discount:</span>{" "}
                {invoiceData?.discount_type}{" "}
              </h3>
            </div>
          )}

          {invoiceData?.discount && (
            <div>
              <h3 className="text-[13px]">
                <span className="font-semibold">Discount:</span>{" "}
                {invoiceData?.discount}{" "}
                {invoiceData?.discount_type === "percentage" ? "%" : ""}
              </h3>
            </div>
          )}

          {invoiceData?.recurring === 1 && (
            <div>
              <h3 className="text-[13px]">
                <span className="font-semibold">Recurring:</span>{" "}
                {invoiceData?.recurring}{" "}
              </h3>
            </div>
          )}
          {invoiceData?.recurring_interval && (
            <div>
              <h3 className="text-[13px]">
                <span className="font-semibold">Recurring Interval:</span>{" "}
                {invoiceData?.recurring_interval}{" "}
              </h3>
            </div>
          )}

          {invoiceData?.due_reminder_interval && (
            <div>
              <h3 className="text-[13px]">
                <span className="font-semibold">Due Remainder Interval:</span>{" "}
                {invoiceData?.due_reminder_interval}{" "}
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaveInvoice;
