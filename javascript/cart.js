var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null
var cartData = JSON.parse(localStorage.getItem("cartData")) || []
var total = document.querySelector("#totalPrice")
function pageLoadFun() {

    if (cartData.length > 0) {
        document.querySelector("#product-count").innerText = cartData.length
    }
    if (!loggedInUser) {
        window.location.href = "login.html"
    }
    
    total.innerText = cartData.reduce(function(sum, ele){
        return ele.price + sum
    }, 0).toFixed(2)
    //console.log(sum)

}

var loginUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

if (loginUser && loginUser.name) {
    var loginPersonElement = document.getElementById("login-person");
    var userNameText = document.createTextNode(loginUser.name + " ");
    loginPersonElement.insertBefore(userNameText, loginPersonElement.querySelector("#profile-menu"));
}
var cartContainer = document.querySelector("#cart-container")

function displayData(data) {
    cartContainer.innerText = ""

    data.forEach(function (ele, index) {

        //what to print:image, title, price, buy now

        var div = document.createElement("div")

        var itemImg = document.createElement("img")
        itemImg.setAttribute("src", ele.image)

        var itemTitle = document.createElement("h3")
        itemTitle.innerText = ele.title.slice(0, 15)

        var qntDiv = document.createElement("div")

        var incrementBtn = document.createElement("button")
        incrementBtn.innerText = "+"


        var productQuantity = document.createElement("span")
        productQuantity.innerText = ele.count

        // increment ->

        incrementBtn.addEventListener("click", function incrementVal(){
            productQuantity.innerText = ++ele.count;
        })
    
        var decreementBtn = document.createElement("button")
        decreementBtn.innerText = "-"

        // decrement ->
        decreementBtn.addEventListener("click", function decrementVal(){
            productQuantity.innerText = --ele.count;
            if(ele.count<1){
            //     console.log(cartData[index])
            //    // localStorage.removeItem(ele.count===0);
            //    localStorage.removeItem(cartData[index])
            deleteFun(index)
                
            }
        })
        
        //
        

        qntDiv.append(incrementBtn, productQuantity, decreementBtn)

        var removeBtn = document.createElement("button")
        removeBtn.innerText = "Remove"

        // delete item
        removeBtn.addEventListener("click", function(){
            deleteFun(index)
        })

        var itemPrice = document.createElement("p")
        itemPrice.innerText = ele.price*ele.count;
        

        div.append(itemImg, itemTitle,qntDiv, itemPrice, removeBtn)

        cartContainer.append(div)

    })

}

displayData(cartData)

function deleteFun(index){
    cartData.splice(index, 1)
   // localStorage.removeItem(cartData)
    localStorage.setItem("cardData", JSON.stringify(cartData))
    //console.log(cartData)
    displayData(cartData)

}

function logoutFun(){
    localStorage.removeItem("loggedInUser")
    window.location.href="login.html"
  }