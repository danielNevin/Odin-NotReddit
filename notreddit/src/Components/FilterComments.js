// Importing Dependencies
import React, { useState } from "react";

export default function FilterComments(props) {

  // State variables to keep track of filter clicks
  const [topClick, setTopClick] = useState(true);
  const [newClick, setNewClick] = useState(false);
  const [oldClick, setOldClick] = useState(false);

  // Event handler for the top filter click
  const handleTopClick = () => {
    setNewClick(false);
    setOldClick(false);
    setTopClick(true);
    props.handleFilterTop();
  };

  // Event handler for the new filter click
  const handleNewClick = () => {
    setTopClick(false);
    setOldClick(false);
    setNewClick(true);
    props.handleFilterNew();
  };

  // Event handler for the old filter click
  const handleOldClick = () => {
    setTopClick(false);
    setNewClick(false);
    setOldClick(true);
    props.handleFilterOld();
  };

  // Function to determine the CSS classes for the top filter
  const topClickClasses = () => {
    let classes = 'flex items-center gap-1 text-gray-500 hover:bg-gray-200 px-2 cursor-pointer rounded-full';

    if (topClick) {
      classes = 'flex items-center gap-1 text-lime-500 hover:bg-gray-200 px-2 cursor-pointer rounded-full';
    }

    return classes;
  }

  // Function to determine the CSS classes for the new filter
  const newClickClasses = () => {
    let classes = 'flex items-center gap-1 text-gray-500 hover:bg-gray-200 px-2 cursor-pointer rounded-full';

    if (newClick) {
      classes = 'flex items-center gap-1 text-lime-500 hover:bg-gray-200 px-2 cursor-pointer rounded-full';
    }

    return classes;
  }

  // Function to determine the CSS classes for the old filter
  const oldClickClasses = () => {
    let classes = 'flex items-center gap-1 text-gray-500 hover:bg-gray-200 px-2 cursor-pointer rounded-full';

    if (oldClick) {
      classes = 'flex items-center gap-1 text-lime-500 hover:bg-gray-200 px-2 cursor-pointer rounded-full';
    }

    return classes;
  }

  return (
    <div id="container" className="flex gap-2 w-[40rem] rounded-md bg-white">
      <div id="top" className={ topClickClasses() } onClick={ handleTopClick }>
        <svg className={ `${topClick ? "fill-lime-500" : "fill-gray-500"}` } xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="20">
          <path d="M103-103v-100l91-91v191h-91Zm166 0v-261l91-91v352h-91Zm166 0v-352l91 91v261h-91Zm166 0v-263l91-90v353h-91Zm166 0v-424l90-90v514h-90ZM103-320v-134l297-295 160 160 297-298v133L560-455 400-615 103-320Z"/>
        </svg>
        <span>Top</span>
      </div>
      <div id="new" className={ newClickClasses() } onClick={ handleNewClick }>
        <svg className={ `${newClick ? "fill-lime-500": "fill-gray-500"}` } xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="20">
          <path d="m337.073-225.041 142.963-85.154L623-224l-39-161 126-110-166-14-64-152-64 152-166 13 126.373 109.025-39.3 161.934ZM196-28l75-324L19-570l331.6-27.793L480-904l129.4 306.207L941-570 689-352l76 324-285-173L196-28Zm284-405Z"/>
        </svg>
        <span>New</span>
      </div>
      <div id="old" className={ oldClickClasses() } onClick={ handleOldClick }>
        <svg className={ `${oldClick ? "fill-lime-500" : "fill-gray-500"}` } xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="20">
          <path d="M476.056-95Q315-95 203.795-207.427 92.591-319.853 94-481h94q1.152 121.3 84.005 206.65Q354.859-189 476-189q122 0 208-86.321t86-209.5Q770-605 683.627-688T476-771q-60 0-113.5 24.5T268-680h84v73H123v-227h71v95q55-59 127.5-93T476-866q80 0 150.5 30.5t123.74 82.511q53.241 52.011 83.5 121.5Q864-562 864-482t-30.26 150.489q-30.259 70.489-83.5 123Q697-156 626.5-125.5 556-95 476.056-95ZM600-311 446-463v-220h71v189l135 131-52 52Z"/>
        </svg>
        <span>Old</span>
      </div>
    </div>
  )
}
