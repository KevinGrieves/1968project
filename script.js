const loadingScreen = document.querySelector('.loading-screen');
window.addEventListener('load', () => {
		loadingScreen.style.opacity = '0';
		setTimeout(() => {
			
			loadingScreen.style.display = 'none';
		}, 200);
	
});



const mnthSel = document.querySelector("#mnth");

var mnthNum = 0;
var dayNum = 0;
var mnthArray = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var filterKey = 'all';	
var fltDay = 0;
var fltMonth = 0;
var prevDate = '';

var map = L.map('map', {
	worldCopyJump: true,
	center:[40, -25],
	zoomSnap: 0.05,
	zoom: 2.25,
	maxZoom: 19,
	minZoom: 2,
	zoomControl: false
});

var offcanvasElement = document.getElementById("leftnav");
var offcanvas = new bootstrap.Offcanvas(offcanvasElement);

var nukeIcon = new L.Icon({
	iconUrl: './icons/fluent-emoji-high-contrast--radioactive.png',
	iconSize:     [24, 24],
	iconAnchor:   [12, 12]
});

var voteIcon = new L.Icon({
	iconUrl: './icons/fluent-emoji-high-contrast--cross-mark-button.png',
	iconSize:     [24, 24],
	iconAnchor:   [12, 12]
});

var techIcon = new L.Icon({
	iconUrl: './icons/fluent-emoji-high-contrast--light-bulb.png',
	iconSize:     [24, 24],
	iconAnchor:   [12, 12]
});

var fistIcon = new L.Icon({
	iconUrl: './icons/fluent-emoji-high-contrast--raised-fist.png',
	iconSize:     [24, 24],
	iconAnchor:   [12, 12]
});

var warIcon = new L.Icon({
	iconUrl: './icons/fluent-emoji-high-contrast--crossed-swords.png',
	iconSize:     [24, 24],
	iconAnchor:   [12, 12]
});

var fireIcon = new L.Icon({
	iconUrl: './icons/fluent-emoji-high-contrast--fire.png',
	iconSize:     [24, 24],
	iconAnchor:   [12, 12]
});

var coupIcon = new L.Icon({
	iconUrl: './icons/fluent-emoji-high-contrast--military-helmet.png',
	iconSize:     [24, 24],
	iconAnchor:   [12, 12]
});

var legalIcon = new L.Icon({
	iconUrl: './icons/fluent-emoji-high-contrast--balance-scale.png',
	iconSize:     [24, 24],
	iconAnchor:   [12, 12]
});

var musicIcon = new L.Icon({
	iconUrl: './icons/fluent-emoji-high-contrast--musical-note.png',
	iconSize:     [24, 24],
	iconAnchor:   [12, 12]
});


// Prevent default action on search form

$("button").on('click',function(e){
    e.preventDefault();

});


$("form").on('submit',function(e){
    e.preventDefault();

});


