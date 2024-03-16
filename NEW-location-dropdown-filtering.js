// Location Search Results Filtering
// Get the input field and locations lists
const searchInput = document.getElementById('location-search');
const locationsLists = [
  document.getElementById('locations-list-1'),
  document.getElementById('locations-list-2'),
  document.getElementById('locations-list-3'),
  document.getElementById('locations-list-4')
];

// Add event listener for input changes
searchInput.addEventListener('input', function() {
  const searchText = searchInput.value.toLowerCase();

  // Iterate through each locations list
  locationsLists.forEach(locationsList => {
    const locationItems = locationsList.querySelectorAll('.location-checkbox-label');

    locationItems.forEach(item => {
      const itemText = item.textContent.toLowerCase();
      const checkboxGroup = item.parentElement.parentElement; // parent's parent is the checkbox group div

      if (searchText.length === 0) {
        // If there's no search text, display all items
        checkboxGroup.style.display = 'flex';
      } else {
        if (itemText.includes(searchText)) {
          checkboxGroup.style.display = 'flex'; // Display the item
        } else {
          checkboxGroup.style.display = 'none'; // Hide the item if it doesn't match the search text
        }
      }
    });
  });
});

// JavaScript code to scroll 'location-dropdown' to the top
// when a user types in the 'location-search' input

// First, get the elements by their IDs
var locationSearch = document.getElementById('location-search');
var locationDropdown = document.getElementById('location-dropdown');

// Add an event listener for the 'keyup' event on the location search input
locationSearch.addEventListener('keyup', function() {
    // Scroll the location dropdown to the top
    locationDropdown.scrollTop = 0;
});
