import Markdown from "react-markdown";
import bioSource from '../docs/bio.md'
import { useState } from "react";

export default function Bio() {
  const [bio, setBio] = useState<string>()
  fetch(bioSource)
    .then(response => response.text())
    .then(text => setBio(text))
  return (
    <Markdown>{bio}</Markdown>
  )
}
