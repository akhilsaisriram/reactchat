import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pako from 'pako';
import Button from "@mui/material/Button";

const PdfViewer = ({ base64Data }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedPDF, setSelectedPDF] = useState(null);

  // Function to compress and decompress PDF


  // Function to download decompressed PDF


  const handleDownload = () => {

    
           console.log("got", base64Data);
          const uint8Array = new Uint8Array(base64Data);
       
    if (uint8Array) {
      const decompressedData = pako.ungzip(uint8Array);
      const blob = new Blob([decompressedData]);
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'decompressed.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      {/* <Button onClick={()=>{console.log(base64Data)}}>ckkk pdf</Button> */}
      <Button onClick={handleDownload}>Download pdf</Button>
    </div>
  );
};

export default PdfViewer;
