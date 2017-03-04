//check data

 var parse = function(data, check) {
        x = data.toString();
        if (x.includes(check)){
              return true;
        }
        else {return false;}
};
        
        exports.parse = parse;