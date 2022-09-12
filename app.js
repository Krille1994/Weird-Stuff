const zero = '+[]';
const one = '+!![]';

const getNum = (n) => {
    if (n == 0) return zero;
    return Array.from({length:n}, () => one).join(' + ');
}

const getString = s =>s.split('').map(x => {
    if (!(x in chars)) {
      const charCode = x.charCodeAt(0);
      return `([]+[])[${getString('constructor')}][${getString('fromCharCode')}](${getNum(charCode)})`;
    }
    return chars[x];
  }).join('+');


const chars = {};

// NaN
chars.a = `(+{}+[])[${getNum(1)}]`;
chars.N = `(+{}+[])[${getNum(0)}]`;
// [object Object]
chars.o = `({}+[])[${getNum(1)}]`;
chars.b = `({}+[])[${getNum(2)}]`;
chars.j = `({}+[])[${getNum(3)}]`;
chars.e = `({}+[])[${getNum(4)}]`;
chars.c = `({}+[])[${getNum(5)}]`;
chars.t = `({}+[])[${getNum(6)}]`;
chars[' '] = `({}+[])[${getNum(7)}]`;
chars.O = `({}+[])[${getNum(8)}]`;
//false
chars.f = `(![]+[])[${getNum(0)}]`;
chars.l = `(![]+[])[${getNum(2)}]`;
chars.s = `(![]+[])[${getNum(3)}]`;
//true
chars.r = `(!![]+[])[${getNum(1)}]`;
chars.u = `(!![]+[])[${getNum(2)}]`;
//Infinity
chars.I = `((!![]/+[])+[])[${getNum(0)}]`;
chars.n = `((!![]/+[])+[])[${getNum(1)}]`;
chars.i = `((!![]/+[])+[])[${getNum(3)}]`;
chars.y = `((!![]/+[])+[])[${getNum(7)}]`;
//function String() { [native code ] }
chars.S = `([]+([]+[])[${getString("constructor")}])[${getNum(9)}]`;
chars.v = `([]+([]+[])[${getString("constructor")}])[${getNum(25)}]`;
chars.d = `([]+([]+[])[${getString("constructor")}])[${getNum(30)}]`;
//function RegExp() { [ native code ] }
chars.R = `([]+(/-/)[${getString("constructor")}])[${getNum(9)}]`;
chars.g = `([]+(/-/)[${getString("constructor")}])[${getNum(11)}]`;
chars.E = `([]+(/-/)[${getString("constructor")}])[${getNum(12)}]`;
chars.x = `([]+(/-/)[${getString("constructor")}])[${getNum(13)}]`;
chars.p = `([]+(/-/)[${getString("constructor")}])[${getNum(14)}]`;
//weird ass \ stuff
chars['\\'] = `(/\\\\/+[])[${getNum(1)}]`;
// hexadecimal
chars.h = `(${getNum(17)})[${getString("toString")}](${getNum(18)})`;
chars.m = `(${getNum(22)})[${getString("toString")}](${getNum(23)})`;

// massive pain to get the C
chars.C = `(()=>{})[${getString("constructor")}](${getString("return escape")})()(${chars['\\']})[${getNum(2)}]`;


const fs = require('fs');
fs.readFile('./input.js', 'utf-8', (err,data) => {
    if (err) {
        console.error(err);
        return;
    }
    fs.writeFile('./output.js', compile(data), err => {
        if (err) {
            console.error(err);
        }
    })
})

const compile = code => `(()=>{})[${getString("constructor")}](${getString(code)})()`;

// console.log(compile('console.log("hello world!")'));
