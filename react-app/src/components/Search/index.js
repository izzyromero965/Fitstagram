import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadResults } from '../../store/search';
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state?.searchResults?.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState({ visibility: 'hidden' });

  useEffect(() => {
    if (searchTerm != '') {
      dispatch(loadResults(searchTerm));
    }
  }, [dispatch, searchTerm]);

  return (
    <div>
      <input
        placeholder="Search"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchField"
        onClick={(e) => setShowResults({ visibility: 'visible' })}
      />
      <div style={showResults} className="results">
        {searchTerm !== '' &&
          results?.map((user) => (
            <a
              key={user?.id}
              href={`/users/${user.id}`}
              className="results-link"
            >
              <img src={user?.profile_image_url} className="search-pic" />
              <div>
                <div>{user?.username}</div>
                <div>{user?.nick_name}</div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
};

export default Search;
