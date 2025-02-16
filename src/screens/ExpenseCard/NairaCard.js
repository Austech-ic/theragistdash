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
import logo from "../../assets/VantLogo.png";

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
  table: { width: "100%", borderCollapse: "collapse", borderRadius: "5", marginTop: 20, color: "#44444f"},
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
    borderTopLeftRadius: 6
  },
  cell: { flex: 1, textAlign: "center", fontSize: 8 },
  cellHead: { flex: 1, textAlign: "center", fontSize: 8, fontWeight: "semibold" },

});

// PDF Document Component with Logo
export const TransactionPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Company Logo */}
      <Image style={styles.logo} src={logo} />

      <Text style={styles.header}>Transaction Statement</Text>

      <View style={styles.subheader}>
        <Text>Account Name</Text>
        <Text style={styles.subHeadText}>Expiry Date: 12/25</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 20
          }}
        >
          <View>
            <Text>Account Number:</Text>
            <Text style={styles.subHeadText}>ogundelecaleb13@gmail.com</Text>
          </View>
          <View>
            <Text>Currency:</Text>
            <Text style={styles.subHeadText}>Naira</Text>
          </View>
          <View>
            <Text>Current Balance:</Text>
            <Text style={styles.subHeadText}>ogundelecaleb13@gmail.com</Text>
          </View>
          <View>
            <Text>Address:</Text>
            <Text style={styles.subHeadText}>ogundelecaleb13@gmail.com</Text>
          </View>
          <View>
            <Text>Total Credit:</Text>
            <Text style={styles.subHeadText}>ogundelecaleb13@gmail.com</Text>
          </View>
          <View>
            <Text>Total Debit:</Text>
            <Text style={styles.subHeadText}>ogundelecaleb13@gmail.com</Text>
          </View>
        </View>{" "}
      </View>



      <View style={styles.subheader2}>
       
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 20
          }}
        >
          <View>
            <Text>Email Address:</Text>
            <Text style={styles.subHeadText}>ogundelecaleb13@gmail.com</Text>
          </View>
          <View>
            <Text>Email Address:</Text>
            <Text style={styles.subHeadText}>ogundelecaleb13@gmail.com</Text>
          </View>
          <View>
            <Text>Email Address:</Text>
            <Text style={styles.subHeadText}>ogundelecaleb13@gmail.com</Text>
          </View>
          <View>
            <Text>Email Address:</Text>
            <Text style={styles.subHeadText}>ogundelecaleb13@gmail.com</Text>
          </View>
        {" "}
      </View>
      </View>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.rowHead, { fontWeight: "bold" }]}>
          <Text style={styles.cell}> Trans. Date</Text>
          <Text style={styles.cell}> Trans. Reference</Text>
          <Text style={styles.cell}>Description</Text>
          <Text style={styles.cell}>Amount</Text>
          <Text style={styles.cell}>Balance Before</Text>
          <Text style={styles.cell}>Balance After</Text>
        </View>
        {/* Table Rows */}
        {transactions.map((txn, index) => (
          <View
            key={index}
            style={[
              styles.row,
              { backgroundColor: index % 2 === 0 ? "#F7F9FC" : "white" },
            ]}
          >
            <Text style={styles.cell}>{txn.date.split("T")[0]}</Text>
            <Text style={styles.cell}>{txn.reference}</Text>
            <Text style={styles.cell}>{txn.reason}</Text>

            <Text style={styles.cell}>₦{txn.amount}</Text>
            <Text style={styles.cell}>₦{txn.balance_before}</Text>
            <Text style={styles.cell}>₦{txn.balance_after}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Component to Auto-Download PDF
const NairaCard = () => {
  const generateAndDownloadPDF = async () => {
    const blob = await pdf(<TransactionPDF />).toBlob();
    saveAs(blob, "Transaction_Statement.pdf");
  };

  // useEffect(() => {
  //     generateAndDownloadPDF();
  // }, []); // Auto-download when the component loads

  return (
    <div>
      <button onClick={generateAndDownloadPDF}>Download Again</button>

      {/* <TransactionPDF /> */}
    </div>
  );
};

export default NairaCard;
