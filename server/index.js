const express = require('express')

require('dotenv').config()
const cors = require('cors')

// GraphQL initialization
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')

// GraphiQL server initialization
const { ruruHTML } = require('ruru/server')

// Modules for accessing the .graphql schema function
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())

const schemaPath = path.join(__dirname, 'schema.graphql')
const schemaString = fs.readFileSync(schemaPath, 'utf8')

const schema = buildSchema(schemaString)

// Responsible for the funcitons called from the queries and how they will be resolved.
const root = {
  async games() {
    const url = process.env.API_BASE
    try {
      const response = await fetch(`${url}/games`)
      return await response.json()
    } catch (error) {
      console.error(`Unable to fetch games: `, error)
      return []
    }
  },
  // Resolver arguments return as an object, so destructure here.
  async gamesByCategory({ category }) {
    const url = process.env.API_BASE
    try {
      const response = await fetch(`${url}/games?category=${category}`)
      return await response.json()
    } catch (error) {
      console.error(`Unable to fetch by category: `, error)
      return []
    }
  },
  async gamesByPlatform({ platform }) {
    const url = process.env.API_BASE
    try {
      const response = await fetch(`${url}/games?platform=${platform}`)
      return await response.json()
    } catch (error) {
      console.error(`Unable to get games played on ${platform}: `, error)
      return []
    }
  }
}

app.get('/', (_req, res) => {
  res.type('html')
  res.end(ruruHTML({ endpoint: '/graphql' }))
})

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root
  })
)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Backend server hosted on ${port}`)
})
