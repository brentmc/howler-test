import HowlerTest from './HowerTest'
import PixiHowler from './PixiHowler.js'

const init = config => {


 // var howlerTest = new HowlerTest()
 // howlerTest.setup()

   var pixiHowlerTest = new PixiHowler()
  pixiHowlerTest.setup(config)
}

module.exports = {
  init:init
}


