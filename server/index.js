const fetchData = require('./utils/fetchData')

const express = require('express')

require('dotenv').config()
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator')

// GraphQL initialization
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')

// GraphiQL server initialization
const { ruruHTML } = require('ruru/server')

// Modules for accessing the .graphql schema function
const fs = require('fs')
const path = require('path')

const app = express()

// Limiter to only allow 100 visits per IP every 15 mins.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

// Setup CORS
const corsOptions = {
  origin: process.env.BASE_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors())
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", "'unsafe-inline'", "'example.com'"]
      }
    }
  })
)
app.use(morgan('dev'))
app.use(limiter)
app.use(bodyParser.json({ limit: '10kb' }))

const schemaPath = path.join(__dirname, 'schema.graphql')
const schemaString = fs.readFileSync(schemaPath, 'utf8')

const schema = buildSchema(schemaString)

// Responsible for the funcitons called from the queries and how they will be resolved.
const root = {
  async game({ id }) {
    return await fetchData('/game', { id })
  },
  async games() {
    return await fetchData('/games')
  },
  // Resolver arguments return as an object, so destructure here.
  async gamesByCategory({ category }) {
    return await fetchData('/games', { category })
  },
  async gamesByPlatform({ platform }) {
    return await fetchData('/games', { platform })
  },
  async gamesByFilters({ platform, category, sortBy }) {
    return await fetchData('/games', { platform, category: category.join('.'), sortBy })
  },
  async gamesByPersonalizedTags({ platform, sortBy, tag }) {
    return await fetchData('/filter', { platform, sortBy, tag })
  }
}

// Security headers
const setHeaders = (req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
}
app.use(setHeaders)

app.get('/', (_req, res) => {
  res.type('html')
  res.end(ruruHTML({ endpoint: '/graphql' }))
})

// GraphQL endpoint with input validation
app.post(
  '/graphql',
  body('id').optional().isString().escape(),
  body('category').optional().isString().escape(),
  body('platform').optional().isString().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  createHandler({
    schema: schema,
    rootValue: root
  })
)

const port = process.env.PORT || 3000
app.listen(port)
