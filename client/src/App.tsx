import axios from 'axios';
import React, { useState } from 'react';

// Define types for the response from the API
type ShortenApiResponse = {
  originalUrl: string;
  shortUrl: string;
};

const App: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleShortenClick = async () => {
    // Reset error and short URL states
    setError('');
    setShortUrl('');

    // Here we simulate the POST request to the API
    try {
      setIsLoading(true);
      // Simulating a successful API response after a delay
      const res: {data:{shortUrl: string} } = await axios.post("http://localhost:3000/shorten", { originalUrl: originalUrl });
      console.log("short usrl",res)

      setShortUrl(res.data.shortUrl);
      setIsLoading(false);
    } catch (e) {
      setError('An error occurred while trying to shorten the URL.');
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl).then(
      () => {
        alert("Url copied")
      },
      (err) => {
        setError('Failed to copy the URL.');
      }
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
      <div style={{
        display: "flex", flexDirection: "column", width: "21%", height: "36%", backgroundColor: "white", borderRadius: "10px"
        , justifyContent: "center", alignItems: "center", padding: "10px 20px"
      }}>
        <div style={{ gap: "10px" }}>
          <h2 style={{ color: "black" }}>URL Shortener 🔗</h2>
          <input
            type="text"
            placeholder="Enter the URL to shorten"
            value={originalUrl}
            style={{ marginRight: "10px", height: "32px" }}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button style={{ backgroundColor: "blueviolet" }} onClick={handleShortenClick} disabled={isLoading}>
            {isLoading ? 'Shortening...' : 'Shorten'}
          </button>
        </div>
        {shortUrl && (
          <div>
            <p >Success! Here's your short URL:</p>
            <a style={{ marginRight: "10px" }} href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button style={{ backgroundColor: "blueviolet" }} onClick={handleCopyToClipboard}>
              Copy
            </button>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>

    </div>
  );
};

export default App;
