# Data model for main Redis instance

## Users authentication
- *usernames* - (SET) of usernames
- *user:[username]* - (HASH) of user credentials
  - *pass* - MD5 password
  - *store* - User data store id
- *user.roles:[username]* - (SET) User roles
  - Values: user, admin

## Session
- *session:[cookie]* - (STRING)(RE:60m) Username for cookie

# Initial data Values

## Users

Admin: homer (password: simpson)
User: bart (password: simpson)
