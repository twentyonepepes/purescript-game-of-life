import delay from "delay";
const { field, nextField } = require('../output/Game');
const { toIndexedArray } = require('../output/Matrix');

(async function(){

	let a = field(64)(64);
	let target = document.getElementById("Field");
	target.innerHTML = toIndexedArray(a).map(({x,y,value})=>{
		return (
			`<div id=NX${x}Y${y} style="position:absolute; top:${y * 10}; left:${x * 10}; width: 10; height: 10; backgroundColor: ${value ? "white" : "blue"};"></div>`
		)
	}).join("");

	while(true) {

		a = nextField(a);
		let b = toIndexedArray(a);
		for (let {x,y,value} of b) {
			let el = document.getElementById(`NX${x}Y${y}`);
			el.style.backgroundColor = value ? "lightgray" : "steelblue";
		}
		await delay (100);
	}


})()