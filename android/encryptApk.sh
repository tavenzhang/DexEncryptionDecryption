#cd android/proxy_tools/src/main/java/com/tc168/jdcp/testsit/proxy_tools

#javac *.java
#javajar cvfe encrypt.jar com.tc168.jdcp.testsit.proxy_tools.Main Main.class Main$1.class DexUtils.class EncryptUtil.class Zip.class
#jar cfv encrypt.jar manifest.txt *.class 
#java -cp encrypt.jar com.tc168.jdcp.testsit.proxy_tools.Main

#java com.tc168.jdcp.testsit.proxy_tools.Main
rm -rf proxy_tools/apk/temp
javac proxy_tools/src/main/java/com/encry/proxy_tools/*.java
java -classpath proxy_tools/src/main/java com.encry.proxy_tools.Main


