const SerialPort = require("serialport");
const parser = require("./parser");
const chkSumCalc = require("./chkSumCalc");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'OHAI> '
});


//set port number
port = "COM1";
//set baud rate etc here, defaults to 9600, 8, 1, none, if you need flow control check SerialPort docs
baud = 9600;
databits = 8;
stopbits = 1;
Parity = 'none';

var ready = false;

//TAP variables
    cr = Buffer(1,'hex');
        cr[0] = 0x0D;
    esc = Buffer(1,'hex');
        esc[0] = 0x1B;
    stx = Buffer(1,'hex');
        stx[0] = 0x02;
    etx = Buffer(1,'hex');
        etx[0] = 0x03;

var sp = new SerialPort(port, {
    baudRate: baud,
    dataBits: databits,
    stopBits: stopbits,
    parity: Parity,
    parser: SerialPort.parsers.byteDelimiter([0x0d]),//parsers.readline("\n"),,//parsers.readline("\n"),    
    
    });

sp.on("open", function( ) {
    console.log("COM3 opened");
    idCheck = false; 
    ready = false;
    chunk = '';
    sp.write(cr);

    
    sp.on('data', function(d){

        chunk += d.toString();

            handle(chunk);
            chunk = '';

    });
    
});

sp.on("error", function(e){
    console.log(e);
    });

handle = function(c){

    idCheck = parser.parse(c, "73,68,61");//check for the string ID=
    ready = parser.parse(c, "27,91,112");//check for the esc]p sequence that says pager is ready
    
        if (ready){
            pagePrompt();
            ready = false;
            }
        
        if (idCheck){
            sp.write(esc);
            sp.write("PG1");
            sp.write(cr);
            //console.log("Writing PG1...");
            idCheck = false;
            }
        
};

var pgr;
var txt;
var step;

pagePrompt = function(){
    step = 0;
    console.log('Enter Pager number');
    rl.prompt();
    
    rl.on('line', (line) => {
        switch(step) {
            case 0:
                pgr = line.trim();
                console.log('Enter Message');
                step++;
                break;
            case 1:
                txt = line.trim();
                sendPage(pgr,txt);
                console.log('Do you want to send another? Enter y to Page again or any other key to exit');
                step++;
                break;
            case 2:
                step = 0;
                ans = line.trim();
                if (ans === 'Y' || ans === 'y'){
                    console.log('Enter Pager Number');
                }
                else {
                    console.log('Exiting....');
                    rl.close();
                    sp.close();
                }
                break;
                }

    });
};

sendPage = function(pgr, txt) {
        cksm = chkSumCalc.chkSumCalc(pgr,txt);
        sp.write(stx);
        sp.write(pgr);
        sp.write(cr);
        sp.write(txt);
        sp.write(cr);
        sp.write(etx);
        sp.write(cksm);
        sp.write(cr);
        
};

