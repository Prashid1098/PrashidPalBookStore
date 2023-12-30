import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import keazonBooksImage from './KeazoNBOOKS.png';
import KBIcon from './Group.png';
import Icon1 from './BookH.png';
import Icon2 from './Premium.png';
import Icon3 from './Notbell.png';
import Icon4 from './Profile.png';


const BookImage = ({ imageUrl }) => {
    return (
      <div>
        <img src={imageUrl} alt='' />
      </div>
    );
  };

function Nav() {
  const [searchInput, setSearchInput] = useState('');
  const [apiData, setApiData] = useState(null); // State to store API response data

  const HandleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const HandleSearch = () => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`;
    console.log('Search input:', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setApiData(data); // Store API response data in state
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  };

  return (
    <div className='nav-c'>
      <div>
        <span id='kb-Icon'>
          <img src={KBIcon} alt='' />
        </span>
        <span id='kb-T'>
          <img src={keazonBooksImage} alt='' />
        </span>
      </div>
      <div className='Search-bar'>
        <input
          type='text'
          placeholder='Search for the book you want and read it now... Sherlock Holmes, Harry Pot...'
          value={searchInput}
          onChange={HandleInputChange}
        />
        <button onClick={HandleSearch}>Search</button>
      </div>
      <div className='Options'>
        <a href='./index.js'>
          <img src={Icon1} alt='' />
        </a>
        <a href='./index.js'>
          <img src={Icon2} alt='' />
        </a>
        <a href='./index.js'>
          <img src={Icon3} alt='' />
        </a>
        <a href='./index.js'>
          <img src={Icon4} alt='' />
        </a>
      </div>
      {/* Display the image from the API response */}
      <div className='nav-c'>
      
      {/* Display the image from the API response using the BookImage component */}
      {apiData && apiData.items && apiData.items.length > 0 && (
        <BookImage imageUrl={apiData.items[0].volumeInfo.imageLinks.smallThumbnail} />
      )}
    </div>
    </div>
  );
}

ReactDOM.render(<Nav />, document.getElementById('nav-bar'));
ReactDOM.render(<BookImage />, document.getElementById('result'));
