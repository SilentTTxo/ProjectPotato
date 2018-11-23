#!/system/bin/sh
su
ROOTPATH=/data/data/com.silenttt.potato
ROOTBIN=${ROOTPATH}/bin
PATH=$PATH:${ROOTPATH}/bin

linuxdeploy -p linux stop -u

exit
exit
