#!/system/bin/sh
su
ROOTPATH=/data/data/com.silenttt.potato
ROOTBIN=${ROOTPATH}/bin
PATH=$PATH:${ROOTPATH}/bin

pgrep telnetd | xargs kill -9

IPADDR=`ifconfig | grep -A1 wlan0 | grep -o -E 'addr:[0-9.]+' | awk -F ':' '{print $2}'`

telnetd -l sh
echo "telnet start ! IP addr: ${IPADDR}"

exit
exit
