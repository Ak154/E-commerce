var userData = JSON.parse(localStorage.getItem("users")) || []
document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault()

    var formElement = document.querySelector("form")
    
    var registerObject = {
        name: formElement.name.value,
        dob: formElement.dob.value,
        email: formElement.email.value,
        password: formElement.password.value,
        status:false
    }

    userData.push(registerObject)
    localStorage.setItem("users", JSON.stringify(userData))
    formElement.reset()
    alert("User has registered successfully.")
    window.location.href = "login.html"

})