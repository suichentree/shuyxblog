---
title: MobaXterm终端工具笔记
date: 2025-09-06
lastUpdated: 2025-09-06
categories:
 - 随笔
---

[toc]

# MobaXterm终端工具笔记

![blog_20250906164822491.png](../blog_img/mobaxterm_20250906164822491.png)

MobaXterm官网：[https://mobaxterm.mobatek.net/](https://mobaxterm.mobatek.net/)

MobaXterm 是一款功能强大的远程访问终端工具，它将xshell和xftp的优点结合起来，适用于IT从业者和Linux系统管理员。

MobaXterm 支持SSH协议，提供颜色丰富的代码高亮显示，界面设计友好，易用性高。内置FTP客户端功能，提供稳定快速的文件传输服务。此外，MobaXterm还支持多种协议和安全认证机制，是远程终端操作和文件管理的理想选择。

MobaXterm主要功能如下所示
- 支持各种连接 SSH，X11，RDP，VNC，FTP，MOSH
- 支持 Unix 命令(bash，ls，cat，sed，grep，awk，rsync，…)
- 连接 SSH 终端后支持 SFTP 传输文件
- 各种丰富的插件(git/dig/aria2…)
- 可运行 Windows 或软件

## MobaXterm 下载并安装

访问MobaXterm官网，下载MobaXterm安装包。

MobaXterm 分免费开源版和收费专业版。免费开源版又分绿色免安装版(解压即用)和安装版(需要一步步安装)。

可以下载免费的免安装版本或安装版本。
![blog_20250906170008863.png](../blog_img/mobaxterm_20250906170008863.png)

安装完之后，软件运行的界面如下所示
![blog_20250906170340402.png](../blog_img/mobaxterm_20250906170340402.png)

## 使用SSH终端

点击菜单栏 「sessions」 –> 「new session」，在「session setting」对话框中填写SSH连接信息,填写完成后点击「OK」按钮。

![mobaxterm_20250906171641180.png](../blog_img/mobaxterm_20250906171641180.png)

第一次连接SSH终端时，会弹出一个对话框，要求设置master password，即打开会话的密码。

![mobaxterm_20250906172059305.png](../blog_img/mobaxterm_20250906172059305.png)

输入服务器的密码，成功登录服务器后，即可在MobaXterm中使用SSH终端。界面如下所示。

![mobaxterm_20250906172404803.png](../blog_img/mobaxterm_20250906172404803.png)

界面主要分两块，左边的是服务器的文件，右边是服务器的终端。

## 使用SFTP服务操控文件

当我们使用SSH服务远程登录服务器后，会默认开启一个SFTP窗口，我们可以在SFTP窗口进行上传、下载文件。也可以执行创建文件夹、删除等操作。

![mobaxterm_20250906172404803.png](../blog_img/mobaxterm_20250906172404803.png)

