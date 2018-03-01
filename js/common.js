function getPersons() {
    var num = prompt("Какое количество пользователей Вы хотите добавить?"),
        arrayPersons = [];

    if (!num || !+num) return false; //если число null или число (0 или строка) - возврат
    //(num=null => true || true) (num=0 => false || true) (num="a" => false || true) (num=1 => false || false)

    for (var i = 0; i < num; i++) {
        var request = prompt("Введите через запятую данные пользователя №"
            + (i + 1)
            + ": имя, возраст, профессия", "name, age, profession"),
            person = {},
            buffer;

        buffer = request.split(", "); //разбиваем строку в массив
        person.name = buffer[0]//имя
        person.age = +buffer[1]; //возраст
        person.profession = buffer[2]; //проессия
        arrayPersons.push(person); // помещаем в массив - массив из разбитой строки
    }

    return arrayPersons;
}


function sorting(arrayPersons) {
    var arrayKeys = ["age", "name", "profession"], //массив допустимых ключей
        sum = "", //опция Sum
        key = ""; //ключ для сортировки

    while ((sum !== "sum" && sum !== "") || !arrayKeys.includes(key)) {
        var request = prompt("Укажите по какому ключу сортировать? {name}, {age}, {profession}", "{}");

        //замена любое кол-во пробелов{любое кол-во симовлов} на ""
        sum = request.replace(/\s*{\w*}/, "").toLowerCase();
        //замена (любое кол-во симовлов+любое кол-во пробелов+{) или (}) на "" (g-глобальный поиск)
        key = request.replace(/(\w*\s*{)|(})/g, "").toLowerCase();

        if (!arrayKeys.includes(key)) alert("Неверный ключ");
        if (sum !== "" && sum !== "sum") alert("Неверный параметр Sum");

    }


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
            var sumAge;

            sumAge = arrayPersons.reduce(function (ageSum, person) {
                return ageSum + person.age;
            }, 0);

            return arrayReturnSum.push(sumAge);

        } else { //если !== age
            arrayPersons.forEach(function (person) {
                arrayReturnSum.push(person[key]); //формируем массив необходимых значений
            }, key);

            return arrayReturnSum; //отдаем массив необходимых значений
        }
    }

    return arrayPersons; //отдаем массив с обьектами
}


function showResult(result) {
    var div = document.getElementById("result"); //вытягиваем наш div

    result.forEach(function (person, index) {

        if (typeof(person) === "object") { //если элемент массива обьект
            div.innerHTML +=
                "Имя: " + person.name + "; возраст: " + person.age + "; профессия: " + person.profession + "<br>";
        } else { //если обычный массив
            //если последний элемент - не добавляем ", "
            div.innerHTML += (index === result.length - 1) ? person : person + ", ";
        }

    }, div);

}

function run() {
    var persons = getPersons(),
        sortedResult;

    if (persons) { //если введено кол-во пользователей
        sortedResult = sorting(persons)
        showResult(sortedResult);
    }

}

run();