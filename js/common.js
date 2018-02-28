function getPersons() {
    var num = prompt("Какое количество пользователей Вы хотите добавить?"),
        arrayPersons = [];

    num = (num === null) ? 0 : num;

    for (var i = 0; i < num; i++) {
        var request = prompt("Введите через запятую данные пользователя №"
            + (i + 1)
            + ": имя, возраст, профессия", "name, age, profession");

        arrayPersons[i] = request.split(", "); //в i-ячейку помещаем массив данных
    }

    result = arrayPersons.map(function (value) {
        var person = {};

        person.name = value[0]; //имя
        person.age = +value[1]; //возраст
        person.profession = value[2]; //проессия
        return person; //возвращаем обьект
    });

    return result; //возвращаем массив из обьектов
}


function sorting(arrayPersons) {
    var arrayKeys = ["age", "name", "profession"], //массив допустимых ключей
        sum = "", //опция Sum
        key = ""; //ключ для сортировки

    do {
        var request = prompt("Укажите по какому ключу сортировать? {name}, {age}, {profession}", "{}");

        sum = request.slice(0, request.indexOf("{")).toLowerCase().trim(); //опция sum
        key = request.slice(request.indexOf("{") + 1, request.indexOf("}")).toLowerCase(); //ключ для сортировки

        if (arrayKeys.indexOf(key) === -1) {
            alert("Неверный ключ");
        }

        if (sum !== "") {
            if (sum !== "sum") {
                alert("Неверный параметр Sum");
            }
        }

    } while ((sum !== "sum" && sum !== "") || arrayKeys.indexOf(key) === -1)


    arrayPersons.sort(function (person1, person2) { //сортировка по ключу
        if (person1[key] > person2[key]) {
            return 1;
        } else if (person1[key] < person2[key]) {
            return -1;
        }
        return 0;
    }, key);


    if (sum === "sum") { //если есть опция sum
        var arrayReturnSum = []; //будем отдавать другой массив

        if (key === "age") { //если ввели age - посчитать суммарный возраст
            var ageSum = 0;

            arrayPersons.forEach(function (person) {
                ageSum += person.age;
            }, ageSum);

            arrayReturnSum[0] = ageSum;

            return arrayReturnSum; //отдаем массив с одним элементом ageSum

        } else { //если !== age
            arrayPersons.forEach(function (person, index) {
                arrayReturnSum[index] = person[key]; //формируем массив необходимых значений
            }, key);

            return arrayReturnSum; //отдаем массив необходимых значений
        }
    }

    return arrayPersons; //отдаем массив с обьектами
}


function showResult(result) {
    var div = document.getElementById("result"); //вытягиваем наш div

    result.forEach(function (person, index) {
        var glue = (result.length === 1) ? "" : ", "; //элемент склеивания значений

        if (typeof(person) === "object") { //если элемент массива обьект
            div.innerHTML +=
                "Имя: " + person.name + "; возраст: " + person.age + "; профессия: " + person.profession + ";<br>";
        } else { //если обычный массив
            //если последний элемент - не добавляем glue
            div.innerHTML += (index === result.length - 1) ? person : person + glue;
        }

    }, div);

}

function run() {
    var persons = getPersons();

    if (persons.length != 0) {
        showResult(sorting(persons));
    }

}


run();