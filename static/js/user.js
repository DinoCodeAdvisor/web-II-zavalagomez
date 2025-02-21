const button = document.getElementById("create-user-button");

button.addEventListener("click", function(event){
    // Page does not reload with event.preventDefault()
    event.preventDefault()

    const form = document.getElementById("create-user-form");
    // Takes all elements, inputs, selects, etc that exists on a given form
    const formData = new FormData(form);
    const data = {};
    const token = document.querySelector("#csrf_token").value;

    formData.forEach((value, key) => {
        data[key] = value
    })

    console.log(data)

    fetch(USER_CREATE_URL, {
        method: 'POST',
        headers: {
            "X-CSRFToken": token,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((value) => {
        console.log(value);
    }).catch((error) => {
        console.log(error)
    })
    alert(data)
})
