//using default params
const greeter = (name='random') => {
    console.log('Hello ' + name);
}

greeter();

// default param with deconstruction
const transaction = (type, {label = '#not found', stock = 0} = {}) => {
    console.log(type, label, stock)
}

transaction('unknown type');