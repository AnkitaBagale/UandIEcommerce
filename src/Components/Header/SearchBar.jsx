import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const searchKeywords = [
  "Brustro",
  "Bianyo",
  "Camel",
  "DOMS",
  "Faber Castell",
  "Staedtler",
  "Blenders",
  "Colours",
  "Colour Palettes",
  "Drawing Boards",
  "Drawing Pencils",
  "Drawing Surfaces",
  "Eraser",
  "Portfolio Storage",
  "Painting Brush",
  "Painting Knives"
];

export const SearchBar = () => {
  const [activeSearchIcon, setSearchIconActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarRef = useRef(null);
  const closeSearchBar = (e) => {
    if (!searchBarRef.current.contains(e.target)) {
      setSearchIconActive(false);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("click", closeSearchBar);

    return () => {
      document.removeEventListener("click", closeSearchBar);
    };
  }, []);

  const searchKeywordsOptions = searchKeywords
    .map((item) => {
      if (item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        return (
          <li
            className="suggestion-item text-light-weight"
            key={item}
            onClick={(e) => {
              navigate(`/search?searchTerm=${item}`);
              setSearchTerm("");
              setSearchIconActive(false);
            }}
          >
            {item}
          </li>
        );
      }
    })
    .filter((item) => item !== undefined);

  return (
    <>
      <div
        className={`search-bar ${activeSearchIcon ? "activeSearchBar" : ""}`}
        ref={searchBarRef}
      >
        <button
          className="search-bar-btn link-no-style"
          type="submit"
          onClick={() => {
            if (searchTerm !== "") {
              navigate(`/search?searchTerm=${searchTerm}`);
              setSearchIconActive(false);
            }
          }}
        >
          <i className="fa fa-search"></i>
        </button>
        <input
          className="search-bar-input"
          type="text"
          placeholder="Type to search"
          onFocus={() => setSearchIconActive(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        {searchTerm !== "" && (
          <button
            className="search-clear-icon link-no-style"
            onClick={() => {
              setSearchTerm("");
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
        {searchTerm !== "" && (
          <ul
            style={{ display: activeSearchIcon ? "block" : "none" }}
            className="datalist-for-search list-style-none"
          >
            {searchKeywordsOptions.length !== 0 ? (
              searchKeywordsOptions
            ) : (
              <li className="suggestion-item">{`Oh! No search results for: "${searchTerm}"`}</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};
