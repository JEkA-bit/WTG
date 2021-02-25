let _name, // ім/'я користувача
    surname,  // прізвище користувача
    age,    // вік користувача
    password, // пароль користувача
    email, // електронна пошта користувача
    id = 0; // унікальний код користувача

let LoadLocalStorage = true; // змінна

let ___Email = false; // true - такий email вже існує в localStorage["Users"], false - не існує

let array = {
    users: []
}; // масив в який вносяться дані з localStorage["Users"]

function read(){
    array.users = JSON.parse(localStorage.getItem("Users"));

    for(let i = 0; i < array.users.length; i++){
        id = array.users[i].Id;
    }
} // фукнкція яка отримує UserId в останній в localStorage["Users"]

function send(){

    ___Email = false;

    //перевірка на існування масиву Users в localStorage
    if(localStorage.getItem("Users") != null) { read(); }
    else id--;

    //отримання даних з форми
    _name = document.getElementById('Name').value.toString();
    surname = document.getElementById('Surname').value.toString();
    age = document.getElementById('Age').value.toString();
    password = document.getElementById('Password').value.toString();
    email = document.getElementById('Email').value.toString();

    // перевірка на пусті поля
    if( _name != "" && surname != "" && age != "" && password != "" && email != "") {

        for(let i = 0; i < array.users.length; i++){

            if(array.users[i].Email == email){
                ___Email = true;
                break;
            }

        }

        // перевірка на унікальність Email
        if(___Email == false) {
            id++;
            array.users.push({Id: id, Name: _name, Surname: surname, Age: age, Password: password, Email: email});
            localStorage.setItem("Users", JSON.stringify(array.users));
            window.location.href = "page.html";
        }

        else{ alert("Your email is used!"); }
    }

    else { alert("Fill in all the fields!") }
} // додавання нового користувача

function load(){

    document.getElementById("table").innerHTML = "";

    let headtr = document.createElement("tr");

    let headtdId = document.createElement("td");
    let headtdName = document.createElement("td");
    let headtdSurname = document.createElement("td");
    let headtdAge = document.createElement("td");
    let headtdEmail = document.createElement("td");

    headtdId.innerHTML = "#";
    headtdName.innerHTML = "Name";
    headtdSurname.innerHTML = "Surname";
    headtdAge.innerHTML = "Age";
    headtdEmail.innerHTML = "Email";

    headtr.append(headtdId);
    headtr.append(headtdName);
    headtr.append(headtdSurname);
    headtr.append(headtdEmail);
    headtr.append(headtdAge);

    document.getElementById("table").append(headtr);

    if(LoadLocalStorage == true) {
        array.users = JSON.parse(localStorage.getItem("Users")) ;
    }

    for(let i = 0; i < array.users.length; i++){
        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        let tdName = document.createElement("td");
        let tdSurname = document.createElement("td");
        let tdAge = document.createElement("td");
        let tdEmail = document.createElement("td");

        tdId.innerHTML = array.users[i].Id;
        tdName.innerHTML = array.users[i].Name;
        tdSurname.innerHTML = array.users[i].Surname;
        tdAge.innerHTML = array.users[i].Age;
        tdEmail.innerHTML = array.users[i].Email;

        tr.append(tdId);
        tr.append(tdName);
        tr.append(tdSurname);
        tr.append(tdEmail);
        tr.append(tdAge);

        document.getElementById("table").append(tr);
    }
} // завантаження даних в таблицю

function change(){
    LoadLocalStorage = true;
    load();

    let str = document.getElementById("search").value;

    if(str == ""){
        LoadLocalStorage = true;
        load();
    }

    str.trim();

    for(let i = 0; i < array.users.length; i++){

        let sss = array.users[i].Email;
        sss.trim();

        if(sss.includes(str.toString()) == false){
            array.users.splice(i, 1);
        }
    }
    LoadLocalStorage = false;
    load();
} // пошук

function deleteAll(){
    change();

    let arr = {
        Users: []
    };

    arr.Users = JSON.parse(localStorage.getItem("Users"));
    console.log(array.users);
    for(let i = 0; i < array.users.length; i++){
        for(let j = 0 ; j < arr.Users.length; j++){
            if(array.users[i].Id == arr.Users[j].Id){
                arr.Users.splice(j, 1);
            }
        }
    }

    localStorage.clear();
    localStorage.setItem("Users", JSON.stringify(arr.Users));

    load();
} // видалення

function add() { window.location.href = "index.html"; } // перехід на сторінку додавання

function edit() {
    // отримання даних з полів
    _name = document.getElementById('EditName').value.toString();
    surname = document.getElementById('EditSurname').value.toString();
    age = document.getElementById('EditAge').value.toString();
    password = document.getElementById('EditPassword').value.toString();
    email = document.getElementById('EditEmail').value.toString();

    // перевірка на пусті поля
    if (_name != "" && surname != "" && age != "" && password != "" && email != "") {

        let arr = {
            Users: []
        };  // додатковий масив для пошуку UserId який далі буде завантажений в LocalStorage

        arr.Users = JSON.parse(localStorage.getItem("Users")); // отримання даниз з localStorage["Users"]

        // пошук користувача в масиві і заміна даних
        for (let i = 0; i < arr.Users.length; i++) {
            if (arr.Users[i].Id == localStorage.getItem("Id")) {
                arr.Users[i].Name = _name;
                arr.Users[i].Surname = surname;
                arr.Users[i].Age = age;
                arr.Users[i].Password = password;
                arr.Users[i].Email = email;
                break;
            }
        }

        // очистка і заповнення localStorage та перехід на сторінку з таблицею
        localStorage.clear();
        localStorage.setItem("Users", JSON.stringify(arr.Users));
        window.location.href = "page.html";
    }

} // редагування вибраного користувача

function editpage(){
    if(array.users.length == 1) {

        console.log(array.users);

        localStorage.setItem("Id", array.users[0].Id);
        localStorage.setItem("Name", array.users[0].Name);
        localStorage.setItem("Surname", array.users[0].Surname);
        localStorage.setItem("Age", array.users[0].Age);
        localStorage.setItem("Email", array.users[0].Email);
        localStorage.setItem("Password", array.users[0].Password);
        window.location.href = "edit.html";
    }

    else{
        alert("Must be 1 user.");
    }

} // перехід на сторінку редагування

function editload() {
    console.log(array.users);

    document.getElementById('EditName').value = localStorage.getItem("Name");
    document.getElementById('EditSurname').value = localStorage.getItem("Surname");
    document.getElementById('EditAge').value = localStorage.getItem("Age");
    document.getElementById('EditPassword').value = localStorage.getItem("Password");;
    document.getElementById('EditEmail').value = localStorage.getItem("Email");;
} // завантаження сторінки редагування
