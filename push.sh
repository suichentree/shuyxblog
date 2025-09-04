#!/bin/bash
# ================================ 【文件说明】 ================================
# 这是一个自动化部署脚本，功能是同步代码到远程的Gitee/GitHub仓库。
# 主要完成以下工作：
# 1. 检查本地环境是否满足运行条件（依赖检查）   check_dependency方法
# 2. 确保远程仓库配置正确（自动添加缺失的仓库） check_and_add_remote 方法
# 3. 拉取最新代码（避免代码冲突）               pull_latest_code方法
# 4. 提交本地变更（支持自定义提交信息）
# 5. 推送代码到 Gitee 和 GitHub 双仓库（备份和同步）
# 6. 构建并部署博客页面到 Pages 服务

# 脚本使用方式
# 需要在git终端中运行该脚本。使用 bash pushAndBuild.sh [可选提交信息] 命令运行该文件。

# 仓库说明
# 远程仓库有两个，一个是gitee,一个是github
# 博客源代码的gitee远程仓库 https://gitee.com/suichenTree/shuyxblog.git    main分支  这个远程仓库的仓库别名是 origin ，是默认仓库
# 博客源代码的github远程仓库 https://github.com/suichentree/shuyxblog.git  main分支  这个远程仓库的仓库别名是 github-origin ，非默认仓库
# 博客页面的仓库  https://gitee.com/suichentree/suichentree.git             main分支 这个远程仓库的仓库别名是 gitee_page_origin ，是默认仓库
# 博客页面的仓库  https://github.com/suichentree/suichentree.github.io.git  main分支 这个远程仓库的仓库别名是 github_page_origin ，非默认仓库

# 注意事项
# 如果需要查询远程仓库地址，可以使用 git remote -v 命令查询远程仓库
# 可以先手动检测是否有 origin 仓库 和 github-origin 仓库。如果没有则添加上。
# ==============================================================================

# ============================= 配置变量 =======================================
# 博客源代码 gitee 远程仓库名称和URL
REMOTE_GITEE_NAME="origin"
REMOTE_GITEE_URL="https://gitee.com/suichenTree/shuyxblog.git"
# 博客源代码 github 远程仓库名称和URL
REMOTE_GITHUB_NAME="github-origin"
REMOTE_GITHUB_URL="https://github.com/suichentree/shuyxblog.git"

# 仓库分支名称（通常为main分支）
BRANCH_NAME="main"

# 博客页面仓库配置
PAGE_REMOTE_GITEE_NAME="gitee_page_origin"
PAGE_REMOTE_GITEE_URL="https://gitee.com/suichentree/suichentree.git"
PAGE_REMOTE_GITHUB_NAME="github_page_origin"
PAGE_REMOTE_GITHUB_URL="https://github.com/suichentree/suichentree.github.io.git"

# VITEPRESS构建配置
BUILD_DIR=".vitepress/dist"
# 构建命令
BUILD_COMMAND="npm run docs:build"

# 重试配置
MAX_RETRIES=50  # 重试次数
RETRY_DELAY=3    # 重试间隔(秒)

# ============================= 各个工具函数 =======================================

# -------------------------- 彩色日志输出函数（带时间戳和颜色，让信息更易读） ---------------------------
# 用法: info "这是一条提示信息"
info() {
    echo -e "[\033[34m$(date +'%Y-%m-%d %H:%M:%S')\033[0m] INFO: $*"
}

success() {
    echo -e "[\033[32m$(date +'%Y-%m-%d %H:%M:%S')\033[0m] SUCCESS: $*"
}

error() {
    echo -e "[\033[31m$(date +'%Y-%m-%d %H:%M:%S')\033[0m] ERROR: $*"
    exit 1
}

# -------------------------- 环境检查函数 ---------------------------
# 检查是否安装了必要工具
# 用法: check_dependency git
check_dependency() {
    # 接收传入方法的变量1，并赋值给command
    local command=$1
    # 检查shell是否支持该命令
    if ! command -v $command &> /dev/null; then
        error "依赖检查失败: 未找到命令 '$command'，请先安装"
    fi
}

