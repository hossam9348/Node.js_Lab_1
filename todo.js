const myFuntions = require('./myFunctions');

function main(cmdArg){
const [,,operation, ...options] = cmdArg;
const preparedData = myFuntions.prepareData(options);
switch (operation) {
    case "add":
        myFuntions.add(preparedData);
      break;
    case "edit":
        myFuntions.edit(preparedData);
      break;
    case "list":
        myFuntions.list(preparedData);
      break;
    case "remove":
        myFuntions.remove(preparedData);
      break;
    case "check":
        myFuntions.check(preparedData);
      break;
    case "uncheck":
        myFuntions.uncheck(preparedData);
      break;
    default:
      console.log("not available options");
  }
}

main(process.argv);