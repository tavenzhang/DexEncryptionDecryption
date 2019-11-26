# 如何使用：在android文件夹里运行终端并输入"sh Buildapk.sh $1 $2"
# $1：项目名称， e.g. 188qp
# $2：0 = 生成官方包而已；其它 = 生成渠道包

scriptPath=$(cd `dirname $0`; pwd)
echo 开始执行脚本 请等待...
cd ${scriptPath}
platName=$1
channel=$2

git reset --hard
git checkout -f release/${platName}
if [[ $? != 0 ]]; then
    exit 0
fi
git pull

echo ${platName}初始化完毕

if [[ $channel == "1" ]]; then
    echo ${platName}渠道包开始生成...
    sed 's/SUB_TYPE=0/SUB_TYPE=21/g' gradle.properties > changed.txt && mv changed.txt gradle.properties
    ./gradlew assembleTavenRelease
    mv "./app/build/outputs/apk/taven/release/release.apk" "./app/build/outputs/apk/taven/release/${platName}_release_21.apk"

    sed 's/SUB_TYPE=21/SUB_TYPE=20/g' gradle.properties > changed.txt && mv changed.txt gradle.properties
    ./gradlew assembleTavenRelease
    mv "./app/build/outputs/apk/taven/release/release.apk" "./app/build/outputs/apk/taven/release/${platName}_release_20.apk"

    ant build

    ./gradlew assembleTavenRelease
    mv "./app/build/outputs/apk/taven/release/release.apk" "./app/build/outputs/apk/taven/release/${platName}_release_20_ant.apk"

    sed 's/SUB_TYPE=20/SUB_TYPE=21/g' gradle.properties > changed.txt && mv changed.txt gradle.properties
    ./gradlew assembleTavenRelease
    mv "./app/build/outputs/apk/taven/release/release.apk" "./app/build/outputs/apk/taven/release/${platName}_release_21_ant.apk"
    echo ${platName}渠道包生成完毕
    sed 's/SUB_TYPE=21/SUB_TYPE=0/g' gradle.properties > changed.txt && mv changed.txt gradle.properties
else
    ant build
fi
./gradlew assembleTavenRelease
mv "./app/build/outputs/apk/taven/release/release.apk" "./app/build/outputs/apk/taven/release/bbl_${platName}_release.apk"

echo ${platName}官方包生成完毕

open app/build/outputs/apk/taven/release

git reset --hard
rm -R "./app/src/main/java/com/bbl"