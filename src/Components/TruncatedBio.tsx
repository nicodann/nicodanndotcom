import Markdown from "react-markdown";
import bioSource from '../docs/bio.md'
import { useEffect, useState } from "react";



export default function TruncatedBio() {
  const [fullBio, setFullBio] = useState<string>()
  const [displayedBio, setDisplayedBio] = useState<string>()
  const [isBioTruncated, setIsBioTruncated] = useState(true);

  useEffect(() => {
    isBioTruncated 
      ? setDisplayedBio(fullBio?.substring(0,300) + '...')
      : setDisplayedBio(fullBio)
  }, [isBioTruncated, fullBio]);


  fetch(bioSource)
    .then(response => response.text())
    .then(text => {
      setFullBio(text)
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
      id="truncated_bio_wrap"
      className={`
        animated_height 
        ${isBioTruncated ? "truncated" : "expanded"}
      `}
    >
      {!isBioTruncated && <ExpandCollapseButton />}
      <Markdown>{displayedBio}</Markdown>
      <ExpandCollapseButton />
    </div>
  )
}
