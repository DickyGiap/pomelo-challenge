// const axios = require('axios')

// const getLinks = (rawInput) => {
//   const rawInputArr = rawInput.split(',')
//   console.log(rawInputArr)
// }
// const executeQuery = () => {
//   // const response = await axios.get(`https://api.github.com/search/repositories?q=nodejs&per_page=10`).catch((e) => {
//   //   return 'Error'
//   // })
//   // console.log(response)
//   // if (response !== 'Error') {
//   //   const links = getLinks(response.headers.link)
//   // }
//   // const rawInput = `<https://api.github.com/search/repositories?q=nodejs&per_page=10&page=2>; rel="next", <https://api.github.com/search/repositories?q=nodejs&per_page=10&page=100>; rel="last"`
//   // getLinks(rawInput)
//   const response = axios
//     .get(`https://api.github.com/search/repositories?q=nodejs&per_page=10`)
//     .then(function (response) {
//       console.log(response);
//       return response
//     })
//     .catch(function (error) {
//       console.log(error);
//       return 'Error'
//     });
//     // .then((response) => {
//     //   console.log(response)
//     //   return response.data
//     // })
//     // .catch((error) => {
//     //   return 'Error'
//     // })
//   console.log(response)
//   // if (response !== 'Error') {
//   //   const links = getLinks(response.headers.link)
//   // }
//   return response.data
// }

// module.exports = executeQuery
