'use strict';

const prompt = require('prompt-sync')();
// let numeberStudent = parseInt(prompt('Сколько студентов?'))
// let  riskCount = 0, borderlineCount = 0, successCount = 0;

// for (let i = 0; i < numeberStudent; i++){
//     let nameStudy = prompt('Введите имя студента');
    
//     let MatematicalBall = parseInt(prompt('Введите кол-во баллов по Математике'));
//     let physicalBall = parseInt(prompt('Введите кол-во баллов по Физике'));
//     let chemicalBall = parseInt(prompt('Введите кол-во баллов по Химии')); 
    
//     if(MatematicalBall <= 50){
//         riskCount++;
//         alert('Студент в группе риска');
//         continue;
//     }
//     else {
//         let countSum = MatematicalBall + physicalBall + chemicalBall;

//         if (countSum / 3 >= 60 && countSum / 3 < 80){
//             borderlineCount++;
//             alert('Студент ' + nameStudy + ' находится на грани успешности');
//         }
//         else if (countSum / 3 >= 80){
//             successCount++;
//             alert('Студент ' + nameStudy + ' молодец, успехи налицо!')
//         }
//         else if (countSum / 3 < 60){
//             riskCount++;
//             alert('Студент ' + nameStudy + ' находитcя в группе риска');
//         }
//     }
// }

// alert ('Кол-во студентов на грани риска: ' + riskCount + '. Кол-во студентов на грани успеха: ' + borderlineCount +
//      '. Кол-во успешных студентов: ' + successCount);


// let myPhoneBook =[];

// while(true){
//     let command = prompt('Укажите команду для взаиомдействия(add, remove, view, exit)').toLowerCase();
    
//     if(command === 'exit'){
//         break;
//     }
//     else if (command === 'add'){
//         let firstName = prompt('укажите имя');
//         let numberPhone = prompt('укажите номер телефона');
//         let email = prompt('укажите email');
    
//         numberPhone??'не указано';
//         firstName??'не указано';
//         email??'не указано';
//         myPhoneBook.push({numberPhone, firstName, email});
//         alert(`Контакт ${firstName} добавлен`);
//     }else if(command == 'remove'){
//         let nameToRemove = prompt('Укажите имя для удаления');
//         myPhoneBook = myPhoneBook.filter(contact=>contact.firstName.toLowerCase() !== nameToRemove.toLocaleLowerCase());
//         alert(`Контакт ${nameToRemove} удален`);
//     }else if (command == 'view'){
//         if(myPhoneBook.length === 0){
//             alert('Телефонная книга пуста');
//         }
//         else{
//             myPhoneBook.forEach(contact => {alert(`Имя: ${contact.firstName}, Номер телефона: ${contact.numberPhone}, Почта: ${contact.email}`)});
//         }
//     }else{
//         alert('Комнада не известна. Попробуйте еще раз или выберите exit')
//     }
// }




// const library = {
//     books: [],
//     addBook(book){
//         this.books.push(book);
//     },
//     getBooks(){
//         return this.books;
//     },
//     findBooksByAuthor(author){
//         author = prompt('Укажите автора для поиска книги')
//         return this.books.filter(book=>book.author === author)
//     }
// }

// while(true){
//     let command = prompt('Укажите команду для взаиомдействия(addBook, findBooksByAuthor, getBooks, exit)');    

//     if(command === 'exit'){
//         break;
//     }
//     else if (command === 'addBook'){

//         library.addBook({title: prompt('Укажите название книги'), author: prompt('Укажите автора книги'), year:prompt('Укажите год публикации книги')});

//     } 
//     else if (command === 'getBooks'){

//         const allBooks = library.getBooks();

//         for (let book of allBooks){

//             alert(`${book.title} by ${book.author}, published in ${book.year}`);
//         }

//     }
//     else if (command === 'findBooksByAuthor'){

//         const orwellBook = library.findBooksByAuthor();

//         for(let book of orwellBook){

//             alert(`${book.title}, published in ${book.year} by ${book.author}`);

//             }
//     } 
//     else {

//         alert('Комнада не известна. Попробуйте еще раз или выберите exit')
//     }
// }



// const todoList = {
//     tasks : [],
//     nextId: 1,

//     addTask(title){
//         const task = {
//             id: this.nextId++,
//             title: title,
//             completed: false
//         };
//         this.tasks.push(task);
//         return task;
//     },

//     removeTask(id){
        
//         this.tasks = this.tasks.filter(task => task.id !== id);
//     },

//     markTaskAsCompleted(id){
        
//         const task = this.tasks.find(task=>task.id === id)
        
//         if (task){
//             task.completed = true;
//         }
//         return task
//     },

//     getTask(){
//         return this.tasks
//     }
// }

// while(true){
//     let command = prompt('Укажите команду для взаиомдействия(addTask, removeTask, getTask, markTaskAsComplete, exit)');    

