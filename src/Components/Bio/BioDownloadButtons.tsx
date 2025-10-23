import CustomPDFDownloadLink from "../CustomPDFDownloadLink";

export default function BioDownloadButtons({bio, shortBio}: {bio: string | undefined, shortBio: string | undefined}) {
  return (
    <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
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
  )
}
