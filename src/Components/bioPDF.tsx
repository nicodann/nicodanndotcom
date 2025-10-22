// BioPDF.tsx
import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  heading1: { fontSize: 24, marginBottom: 10 },
  heading2: { fontSize: 18, marginBottom: 8 },
  paragraph: { marginBottom: 6, lineHeight: 1.5 },
});

export const BioPDF = ({ markdown }: { markdown: string }) => {
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
