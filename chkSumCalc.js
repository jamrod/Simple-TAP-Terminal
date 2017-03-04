chkSumCalc = function(pgr, txt){
    var r = "";
    var p = 0;
    var t = 0;
    
    for(i=0; i<pgr.length; i++) {
        p += pgr.charCodeAt(i);
    }
    for(i=0; i<txt.length; i++) {
        t += txt.charCodeAt(i);
    }
    
//    console.log("p " + p);
//    console.log("t " + t);
    x = 31; //this part of chksum is constant becasue it is stx + 2 cr + etx
    sum = x + p + t;
//    console.log("sum " + sum);
    d3 = 48 + sum - Math.floor(sum/16) * 16;
//    console.log("d3 " + d3);
    sum = Math.floor(sum/16);
//    console.log("sum " + sum);
    d2 = 48 + sum - Math.floor(sum/16) * 16;
    sum = Math.floor(sum/16);
    d1 = 48 + sum - Math.floor(sum/16) * 16;
    r = String.fromCharCode(d1, d2, d3);
//    console.log("chkSum = " + r);
    return r;
};

exports.chkSumCalc = chkSumCalc;