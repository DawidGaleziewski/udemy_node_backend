// const square = function(x) {
//   return x * x;
// };

// const square = x => x * x;
// console.log(square(3));

//! Arrow functions as methods

const event = {
  name: 'Birthday Part',
  // ! Standard function method
  printGuestList: function() {
    console.log('Guest list for ' + this.name);
  },
  //! Arrow function method
  // Arrow function do not bind their own this value!
  // If we need this they are not the best choice
  notWelcomed: () => {
    console.log('Keep out ' + this.name);
  },
  // We can however use standard functions as methods in a shorter version
  notWelcomedFixed() {
    console.log('Keep out ' + this.name);
  }
};

// event.printGuestList();
// event.notWelcomed();

// Solving bindings
const event2 = {
  name: 'Wild party',
  guestList: ['Andrew', 'Jen', 'Mike'],
  printGuestList() {
    // Arrow functions do not bind their own this statment. Traditional fix was to assign this to that variable (create a referance)
    // const that = this;

    //! arrow function do not bind this value. They acces this value in the context they are created
    this.guestList.forEach(guest => {
      console.log(guest + ' is attending ' + this.name);
    });
  }
};

event2.printGuestList();
