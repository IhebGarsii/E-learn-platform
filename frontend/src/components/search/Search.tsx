import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "../../utl/debounce";

function Search() {
  const [term, setTerm] = useState("");

  const debouncedSearchTerm = useDebounce(term);
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search"],
    queryFn: () => searchProducts(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
  });
  return (
    <div className="flex mt-14 items-center mx-auto border w-[90%] md:w-[90%] lg:w-[49%]  pr-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-[5px] overflow-hidden">
      <input
        className="w-full h-full pl-5 outline-none placeholder-gray-500 text-sm"
        placeholder="Search for products"
        type="text"
        onChange={(e) => setTerm(e.target.value)}
      />
      <svg
        fill="#6B7280"
        viewBox="0 0 30 30"
        height="22"
        width="22"
        y="0px"
        x="0px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
      </svg>
      <div className="h-6 w-px bg-gray-500/50"></div>
      <svg
        fill="#6B7280"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 32.00 32.00"
        width="20px"
      >
        <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
        <g
          stroke-width="0.064"
          stroke="#CCCCCC"
          stroke-linejoin="round"
          stroke-linecap="round"
          id="SVGRepo_tracerCarrier"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <title>microphone</title>
          <desc>Created with Sketch Beta.</desc>
          <defs></defs>
          <g fill-rule="evenodd" fill="none" stroke-width="0.00032" id="Page-1">
            <g
              fill="#6B7280"
              transform="translate(-105.000000, -307.000000)"
              id="Icon-Set"
            >
              <path
                id="microphone"
                d="M111,314 C111,311.238 113.239,309 116,309 C118.761,309 121,311.238 121,314 L121,324 C121,326.762 118.761,329 116,329 C113.239,329 111,326.762 111,324 L111,314 L111,314 Z M116,331 C119.866,331 123,327.866 123,324 L123,314 C123,310.134 119.866,307 116,307 C112.134,307 109,310.134 109,314 L109,324 C109,327.866 112.134,331 116,331 L116,331 Z M127,326 L125,326 C124.089,330.007 120.282,333 116,333 C111.718,333 107.911,330.007 107,326 L105,326 C105.883,330.799 110.063,334.51 115,334.955 L115,337 L114,337 C113.448,337 113,337.448 113,338 C113,338.553 113.448,339 114,339 L118,339 C118.552,339 119,338.553 119,338 C119,337.448 118.552,337 118,337 L117,337 L117,334.955 C121.937,334.51 126.117,330.799 127,326 L127,326 Z"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default Search;
