const roles = {
	admin: "image/admin.svg",
	student: "image/student.svg",
	lector: "image/lector.svg"
};

const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922522.svg",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922656.svg",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922616.svg",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922688.svg",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922565.svg",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922719.svg",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
]


// Файл script.js содержит данные:
// users – массив юзеров системы.
// roles – объект ролей юзера.
// gradation – объект с диапазоном оценок.

// Что нужно сделать: отрендерить для каждого юзера с массива users соответствующего вида блок.

// Для каждого юзера в блоке выводим:
// Картинку юзера – свойство img
// Имя юзера – свойство name
// Возраст юзера – свойство age
// Роль юзера – свойство role.

// Если у юзера свойство courses есть, то выводим перечень пройденных курсов.

// Делаем основной класс User, в котором будет созданы метод render и renderCourses.
// Для каждой роли делаем свой класс Student, Lector, Admin, который наследует класс User.
// В классах Lector, Admin переопределяем метод renderCourses для того, что бы в нужном виде отобразить список курсов.

// Заданную html - разметку и css - классы для каждого блока можете править как хотите) Главное – визуально отобразить так, как на картинке.

class User {
	constructor(name, age, img, role, courses) {
		this.name = name;
		this.age = age;
		this.img = img;
		this.role = role;
		this.courses = courses;
	};

	render() {
		let classAdmin;
		if (this.role !== "student") {
			classAdmin = "admin--info";
		};
		return `
           <div class="user">
            <div class="user__info">
                <div class="user__info--data">
                    <img src="image/man.svg" alt="${this.name}" height="50">
                    <div class="user__naming">
                        <p>Name: <b>${this.name}</b></p>
                        <p>Age: <b>${this.age}</b></p>
                    </div>
                </div>
                <div class="user__info--role ${this.role}">
                    <img src="image/${this.role}.svg" alt="${this.role}" height="25">
                    <p>${this.role}</p>
                </div>
            </div>
			<div class="user__courses ${classAdmin}">
	       ${level}
		   </div>
		</div>`
	};

	renderCourses(grad) {
		let mas = [];
		this.courses.forEach(function (i) {
			mas.push(`<p class="user__courses--course student">${i.title}
				   <span class="${numbers(i.mark, grad)}">${upString(numbers(i.mark, grad))}</span>
                  </p>`)
		});
		return mas.join("");
	};
};

class Student extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	};
};

class Lector extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	};

	renderCourses(grad) {
		let man = this.role;
		let mas = [];
		this.courses.forEach(function (i) {
			mas.push(`
			<div class="user__courses--course ${man}">
				<p>Title: <b>${i.title}</b></p>
				<p>${man}'s score: <span class="${numbers(i.score, grad)}">${upString(numbers(i.score, grad))}</span></p>
				<p>Average student's score: <span class="${numbers(i.studentsScore, grad)}">${upString(numbers(i.studentsScore, grad))}</span></p>
			</div>`)
		});
		return mas.join("");
	};
};

class Admin extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	};

	renderCourses(grad) {

		let man = this.role;
		let mas = [];
		this.courses.forEach(function (i) {
			mas.push(`
			<div class="user__courses--course ${man}">
					<p>Title: <b>${i.title}</b></p>
					<p>${man}'s score: <span class="${numbers(i.score, grad)}">${upString(numbers(i.score, grad))}</span></p>
					<p>Lector: <b>${i.lector}</b></p>
				</div>`)
		});
		return mas.join("");
	};
};

let mass = [];
let level = [];
function constructor(users) {
	users
		.map(function (i) {
			if (i.role === "student") return new Student(i.name, i.age, i.img, i.role, i.courses);
			if (i.role === "lector") return new Lector(i.name, i.age, i.img, i.role, i.courses);
			if (i.role === "admin") return new Admin(i.name, i.age, i.img, i.role, i.courses);
		})
		.forEach(function (i) {
			level = [];
			if (!i.courses)
				mass.push(i.render());
			else {
				level = i.renderCourses(gradation);
				mass.push(i.render(level));
			};
		});
};

constructor(users);

function upString(item) {
	if (item) {
		let slovo = "";
		for (let i = 0; i < item.length; i++) {
			if (i === 0) {
				slovo = slovo + item[i].toUpperCase();
			} else if (item[i - 1] === "-") {
				slovo = slovo + item[i].toUpperCase();
			} else {
				slovo = slovo + item[i];
			}
		}
		return slovo.replace("-", " ");
	};
};

function numbers(item, grad) {
	let status;
	if (item <= 20) {
		status = grad[20];
	} else if (item > 20 && item <= 55) {
		status = grad[55];
	} else if (item > 55 && item <= 85) {
		status = grad[85];
	} else if (item > 85 && item <= 100) {
		status = grad[100];
	};
	return status;
};

document.write(`<div class="users">${mass.join("")}</div>`);