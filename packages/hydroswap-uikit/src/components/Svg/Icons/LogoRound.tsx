import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

{/* <svg viewBox="0 0 96 96" width="24px" color="text" xmlns="http://www.w3.org/2000/svg" classnA="sc-bdnxRM fIQtFU"><path d="M48,96C21.5,96,0,74.5,0,48S21.5,0,48,0s48,21.5,48,48S74.5,96,48,96z M48,79.3 c13.3,0,24-11.3,24-25.2c0-7.8-5.6-18.3-16.9-31.6c-1.4-1.7-3.8-4.4-7.1-7.9c-3.5,3.8-6,6.6-7.5,8.4C29.5,36.1,24,46.5,24,54.1 C24,68,34.7,79.3,48,79.3z"></path></svg> */}

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 96 96" {...props}>
      <path d="M48,96C21.5,96,0,74.5,0,48S21.5,0,48,0s48,21.5,48,48S74.5,96,48,96z M48,79.3 c13.3,0,24-11.3,24-25.2c0-7.8-5.6-18.3-16.9-31.6c-1.4-1.7-3.8-4.4-7.1-7.9c-3.5,3.8-6,6.6-7.5,8.4C29.5,36.1,24,46.5,24,54.1 C24,68,34.7,79.3,48,79.3z"></path>
   
    </Svg>
  );
};

export default Icon;
