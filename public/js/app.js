const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

form.onsubmit = (e) => {
    e.preventDefault();
    
    const location = search.value;
    
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    
    fetch(`http://localhost:5000/weather?location=${location}`)
    .then((response) => response.json())
    .then((data) => {
        if(data.error){
            messageOne.textContent = data.message;
            return;
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        console.log(data)
    })
    .catch((error) => console.log(error))
        
    
}