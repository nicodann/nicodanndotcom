import Markdown from "react-markdown";
import bioSource from '../../docs/NicoDannDrums_Bio2025.md'
import shortBioSource from '../../docs/NicoDannDrums_ShortBio2025.md'
import { PropsWithChildren, useEffect, useState } from "react";
import BioDownloadButtons from "./BioDownloadButtons";



export default function Bio() {
  const [fullBio, setFullBio] = useState<string>()
  const [ shortBio, setShortBio ] = useState<string>()
  const [displayedBio, setDisplayedBio] = useState<string>()
  const [isBioTruncated, setIsBioTruncated] = useState(true);

  useEffect(() => {
    isBioTruncated 
      ? setDisplayedBio(fullBio?.substring(0,1090) + '...')
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

  const ExpandCollapseButton = ( { style }:{ style?: React.CSSProperties } ) => {
    return (
    <p 
      className="text_button"
      onClick={() => {
        isBioTruncated 
          ? setIsBioTruncated(false) 
          : setIsBioTruncated(true)
      }}
      style={{
            backgroundColor: 'white',
            fontSize: '14px',
            opacity: 0.8,
            color: 'black',
            padding: '3px 10px',
            ...style
      }}
    >
      {isBioTruncated ? 'expand' : 'collapse'}
    </p>
  )}

  return (
    <div 
      id="bio_wrap"
      className={`
        animated_height 
        ${isBioTruncated ? "truncated" : "expanded"}
      `}
    >
      <div id="bio_markdown_wrap">
      {!isBioTruncated && 
        <ExpandCollapseButton 
          style={{ 
            position: 'absolute', top: 0, left: 0,
          
          }} 
      />}
        <Markdown>{displayedBio}</Markdown>
        <ExpandCollapseButton />
      </div>
      <BioDownloadButtons bio={fullBio} shortBio={shortBio} />
    </div>
  )
}
