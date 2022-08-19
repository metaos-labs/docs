# Set up a production environment

Use this guide to set up and manage a production-level full MetaOS node.

For information about running a validator node, visit the [validator guide](../run_validator/contents.md).

## Create a dedicated user

Although `metaosd` does not require a super user account, during the setup process you'll need super user permission to create and modify some files. It is strongly recommended to use a normal user when running `metaosd`.

## Increase the maximum files `metaosd` can open

`metaosd` is set to open 1024 files by default. It is recommended that you increase this amount.

Modify `/etc/security/limits.conf`[\*](https://linux.die.net/man/5/limits.conf) to increase the amount, where `nofile` is the number of files `metaosd` can open.

```bash
# If you have never changed this system config or your system is fresh, most of this file will be commented
# ...
*                soft    nofile          65535   # Uncomment the following two lines at the bottom
*                hard    nofile          65535   # Change the default values to ~65535
# ...
```

# Run the server as a daemon

`metaosd` must be running at all times. It is recommended that you register `metaosd` as a `systemd` service so that it will be started automatically when the system reboots.

## Register `metaosd` as a service

1. Create a service definition file in `/etc/systemd/system/metaosd.service`.
   
   **Example**:
   
   ```bash
   [Unit]
   Description=MetaOS Daemon
   After=network.target
   [Service]
   Type=simple
   User=<METAOS_USER>
   ExecStart=<PATH_TO_METAOSD>/metaosd start
   Restart=on-abort
   [Install]
   WantedBy=multi-user.target
   [Service]
   LimitNOFILE=65535
   ```

2. Modify the `Service` section according to your environment:
   
   - Enter the user (likely your username, unless you created a user specifically for `metaosd`)
   - Enter the path to the `metaosd` executable. `<PATH_TO_METAOSD>` is likely `/home/<YOUR_USER>/go/bin/metaosd` or `/usr/go/bin`. Confirm this with `whereis metaosd`
   - Make sure you made the correct edits to /etc/security/limits.conf

3. Run `systemctl daemon-reload` followed by `systemctl enable metaosd`. This will register `metaosd` as a system service and turn it on upon startup.

4. Now start the serivce with `systemctl start metaosd`.

### Controlling the service

Use `systemctl` to start, stop, and restart the service:

```bash
# Check health
systemctl status metaosd
# Start
systemctl start metaosd
# Stop
systemctl stop metaosd
# Restart
systemctl restart metaosd
```

### Access logs

Use `journalctl -t` to access entire logs, entire logs in reverse, and the latest and continuous log.

```bash
# Entire log reversed
journalctl -t metaosd -r
# Entire log
journalctl -t metaosd
# Latest and continuous
journalctl -t metaosd -f
```
