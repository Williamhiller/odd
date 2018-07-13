
var J_one , J_two ,
    B_two, //
    A_pro;

A_pro = [
    2.5, 2.75, 3.25, 3, 3, 3, 3, 3.25, 3, 3, 3.25, 3, 3, 2.5, 2.75, 3, 3, 3, 2.75, 3, 3.25, 3, 3, 3, 3.25, 3, 3.25, 3.25, 3
];
// Japan
J_one = [
    2.5, 2.25, 2.25, 2.5, 2.5, 2.5, 2.75, 2.5, 2.5,
    2.25, 2.25, 2.25, 3, 2.25, 2.5, 2.5, 2.75, 2.25,
    2.5, 2.5, 2.5, 3, 2.25, 2.5, 2.5, 2.25, 2.25,
    2.5, 2.25, 2.5, 2.75, 2.5, 2.75, 2.25, 2.5, 2.5,
    2.5, 2.5, 2.5, 2.5, 2.25, 2.5, 2.5, 2.5,
    2.5, 2.75, 2.25, 2.5, 2.75, 2.75, 2.5, 2.25, 2.25
];
J_two= [
    2.25,2.25,2.25,2.25,2.5,2.25,2.25,2.25,2,2.25,2.5,
    2.25,2.5,2,2,2.25,2.25,2.25,2,2.25,2.5,2,
    2.5 , 2.25 , 2.25, 2.25, 2.5, 2.25, 2.25, 2.25 , 2.25, 2.25,
    2.25, 2.25, 2.25, 2.5, 2.5, 2.5, 2.25, 2.25, 2.25,2.25,
    2, 2.5, 2, 2.5, 2.25,2.25,2.25,2.25,2.25,2.25
];

B_two = [
    2.25, 2.25, 2.25, 2.25, 2.25, 2, 2.25, 2, 2.25, 2,
    2, 2.25, 2.25, 2, 2, 2, 2, 2.25, 2, 2.25,
    2.25, 2, 2.25, 2.25, 2, 2, 2.25, 2, 2.25, 2.25,
    2, 2 , 2.25, 2, 2.25, 2.25, 2, 2.25, 2.25, 2,
    2.25, 2.25, 2, 2.25, 2.25, 2, 2, 2.25, 2,
    2.25, 2.25, 2, 2
];

function getAve(arr) {
    var len = arr.length;
    var sum = 0;

    arr.forEach(function (item) {
        sum += item;
    });

    return (sum/len).toFixed(4);
}

console.log("A_pro:"+getAve(A_pro));
console.log("J_one:"+getAve(J_one));
console.log("J_two:"+getAve(J_two));
console.log("B_two:"+getAve(B_two));