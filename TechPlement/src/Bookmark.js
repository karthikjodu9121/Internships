import React from "react";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

function Bookmark({ quote }) {
    return (
        <div className="bookmark-item" style={{ animation: "blink 1.4s ease", marginTop: "20px"}}>
            <FormatQuoteIcon fontSize={"large"} style={{color : 'white'}} />
            <span style={{color:'white'}}>{quote.content}</span>
            <div style={{color:'white'}}>- {quote.author}</div>
        </div>
    );
}

export default Bookmark;
