import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import logo from "../assets/VantLogo.png";
import { ArrowDown, ArrowUp } from "iconsax-react";
import { getFormattedCurrentDay } from "../utils/helperFunctions";
import { NumericFormat } from "react-number-format";

// Sample transaction data
const transactions = [
  {
    reference: "VNT_3Tc_1736492265",
    amount: 120,
    reason: "Payment via Invoice",
    status: "failed",
    type: "credit",
    date: "2025-01-10T06:57:45.000000Z",
    email: "ogundelecaleb13@gmail.com",
    fee: "30.84",
    balance_before: 147.06,
    balance_after: 147.06,
  },
  {
    reference: "VNT_imm_1736459044",
    amount: 120,
    reason: "Payment via Invoice",
    status: "successful",
    type: "credit",
    date: "2025-01-09T21:44:04.000000Z",
    email: "ogundelecaleb13@gmail.com",
    fee: "30.84",
    balance_before: 57.9,
    balance_after: 147.06,
  },
  {
    reference: "VNT_syS_1736458419",
    amount: 100,
    reason: "Payment via link",
    status: "failed",
    type: "credit",
    date: "2025-01-09T21:33:39.000000Z",
    email: "ogundelecaleb13@gmail.com",
    fee: "30.70",
    balance_before: 57.9,
    balance_after: 57.9,
  },
];

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: "#F7F9FC" },
  header: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    color: "#44444f",
  },
  subheader: {
    fontSize: 10,
    marginTop: 5,
    marginBottom: 10,
    color: "#666672",
    backgroundColor: "#fefefe",
    padding: 14,
    borderRadius: 4,
  },
  subheader2: {
    fontSize: 10,
    marginTop: 5,
    marginBottom: 10,
    color: "#666672",
    backgroundColor: "#fefefe",
    padding: 20,
    borderRadius: 4,
  },
  subHeadText: {
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 6,
    color: "#44444f",
  },
  date: {
    fontSize: 10,
    marginBottom: 10,
    textAlign: "center",
    color: "#9999A4",
  },
  details: { fontSize: 10, marginBottom: 5, color: "#666672" },
  logo: { width: 80, height: 40, alignSelf: "center", marginBottom: 7 },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "5",
    marginTop: 20,
    color: "#44444f",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1 solid gray",
    paddingVertical: 9,
  },
  rowHead: {
    flexDirection: "row",
    borderBottom: "1 solid gray",
    paddingVertical: 9,
    backgroundColor: "#E1E2E4FF",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  cell: { flex: 1, textAlign: "center", fontSize: 7 },
  cellHead: {
    flex: 1,
    textAlign: "center",
    fontSize: 8,
    fontWeight: "semibold",
  },
  flexItem: {
    width: "30%",
  },
  footerText: {
    fontSize: 8,
    textAlign: "center",
    color: "#666672",
  },
});

