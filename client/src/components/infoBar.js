import React from 'react';

import "./infoBar.css";
import closeIcon from '../icons/closeIcon.png';
import onlineIcon from '../icons/onlineIcon.png'
const InfoBar = ({room}) => {
	return (
		<div className="infoBar">
			<div className="leftInnerContainer">
				<img className="onlineIcon" src={onlineIcon} alt="online image" />
				<h3>{room}</h3>
			</div>

			<div className="RightInnerContainer">
				<a href="/"><img src={closeIcon} alt="close image" /></a>
			</div>
		</div>
		)
}

export default InfoBar;