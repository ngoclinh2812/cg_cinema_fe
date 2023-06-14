import React, {useEffect, useState} from 'react';
import All from "../../asset/images/All.png"
import Thirteen from "../../asset/images/Thirteen.png"
import Sixteen from "../../asset/images/Sixteen.png"
import Eighteen from "../../asset/images/Eighteen.png"
import "../../asset/styles/theater.css"
const AgeRestriction = () => {
    return (
        <div className="contai">
        <span className="group">
            <img src={All} alt="Mọi đối tượng" />
            <span>Mọi đối tượng</span>
        </span>
            <span className="group">
            <img src={Thirteen} alt="13 Tuổi trở lên" />
            <span>13 Tuổi trở lên</span>
        </span>
            <span className="group">
            <img src={Sixteen} alt="16 tuổi trở lên" />
            <span>16 tuổi trở lên</span>
        </span>
            <span className="group">
            <img src={Eighteen} alt="18 tuổi trở lên" />
            <span>18 tuổi trở lên</span>
        </span>
        </div>
    );

};

export default AgeRestriction;