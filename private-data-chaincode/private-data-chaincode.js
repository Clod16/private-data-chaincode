const shim = require("fabric-shim");
const datatransform = require("./utils/datatransform");
var logger = shim.newLogger("SSS-Chaincode");

logger.level = "debug";

var Chaincode = class {
  async Init(stub) {
    logger.debug("________Init________");
    return shim.success(Buffer.from("Init - OK!"));
  }

  async Invoke(stub) {
    logger.info("________Invoke________");
    let ret = stub.getFunctionAndParameters();
    let fcn = ret.fcn;
    let args = ret.params;
    logger.info("getFunctionAndParameters:" + ret);

    logger.info("do this fuction:" + fcn);
    logger.info(" List of args: " + args);

    let argument = stub.getArgs();
    logger.info("getArgs:" + argument);

    //list of methods

    if (fcn === "putPrivateCar") {
      return this.putPrivateCar(stub, args);
    }

    if (fcn === "getPrivateCar") {
      return this.getPrivateCar(stub, args);
    }
    logger.error("Error...probably wrong name of fuction!!!" + fcn);
    return shim.error("Error...probably wrong name of fuction!!!" + fcn);
  }

  async putPrivateCar(stub, args) {
    logger.info("****putPrivateData***");

    let car = JSON.parse(args[0]);

    let carKEY = stub.createCompositeKey("privateData", car.id);
    try {
      await stub.putPrivateData(
        { privateCollection: "carCollection" },
        carKey,
        car
      );
      return shim.success("putPrivateData complete!");
    } catch (e) {
      logger.error(e);
      return shim.error("error...", e);
    }
  }

  async queryPrivateCar(stub, args) {
    logger.info("****getPrivateData***");

    let carKey = stub.createCompositeKey("privateData", args[0]);
    try {
      const car = await stub.getPrivateData(
        { privateCollection: "carCollection" },
        carKey
      );
      if (!car) {
        throw new NotFoundError("Car does not exist");
      }
      return shim.success(Buffer.from(car));
    } catch (e) {
      logger.error(e);
      return shim.error("error...", e);
    }
  }
};

shim.start(new Chaincode());
