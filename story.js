var HIDDEN_CLASS_NAME = 'hidden'
var TARGET_CLASS_NAME = 'target'
var SOURCE_CLASS_NAME = 'source'

var targetIdToShow = 1

function main() {
	var targets = getElements(TARGET_CLASS_NAME)
	var sources = getElements(SOURCE_CLASS_NAME)
	sources.forEach(function (sourceNode) {
		var sourceNodeId = extractId(sourceNode, SOURCE_CLASS_NAME)
		sourceNode.addEventListener('click', function () {
			showTarget(targets, sourceNodeId)
		})
	})
	showTarget(targets, targetIdToShow)
}

function getElements(type) {
	return [].slice.call(document.querySelectorAll('.' + type)).sort(function (targetNode1, targetNode2) {
		var target1Num = extractId(targetNode1, TARGET_CLASS_NAME)
		var target2Num = extractId(targetNode2, TARGET_CLASS_NAME)
		return target1Num > target2Num
	})
}

function extractId(targetNode, baseClass) {
	var currentClassIndex = targetNode.classList.length
	while (currentClassIndex--) {
		var currentClass = targetNode.classList.item(currentClassIndex)
		var maybeIdNum = parseInt(currentClass.split('-')[1])
		if (isNaN(maybeIdNum)) {
			continue
		}
		var classStrinToValidate = baseClass + '-' + maybeIdNum
		if (classStrinToValidate === currentClass) {
			return maybeIdNum
		}
	}
}

function showTarget(targets, targetId) {
	targets.forEach(function (targetNode, targetIndex) {
    var currentTargetNodeId = extractId(targetNode, TARGET_CLASS_NAME)
		if (currentTargetNodeId === targetId) {
			targetNode.classList.remove(HIDDEN_CLASS_NAME)
		} else {
			targetNode.classList.add(HIDDEN_CLASS_NAME)
		}
	})
}

main()


document.querySelector('.burger').onclick = function(){
    document.querySelector('header nav ul').classList.add('mob-menu');
}

document.querySelector('#close-btn').onclick = function(){
    document.querySelector('header nav ul').classList.remove('mob-menu');
}

// slider

document.querySelector('.container-works .works-images').onclick = function(){
    document.querySelector('.container-works .position-background').classList.add('hidden');
}

document.querySelector('#close-slider').onclick = function(){
    document.querySelector('.container-works .position-background').classList.remove('hidden');
}


const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown'); // Get the .dropdown element
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownToggle.addEventListener('click', (event) => {
  event.preventDefault();
  dropdown.classList.toggle('show'); // Toggle the 'show' class
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', (event) => {
  if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdown.classList.remove('show'); // Remove the 'show' class
  }
});