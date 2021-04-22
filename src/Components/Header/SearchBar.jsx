import { useEffect, useRef, useState } from "react";

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
              console.log("i was here");
              setSearchTerm(item);
            }}
          >
            {item}
          </li>
        );
      }
    })
    .filter((item) => item !== undefined);

  return (
    <label className="search-bar" ref={searchBarRef}>
      <span
        className={`search-bar-btn ${
          activeSearchIcon ? "activeSearchIcon shadow-box" : ""
        }`}
        type="submit"
      >
        <i className="fa fa-search"></i>
      </span>
      <input
        className="search-bar-input"
        type="text"
        placeholder="Type to search"
        onFocus={() => setSearchIconActive(true)}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
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
    </label>
  );
};
