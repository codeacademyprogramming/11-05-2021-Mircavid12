const langEl = document.querySelector(".lang-wrap");
const link = document.querySelectorAll(".lang-wrap a");
const imageth = document.querySelector(".image");
const nameth = document.querySelector(".name");
const surnameth = document.querySelector(".surname");
const salaryth = document.querySelector(".salary");
const activeLoanth = document.querySelector(".activeLoan");
const monthlyPayth = document.querySelector(".monthlyPay");
const canbeAppliedth = document.querySelector(".canbeApplied");

const nameOfUser = document.querySelector(".nameOfUser");
const imageOfUser = document.querySelector(".imageOfUser");
const usernameOfUser = document.querySelector(".usernameOfUser");
const emailOfUser = document.querySelector(".emailOfUser");
const phoneOfUser = document.querySelector(".phone");


var languages = [
    {
        lang: "AZ"
    },
    {
        lang: "EN"
    }
]

var lang={
    "azerbaijan":
    {
        'lang': 'AZ',
        "image":"Şəkil",
        "name":"Ad",
        "surname":"Soyad",
        "salary":"Maaş",
        "activeLoan":"Aktiv borc",
        "monthlyPay":"Aylıq ödəniş",
        "canbeApplied":"Müraciət etmə haqqı",
        "email":"Mail",
        "username":"İstfadəçi",
        "phone":"Telefon"
    },
    "english":
    {
        'lang': 'EN',
        "image":"Image",
        "name":"Name",
        "surname":"Surname",
        "salary":"Salary",
        "activeLoan":"Active Loan",
        "monthlyPay":"Monthly Pay",
        "canbeApplied":"Can be applied",
        "email":"Email",
        "username":"Username",
        "phone":"Phone"
    }
}

link.forEach(el=>{
    el.addEventListener('click',(e)=>{
        localStorage.removeItem("lang");
        if(el.innerText === "AZ"){
            localStorage.setItem("lang",JSON.stringify(languages[0]));
        }
        else {
            localStorage.setItem("lang",JSON.stringify(languages[1]));
        }
        document.querySelectorAll("a")[0].classList.remove('active')
        document.querySelectorAll("a")[1].classList.remove('active')
        e.preventDefault();
        
        const attr = el.getAttribute('language');
        if(lang[attr].lang===JSON.parse(localStorage.getItem('lang')).lang){
            e.target.classList.add("active");
            imageth.innerText=lang[attr].image;
            nameth.innerText=lang[attr].name;
            surnameth.innerText=lang[attr].surname;
            salaryth.innerText=lang[attr].salary;
            activeLoanth.innerText=lang[attr].activeLoan;
            monthlyPayth.innerText=lang[attr].monthlyPay;
            canbeAppliedth.innerText=lang[attr].canbeApplied;
            
            imageOfUser.innerText=lang[attr].image;
            nameOfUser.innerText=lang[attr].name;
            usernameOfUser.innerText=lang[attr].username;
            emailOfUser.innerText=lang[attr].email;
            phoneOfUser.innerText=lang[attr].phone;
        }
        
    })
})
document.addEventListener("DOMContentLoaded", (event) => {
    let data = JSON.parse(localStorage.getItem('lang'));

    if(data){
        data = data.lang
    }else{
        data = 'AZ'
    }

    let attr;
    if(data === 'AZ'){
        attr='azerbaijan'
    }else{
        attr = 'english'
    }

    document.querySelectorAll("a")[0].classList.remove('active')
    document.querySelectorAll("a")[1].classList.remove('active')

        
    document.getElementById(data.toLowerCase()).classList.add("active");
    imageth.innerText=lang[attr].image;
    nameth.innerText=lang[attr].name;
    surnameth.innerText=lang[attr].surname;
    salaryth.innerText=lang[attr].salary;
    activeLoanth.innerText=lang[attr].activeLoan;
    monthlyPayth.innerText=lang[attr].monthlyPay;
    canbeAppliedth.innerText=lang[attr].canbeApplied;

    imageOfUser.innerText=lang[attr].image;
    nameOfUser.innerText=lang[attr].name;
    usernameOfUser.innerText=lang[attr].username;
    emailOfUser.innerText=lang[attr].email;
    phoneOfUser.innerText=lang[attr].phone;
});