// PDF Document Component with Logo
export const StatementOfAccountPDF = ({
  data,
  profile,
  startDate,
  endDate,
}) => {
  const address = profile?.address + " " + profile?.state;
  const totalCredit = data?.filter((item) => item.type === "credit")?.length;
  const totalDebit = data?.filter((item) => item.type === "debit")?.length;

  const closingBalance = data.slice(-1)[0]?.balance_after;
  const openingBalance = data[0]?.balance_before;
  const totalTransactions = data.length;
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Company Logo */}
        <Image style={styles.logo} src={logo} />

        <Text style={styles.header}>Account Statement</Text>

        <View style={styles.subheader}>
          <Text>Account Name</Text>
          <Text style={styles.subHeadText}>
            {profile?.account_numbers[0]?.account_name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 18,
              flexWrap: "wrap",
              marginTop: 20,
            }}
          >
            <View style={styles?.flexItem}>
              <Text>Account Number:</Text>
              <Text style={styles.subHeadText}>
                {profile?.account_numbers[0]?.account_number}
              </Text>
            </View>
            <View style={styles?.flexItem}>
              <Text>Currency:</Text>
              <Text style={styles.subHeadText}>Naira</Text>
            </View>
            <View style={styles?.flexItem}>
              <Text>Current Balance:</Text>
              <Text style={styles.subHeadText}>
                <NumericFormat
                  value={profile?.wallet_balance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"NGN "}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => <Text>{value}</Text>}
                />
              </Text>
            </View>
            <View style={styles?.flexItem}>
              <Text>Address:</Text>
              <Text style={styles.subHeadText}>{address}</Text>
            </View>
            <View style={styles?.flexItem}>
              <Text>Total Credit:</Text>
              <Text
                style={[
                  styles.subHeadText,
                  { flexDirection: "row", gap: 3, alignItems: "center" },
                ]}
              >
                <ArrowDown size={14} color="green" />
                {totalCredit}
              </Text>
            </View>
            <View style={styles?.flexItem}>
              <Text>Total Debit:</Text>
              <Text
                style={[
                  styles.subHeadText,
                  { flexDirection: "row", gap: 3, alignItems: "center" },
                ]}
              >
                {" "}
                <ArrowUp size={14} color="red" />
                {totalDebit}
              </Text>
            </View>
          </View>{" "}
        </View>

        <View style={styles.subheader2}>
          <Text style={{ fontSize: 18, fontWeight: "semibold" }}>
            Naira Wallet Summary
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 20,
            }}
          >
            <View>
              <Text>Opening Balance:</Text>
              <Text style={styles.subHeadText}>
                {" "}
                <NumericFormat
                  value={openingBalance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"NGN "}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => (
                    <Text className="text-[#667185] robot font-semibold  text-[24px] leading-[26px] text-center  tracking-[0.2px]   ">
                      {value}
                    </Text>
                  )}
                />
              </Text>
            </View>
            <View>
              <Text>Closing Balance:</Text>
              <Text style={styles.subHeadText}>
                {" "}
                <NumericFormat
                  value={closingBalance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"NGN "}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => (
                    <Text className="text-[#667185] robot font-semibold  text-[24px] leading-[26px] text-center  tracking-[0.2px]   ">
                      {value}
                    </Text>
                  )}
                />
              </Text>
            </View>
            <View>
              <Text>Request Date:</Text>
              <Text style={styles.subHeadText}>{currentDate}</Text>
            </View>
            <View>
              <Text>Start Date:</Text>
              <Text style={styles.subHeadText}>{startDate}</Text>
            </View>{" "}
            <View>
              <Text>End Date:</Text>
              <Text style={styles.subHeadText}>{endDate}</Text>
            </View>{" "}
          </View>
        </View>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.rowHead, { fontWeight: "bold" }]}>
            <Text style={styles.cell}> Trans. Date</Text>
            <Text style={styles.cell}> Trans. Reference</Text>
            <Text style={styles.cell}>Description</Text>
            <Text style={styles.cell}>Remark</Text>
            <Text style={styles.cell}>Amount</Text>
            <Text style={styles.cell}>Balance Before</Text>
            <Text style={styles.cell}>Balance After</Text>
          </View>
          {/* Table Rows */}
          {data.map((txn, index) => (
            <View
              key={index}
              style={[
                styles.row,
                { backgroundColor: index % 2 === 0 ? "#F7F9FC" : "white" },
              ]}
            >
              <Text style={[styles.cell, { width: 60 }]}>
                {txn.date.split("T")[0]}
              </Text>
              <Text style={[styles.cell, { width: 180, marginRight: 8 }]}>
                {txn.reference}
              </Text>
              <Text style={[styles.cell]}>{txn.reason || "---"}</Text>
              <Text style={styles.cell}>{txn.remark || "---"}</Text>

              <Text style={styles.cell}>
                {" "}
                <NumericFormat
                  value={txn.amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"NGN "}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => (
                    <Text style={styles.cell}>{value || "-- || --"}</Text>
                  )}
                />
              </Text>
              <Text style={styles.cell}>
                <NumericFormat
                  value={txn.balance_before}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"NGN "}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => (
                    <Text style={styles.cell}>{value || "-- || --"}</Text>
                  )}
                />
              </Text>
              <Text style={styles.cell}>
                <NumericFormat
                  value={txn.balance_after}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"NGN "}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => (
                    <Text style={styles.cell}>{value || "-- || --"}</Text>
                  )}
                />
              </Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 60 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <Text style={styles.footerText}>www.vantapp.com</Text>
            <Text style={styles.footerText}>
              22 Glover Rd, Ikoyi, Lagos 106104, Lagos
            </Text>
            <Text style={styles.footerText}></Text>
          </View>

          <Text style={styles.cell}>
            Vant™️ is a registered trademark representing proprietary financial
            management software solutions. This trademark ensures the integrity,
            authenticity, and exclusivity of Vant’s offerings while underscoring
            its commitment to providing secure and reliable financial technology
            services.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