L.control.zoom({
	position: 'bottomright'
}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	noWrap: true,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function markerClick(e) {
	
	clickedMarker = e.target;
	eventTitle = clickedMarker.feature.properties.title;
	eventLoc = clickedMarker.feature.properties.location;
	eventBlurb = clickedMarker.feature.properties.description;
	eventDate = clickedMarker.feature.properties.datetxt;
	eventKeys = clickedMarker.feature.properties.keywords;
	eventImg = clickedMarker.feature.properties.image;
	eventAlt = clickedMarker.feature.properties.alt;
	
	if (clickedMarker.feature.properties.attr == null) {
		eventAttr = ""
	} else {
		eventAttr = '<span style="font-size:50%;">' + clickedMarker.feature.properties.attr + '</span>'
	};
	
	let ibHead = document.getElementById('infoBoxHead');
	ibHead.innerHTML='<h4>' + eventTitle + '</h4>';
	let ibBody = document.getElementById('infoBoxBody');
	ibBody.innerHTML='<h5>' + eventDate + '</h5><h5>Location: ' + eventLoc + '</h5><div style="width:200px; line-height:50%; float:right;  margin-left:8px;"><img src="./images/' + eventImg + '" class="img-fluid" alt="' + eventAlt + '" title="' + eventAlt + '" >' + eventAttr + '</div><p>' + eventBlurb + '</p>';

	if (eventKeys.indexOf(', ') == -1) {
		createKeylink(eventKeys)
	} else {
		var spltKeys = eventKeys.split(', ');
		createKeylink(spltKeys[0]);
		const breakKeys = document.createElement('br');
		ibBody.appendChild(breakKeys);
		createKeylink(spltKeys[1]);
	};
	
	var coOrds = clickedMarker.getLatLng();
	map.flyTo([coOrds.lat, coOrds.lng], 5);
	$("#infoBox").modal('show');

}

function cntryClick(e) {
	
	clickedCntry = e.target;
	cntryName = clickedCntry.feature.properties.cntry_name;
	
	
	let ibHead = document.getElementById('infoBoxHead');
	ibHead.innerHTML='<h4>' + cntryName + '</h4>';
	let ibBody = document.getElementById('infoBoxBody');
	ibBody.innerHTML='Put something here';
	$("#infoBox").modal('show');
	
	
	

}

function onEachFeature(feature, layer) {
	
	layer.on({
		click: markerClick
	});
	
	const eventLst = document.getElementById('eventList');
	
	const newDate = document.createElement('p');
	if (prevDate !== feature.properties.datetxt) {
		newDate.innerText = feature.properties.datetxt;
	};
	newDate.setAttribute("style", "font-size:70%; margin-bottom:0;");
	newDate.id = feature.properties.month + '/' + feature.properties.day;
	prevDate = feature.properties.datetxt;
	
	
	if (feature.properties.keywords.indexOf(', ') == -1) {
			iconKey = feature.properties.keywords
			
		} else {
			var spltKeys = feature.properties.keywords.split(', ');
			iconKey = spltKeys[0]
			};
				
	switch(iconKey) {
		case "Nuclear weapons":
			layer.setIcon(nukeIcon);						
			break;
		case "Warfare":
			layer.setIcon(warIcon);						
			break;
		case "Disaster":
			layer.setIcon(fireIcon);						
			break;
		case "Protest":
			layer.setIcon(fistIcon);						
			break;
		case "Technology":
			layer.setIcon(techIcon);						
			break;
		case "Election":
			layer.setIcon(voteIcon);						
			break;
		case "Coup d`état":
			layer.setIcon(coupIcon);						
			break;
		case "Court case":
			layer.setIcon(legalIcon);						
			break;
		case "Music":
			layer.setIcon(musicIcon);						
			break;
	};
	
	layer.bindTooltip(feature.properties.title);
	
	// Add to list in bar... Remove?
	const newEvent = document.createElement('a');
	newEvent.href = "#";
	newEvent.innerHTML = feature.properties.title;
	newEvent.setAttribute("style", "display:block; padding-bottom:6px;");
	newEvent.setAttribute("data-bs-dismiss", "offcanvas");
	newEvent.setAttribute("data-bs-target", "#leftnav");
	//newEvent.id = feature.properties.month + '/' + feature.properties.day;
	
	newEvent.onclick = function () {
		eventTitle = feature.properties.title;
		eventLoc = feature.properties.location;
		eventBlurb = feature.properties.description;
		eventDate = feature.properties.datetxt;
		eventKeys = feature.properties.keywords;
		eventImg = feature.properties.image;
		eventAlt = feature.properties.alt;
		
		if (feature.properties.attr == null) {
			eventAttr = ""
		} else {
			eventAttr = '<span style="font-size:50%;">' + feature.properties.attr + '</span>'
		};
		let ibHead = document.getElementById('infoBoxHead');
		ibHead.innerHTML='<h4>' + eventTitle + '</h4>';
		let ibBody = document.getElementById('infoBoxBody');
		ibBody.innerHTML='<h5>' + eventDate + '</h5><h5>Location: ' + eventLoc + '</h5><div style="width:200px; line-height:50%; float:right; margin-left:8px;"><img src="./images/' + eventImg + '" class="img-fluid" alt="' + eventAlt + '" title="' + eventAlt + '" >' + eventAttr + '</div><p>' + eventBlurb + '</p>';
		
			
		//Multi Keyword
		if (eventKeys.indexOf(', ') == -1) {
			createKeylink(eventKeys)
		} else {
		var spltKeys = eventKeys.split(', ');
		createKeylink(spltKeys[0]);
		const breakKeys = document.createElement('br');
		ibBody.appendChild(breakKeys);
		createKeylink(spltKeys[1]);
		};
			
		var coOrds = layer.getLatLng();
		map.flyTo([coOrds.lat, coOrds.lng], 5);
		$("#infoBox").modal('show');
			
	};
	

	




	if (month + 1 == feature.properties.month) {
		eventLst.appendChild(newDate);
		eventLst.appendChild(newEvent);
	};
	
}



function createKeylink(addKey) {
	let ibBody = document.getElementById('infoBoxBody');
	const kwordLink = document.createElement('a');
	kwordLink.href = "#";
	kwordLink.innerText = addKey;
	kwordLink.setAttribute("style", "font-style:italic;");
	kwordLink.onclick = function () {
		topicBtn.innerHTML = addKey;
		filterKey = addKey;
		$("#infoBox").modal('hide');
		
		if (screen.width <= 540) {
			offcanvas.toggle()};
		refreshMap();
	};
	ibBody.appendChild(kwordLink);
	

}


function onEachCountry(feature, layer) {
	layer.on({
		click: cntryClick
	});
	
}


//Hide country layer when zoomed in
var cntryLayer = new L.geoJSON(countries68, {
	onEachFeature: onEachCountry
}).addTo(map);

cntryLayer.setStyle({
	color: "#ff4000", 
	weight: 1, 
	opacity: 0.3
});

map.on('zoomend', function (e) {
	
	if (e.target._zoom >= 10) {
		map.removeLayer(cntryLayer);
	} else {
		map.addLayer(cntryLayer);
	};
});

function applyFilter(feature) {
		if (fltDay > 0) {
			if (feature.properties.day != fltDay) {
				return false;
			}
		};
		if (fltMonth > 0) {
			if (feature.properties.month != fltMonth) {
				
				return false;
			}
		};
	
	
	if (filterKey !== 'all') {
		if (feature.properties.keywords.indexOf(filterKey) == -1) return false;
	};
	return true;
}



function refreshMap() {
	let newEventList = document.getElementById('eventList');
	newEventList.innerHTML='';
	
	
	markerLayer.clearLayers();
	markerLayer = L.geoJSON(testdb, {
		filter: applyFilter,
		onEachFeature: onEachFeature,
		
	}).addTo(map);
	map.flyTo([40, -25], 2.25)
	prevDate = '';
	
	if (newEventList.innerHTML == '') {
		newEventList.innerHTML='There are no events in this month with the keyword &quot;' +  filterKey + '&quot;';
	};
}


var markerLayer = new L.geoJSON(testdb, {
	
	onEachFeature: onEachFeature
}).addTo(map);
prevDate = '';


function changeKeyword(keyword) {
	filterKey = keyword;
	if (keyword === 'all') {
		topicBtn.innerHTML = 'Select Topic';
	} else  topicBtn.innerHTML = keyword;
	
	filterMapByMonth()
	refreshMap();
	
}

function filterMapByMonth() {
	if (fltmnthchk.checked == true){
		fltMonth = month + 1;
	} else {
		fltMonth = 0;
	};
	refreshMap();
}



/* 
function scrllM(event) {
	if (event.deltaY > 0) {
		mnthNum += 1
	} else {
		mnthNum -= 1};
	chMnth(event);
}

function scrllD(event) {
	if (event.deltaY > 0) {
		dayNum += 1
	} else {
		dayNum -= 1};
	chDay(event);
}



function changeDate(newMnth, newDay) {
	
	fltMonth = newMnth;
	fltDay = newDay;
	
	refreshMap();

} */

/* function chMnth(event) {
	mnthA = mnthArray[mnthNum - 1];
	mnthB = mnthArray[mnthNum];
	mnthC = mnthArray[mnthNum + 1];	
	
	
	if (mnthNum > 12  || mnthNum == 0)  {
		mnthNum = 0;
		dayNum = 0;
		mnthA = 'Dec';
		mnthB = 'All';
		mnthC = 'Jan';
		
	} else {
		if (mnthNum == 12 || mnthNum < 0) {
			mnthNum = 12;
			mnthA = 'Nov';
			mnthB = 'Dec';
			mnthC = 'All';
		
		} else {
		if (mnthNum == 1) {
			mnthA = 'All';
			mnthB = 'Jan';
			mnthC = 'Feb';
		
			};
		};
	};	

	
	// document.getElementById("monthScrl").innerHTML = '<h1>' + mnthA + '</h1><h1 class="bg-info">' + mnthB + '</h1><h1>' + mnthC + '</h1>';
	// Create DOM with onclicks for up down
	document.getElementById("monthScrl").innerHTML = '';
	
	const monthDiv = document.getElementById('monthScrl');
	addMnth = document.createElement('button');
	addMnth.innerText = mnthA;
	addMnth.classList.add("btn");
	addMnth.classList.add("btn-lg");
	addMnth.onclick = function () {
		mnthNum -= 1;
		chMnth(monthDiv);
		};
	monthDiv.appendChild(addMnth);
	
	
	addMnth = document.createElement('button');
	addMnth.innerText = mnthB;
	addMnth.classList.add("btn");
	addMnth.classList.add("bg-info");
	addMnth.classList.add("btn-lg");
	monthDiv.appendChild(addMnth);
	
	
	addMnth = document.createElement('button');
	addMnth.innerText = mnthC;
	addMnth.classList.add("btn");
	addMnth.classList.add("btn-lg");
	addMnth.onclick = function () {
		mnthNum += 1;
		chMnth(monthDiv);
		};
	monthDiv.appendChild(addMnth);
	
	//Handle days 
	if (mnthNum == 0) {
		//document.getElementById("dayScrl").innerHTML = '<button class="btn btn-lg" onclick="";>Boop</button><button class="btn btn-lg bg-info">All</button><button class="btn btn-lg" onclick="">All</button>';
		document.getElementById("dayScrl").classList.remove("d-grid");
		document.getElementById("dayScrl").classList.add("d-none");
		
	} else {
		daysInMonth = new Date(1968, mnthNum, 0).getDate();
		if (dayNum > daysInMonth) {dayNum = daysInMonth};
		document.getElementById("dayScrl").classList.add("d-grid");
		document.getElementById("dayScrl").classList.remove("d-none");
		chDay(event);
	};
	changeDate(mnthNum, dayNum);
}


function chDay(event) {
	
	
	// console.log(mnthArray[mnthNum] + ': ' + daysInMonth);
	
	dayA = dayNum - 1;
	dayB = dayNum;
	dayC = dayNum + 1;
	 
	if (dayNum > daysInMonth || dayNum == 0)  {
		dayNum = 0
		dayA = daysInMonth;
		dayB = 'All';
		dayC = 1;
		
	} else {
	
		if (dayNum == daysInMonth || dayNum < 0) {
			dayNum = daysInMonth
			dayA = daysInMonth - 1;
			dayB = daysInMonth;
			dayC = 'All';
		
		} else {
		if (dayNum == 1) {
			dayA = 'All';
			dayB = 1;
			dayC = 2;
			};
		};	
	};
	// console.log(dayNum);
	document.getElementById("dayScrl").innerHTML = '';
	
	const dayDiv = document.getElementById('dayScrl');
	addDay = document.createElement('button');
	addDay.innerText = dayA;
	addDay.classList.add("btn");
	addDay.classList.add("btn-lg");
	addDay.onclick = function () {
		dayNum -= 1;
		chDay(dayDiv);
		};
	dayDiv.appendChild(addDay);
	
	
	addDay = document.createElement('button');
	addDay.innerText = dayB;
	addDay.classList.add("btn");
	addDay.classList.add("bg-info");
	addDay.classList.add("btn-lg");
	dayDiv.appendChild(addDay);
	
	
	addDay = document.createElement('button');
	addDay.innerText = dayC;
	addDay.classList.add("btn");
	addDay.classList.add("btn-lg");
	addDay.onclick = function () {
		dayNum += 1;
		chDay(dayDiv);
		};
	dayDiv.appendChild(addDay);
	changeDate(mnthNum, dayNum);
}
*/




