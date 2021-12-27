const axios = require('axios')
const { Octokit } = require('@octokit/rest')

const octokit = new Octokit({ auth: process.env.PRIVATE_TOKEN })

const getLinks = (rawInput) => {
  const rawInputArr = rawInput.split(',')
  console.log(rawInputArr)
}
const executeQuery = async (query) => {
  const res = await octokit.rest.search.repos({
    q: query,
    per_page: 10,
  })
  console.log(JSON.stringify(octokit))
  //   const response = await axios.get(`https://api.github.com/search/repositories?q=${query}&per_page=10`).catch((e) => {
  //     return 'Error'
  //   })
  //   console.log(response)
  //   if (response !== 'Error') {
  //     const links = getLinks(response.headers.link)
  //   }
  const rawInput = `<https://api.github.com/search/repositories?q=nodejs&per_page=10&page=2>; rel="next", <https://api.github.com/search/repositories?q=nodejs&per_page=10&page=100>; rel="last"`
  getLinks(rawInput)
}

;(async () => {
  await executeQuery('nodejs')
})()
