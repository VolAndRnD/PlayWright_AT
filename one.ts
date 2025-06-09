//task1

// function stringLength(a:string):number{
//     return a.length
// }
// console.log(stringLength)

//task2

// interface Person{
//     firstName:string,
//     age: number,
//     email: string
// }

// function displayPerson(person:Person):void{
//     console.log(`Имя: ${person.firstName}, Возраст: ${person.age}, Email: ${person.email}`);
// }

// const person:Person = {firstName :'Nick', age: 26, email:'123@mail.ru'};
// displayPerson(person);

//task3

// type Student = {firstName: string, age: number, grades:number[]}

// function averageGrades(student:Student):number{
//     return student.grades.reduce((acc,grades) => acc + grades,0)/student.grades.length;
// }

// const stud:Student = {firstName: 'Alex', age: 34, grades:[5,4,5,2]}
// averageGrades(stud);

//task 4

// interface Circle{
//     shape: 'circle';
//     radius: number;
// };
// interface Rectangle{
//     shape: 'rectangle';
//     width: number;
//     height: number;
// };
// type Shape = Circle | Rectangle;

// function calculateArea(shape:Shape):number{
//     if (shape.shape == 'circle'){
//         return Math.PI * shape.radius * shape.radius;
//     } else {
//         return shape.width * shape.height;
//     }
// }

// const circle: Circle = { shape: 'circle', radius: 5 };
// const rectangle: Rectangle = { shape: 'rectangle', width: 10, height: 20 };
// console.log(calculateArea(circle));
// console.log(calculateArea(rectangle));

//task 5

// interface Vehicle{
//     start():void;
//     stop():void;
// }

// class Car implements Vehicle {
//     constructor(private model:string){      
//     }

//     start():void{
//         console.log(`${this.model} запущен`);
//     }
//     stop():void{
//         console.log(`${this.model} остановлен`);
//     }
// }

// const car = new Car ("Toyota");
// car.start();
// car.stop();

//task 6

// abstract class Animal {    
//     abstract makeSound():void;
// }

// class Dog extends Animal{
//     makeSound(): void {
//        console.log('Гав') 
//     }
// }

// class Cat extends Animal{
//     makeSound(): void {
//         console.log('Мяу')
//     }
// }

// const dog = new Dog();
// const cat = new Cat();
// dog.makeSound();
// cat.makeSound();

// task 7

// function identity <T>(identity:T):T{
//     return identity
// }

// console.log(identity('42'));
// console.log(identity(42));

// task 8

// class Container <T>{
//     private items:T[] = [];

//     add(item:T):void{
//         this.items.push(item);
//     };

//     get(index:number):T{
//         return this.items[index];
//     };
// }

// const numberContainer = new Container();
// numberContainer.add(1);
// numberContainer.add(24);
// console.log(numberContainer.get(0))

//task 9

// function isEvenOrOdd(num: number): string {
//     return num % 2 === 0 ? "Четное" : "Нечетное";
// }

// console.log(isEvenOrOdd(5)); // Нечетное
// console.log(isEvenOrOdd(10))

//task 10

//function positiveNumbers(arr: number[]): number[] {
//     return arr.filter(num => num > 0);
// }

// const numbersArray = [-1, 2, 0, 3, -4];
// console.log(positiveNumbers(numbersArray)); 

// interface Book {
//     title: string,
//     year: number,
//     author: string
// }

// class Library{
//     private books:Book[] = [];

//     addBook(book:Book):void{
//         this.books.push(book)
//     }

//     findBook(title:string):Book|undefined{
//         return this.books.find(b=>b.title.toLowerCase() === title.toLowerCase())
//     }

//     listBook():void{
//         if(this.books.length === 0){
//             console.log('Библиотека пуста')
//             return
//         } else{
//             this.books.forEach(book=>console.log(`Название книги: ${book.title}, автор книги: ${book.author}, год издания: ${book.year}`))
//             console.log()
//         }
//     }
//     removeBook(book:Book):Book[]|undefined{
//         const currentLibrary:Book[] = this.books.filter(b=>b.title !== book.title && b.author !== book.author && b.year !== book.year);
//         this.books = currentLibrary
//         return this.books;    
//     }
// }

// const myLibrary = new Library();
// myLibrary.addBook({ title: "1984", author: "Джордж Оруэлл", year: 1949 });
// myLibrary.addBook({ title: "Убить пересмешника", author: "Харпер Ли", year: 1960 });
// myLibrary.addBook({ title: "Гордость и предубеждение", author: "Джейн Остин", year: 1813 });

// console.log("Все книги в библиотеке:");
// myLibrary.listBook();

// const searchedBook = myLibrary.findBook("1984");
// if (searchedBook) {
//     console.log(`Найдена книга: "${searchedBook.title}" - ${searchedBook.author}, ${searchedBook.year}`);
// } else {
//     console.log("Книга не найдена.");
// }

