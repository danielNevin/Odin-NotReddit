import React, { useState } from "react";

export default function HeaderSignup(props) {

  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const handleLogoHover = () => {
    setIsLogoHovered(true);
  }

  const handleMouseLeave = () => {
    setIsLogoHovered(false);
  };

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

  return (
    <>
      <div id="container" className="grid grid-cols-3 bg-white shadow-md w-screen">
        <a href="/">
          <div id="logo-container" className="flex items-center justify-start gap-2 py-2 px-6 cursor-pointer" onMouseEnter={ handleLogoHover } onMouseLeave={ handleMouseLeave }>
            <svg className={ logoSVGClass() } xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
              <path d="M480-294q78 0 132-54t54-132q0-78-54-132t-132-54q-78 0-132 54t-54 132q0 78 54 132t132 54Zm.078 228.131q-85.469 0-161.006-32.395-75.536-32.395-131.975-88.833-56.438-56.439-88.833-131.897-32.395-75.459-32.395-160.928 0-86.469 32.395-162.006 32.395-75.536 88.745-131.504 56.349-55.968 131.849-88.616 75.5-32.648 161.017-32.648 86.516 0 162.12 32.604 75.603 32.604 131.529 88.497t88.549 131.452Q894.696-566.584 894.696-480q0 85.547-32.648 161.075-32.648 75.527-88.616 131.896-55.968 56.37-131.426 88.765-75.459 32.395-161.928 32.395ZM480-145.087q139.739 0 237.326-97.732Q814.913-340.551 814.913-480q0-139.739-97.587-237.326-97.587-97.587-237.609-97.587-139.021 0-236.826 97.587-97.804 97.587-97.804 237.609 0 139.021 97.732 236.826Q340.551-145.087 480-145.087ZM480-480Z"/>
            </svg>
            <span className={ logoTextClass() }>NotReddit</span>
          </div>
        </a>
      </div>
    </>
  )
}