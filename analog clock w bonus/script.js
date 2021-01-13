//the offset will represent the time zone
var offset = 0;

//make sure our clock is updated every second
setInterval(setClock, 1000)

//links the hour, minute, and second hand divs to variables in this file
const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

//this function updates the clock dapending on the time zone submitted
function changeClock() { 
	//ele is the array of radio buttons with timezones on them
	var ele = document.getElementsByName('tz');
	//by default, the selected timezone will be the first element
	var timezone = ele[0].value;
	//this for loop searches for the selected radio button after the user
	//has clicked submit
	for(i = 0; i < ele.length; i++) { 
		if(ele[i].type="radio"){
			if(ele[i].checked) timezone = ele[i].value; 
		}
	} 
	document.getElementById("result").innerHTML 
								= timezone; 
	//these conditionals change the offset based on the user's selected
	//timezone
	if (timezone = "cst"){
		offset = 1;
	} else if (timezone = "mst"){
		offset = 2;
	} else if (timezone = "pst"){
		offset = 3;
	} else if (timezone = "ast"){
		offset = 4;
	} else if (timezone = "hst"){
		offset = 5;
	} else if (timezone = "est"){
		offset = 0;
	}
	setClock()
}

//this function updates the clock
function setClock(){
	//Date() grabs the date from your local machine
	const currentDate = new Date()
	//we use getseconds() to grab the seconds from your local machine
	//we want to divide it by 60 so we know how much the second hand 
	//should be rotated by on the clock (because there are 60 seconds in a minute)
	const secondsRatio = currentDate.getSeconds() / 60
	//by the same logic, since there are 60 minutes in an hour, we will
	//divide the current minute + the seconds ratio by 60 to get
	//the rotation degree of the minutes hand
	const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
	//for the hours hand, we will use the same logic to find its degree
	//of rotation, but will now add the offset to get the right time zone
	const hoursRatio = (minutesRatio + currentDate.getHours() + offset) / 12
	//now, we set the rotation of all of the hands by their respective ratios
	setRotation(secondHand, secondsRatio)
	setRotation(minuteHand, minutesRatio)
	setRotation(hourHand, hoursRatio)
}

//this function changes the degree of rotation of any given hand
function setRotation(element, rotationRatio){
	element.style.setProperty(`--rotation`, rotationRatio * 360)
}
//we call setclock immediately so that the clock is ticking when the page loads
setClock()