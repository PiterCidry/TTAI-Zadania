function age(yearOfBirth) {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth;
}

function ageAdvanced(dateOfBirth) {
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    if (birthDate.getFullYear() < currentDate.getFullYear()) {
        if (birthDate.getMonth() < currentDate.getMonth()) {
            return currentDate.getFullYear() - birthDate.getFullYear();
        } else if (birthDate.getMonth() === currentDate.getMonth()) {
            if (birthDate.getDay() <= currentDate.getDay()) {
                return currentDate.getFullYear() - birthDate.getFullYear();
            } else {
                return currentDate.getFullYear() - birthDate.getFullYear() - 1;
            }
        } else {
            return currentDate.getFullYear() - birthDate.getFullYear() - 1;
        }
    } else if (birthDate.getFullYear() === currentDate.getFullYear()) {
        return 0;
    } else {
        return 0;
    }
}

function getAge() {
    const yearOfBirth = document.getElementById("ex1inp").value;
    const result = age(yearOfBirth);
    document.getElementById("ex1res").innerText = result;
}

function getAgeAdvanced() {
    const dateOfBirth = document.getElementById("ex2inp").value;
    const result = ageAdvanced(dateOfBirth);
    document.getElementById("ex2res").innerText = result;
}

//#################
//###EXERCISE 1###
//#################
//var yearOfBirth = prompt("What is your year of birth?");
//var yearOfBirth = document.getElementById("ex1inp").value;
////console.log(typeof yearOfBirth);
//var result = age(yearOfBirth);
////console.log("Exercise 1 result: "+result);
////alert("Exercise 1 result: " + result);
////document.write("</br><b>" + result + "</b>");
//document.getElementById("ex1res").innerText = result;

//#################
//###EXERCISE 1###
//#################
fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur?format=json")
    .then((response) => response.json())
    .then((data) => console.log(data.rates[0].mid))
    .catch((error) => console.log(error));

fetch("http://api.nbp.pl/api/exchangerates/rates/A/eur/last/30?format=json")
    .then((response) => response.json())
    .then((data) => {
        data.rates.forEach((x) => document.getElementById("ex3lis").innerText = `<li>${x.mid}</li>`);
    })
    .catch((error) => console.log(error));
