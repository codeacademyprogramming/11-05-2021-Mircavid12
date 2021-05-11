// Login

var customerTable = document.getElementById("customers");
var loginTable = document.getElementById("login");
customerTable.style.display="none";

var emailInput = document.querySelector('[name="login_mail"]');
var passwordInput = document.querySelector('[name="login_password"]');

var Customer={
  username: "john",
  fullname: "John Doe",
  email: "john@example.com",
  password: "123456"
}


if(document.cookie=="token=supersecuretoken"){
  customerTable.style.display = "block";
    loginTable.style.display = "none";
}

sessionStorage.setItem('username',JSON.stringify(Customer.username));
sessionStorage.setItem('fullname',JSON.stringify(Customer.fullname));
sessionStorage.setItem('email',JSON.stringify(Customer.email));
var loginBtn = document.getElementById("login-btn");
var emailError = document.getElementById("wrong-email");
var passwordError = document.getElementById("wrong-password");

var tBodyUser = document.getElementById('user_Detail_Body');

loginBtn.addEventListener('click',function(e){
    e.preventDefault();
    if(passwordInput.value==Customer.password && emailInput.value==JSON.parse(sessionStorage.getItem("email"))){
      let now = new Date();
      now.setTime(now.getTime() + 24 * 3600 * 1000);
      let cookiedata =  `token=supersecuretoken;expires=${now.toUTCString()};`;
      document.cookie=cookiedata

      
    getUserDetail();
      customerTable.style.display = "block";
    loginTable.style.display = "none";
    emailError.style.display="none";
    passwordError.style.display="none";
    }
    else{
      passwordError.style.display="block";
      emailError.style.display="block";
    }
})
const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener('click',function(){
      console.log("as")
      let now = new Date();
      now.setTime(now.getTime() - 24 * 3600 * 10000);
      let cookiedata =  `token=supersecuretoken;expires=${now.toUTCString()};`;
      document.cookie = cookiedata;
      customerTable.style.display = "none";
    loginTable.style.display = "block";
})

function getUserDetail(){
    fetch("https://randomuser.me/api/").
    then(function(response){
        console.log(response);
        return response.json();
    }).then(function(user){
        console.log(user.results)
        console.log(user.results[0].gender);
        let userFullName = user.results[0].name.title + " " + user.results[0].name.first + " " + user.results[0].name.last;

        console.log(userFullName);
        sessionStorage.setItem('picture',JSON.stringify(user.results[0].picture.thumbnail));
        sessionStorage.setItem('loggedName',JSON.stringify(userFullName));
        sessionStorage.setItem('loggedUsername',JSON.stringify(user.results[0].login.username));
        sessionStorage.setItem('loggedMail',JSON.stringify(user.results[0].email));
        sessionStorage.setItem('phone',JSON.stringify(user.results[0].phone));
        console.log(JSON.parse(sessionStorage.getItem("picture")))
        let html ="";
        html=
        `
            <tr>
                <td><img src="${JSON.parse(sessionStorage.getItem('picture'))}"></td>
                <td>${JSON.parse(sessionStorage.getItem('loggedName'))}</td>
                <td>${JSON.parse(sessionStorage.getItem('loggedUsername'))}</td>
                <td>${JSON.parse(sessionStorage.getItem('loggedMail'))}</td>
                <td>${JSON.parse(sessionStorage.getItem('phone'))}</td>
                
            </tr>
        `
        console.log(html);
        tBodyUser.innerHTML = html;
    })
}

getUserDetail();








