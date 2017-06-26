./backend/db/addUser.js: ./backed/db/admin/ts ./backend/db/addUser.ts
	node_modules/.bin/tsc ./backend/db/addUser.ts

./backend/db/removeFields.js: ./backed/db/admin/ts ./backend/db/removeFields.ts
	node_modules/.bin/tsc ./backend/db/removeFields.ts

./backend/db/addFields.js: ./backed/db/admin/ts ./backend/db/addFields.ts
	node_modules/.bin/tsc ./backend/db/addFields.ts

./backend/library/addBook.js: ./backend/library/addBook.ts
	node_modules/.bin/tsc ./backend/library/addBook.ts

./backend/library/updateChangelog.js: ./backend/library/updateChangelog.ts ./backend/db/SiteUpdate.ts
	node_modules/.bin/tsc ./backend/library/updateChangelog.ts
