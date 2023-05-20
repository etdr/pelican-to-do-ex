
const fs = require('fs/promises')
// const fs = require('fs')

// WHAT WE WANT
// two files called post.json and user.json
// these store our "databases" of posts and users


// one function to read the dbs from disk
async function readDb(dbname) {
  const result = await fs.readFile(
    `db/${dbname}.json`, // first arg: name of file to read
    'utf8'
  )
  // return the array corresponding to dbname
  return JSON.parse(result)
}

// what this next line does:
// hardcodes the value of one argument to readDb
// and calls readDb on the one argument every time
const readItems = async () => await readDb('todos')


// another function to write them to disk
async function writeDb(dbname, data) {
  await fs.writeFile(
    `db/${dbname}.json`,
    JSON.stringify(data),
    'utf8'
  )
}

const writeItems = async (data) => await writeDb('todos', data)

module.exports = {
  readDb,
  writeDb,
  readItems,
  writeItems
}


// 