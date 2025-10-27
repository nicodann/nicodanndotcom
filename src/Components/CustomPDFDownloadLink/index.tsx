import { Document, Page, PDFDownloadLink, StyleSheet, Text } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  heading1: { fontSize: 24, marginBottom: 10 },
  heading2: { fontSize: 18, marginBottom: 8 },
  paragraph: { marginBottom: 6 },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
});

// Simple markdown parser for *italic* and **bold**
const parseInlineMarkdown = (text: string) => {
  const parts: JSX.Element[] = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index);
    if (before) parts.push(<Text key={key++}>{before}</Text>);

    const content = match[0];
    if (content.startsWith('**')) {
      parts.push(<Text key={key++} style={styles.bold}>{content.slice(2, -2)}</Text>);
    } else {
      parts.push(<Text key={key++} style={styles.italic}>{content.slice(1, -1)}</Text>);
    }

    lastIndex = match.index + content.length;
  }

  const after = text.slice(lastIndex);
  if (after) parts.push(<Text key={key++}>{after}</Text>);

  return parts;
};

export const PDFDocument = ({ markdown }: { markdown: string }) => {
  const lines = markdown.split("\n");

  return (
    <Document>
      <Page style={styles.page}>
        {lines.map((line, i) => {
          if (line.startsWith("# ")) return <Text key={i} style={styles.heading1}>{line.replace("# ", "")}</Text>;
          if (line.startsWith("## ")) return <Text key={i} style={styles.heading2}>{line.replace("## ", "")}</Text>;
          if (line.trim() === "") return null;
          return (
            <Text key={i} style={styles.paragraph}>
              {parseInlineMarkdown(line)}
            </Text>);
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

