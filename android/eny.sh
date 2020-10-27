#cd android/proxy_tools/src/main/java/com/tc168/jdcp/testsit/proxy_tools

#javac *.java
#javajar cvfe encrypt.jar com.tc168.jdcp.testsit.proxy_tools.Main Main.class Main$1.class DexUtils.class EncryptUtil.class Zip.class
#jar cfv encrypt.jar manifest.txt *.class 
#java -cp encrypt.jar com.tc168.jdcp.testsit.proxy_tools.Main

#java com.tc168.jdcp.testsit.proxy_tools.Main

mkdir -p proxy_tools/apk
cp -rf app/build/outputs/apk/taven/release/*.apk proxy_tools/apk
gtimeout 15 bash encryptApk.sh
if [ $? -eq 0 ]; then
       echo "suceess"
else
       sh encryptApk.sh
 fi
