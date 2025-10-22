import Markdown from "react-markdown";
import bioSource from '../docs/Nico Dann Biography.md'
import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BioPDF } from "./bioPDF";



export default function Bio() {
  const [bio, setBio] = useState<string>()

  fetch(bioSource)
    .then(response => response.text())
    .then(text => {
      setBio(text)
    })

  return (
    <div id="bio_wrap">
      <Markdown>{bio}</Markdown>

      <PDFDownloadLink
        document={<BioPDF markdown={bioSource} />}
        fileName="NicoDann_Bio.pdf"
        style={{
          marginTop: 20,
          padding: "10px 15px",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: 4,
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  )
}