//         if(command === 'exit'){
//             break;
//         }
//         else if (command === 'addTask'){
//             todoList.addTask(prompt('укажите название задачи'));
//         }
//         else if (command === 'removeTask'){
//             let idToRemove = parseInt(prompt('Укажите ID для удаления'));

//             todoList.removeTask(idToRemove);
//         }
//         else if (command === 'getTask'){
//             const allTasks = todoList.getTask();

//             for (let task of allTasks){
//                 alert(`Номер задачи: ${task.id}, наименование задачи: ${task.title}, статус задачи: ${task.completed} `)
//             }
//         }
//         else if (command === 'markTaskAsComplete'){
//             let markToComplete = parseInt(prompt('Укажите id, чтобы пометить задачу как завершенную'));

//             todoList.markTaskAsCompleted(markToComplete);
//         }
//         else {
//             alert('Комнада не известна. Попробуйте еще раз или выберите exit')
//         }

// }



// const students = [
//     {name:'Mark', age: 25, grades: [83,75,92]},
// ];

// const getAverageGrade = (students) => {

//     const totalGrades = students.reduce((sum,student) => {

//         return sum + student.grades.reduce((acc,grade) => acc + grade,0);

//     },0);

//     const totalCount = students.reduce((sum, student) => sum + student.grades.length,0);

//     return totalGrades/totalCount
// };

// const getStudentAboveAverageGrade = (students) => {

//     const averageGrade = getAverageGrade(students);

//     const studentsAverageGrade = students.filter(student => {

//         const studentAverage = student.grades.reduce((acc, grade) => acc + grade, 0)/student.grades.length;
        
//         return studentAverage > averageGrade        
//     });
    
//     if (studentsAverageGrade != ''){
//         for (let student of studentsAverageGrade){
//             alert(`Студент с оценкой выше среднего ${student.name} `);
//         }
//     } else {
//         alert('Таких студентов пока нет')
//     }
// };

// const addGrade = (studentName,grade) => {

//     const student = students.find(s=> s.name === studentName);

//     if(student){
//         student.grades.push(grade);
//     }
//     else{
//         alert(`Студент с таким именем ${studentName} не найден.`)
//     }
// };

// const addStudent = (studentName) => {

//     const student = students.filter(s => s.name === studentName);
    
//     if(student){
//         alert(`Студент с таким именем ${studentName} уже существует`)
//     }else{
//         let age =  +prompt("Укажите возраст студента");
//         let grades = +prompt("Укажите первую оценку студента")
//         students.push({name:studentName,age:age, grades:[grades]});
//     }
// };

// const getGradesAtStudent = (studentName) => {

//     const student = students.find(s => s.name === studentName);

//     if(student?.grades){
//         alert(`У студента ${studentName} оценки: ${student.grades}`)        
//     }   
//     else if (student){
//         alert(`У студента ${studentName} не указаны оценки`)
//     }
//     else{
//         alert(`Студента с таким именем не существует ${studentName}`)
//     }
// };

// const deleteGradesOfStudent = (studentName, position, count) => {
//     const student = students.find(s=> s.name === studentName)
//     if(student){
//         student.grades.splice(position - 1, count)
//     }else{
//         alert('Студента с таким именем не существует')
//     }
// };

// while(true){
//     let command = prompt("Укажите команду для работы со списком студентов. К примеру addStudent, addGrade, getStudentAboveAverageGrade, getAverageGrade, getGradesAtStudent, deleteGradesOfStudent, exit");
//     switch(command){
//         case 'addStudent':
//             let addStudentName = prompt('укажите имя студента для добавления');
//             addStudent(addStudentName,students);
//             break;
//         case 'addGrade':
//             let studentNameForGrade = prompt('Укажите имя студента, которому хотите добавить оценку')
//             let studentGrade = +prompt(`Укажите оценку для студента ${studentNameForGrade}`)
//             addGrade(studentNameForGrade,studentGrade);
//             break;
//         case 'getAverageGrade':
//             alert(`Средняя оценка на всех студентов равна ${getAverageGrade(students)}`)
//             break;
//         case 'getStudentAboveAverageGrade':
//             getStudentAboveAverageGrade(students);
//             break;
//         case 'getGradesAtStudent':
//             let studentName = prompt('Укажите имя студента, чтобы узнать его оценки');
//             getGradesAtStudent(studentName,students)
//             break;
//         case 'deleteGradesOfStudent':
//             let studentNameOfDeleteGrades = prompt('Укажите имя студента, которому хотите убрать оценки');
//             let position = +prompt('Укажите порядковый номер оценки, с которой хотите начать удаление')
//             let count = +prompt('Укажите количество оценок, которые хотите удалить двигаясь слева на право')
//             deleteGradesOfStudent(studentNameOfDeleteGrades,position,count)
//             break;
//         default:
//             alert('Неверно указана команда');
//             break;
//     }
//     if (command === 'exit'){
//         break;
//     }
// }



