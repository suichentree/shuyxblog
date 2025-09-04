#!/bin/bash
# ==============================================================================
# 博客部署自动化脚本
# 功能: 同步代码到Gitee/GitHub仓库并自动部署博客页面
# 使用方法: bash pushAndBuild.sh [可选提交信息]
# 依赖: git, npm, node.js
# ==============================================================================

# ============================= 配置变量 =======================================
# 博客源代码仓库配置
REMOTE_ORIGIN_NAME="origin"
REMOTE_ORIGIN_URL="https://gitee.com/suichenTree/shuyxblog.git"
REMOTE_GITHUB_NAME="github-origin"
REMOTE_GITHUB_URL="https://github.com/suichentree/shuyxblog.git"

# 仓库分支名称
BRANCH_NAME="main"

# 博客页面仓库配置
PAGE_REMOTE_GITEE_NAME="gitee_page_origin"
PAGE_REMOTE_GITEE_URL="https://gitee.com/suichentree/suichentree.git"
PAGE_REMOTE_GITHUB_NAME="github_page_origin"
PAGE_REMOTE_GITHUB_URL="https://github.com/suichentree/suichentree.github.io.git"

# 构建配置
BUILD_DIR=".vitepress/dist"
# 构建命令
BUILD_COMMAND="npm run docs:build"

# 重试配置
MAX_RETRIES=3
RETRY_DELAY=5

# ============================= 工具函数 =======================================
# 日志输出函数 (带时间戳和颜色)
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

# 检查命令是否存在
check_dependency() {
    if ! command -v $1 &> /dev/null; then
        error "依赖检查失败: 未找到命令 '$1'，请先安装"
    fi
}

# 检查并添加远程仓库
check_and_add_remote() {
    local remote_name=$1
    local remote_url=$2

    if ! git remote | grep -q "^$remote_name$"; then
        info "添加远程仓库: $remote_name"
        git remote add "$remote_name" "$remote_url" || error "添加远程仓库 $remote_name 失败"
    else
        info "远程仓库已存在: $remote_name"
    fi
}

# 带重试机制的命令执行函数
execute_with_retry() {
    local max_retries=$1
    local delay=$2
    local command=$3
    local retries=0

    while [ $retries -lt $max_retries ]; do
        if eval $command; then
            return 0
        fi

        retries=$((retries + 1))
        if [ $retries -lt $max_retries ]; then
            info "命令执行失败，$delay秒后重试 ($retries/$max_retries)..."
            sleep $delay
        fi
    done

    error "命令执行失败，已达到最大重试次数 ($max_retries)"
}

# ============================= 核心功能 =======================================
# 拉取最新代码
pull_latest_code() {
    info "拉取最新代码: $REMOTE_ORIGIN_NAME/$BRANCH_NAME"
    execute_with_retry $MAX_RETRIES $RETRY_DELAY \
        "git pull $REMOTE_ORIGIN_NAME $BRANCH_NAME"
}

# 提交代码变更
commit_changes() {
    local commit_msg=${1:-"自动更新: $(date +'%Y-%m-%d %H:%M:%S')"}

    info "提交变更: $commit_msg"
    git add -A
    git commit -m "$commit_msg" || {
        info "没有需要提交的变更"
        return 1
    }
    return 0
}

# 推送代码到远程仓库
push_code() {
    info "推送代码到远程仓库"
    execute_with_retry $MAX_RETRIES $RETRY_DELAY \
        "git push $REMOTE_ORIGIN_NAME $BRANCH_NAME"
    execute_with_retry $MAX_RETRIES $RETRY_DELAY \
        "git push $REMOTE_GITHUB_NAME $BRANCH_NAME"
}

# 构建并部署博客页面
deploy_blog_page() {
    info "开始构建博客页面"
    execute_with_retry 2 3 "npm run docs:build"

    info "部署博客页面到Gitee Pages和GitHub Pages"
    cd $BUILD_DIR || error "无法进入构建目录: $BUILD_DIR"
    git init -b $BRANCH_NAME
    git add -A
    git commit -m "部署博客: $(date +'%Y-%m-%d %H:%M:%S')"

    git remote add $PAGE_REMOTE_GITEE_NAME $PAGE_REMOTE_GITEE_URL
    git remote add $PAGE_REMOTE_GITHUB_NAME $PAGE_REMOTE_GITHUB_URL

    execute_with_retry $MAX_RETRIES $RETRY_DELAY \
        "git push $PAGE_REMOTE_GITEE_NAME $BRANCH_NAME -f"
    execute_with_retry $MAX_RETRIES $RETRY_DELAY \
        "git push $PAGE_REMOTE_GITHUB_NAME $BRANCH_NAME -f"

    cd - > /dev/null || exit
}

# ============================= 主流程 =========================================
main() {
    # 依赖检查
    check_dependency git
    check_dependency npm
    check_dependency node

    # 配置远程仓库
    check_and_add_remote $REMOTE_ORIGIN_NAME $REMOTE_ORIGIN_URL
    check_and_add_remote $REMOTE_GITHUB_NAME $REMOTE_GITHUB_URL

    # 拉取最新代码
    pull_latest_code

    # 提交变更 (如果有)
    commit_changes "$1"

    # 推送代码
    push_code

    # 部署博客页面
    deploy_blog_page

    success "博客部署流程已完成!"
}

# 执行主函数
main "$@"