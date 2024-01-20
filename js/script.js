let sortOrder = 1
let users = []
const myUrl = 'https://jsonplaceholder.typicode.com/users'

//complete the fetchData function
async function fetchData(url) {
  // write your code here
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    console.log('Error fetching data:', err)
  }
}

//complete the sortUsers function
// users is the array of users and order can be 1 or -1, which means order ascending or descending respectively
function sortUsers(users, order) {
  // write your code here
  users.sort((a, b) => (a.id - b.id) * order);
}

//Implement a function that select users with the name input
function filterUsersByName(users, name) {
  // write your code here
  return users.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()))
}

function displayData(tbody, users) {
tbody.innerHTML = users
  .map(
    (user) => `
  <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
  </tr>
`
  )
  .join("");
}


async function initializeApp() {
  const tbody = document.getElementById("table-body");
  const sortBtn = document.getElementById("sort");
  const nameFilter = document.getElementById("nameFilter");

  users = await fetchData(myUrl);
  displayData(tbody, users);

  // when a visitor click the sortBtn element, the users should be ordered ascending in the first click, and descending in the second click
  sortBtn.addEventListener("click", () => {
    // write your code here
    sortOrder *= -1; // Toggle the order between 1 and -1
    sortUsers(users, sortOrder)
    displayData(tbody, users)
  });

  // when a visitor fill the name in the nameFilter element, the table should only show users asociated to this name
  nameFilter.addEventListener("input", () => {
    // write your code here
    const filterUsers = filterUsersByName(users, nameFilter.value)
    displayData(tbody, filterUsers)
  });
}

if (typeof document !== "undefined") {
  initializeApp();
}

// module.exports = { fetchData, sortUsers, filterUsersByName, displayData };
// initializeApp();

