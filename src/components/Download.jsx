import React from "react";

export default function Download ({handleDownload}) {
    return (
        <button className="download-btn" onClick={handleDownload}><i className="icon-download"></i>Download</button>
    )
}