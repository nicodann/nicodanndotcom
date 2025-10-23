import Markdown from "react-markdown";
import bioSource from '../../docs/NicoDannDrums_Bio2025.md'
import shortBioSource from '../../docs/NicoDannDrums_ShortBio2025.md'
import { useEffect, useState } from "react";
import BioDownloadButtons from "./BioDownloadButtons";



export default function Bio() {
  const [fullBio, setFullBio] = useState<string>()
  const [ shortBio, setShortBio ] = useState<string>()
  const [displayedBio, setDisplayedBio] = useState<string>()
  const [isBioTruncated, setIsBioTruncated] = useState(true);

  useEffect(() => {
    isBioTruncated 
      ? setDisplayedBio(fullBio?.substring(0,690) + '...')
      : setDisplayedBio(fullBio)
  }, [isBioTruncated, fullBio]);


  fetch(bioSource)
    .then(response => response.text())
    .then(text => {
      setFullBio(text)
    })

  fetch(shortBioSource)
      .then(response => response.text())
      .then(text => {
        setShortBio(text)
      })

  const ExpandCollapseButton = () => (
    <p 
      className="text_button" 
      onClick={() => {
        isBioTruncated 
          ? setIsBioTruncated(false) 
          : setIsBioTruncated(true)
      }}
    >
      {isBioTruncated ? 'expand' : 'collapse'}
    </p>
  )

  return (
    <div 
      id="bio_wrap"
      className={`
        animated_height 
        ${isBioTruncated ? "truncated" : "expanded"}
      `}
    >
      {!isBioTruncated && <ExpandCollapseButton />}
      <div id="bio_markdown_wrap">
        <Markdown>{displayedBio}</Markdown>
        <ExpandCollapseButton />
      </div>
      <BioDownloadButtons bio={fullBio} shortBio={shortBio} />
    </div>
  )
}
