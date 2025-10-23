import Markdown from "react-markdown";
import bioSource from '../docs/NicoDannDrums_Bio2025.md'
import shortBioSource from '../docs/NicoDannDrums_ShortBio2025.md'
import { useState } from "react";
import CustomPDFDownloadLink from "./CustomPDFDownloadLink";



export default function Bio() {
  const [bio, setBio] = useState<string>()
  const [ shortBio, setShortBio ] = useState<string>()

  fetch(bioSource)
    .then(response => response.text())
    .then(text => {
      setBio(text)
    })

  fetch(shortBioSource)
    .then(response => response.text())
    .then(text => {
      setShortBio(text)
    })

  return (
    <div id="bio_wrap">

      <Markdown>{bio}</Markdown>

      <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
        {bio &&
          <CustomPDFDownloadLink 
            markdown={bio} 
            buttonText="Download Full Bio" 
            fileName="NicoDannDrums_Bio2025.pdf" 
          />
        }
        {shortBio &&
          <CustomPDFDownloadLink 
            markdown={shortBio} 
            buttonText="Download Short Bio" 
            fileName="NicoDannDrums_ShortBio2025.pdf" 
          />
        }

      </div>


    </div>
  )
}
