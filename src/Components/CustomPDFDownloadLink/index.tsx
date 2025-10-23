import { Document, Page, PDFDownloadLink, StyleSheet, Text } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  heading1: { fontSize: 24, marginBottom: 10 },
  heading2: { fontSize: 18, marginBottom: 8 },
  paragraph: { 
    marginBottom: 6, 
    // lineHeight: 1.5 
  },
});

export const PDFDocument = ({ markdown }: { markdown: string }) => {
  const lines = markdown.split("\n");

  return (
    <Document>
      <Page style={styles.page}>
        {lines.map((line, i) => {
          if (line.startsWith("# ")) return <Text key={i} style={styles.heading1}>{line.replace("# ", "")}</Text>;
          if (line.startsWith("## ")) return <Text key={i} style={styles.heading2}>{line.replace("## ", "")}</Text>;
          if (line.trim() === "") return null;
          return <Text key={i} style={styles.paragraph}>{line}</Text>;
        })}
      </Page>
    </Document>
  );
};

export default function CustomPDFDownloadLink({ markdown, fileName, buttonText }: { markdown: string, fileName: string, buttonText?: string }) {
  return (
    <PDFDownloadLink
      document={<PDFDocument markdown={markdown} />}
      fileName={fileName}
      style={{
        display: "inline-block",
      }}
      >

      {({ loading }) => <button style={{
        backgroundColor: "#0070f3",
        color: "white",
        border: "none",
        padding: "10px 15px",
        fontSize: 16,
        borderRadius: 4,
        textDecoration: "none",

      }}>{loading ? "Preparing PDF..." : buttonText ? buttonText : "Download PDF"}</button>}
    </PDFDownloadLink>
    
  )
}

