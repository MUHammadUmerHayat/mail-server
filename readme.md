# Setup a send only server
- http://ubuntuhandbook.org/index.php/2014/04/change-hostname-ubuntu1404/
- https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-as-a-send-only-smtp-server-on-ubuntu-16-04
- https://www.ubuntuupdates.org/package/core/precise/main/base/postfix-pcre
- https://blog.hqcodeshop.fi/archives/122-Fixing-Googles-new-IPv6-mail-policy-with-Postfix.html
- https://serverfault.com/a/866440/444133

# Setup hosts
- run hostname to get hostname
- add the following line to /etc/hosts, use the hostname you got from above line
- `127.0.0.1 localhost.localdomain hostname`

# Run Mail Server
- run it using `pm2 start pm2-mail.json` for easier access
- It will run on port 8001 by default.
