- install sendmail if not installed already.
- run hostname to get hostname
- add the following line to /etc/hosts, use the hostname you got from above line
- `127.0.0.1 localhost.localdomain **hostname**`
- run it using `pm2 start index.js --name "Mail"` for easier access