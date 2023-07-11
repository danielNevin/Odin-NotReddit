// Importing Dependencies and necessary Components
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firestore";
import { signOut } from "firebase/auth";
import SearchCard from "./SearchCard";

export default function Header(props) {

  const navigate = useNavigate();

  // State variables
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(false);
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  // Event handlers
  const handleLogoHover = () => {
    setIsLogoHovered(true);
  }

  const handleUserHover = () => {
    setIsUserHovered(true);
  }

  const handleUserClick = () => {
    setIsUserClicked(!isUserClicked);
  }

  const handleInputClick = () => {
    setIsSearchActive(true);
  }

  const handleMouseLeave = () => {
    setIsLogoHovered(false);
    setIsUserHovered(false);
    setIsSearchActive(false);
  };

  const handleCancel = () => {
    setSearchInput('');
  }

  // Functions to dynamically generate CSS classes based on state
  const logoSVGClass = () => {
    let classes = 'fill-lime-500 transition-all';

    if (isLogoHovered) {
      classes = 'fill-lime-600 transition-all'
    }

    return classes;
  }

  const logoTextClass = () => {
    let classes = 'text-2xl text-lime-500 transition-all tracking-widest';

    if (isLogoHovered) {
      classes = 'text-3xl text-lime-600 transition-all tracking-widest'
    }

    return classes;
  }

  const userSVGClass = () => {
    let classes = 'fill-lime-500 transition-all';

    if (isUserHovered) {
      classes = 'fill-lime-600 transition-all'
    }

    return classes;
  }

  const userTextClass = () => {
    let classes = 'text-lg text-gray-500 transition-all';

    if (isUserHovered) {
      classes = 'text-lg text-gray-600 transition-all'
    }

    return classes;
  }

  // Search functionality
  const handleSearch = (event, posts) => {
    const userInput = event.target.value;
    setSearchInput(userInput);
    if (posts) {
      const filteredData = posts.filter((item) =>
        item.title.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredResults(filteredData);
    }
  }

  // Logout functionality
  const handleLogout = () => {               
    signOut(auth).then(() => {
      navigate("/");
      console.log("Signed out successfully");
      handleUserClick();
    }).catch((error) => {
      console.log(error);
    });
  }

  // Update posts when the prop changes
  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  return (
    <>
      <div id="container" className="grid grid-cols-3 bg-white shadow-md w-screen">
        <Link to="/">
          <div id="logo-container" className="flex items-center justify-start gap-2 py-2 px-6 cursor-pointer" onMouseEnter={ handleLogoHover } onMouseLeave={ handleMouseLeave }>
            <svg className={ logoSVGClass() } xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
              <path d="M480-294q78 0 132-54t54-132q0-78-54-132t-132-54q-78 0-132 54t-54 132q0 78 54 132t132 54Zm.078 228.131q-85.469 0-161.006-32.395-75.536-32.395-131.975-88.833-56.438-56.439-88.833-131.897-32.395-75.459-32.395-160.928 0-86.469 32.395-162.006 32.395-75.536 88.745-131.504 56.349-55.968 131.849-88.616 75.5-32.648 161.017-32.648 86.516 0 162.12 32.604 75.603 32.604 131.529 88.497t88.549 131.452Q894.696-566.584 894.696-480q0 85.547-32.648 161.075-32.648 75.527-88.616 131.896-55.968 56.37-131.426 88.765-75.459 32.395-161.928 32.395ZM480-145.087q139.739 0 237.326-97.732Q814.913-340.551 814.913-480q0-139.739-97.587-237.326-97.587-97.587-237.609-97.587-139.021 0-236.826 97.587-97.804 97.587-97.804 237.609 0 139.021 97.732 236.826Q340.551-145.087 480-145.087ZM480-480Z"/>
            </svg>
            <span className={ logoTextClass() }>NotReddit</span>
          </div>
        </Link>
        <div id="searchbar" className="flex items-center justify-center py-2 gap-4 transition-all">
          <input className="bg-stone-50 rounded-full shadow-inner h-8 w-[30rem] px-4 focus:outline-none focus:outline-lime-500 focus:bg-stone-100 transition-all hover:bg-stone-100" type="search" placeholder="Search" value={searchInput} onChange={(event) => handleSearch(event, props.posts)} onClick={ handleInputClick }/>
          { (searchInput) && 
            <button className="flex p-1 rounded-full bg-red-500 transition-all hover:bg-red-600 hover:scale-110 shadow-inner" onClick={ handleCancel }>
              <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16"><path d="m249-183-66-66 231-231-231-231 66-66 231 231 231-231 66 66-231 231 231 231-66 66-231-231-231 231Z"/></svg>
            </button>
          }
        </div>
        <div id="account" className="flex items-center justify-end py-2 px-6 gap-4">
          { (!auth.currentUser) && 
          <Link to="/login" >
            <button className="bg-lime-500 hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[6rem] h-[2.5rem] rounded-xl transition-all" type="button">
              Log In
            </button>
          </Link>}
          <div className="flex items-center p-1 justify-center gap-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all" onMouseEnter={ handleUserHover } onMouseLeave={ handleMouseLeave } onClick={ handleUserClick }>
            <svg className={ userSVGClass() } xmlns="http://www.w3.org/2000/svg" height="38" viewBox="0 -960 960 960" width="38">
              <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z"/>
            </svg>
            <span className={ userTextClass() }>{ auth.currentUser?.displayName }</span>
          </div>
        </div>
      </div>
      { isUserClicked && 
        <div className="flex items-center px-6 py-2 gap-4 w-[10rem] h-min rounded-md border bg-white cursor-pointer shadow-md hover:shadow-lg hover:bg-red-50 hover:border-gray-300 text-gray-500 hover:text-red-500 transition-all absolute right-[0.5rem] top-[4.5rem] z-0" onClick={ handleLogout } onMouseLeave={ handleUserClick }>
          Logout
        </div> 
      }
      { ( searchInput && filteredResults.length > 0 && isSearchActive ) &&
      <div className="flex flex-col absolute max-h-[25rem] overflow-scroll top-20 transition-all gap-1 overflow-x-hidden bg-stone-200 scroll-smooth rounded-md shadow-md z-0 px-2 backdrop-blur-sm" onMouseLeave={ handleMouseLeave }>
        { filteredResults.map((item) => (
          <Link to={ `/post/${ item.id }` }>
            <SearchCard item={ item } />
          </Link>
        )) }
      </div>
      }
    </>
  )
}