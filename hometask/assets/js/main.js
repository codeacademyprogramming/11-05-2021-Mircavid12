//Getting current time format as day.month.year
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var arr1 = [];
var arr2 = [];
function getCustomers() {
  fetch("assets/js/article.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (articles) {
      articles.forEach(function (article) {
        var active = 0;
        for (var i = 0; i < article.loans.length; i++) {
          if (article.loans[i].loanPeriod.end.slice(6) > year) {
            active++;
          } else {
            if (
              article.loans[i].loanPeriod.end.slice(3, 5) > month &&
              article.loans[i].loanPeriod.end.slice(6) == year
            ) {
              active++;
            } else {
              if (
                article.loans[i].loanPeriod.end.slice(0, 2) > day &&
                article.loans[i].loanPeriod.end.slice(6) == year &&
                article.loans[i].loanPeriod.end.slice(3, 5) == month
              ) {
                active++;
              }
            }
          }
        }
        if(active>0){
            arr1.push(article);
        }
        else{
            arr2.push(article);
        }
      });
      function compare(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
      arr1.sort(compare);
      arr2.sort(compare);
      var result=arr1.concat(arr2);

      var mainBody = document.getElementById("mainBody");

      var orders=1;
      result.forEach(function (article) {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.setAttribute("scope", "row");

        //Getting customer's main datas
        var name = document.createElement("td");
        var surname = document.createElement("td");
        var image = document.createElement("td");
        var salary = document.createElement("td");
        var activeLoan = document.createElement("td");
        var totalMonthlyPay = document.createElement("td");
        var canBeApplied = document.createElement("td");
        tr.style.cursor = "pointer";
        
        // Loans od Customer;
        var clicked = 0;
        tr.addEventListener("click", function (e) {
          var modal = document.getElementById("customer-info");
          modal.style.visibility = "visible";
          modal.style.opacity = 1;
          clicked+=1;
          var orderOfLoans = 1;
          var active2 = 0;
          var monthlyPay;
          for (var j = 0; j < article.loans.length; j++) {
              monthlyPay=0;
            var modalBody = document.getElementById("modalBody");
            var modalTr = document.createElement("tr");
            var modalTh = document.createElement("th");
            modalTh.setAttribute("scope", "row");
            modalTh.innerText = orderOfLoans;
            var loanerName = document.createElement("td");
            var loanAmount = document.createElement("td");
            var isActive = document.createElement("td");
            var MonthlyPayOfLoaner = document.createElement("td");
            var dueToAmount = document.createElement("td");
            var startAndEnd = document.createElement("td");
            dueToAmount.innerText = article.loans[j].dueAmount.value + " AZN";
            loanerName.innerText = article.loans[j].loaner;
            startAndEnd.innerText= article.loans[j].loanPeriod.start +" - "+ article.loans[j].loanPeriod.end;
            loanAmount.innerText =
              article.loans[j].amount.value +
              " " +
              article.loans[j].amount.currency;
              monthlyPay =
              article.loans[j].amount.value / article.loans[j].period.value;
              var payofMonth = monthlyPay.toFixed(2);
            if (article.loans[j].loanPeriod.end.slice(6) > year) {
              active2++;
              
            } else {
              if (
                article.loans[j].loanPeriod.end.slice(3, 5) > month &&
                article.loans[j].loanPeriod.end.slice(6) == year
              ) {
                active2++;
              } else {
                if (
                  article.loans[j].loanPeriod.end.slice(0, 2) > day &&
                  article.loans[j].loanPeriod.end.slice(6) == year &&
                  article.loans[j].loanPeriod.end.slice(3, 5) == month
                ) {
                  active2++;
                }
              }
            }

            if (active2 > 0) {
              if(JSON.parse(localStorage.getItem('lang')).lang=="AZ"){
                isActive.innerHTML = '<p class="text-success">Bəli</p>';
              }
              else{
                isActive.innerHTML = '<p class="text-success">True</p>';
              }
            } else {
              if(JSON.parse(localStorage.getItem('lang')).lang=="AZ"){
                isActive.innerHTML = '<p class="text-danger">Xeyr</p>';
              }
              else{
                isActive.innerHTML = '<p class="text-danger">False</p>';
              }
            }
            MonthlyPayOfLoaner.innerText = payofMonth + " AZN";
            modalBody.appendChild(modalTr);
            modalTr.appendChild(modalTh);
            modalTr.appendChild(loanerName);
            modalTr.appendChild(loanAmount);
            modalTr.appendChild(isActive);
            modalTr.appendChild(MonthlyPayOfLoaner);
            modalTr.appendChild(dueToAmount);
            modalTr.appendChild(startAndEnd);
            orderOfLoans += 1;
          }
          modal.addEventListener(
            "click",
            function (event) {
                // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
                if (
                    event.target.style.visibility=="visible"
                ) {
                    closeModal();
                }
            },
            true
        );
        function closeModal() {
            modal.style.visibility = "hidden";
            modal.style.opacity = 0;
            modalBody.innerHTML="";
        }
        });
        // Loans od Customer;
        
        var sumOfPay = 0;
        var active = 0;
        for (var i = 0; i < article.loans.length; i++) {
          if (article.loans[i].loanPeriod.end.slice(6) > year) {
            active++;
            hasActiveLoan = true;
            if (article.loans[i].period.type == "month") {
              sumOfPay +=
                article.loans[i].amount.value / article.loans[i].period.value;
            } else if (article.loans[i].period.type == "year") {
              sumOfPay +=
                (article.loans[i].amount.value /
                  article.loans[i].period.value) *
                12;
            }
          } else {
            if (
              article.loans[i].loanPeriod.end.slice(3, 5) > month &&
              article.loans[i].loanPeriod.end.slice(6) == year
            ) {
              active++;
              hasActiveLoan = true;
              if (article.loans[i].period.type == "month") {
                sumOfPay +=
                  article.loans[i].amount.value / article.loans[i].period.value;
              } else if (article.loans[i].period.type == "year") {
                sumOfPay +=
                  (article.loans[i].amount.value /
                    article.loans[i].period.value) *
                  12;
              }
            } else {
              if (
                article.loans[i].loanPeriod.end.slice(0, 2) > day &&
                article.loans[i].loanPeriod.end.slice(6) == year &&
                article.loans[i].loanPeriod.end.slice(3, 5) == month
              ) {
                active++;
                hasActiveLoan = true;
                if (article.loans[i].period.type == "month") {
                  sumOfPay +=
                    article.loans[i].amount.value /
                    article.loans[i].period.value;
                } else if (article.loans[i].period.type == "year") {
                  sumOfPay +=
                    (article.loans[i].amount.value /
                      article.loans[i].period.value) *
                    12;
                }
              }
            }
          }
        }

        if (active > 0) {
            activeLoan.innerHTML = '<p class="text-success">True</p>';
            arr1.push(article);
          
          
        } else {
            activeLoan.innerHTML = '<p class="text-danger">False</p>';
            arr2.push(article);
          
        }
        var sum;
        sum = sumOfPay;
        if (sumOfPay != 0) {
          sum = sumOfPay.toFixed(2);
        }
        totalMonthlyPay.innerText = sum + " AZN";
        if ((article.salary.value * 45) / 100 < sumOfPay) {
            canBeApplied.innerHTML = '<p class="text-danger">False</p>';
          
        } else {
           canBeApplied.innerHTML = '<p class="text-success">True</p>';
         
        }

        name.innerText = article.name;
        surname.innerText = article.surname;
        salary.innerText = article.salary.value + " " + article.salary.currency;
        image.innerHTML = `<img src="${article.img}" style="width:50px; height:50px; border-radius:50%;">`;

        th.innerText = orders;
        mainBody.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(image);
        tr.appendChild(name);
        tr.appendChild(surname);
        tr.appendChild(salary);
        tr.appendChild(activeLoan);
        tr.appendChild(totalMonthlyPay);
        tr.appendChild(canBeApplied);
        orders += 1;
        
      });
    });
    
}
getCustomers();

