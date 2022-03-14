3/11/2022

worked on exercises 2.15 - 2.18

2.15 added functionality so that when adding numbers to phonebook, it gets saved to backend server
- done by using axios.post(url, objectToAdd) method

2.16 extradt code that handles communication with backend to its own module
- we return 'request.then(response => response.data)' so that instead of using response.data property, we can use w.e variable name we want

2.17 delete entries from phonebok
- window.confirm method takes a message argument that is prompted when event handler is triggered
- if we press ok it returns 'true', else it returns false if we press cancel
- also used useContext API so that we can pass the persons, setPersons state from our App.js to our List component without prop drilling!

2.18 update number of existing user
- used axios.put request to update item with specific id (default one assigned by axios)


