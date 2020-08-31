const logic = require(`./logic`)
const user = require("./mockBc")

describe('test sum function', () => { //test suite เอาไว้รวบรวม test case หลายๆ case
    //test case
    test('adds 1 + 2 to equal 3', () => {
        //ผล
      expect(logic.add(1, 3)).toBe(4); //input , toBe(output)
    });
  });

  describe('test createAccount function', () => { //test suite เอาไว้รวบรวม test case หลายๆ case
    //test case
    test('createAccount', () => {

        input = user
        //ผล
      expect(logic.createAccount(input)).toBe({}); //input , toBe(output)
    });
  });