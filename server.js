console.log('DATABASE_URL:', process.env.DATABASE_URL);
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Log important environment variables
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
    console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '[Set]' : '[Not Set]');
    
    const parsedUrl = parse(req.url, true)
    
    // Log incoming requests
    console.log(`Incoming request: ${req.method} ${parsedUrl.pathname}`);
    
    handle(req, res, parsedUrl)
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + (process.env.PORT || 3000))
    console.log('> Environment:', process.env.NODE_ENV)
  })
})