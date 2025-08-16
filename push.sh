# 脚本说明： push.sh 脚本用于将代码提交到本地和远程仓库。

# 远程仓库有两个，一个是gitee,一个是github
# 博客源代码的gitee远程仓库 https://gitee.com/suichenTree/shuyxblog.git    main分支  这个远程仓库的仓库别名是 origin ，是默认仓库
# 博客源代码的github远程仓库 https://github.com/suichentree/shuyxblog.git  main分支  这个远程仓库的仓库别名是 github-origin ，非默认仓库

# 注意1: 需要在git终端中运行脚本。
# 注意2: 使用 bash push.sh 命令运行该文件。
# 注意3: 如果需要查询远程仓库地址，可以使用 git remote -v 命令查询远程仓库
# 注意4：可以先手动检测是否有 origin 仓库 和 github-origin 仓库。如果没有则添加上。

# 检查并添加远程仓库
function check_and_add_remote {
    local remote_name=$1
    local remote_url=$2
    # 检查远程仓库是否存在
    if ! git remote | grep -q "^$remote_name$"; then
        echo "远程仓库 $remote_name 不存在，正在添加..."
        git remote add "$remote_name" "$remote_url"
        # 检查添加是否成功
        if [ $? -ne 0 ]; then
            echo "错误：添加远程仓库 $remote_name 失败，请检查URL是否正确。"
            exit 1
        fi
    else
        echo "远程仓库 $remote_name 已存在"
    fi
}

# 新增：拉取最新代码函数
function pull_latest {
    echo "正在拉取远程仓库 origin 的最新代码..."
    git pull origin main
    if [ $? -ne 0 ]; then
        echo "错误：拉取代码失败，可能存在冲突，请手动解决后重新运行脚本。"
        exit 1
    fi
    echo "拉取最新代码成功"
}

# 定义commit方法
function commit() {
    #定义变量commitMessage,并接受外部输入赋值
    # read -p "输入 commit 备注: " commitMessage 
    # echo "commit 备注 is  $commitMessage"
    # #将本地暂存区的文件提交到本地分支中
    # git commit -m $commitMessage

    # 获取当前时间
    time1=$(date "+%Y-%m-%d %H:%M:%S")
    #将本地暂存区的文件提交到本地分支中
    git commit -m "up$time1"
}

# 定义push方法
function push(){
    # 推送文件到远程仓库origin的main分支
    git push origin main
    if [ $? -eq 0 ] 
    then
        echo "SUCCESS , git push origin main 成功"
    else     
        echo "ERROR , git push origin main 失败"
        sleep 5s
        echo "重新推送 origin main 分支 -------------------"
        push
    fi

    # 推送文件到远程仓库github-origin的main分支
    git push github-origin main
    if [ $? -eq 0 ] 
    then
        echo "SUCCESS , git push github-origin main 成功"
    else     
        echo "ERROR , git push github-origin main 失败"
        sleep 5s
        echo "重新推送 github-origin main 分支 -------------------"
        push
    fi
}

# 脚本主流程，从这里开始--------------
echo "start run push.sh -------------------"

echo "检查远程仓库 -------------------"
check_and_add_remote "origin" "https://gitee.com/suichenTree/shuyxblog.git"
check_and_add_remote "github-origin" "https://github.com/suichentree/shuyxblog.git"
echo "远程仓库检查完成 -------------------"

# 新增：拉取最新代码（关键修改）
echo "开始拉取最新代码 -------------------"
pull_latest

# 将所有改变的文件添加到本地暂存区
git add -A

# 执行 git status 命令检查是否有文件需要提交
check_commit=`git status`
if [[ $check_commit =~ "Changes to be committed:" ]] 
then 
    echo "存在待提交文件，开始提交..."
    commit
else     
    echo "无待提交文件"
fi

# 执行push方法
echo "开始推送代码 -------------------"
push

echo "push.sh 运行完成 -------------------"