// function sum(a, b) {
//     var result = a + b;
//     console.log('Вычисляю сумму... результат: ', result);
//     return result;
// }
// function delayAndLong(delay) {
//     return function (targetFunction) {
//         var lastArgs = null;
//         var lastResult = null;
//         var cacheActive = false;
//         return function () {
//             var _this = this;
//             var args = [];
//             for (var _i = 0; _i < arguments.length; _i++) {
//                 args[_i] = arguments[_i];
//             }
//             var startTime = new Date();
//             var startTimeFormatted = startTime.toLocaleTimeString();
//             console.log("[".concat(startTimeFormatted, "] \u041D\u0430\u0447\u0430\u043B\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F"));
//             if (cacheActive && JSON.stringify(args) === JSON.stringify(lastArgs)) {
//                 console.log('Возвращаю закешированный результат: ', lastResult);
//                 var endTime = new Date();
//                 var endTimeFormatted = endTime.toLocaleTimeString();
//                 console.log("[".concat(endTimeFormatted, "] \u041A\u043E\u043D\u0435\u0446 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F (\u043A\u0435\u0448):"));
//                 return Promise.resolve(lastResult);
//             }
//             return new Promise(function (resolve) {
//                 setTimeout(function () {
//                     lastArgs = args;
//                     lastResult = targetFunction.apply(_this, args);
//                     cacheActive = true;
//                     var endTime = new Date();
//                     var endTimeFormatted = endTime.toLocaleTimeString();
//                     var duration = endTime.getTime() - startTime.getTime();
//                     console.log("[".concat(endTimeFormatted, "] \u041A\u043E\u043D\u0435\u0446 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F (\u0437\u0430\u0442\u0440\u0430\u0447\u0435\u043D\u043E ").concat(duration, " \u043C\u0441)"));
//                     resolve(lastResult);
//                 }, delay);
//             });
//         };
//     };
// }
// var delayedSum = delayAndLong(1000)(sum);
// delayedSum(3, 4).then(console.log);
// setTimeout(function () {
//     delayedSum(3, 4).then(function (result) {
//         console.log('Результат (первый вызов): ', result);
//     });
// }, 2000);
// setTimeout(function () {
//     delayedSum(5, 8).then(function (result) {
//         console.log('Результат (вызов нового значения): ', result);
//     });
// }, 2000);
