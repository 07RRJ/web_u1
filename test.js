// async function divide(a, b) { // takes 2 values
//     try {
//         if (b === 0) {  
//             throw new Error('Division by zero error');
//         }
//     return await new Promise((resolve) => {
//         setTimeout(() => resolve(a / b), 1000);
//     });
//     } catch (error) {
//     throw error;
//     }
// }

// (async () => {
//     try {
//     const result = await divide(10, 2);
//     console.log(`Result: ${result}`);
//     } catch (error) {
//     console.error('Caught error:', error.message);
//     }

//     try {
//         const failResult = await divide(10, 0);
//         console.log(`Result: ${failResult}`);
//     } catch (error) {
//         console.error('Caught error:', error.message); 
//     }
// })();