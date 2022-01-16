const LocalServer = 'http://192.168.18.9:3000';
//   const TestServer = "https://lesfemmestesting.dominioninc.org/public";
//   const LiveServer = "https://dominioninc.org/lesfemmes/public";
const Cloudserver = 'https://alpha-logics.com/calenderapp';
//   const BlobStorage = "https://dominioninc.blob.core.windows.net/";
const linkk = Cloudserver;
const GLOBAL = {
  // FOR GIF IMage Support
  // Use this
  //    implementation 'com.facebook.fresco:animated-gif:1.10.0'
  //    implementation 'com.facebook.fresco:fresco:1.10.0'
  // in android/app/build.gradle
  // IMAGE_PATH
  IMAGE_PATH: linkk + '/api/upload/',

  FONT_FAMILY: 'Raleway-Medium',
  FONT_FAMILY1: 'Raleway-Bold',
  FONT_WEIGHT: '500',
  FIREBASE_SHORT_LINK_CONVERTER:
    'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=',
  LOGIN: linkk + '/api/loginn',
  SIGNUP: linkk + '/api/signUp',
  SEARCH_PERSON: linkk + '/api/searchPerson',
  USER_TYPES: linkk + '/api/userTypes',
  DECIDING_RELATION: linkk + '/api/decidingRelation',
  ADD_TASK: linkk + '/api/addTask',
  GET_YOUR_USERS_LIST: linkk + '/api/getYourUsersList',
  GET_TASK_LIST: linkk + '/api/getTaskList',
};

// const GLOBAL = {
//   // FOR GIF IMage Support
//   // Use this
//   //    implementation 'com.facebook.fresco:animated-gif:1.10.0'
//   //    implementation 'com.facebook.fresco:fresco:1.10.0'
//   // in android/app/build.gradle
//   // IMAGE_PATH
//   IMAGE_PATH: linkk + '/upload/',

//   FONT_FAMILY: 'Raleway-Medium',
//   FONT_FAMILY1: 'Raleway-Bold',
//   FONT_WEIGHT: '500',
//   FIREBASE_SHORT_LINK_CONVERTER:
//     'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=',
//   LOGIN: linkk + '/loginn',
//   SIGNUP: linkk + '/signUp',
//   SEARCH_PERSON: linkk + '/searchPerson',
//   USER_TYPES: linkk + '/userTypes',
//   DECIDING_RELATION: linkk + '/decidingRelation',
//   ADD_TASK: linkk + '/addTask',
//   GET_YOUR_USERS_LIST: linkk + '/getYourUsersList',
//   GET_TASK_LIST: linkk + '/getTaskList',
// };

export {GLOBAL};
