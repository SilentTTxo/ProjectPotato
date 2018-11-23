#!/system/bin/sh
su
ROOTPATH=/data/data/com.silenttt.potato
ROOTBIN=${ROOTPATH}/bin
PATH=$PATH:${ROOTPATH}/bin

mkdir ${ROOTPATH}
mkdir ${ROOTBIN} ${ROOTPATH}/config
cp -r /sdcard/linuxdeploy/* ${ROOTBIN}
chmod 755 ${ROOTBIN} -R

busybox --install ${ROOTBIN}
echo -e "#!${ROOTBIN}/sh\nPATH=\$PATH:${ROOTPATH}/bin\nENV_DIR=\"${ROOTBIN}/cli\"\n. \"\${ENV_DIR}/cli.sh\"" > ${ROOTBIN}/linuxdeploy
chmod 755 ${ROOTBIN}/linuxdeploy

IPADDR=`ifconfig | grep -A1 wlan0 | grep -o -E 'addr:[0-9.]+' | awk -F ':' '{print $2}'`

telnetd -l sh
echo "telnet start ! IP addr: ${IPADDR}" 


exit
exit
