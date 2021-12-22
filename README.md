## Description

**MVC Sessions** template has been built based on the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. Its goal is to provide a simple starte kit for building web applications with NestJS, offering production-ready secure implementation.

It is this author's philosophy that SPA and GraphQL based implementations have their place and virtues, yet Standard aplication security concerns should be addressed on the server side and be session-based.

### Guiding Principals and Philosophy

1. Several static pages (About, Contact, Errors)
1. Login/Logout/Profile pages (with external providers and 2FA options)
1. Configurable DB connectivity (with ORM capability)
1. Protected content areas (MVC modules, SPA components, API endpoints, Microservices)
1. Minimize the use of JWT as it is generally less secure than db session

### Single Page Applications and Reactive JS Frameworks (SPAs)

1. JS Frameworks like [Vue](https://vuejs.org/), [React](https://reactjs.org/), etc. belong on screens where complex UI interactions are required
1. SPA routing should be avoided at all costs UNLESS the application must be available offline and content does not change at high frequency
1. SPA elements should be sprinkled on the protected pages via:
   ```html
   <script type="module" src="your-spa-module.js" />
   ```

## Credits

- [Nest](https://github.com/nestjs/nest)
- [Foundational Tutorial](https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4)
- [DB Integration (TypeORM)](https://codersera.com/blog/how-to-integrate-dotenv-with-nestjs-and-typeorm/)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Please submit issues for any problems incountered, and they'll be dealt with as time permits.

## License

Nest is [MIT licensed](LICENSE).