// const events = [{title:'corn', date: '2025.01.01', time: '15:00', location: 'Ryzan', description:'lol'}];

// const addEvent = () => {
//     const title = prompt("Укажите название события: ");
//     const date = prompt('Укажите дату события в формате YYYY-MM-DD: ');
//     const time = prompt("Укажите время в формате HH:MM в 24 часовом виде: ");
//     const location = prompt('Укажите место проведения события: ');
//     const description = prompt('Добавьте описание к событию: ');
//     return events.push({title, date, time, location, description});
// };

// const removeEvent = () => {
//     const title = prompt("Укажите название события, которое хотите удалить: ");
//     const date = prompt('Укажите дату события, которое хотите удалить, в формате YYYY-MM-DD: ');
//     const currentEvent = events.filter(e => e.title !== title || e.date !== date);
//     events.length = 0;
//     return events.push(...currentEvent);
// };

// const getEventsOnDay = () => {
//     const date = prompt("Укажите дату в формате YYYY-MM-DD, для отображения событий в этот день: ");
//     return console.log(events.filter(e=> e.date === date));
// };

// const updateEvent = () => {
//     const title = prompt('Укажите название события, которое хотите изменить: ');
//     const date = prompt('Укажите дату события, которое хотите изменить в формате YYYY-MM-DD: ');

    // const currentEvent = events.map(item => {
    //     if(item.title === title && item.date === date){
    //         const changeTitle = prompt ('Укажите название нового события или оставьте без изменения, нажав Enter: ');
    //         const changeDate = prompt ('Укажите новую дату события в формате YYYY-MM-DD или оставьте без изменения, нажав Enter: ');
    //         const changeTime = prompt('Укажите новое время проведения события в формате HH:MM в 24 часовом виде или оставьте без изменения, нажав Enter: ');
    //         const changeLocation = prompt('Укажите новую локацию или оставьте без изменения, нажав Enter: ');
    //         const changeDescription = prompt('Укажите новое описание для события или оставьте без изменения, нажав Enter: ');
    //         return {...item, title:changeTitle||item.title, date:changeDate||item.date, time:changeTime||item.time, 
    //                         location:changeLocation||item.location, description:changeDescription||item.description}
            
    //     } else{
    //     return item;
    //     }
              
    // })
    // events.length = 0;
    // return events.push(...currentEvent);
    
// };

// while(true){
//         const command = prompt("Укажите команду для работы со списком событий. К примеру addEvent, removeEvent, getEventsOnDay, updateEvent, exit: ", '');
//         console.log(command);
//         if (command === 'exit'){
//             break;
//         } else {
//         switch(command){
//             case 'addEvent':
//                 addEvent();
//                 break;
//             case 'removeEvent':
//                 removeEvent();
//                 break;
//             case 'getEventsOnDay':                
//                 getEventsOnDay();
//                 break;
//             case 'updateEvent':
//                 updateEvent();                              
//                 break;
//             default:
//                 console.log('Неверно указана команда');
//                 break;
//         }
//     }    
// };

// const products = [{id:1,name:'socks', category:'clothes', price:'150', stock:'657', tags:['foot','socks']}];

// const addProduct = () => {
//     const id = products.length + 1;
//     const name = prompt('Введите название товара: ');
//     const category = prompt('Введите название категории товара: ');
//     const price = prompt('Укажите стоимость товара в рублях: ');
//     const stock = prompt('Укажите количество товара на складе: ');
//     const tags = prompt('Укажите теги товара через запятую: ').toLocaleLowerCase().split(',')
//     return products.push({id, name, category, price, stock, tags})
   
// };

// const removeProduct = () => {
//     const id = +prompt('Укажите id товара, чтобы его удалить из списка товаров: ');
//     if(products.find(item => item.id === id)){
//         const currentProducts = products.filter(item => item.id !== id)
//         products.length = 0;
//         return products.push(...currentProducts);
//     } else {
//         console.log('Товар не найден')
//     }
// };

// const updateProduct = () => {
//     const id = +prompt('Укажите id товара, чтобы изменить его описание в каталоге: ')
          
//         products.forEach(item=>{
//             if(products.find(item=> item.id === id)){ 
//             const nameChange = prompt('Введите название товара: ');
//             const categoryChange = prompt('Введите название категории товара: ');
//             const priceChange = prompt('Укажите стоимость товара в рублях: ');
//             const stockChange = prompt('Укажите количество товара на складе: ');
//             const tagsChange = prompt('Укажите теги товара через запятую: ').toLocaleLowerCase().split(',');           
                
