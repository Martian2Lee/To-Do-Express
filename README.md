#### 1. Install [`MongoDB Compass`](https://www.mongodb.com/download-center?jmp=hero#compass)
#### 2. Start local server
```
brew install mongodb
```
```
sudo mongod
```
#### 3. Connect local server to `MongoDB Compass`
#### 4. Config
Change `variables.env.sample` to `variables.env` and update the variables.  
If you use your personal Gmail for `MAIL_USER`, Gmail would block your sign-in after calling `/account/forgot` several times. You can grant 'access to less secure apps' in the alert email that Gmail send to you.
#### 5. Start app
```
npm install
```
```
npm start
```
#### 6. Check `postman_collection.json` for apis

# Node JS

## Task

Build a Todo api.

## Requirements

- Users
	- Sign up
	- Sign in
	- Reset password with email
- Todo lists
	- personal lists (one user owns list)
	- collaborative lists (multiple users own list)
- Todos
- Push notifications using Firebase messaging to multiple devices and users for changes
	- mobile devices and browsers
- Tests

### Notes

- Use ES8
- Use Fastify (preferred) or Express
- Use AVA or Jest for tests
- Follow design exactly
- RESTful api design
- Use GitHub with commit history
- Build your own toolchain