// myLibrary.removeBook({ title: "1984", author: "Джордж Оруэлл", year: 1949 })
// myLibrary.listBook();


// interface Products{
//     id:number;
//     name: string;
//     category: string;
//     price: string;
//     stock: string;
//     tags: string[]; 
// }

// const products:Products[] = [{id:1,name:'socks', category:'clothes', price:'150', stock:'657', tags:['foot','socks']}];

// const addProduct = () => {
//     const id : number = products.length + 1;
//     const name : string | null = prompt('Введите название товара: ');
//     const category : string | null = prompt('Введите название категории товара: ');
//     const price : string | null = prompt('Укажите стоимость товара в рублях: ');
//     const stock : string | null = prompt('Укажите количество товара на складе: ');
//     const tags : string[] | undefined= prompt('Укажите теги товара через запятую: ')?.toLocaleLowerCase().split(',')
//     if(name && category && price && stock && tags){
//         return products.push({id, name, category, price, stock, tags })
//     }
// };

// const removeProduct = ():number|undefined => {
//     const id: number = +prompt('Укажите id товара, чтобы его удалить из списка товаров: ')!;
//     if(products.find(item => item.id === id)){
//         const currentProducts = products.filter(item => item.id !== id)
//         products.length = 0;
//         return products.push(...currentProducts);
//     } else {
//         console.log('Товар не найден')
//     }
// };

// const updateProduct = () => {
//     const id = +prompt('Укажите id товара, чтобы изменить его описание в каталоге: ')!
          
//         products.forEach(item=>{
//             if(products.find(item=> item.id === id)){ 
//             const nameChange: string | null = prompt('Введите название товара: ');
//             const categoryChange: string | null= prompt('Введите название категории товара: ');
//             const priceChange: string | null = prompt('Укажите стоимость товара в рублях: ');
//             const stockChange: string | null = prompt('Укажите количество товара на складе: ');
//             const tagsChange: string[] | undefined = prompt('Укажите теги товара через запятую: ')?.toLocaleLowerCase().split(',');           
                
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
//     const category: string | null = prompt('Укажите название категории для поиска товара: ');
//     if (products.find(item=> item.category === category)){
//         return console.log(products.filter(item=> item.category === category))
//     } else {
//         console.log('Категория товаров не найдена');
//     }
// };

// const getProductsByTags = () => {
//     const tags: string[] | undefined = prompt('Укажите теги товаров через запятую, если их несколько, чтобы найти товары в каталоге: ')?.toLocaleLowerCase().split(',');    
//     return console.log(products.filter(item => item.tags.some(tag => tags?.includes(tag))));
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
//             const command: string | null = prompt("Укажите команду для работы со списком событий. К примеру addProduct, removeProduct, updateProduct, getProductsByCategory, getProductsByTags, displayProducts, exit: ", '');
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

type TargetFunction = (...args: number[]) => number;

function sum(a: number, b: number): number {
    const result: number = a + b;
    console.log('Вычисляю сумму... результат: ', result);
    return result;
}

function delayAndLong(delay: number) {
    return function(targetFunction: TargetFunction) {
        let lastArgs: number[] | null = null;
        let lastResult: number | null = null;
        let cacheActive = false;

        return function(...args: number[]): Promise<number> {
            const startTime = new Date();
            const startTimeFormatted = startTime.toLocaleTimeString();
            console.log(`[${startTimeFormatted}] Начало выполнения вычисления`);

            if (cacheActive && JSON.stringify(args) === JSON.stringify(lastArgs)) {
                console.log('Возвращаю закешированный результат: ', lastResult);
                const endTime = new Date();
                const endTimeFormatted = endTime.toLocaleTimeString();
                console.log(`[${endTimeFormatted}] Конец выполнения (кеш):`);
                return Promise.resolve(lastResult as number);
            }

            return new Promise((resolve) => {
                setTimeout(() => {
                    lastArgs = args;
                    lastResult = targetFunction.apply(this, args);
                    cacheActive = true;

                    const endTime = new Date();
                    const endTimeFormatted = endTime.toLocaleTimeString();
                    const duration = endTime.getTime() - startTime.getTime();

                    console.log(`[${endTimeFormatted}] Конец выполнения вычисления (затрачено ${duration} мс)`);
                    resolve(lastResult as number);
                }, delay);
            });
        };
    };
}

const delayedSum = delayAndLong(1000)(sum);
delayedSum(3, 4).then(console.log);

setTimeout(() => {
    delayedSum(3, 4).then((result) => {
        console.log('Результат (первый вызов): ', result);
    });
}, 2000);

setTimeout(() => {
    delayedSum(5, 8).then((result) => {
        console.log('Результат (вызов нового значения): ', result);
    });
}, 2000);