//             item.name = nameChange || item.name;
//             item.category = categoryChange || item.category;
//             item.price = priceChange || item.price;
//             item.stock = stockChange || item.stock;
//             item.tags = tagsChange || item.tags;

//             } else {
//                 console.log('Товар не найден');
//                 return item;
//             }
//         });
// };

// const getProductsByCategory = () => {
//     const category = prompt('Укажите название категории для поиска товара: ');
//     if (products.find(item=> item.category === category)){
//         return console.log(products.filter(item=> item.category === category))
//     } else {
//         console.log('Категория товаров не найдена');
//     }
// };

// const getProductsByTags = () => {
//     const tags = prompt('Укажите теги товаров через запятую, если их несколько, чтобы найти товары в каталоге: ').toLocaleLowerCase().slice(',');    
//     return console.log(products.filter(item => item.tags.some(tag => tags.includes(tag))));
// };

// const displayProducts = () => {
//     if(products.length === 0){
//         console.log('Товаров нет')
//     } else {
//     return products.forEach(item=> console.log(
//         `\n ID: ${item.id}, \n
//         Название: ${item.name}, \n
//         Категория: ${item.category}, \n
//         Цена: ${item.price}, \n
//         Доступно: ${item.stock}, \n
//         Теги: ${item.tags}
//         `))
//     }
// };

// while(true){
//             const command = prompt("Укажите команду для работы со списком событий. К примеру addProduct, removeProduct, updateProduct, getProductsByCategory, getProductsByTags, displayProducts, exit: ", '');
//             console.log(command);
//             if (command === 'exit'){
//                 break;
//             } else {
//             switch(command){
//                 case 'addProduct':
//                     addProduct();
//                     break;
//                 case 'removeProduct':
//                     removeProduct();
//                     break;
//                 case 'updateProduct':                
//                     updateProduct();
//                     break;
//                 case 'getProductsByCategory':
//                     getProductsByCategory();                              
//                     break;
//                 case  "getProductsByTags":
//                     getProductsByTags();
//                     break;
//                 case 'displayProducts':
//                     displayProducts();
//                     break;
//                 default:
//                     console.log('Неверно указана команда');
//                     break;
//             }
//         }    
//     };

// class Event {
//     constructor(title,eventDate,description){
//         this.title = title;
//         this.eventDate = new Date(eventDate),
//         this.description = description;
//     }


//     toJSON(){
//         return{
//             title:this.title,
//             eventDate: this.eventDate.toISOString(),
//             description:this.description
//         };
//     }

// }

// const MyEvent = new Event(prompt('Введите название события: '), prompt('Введите дату и время в ISO формате: '), prompt('Введите описание события: '));
// const eventJSON = JSON.stringify(MyEvent);
// console.log(eventJSON);


// function sum(a,b){
//     const a = +prompt('Укажите первое значение для суммы чисел: ');
//     const b = +prompt('Укажите второе значение для суммы чисел: ');
//     const result = a+b;
//     console.log('вычисляю сумму... результат: ', result)
//     return result;
// }

// const delayedSum = delayAndLong(1000)(sum);
// delayedSum(3,4).then(console.log);
// setTimeout(()=> {
//     delayedSum(3,4).then((result) => {
//         console.log('Результат(первый вызов): ', result);
//     })
// },2000);
// setTimeout(()=> {
//     delayedSum(5,8).then((result)=> {
//         console.log('Результат(вызов нового значения): ', result)
//     })
// },2000);

// function delayAndLong(delay){
//     return function(targetFunction){
//         let lastArgs = null;
//         let lastResult = null;
//         let cacheActive = false;
        
//         return function(...args){
//             const startTime = new Date();
//             const startTimeFormatted = startTime.toLocaleTimeString();
//             console.log(`[${startTimeFormatted} Начало выполнения вычисления]`);

//             if (cacheActive && JSON.stringify(args) === JSON.stringify(lastArgs)){
//                 console.log('Возвращаю закешированный результат: ', lastResult);
//                 const endTime = new Date();
//                 const endTimeFormatted = endTime.toLocaleTimeString();
//                 console.log(`[${endTimeFormatted}] Конец выполнения (кеш): `)
//                 return Promise.resolve(lastResult);
//             }

//             return new Promise((resolve) => {
//                 setTimeout(() => {
//                     lastArgs = args;
//                     lastResult = targetFunction.apply(this, args);
//                     cacheActive = true;

//                     const endTime = new Date();
//                     const endTimeFormatted = endTime.toLocaleTimeString();
//                     const duration = endTime - startTime;

//                     console.log(`[${endTimeFormatted}] Конец выполенения вычисления (затраченео ${duration} мс)`);
//                     resolve(lastResult);
//                 },delay);
//             })
//         }
//     }
// }

// let items = new Set(['рубин', 'алмаз']);
// let result = "";

// items.forEach(item => {
//   result += "-" + item;
// });

// console.log(result);