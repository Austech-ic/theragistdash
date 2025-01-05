import React from 'react'
import { NumericFormat } from 'react-number-format'
import { useLocation } from 'react-router-dom'
import { formatDatewithYear } from '../../utils/helperFunctions'

const SaveInvoice = () => {
    const location = useLocation()
const {total, items, formValue, customer, profile, subtotal} = location.state
const {invoiceData} = location.state


  return (
    <div className="p-[20px] bg-[#F2F2F2] min-h-screen ">
 <div className="w-full    bg-white  pt-4 pb-7 px-[10px] md:p-4 md:pb-7 rounded-lg border-[0.2px] border-[#98a2b3] ">
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
            <img
              src="./assets/logo.png"
              alt="invoice logo"
              className=" h-[40px] md:h-[60px]"
            />
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
                {formValue?.due_date && (
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
                  {invoiceData?.name}
                </p>
                <p className="text-[#667185]  text-[14px] font-normal  ">
                  {invoiceData?.address}
                </p>
                {invoiceData?.phone && (
                  <p className="text-[#667185]  text-[14px] font-normal  ">
                    <strong>Tel: </strong> {invoiceData?.phone}
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
            <table className='w-full'>
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
                    <td className="pb-2 text-center">
                    {item.name}
                    </td>
                    <td className="pb-2 text-center">
                    {item.quantity}
                     
                    </td>
                    <td className="pb-2 text-center">
                    {item.price}
                     
                    </td>
                    <td className="pb-2 text-center ">
                    {(item.price * item.quantity).toFixed(2)} 
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         

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
                  value={subtotal}
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
             {formValue?.discount && 
              <li className=" border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                <p className="text-[#667185]  text-[16px]  md:text-[18px]  font-medium  ">
                  Discount
                </p>
                <p className="text-[#667185]  text-[16px]   font-normal  ">
                  {formValue?.discount} {formValue?.discount_type === "percentage" ?  "%": ""}
                </p>
              </li>
             } 
              <li className=" border-b-[0.2px] border-[#98a2b3] flex-between py-2">
                <p className="text-[#667185]  text-[16px] md:text-[18px]    font-medium  ">
                  Total
                </p>

                <NumericFormat
                  value={total}
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
    </div>
  )
}

export default SaveInvoice