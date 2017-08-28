import GP from './gp.js';
import GPServer from './gpServer.js';
import GPFilter from './gpfilter.js';


var list = [
    new GP("11", '001', 1,[100,200,300]),
    new GP("11", '002', 2,[100,300,200]),
    new GP("11", '003', 3,[200,100,300]),
    new GP("22", '004', 4,[200,300,100]),
    new GP("22", '005', 5,[300,200,300]),
    new GP("33", '006', 6,[300,100,200]),
    new GP("44", '007', 7,[100,200,300]),
]


var fi = new GPFilter(list)
fi.diefu(0)
   .valformat([".|:","|.:"])


console.log(fi.gplist)