//localstorage mock
require('jest-localstorage-mock')


//geoLocationMock
const mockGeolocation = {
    getCurrentPosition: jest.fn((successCallBack,rejectCallBack,options)=>{
      successCallBack({coords:{latitude:35,longitude:52}})
    }),
    watchPosition: jest.fn()
  };
  
  global.navigator.geolocation = mockGeolocation;