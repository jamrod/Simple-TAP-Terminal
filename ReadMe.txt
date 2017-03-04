Simple TAP Terminal
This is a program which allows a quick connection to a Paging transmitter using TAP protocol over serial. I have tested with a Waveware transmitter and a Commtech transmitter.

This was written using Node v4.4.7
Node must be installed first to use this program
Find your node install at nodejs.org

Files contained in this repo

chkSumCalc.js
license.txt
parser.js
ReadMe.txt
SimpleTAPTerminal.js

Put all these files in the same directory.
This program is dependant on serialport, find documentation here- https://www.npmjs.com/package/serialport

Install with npm using the following command "npm install serialport"

The com port settings are defaulted to COM1 9600, 8, 1, none with no flow control
These can be changed in the following section of SimpleTAPTerminal.js

//set port number
port = "COM1";
//set baud rate etc here, defaults to 9600, 8, 1, none, if you need flow control check SerialPort docs
baud = 9600;
databits = 8;
stopbits = 1;
Parity = 'none';

Start the program from the command prompt with "node SimpleTAPTerminal", you have to be in the directory contaning the repo.

The program will initiate communication with the Paging transmitter then prompt you for a Pager ID in the terminal window like so 

Enter Pager number
>

Enter a valid pager number and hit enter, this can be a CAP code if the paging transmitter is configured to accept it.

Then you will be prompted for a message like so
Enter Message

Enter the text you would like to send and hit enter.

You will then be asked if you want to send another page, enter 'y' or 'Y' to send another page, anything else will exit, then hit enter.