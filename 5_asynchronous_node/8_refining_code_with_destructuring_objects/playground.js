// Object property shorthand
const name = 'Andrew';
const userAge = 27;

// # 1 shorthand
const user = {
    name: name,
    userAge: userAge,
    location: 'Philadelphia'
};

// Better shoorthand settings values
const userBetter = {
    name,
    userAge,
    location: 'Philadelphia'
};

// # 2 destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    sales: {
        blackFriday: {
            priceOff: 30
        },
        easter: {
            priceOff: 10
        }
    }
}

// If we destructure a value that does not exist we get undefined
// To give value a new name we name we use oldName:newName syntax
// we can assign a default value to variable by syntax valueName = defaultValueFallback
const {label, price:productPrice, sales:{blackFriday:{priceOff}}, rating = 5 } = product;
console.log(label, productPrice, priceOff, rating);


// # 3 destructuring function arguments
// We can destructure only values we need from the passed object
const transaction= (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)