# -------------------------- 仓库配置函数 ---------------------------
# 自动检查并添加远程仓库
check_and_add_remote() {
    # 接收传入方法的变量1和变量2，并赋值给remote_name和remote_url
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

# -------------------------- 带重试机制的命令执行函数 ---------------------------
# 功能：当命令执行失败时自动重试，支持指定最大重试次数和重试间隔
# 适用场景：网络请求、文件操作等可能临时失败的命令
# 参数说明：
#   $1 - max_retries: 最大重试次数（整数，建议3-5次）
#   $2 - delay: 重试间隔时间（秒，整数，建议3秒）
#   $3 - command: 要执行的命令字符串（需用引号包裹复杂命令）
# 返回值：
#   0 - 命令成功执行
#   非0 - 达到最大重试次数后仍执行失败
execute_with_retry() {
    # 接收传入方法的变量1和变量2，并赋值给max_retries和delay
    # 接收传入方法的变量3，并赋值给command
    local max_retries=$1      # 最大重试次数
    local delay=$2            # 重试间隔时间(秒)
    local command=$3          # 待执行的命令
    local retries=0           # 当前重试计数(从0开始)

    # 循环执行命令直到成功或达到最大重试次数
    while [ $retries -lt $max_retries ]; do
        # 执行命令并检查结果
        if eval $command; then
            return 0  # 命令成功执行，返回0退出函数
        fi

        # 命令执行失败，重试计数加1
        retries=$((retries + 1))

        # 判断是否还有重试机会，有就等待后重试
        if [ $retries -lt $max_retries ]; then
            info "命令执行失败，$delay秒后重试 ($retries/$max_retries)..."
            sleep $delay  # 等待指定时间后重试
        fi
    done

    # 达到最大重试次数仍失败，则输出错误信息
    error "命令执行失败，已达到最大重试次数 ($max_retries)"
}


# -------------------------- 代码拉取函数 ---------------------------
# 拉取远程最新代码，避免冲突
pull_latest_code() {
    # 先打印日志
    info "正在拉取最新代码..."
    # execute_with_retry函数，执行git pull 命令。并设置该命令最多重试3次，每次间隔5秒
    execute_with_retry 3 5 "git pull $REMOTE_GITEE_NAME $BRANCH_NAME"
}


# -------------------------- 代码提交函数 ---------------------------
# 提交本地变更（如果没有变更会自动跳过）
commit_changes() {
    # 接收传入方法的变量1赋值给commit_msg。
    # 若变量1不存在则将"自动更新xxxx"赋值给commit_msg
    local commit_msg=${1:-"自动更新: $(date +'%Y-%m-%d %H:%M:%S')"}
    # 打印提交信息
    info "准备提交变更: $commit_msg"
    # 添加所有变更文件
    git add -A
    # 尝试提交，如果没有变更会提示并跳过
    git commit -m "$commit_msg" || {
        info "没有检测到需要提交的变更，跳过此步骤"
        return 1
    }
    return 0
}

# -------------------------- 代码推送函数 ---------------------------
# 推送代码到远程仓库
push_code() {
    info "开始推送代码到远程仓库..."
    # 推送到 Gitee 远程仓库
    # 使用execute_with_retry函数，执行git push命令。并设置该命令最多重试3次，每次间隔5秒
    execute_with_retry 3 5 "git push $REMOTE_GITEE_NAME $BRANCH_NAME"
    
    # 推送到 GitHub 远程仓库。最多重试20次，间隔5秒。
    execute_with_retry 20 5 "git push $REMOTE_GITHUB_NAME $BRANCH_NAME"
}

# -------------------------- 页面部署函数 ---------------------------
# 将博客源代码打包。并将产生的静态文件上传到博客页面远程仓库中
deploy_blog_page() {
    # 打印日志
    info "开始构建博客页面"

    # 使用execute_with_retry函数，执行打包命令，生成博客静态文件。最多重试3次，每次间隔5秒
    execute_with_retry 3 5 "npm run docs:build"

    # 打印日志
    info "上传博客静态页面文件到Gitee和GitHub 远程仓库"

    # 进入到打包后产生的静态文件目录。无法进入则打印错误日志
    cd .vitepress/dist || error "打包目录: .vitepress/dist 不存在，请先运行构建命令"

    # 将静态文件目录 初始化为临时git仓库,默认分支为main分支
    git init -b $BRANCH_NAME
    # 添加所有变更文件到暂存区
    git add -A
    # 提交变更
    git commit -m "部署博客: $(date +'%Y-%m-%d %H:%M:%S')"

    # 添加Gitee和GitHub的远程仓库配置
    git remote add $PAGE_REMOTE_GITEE_NAME $PAGE_REMOTE_GITEE_URL
    git remote add $PAGE_REMOTE_GITHUB_NAME $PAGE_REMOTE_GITHUB_URL

    # 使用execute_with_retry函数，执行强制提交命令，将代码强制提交到仓库中。并设置该命令最多重试3次，每次间隔5秒
    execute_with_retry 3 5 "git push $PAGE_REMOTE_GITEE_NAME $BRANCH_NAME -f"

    execute_with_retry 20 5 "git push $PAGE_REMOTE_GITHUB_NAME $BRANCH_NAME -f"

    # 返回原目录
    cd - > /dev/null || exit

    # ===== 添加以下清理静态文件目录的代码 =====

    # 清理打包后产生的静态文件目录（避免残留文件占用空间）
    info "开始清理静态文件目录: .vitepress/dist"
    if [ -d ".vitepress/dist" ]; then
        rm -rf ".vitepress/dist"
        info "静态文件目录 .vitepress/dist 已成功删除"
    else
        info "静态文件目录 .vitepress/dist 不存在，无需清理"
    fi

    # ===== 清理代码结束 =====
}

# ============================= 主流程 =========================================
main() {
    info "===== 博客部署脚本开始执行 ====="

    # 1. 检查必要依赖工具是否安装
    info "[1/5] 检查运行环境..."
    check_dependency git    # 检查Git
    check_dependency npm    # 检查npm
    check_dependency node   # 检查Node.js

    # 2. 配置远程仓库
    info "[2/5] 配置远程仓库..."
    check_and_add_remote $REMOTE_GITEE_NAME $REMOTE_GITEE_URL
    check_and_add_remote $REMOTE_GITHUB_NAME $REMOTE_GITHUB_URL

    # 3. 拉取最新代码
    info "[3/5] 同步最新代码..."
    pull_latest_code
    
    # 4. 提交并推送变更
    info "[4/5] 提交并推送代码..."
    commit_changes "$1"
    # 推送代码
    push_code
    
    # # 5. 部署博客页面
    # info "[5/5] 部署博客页面..."
    # deploy_blog_page

    success "===== 博客部署脚本执行完成！ ====="
    success "提示：部署可能需要几分钟生效，请稍后访问博客查看结果"
}

# 执行主函数
main "$@"