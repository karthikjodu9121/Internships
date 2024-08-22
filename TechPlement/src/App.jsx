import React, { useEffect, useState } from "react";
import "./index.css";
import Quote from "./Quote";
import Btn from "./Button";
import Bookmark from "./Bookmark";
import { colors } from "@mui/material";

function App() {
    const [quote, setQuote] = useState([]);
    const [newQuote, setNewQuote] = useState("");
    const [authName, setAuthName] = useState('');
    const [errorMesg, setErrorMesg] = useState('');
    const [bookmarks, setBookmarks] = useState([]);
    const [randomColorStyle, setRandomColorStyle] = useState({
        backgroundColor: "black",
        color: "black"
    });

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var randomColor = '#';
        var randomBgColor = '#';
        for (var i = 0; i < 6; i++) {
            randomColor += letters[Math.floor(Math.random() * 16)];
            randomBgColor += letters[Math.floor(Math.random() * 16)];
        }
        setRandomColorStyle({
            backgroundColor: randomColor,
            color: randomBgColor
        });
    }

    function handleBookmark() {
        setBookmarks([...bookmarks, quote]);
    }

    useEffect(() => {
        getRandomColor();
        let cleanFetch;
        if (authName === '') {
            cleanFetch = fetch("https://api.quotable.io/random")
                .then(res => res.json())
                .then(
                    (quote) => {
                        setErrorMesg("");
                        setQuote(quote);
                    }
                );
        } else {
            cleanFetch = fetch(`https://api.quotable.io/random?author=${authName}`)
                .then(res => res.json())
                .then(
                    (quote) => {
                        if (quote.statusCode === 404) {
                            setErrorMesg("Author not found");
                            setQuote('');
                        } else {
                            setErrorMesg("");
                            setQuote(quote);
                        }
                    }
                );
        }
        return () => clearInterval(cleanFetch);

    }, [newQuote]);

    return (
        <div className="container" style={randomColorStyle}>
            <h1 style={{marginBottom : "30px", color : "white", fontFamily : 'roboto', fontWeight : 'bold'}}>Quote Generator</h1>
            <div className="inputContainer">
                <input className="searchInput" type='search' placeholder="enter author" value={authName} onChange={(event) => setAuthName(event.target.value)} />
                <p id="error-mesg" style={{ color: 'red' }}>{errorMesg}</p>
            </div>
            <div id="quote-box">
                <Quote key={quote._id} quote={quote} />
                <div className="icon-box">
                    <Btn text={"New quote"} id={"new-quote"} onCall={setNewQuote} randomColor={randomColorStyle.color} />
                    <button onClick={handleBookmark} style={{ marginLeft: '10px', backgroundColor: randomColorStyle.color, color: 'white', padding : '5px', borderRadius : '5px', borderStyle :'none' }}>Bookmark</button>
                </div>
            </div>
            <div id="bookmark-box">
                <h1 style={{color: 'white', fontWeight : 'bold', fontFamily : 'roboto', marginTop : '20px'}}>BookMarks</h1>
                {bookmarks.map((bookmark, index) => (
                    <Bookmark key={index} quote={bookmark} />
                ))}
            </div>
        </div>
    );
}

export default App;
