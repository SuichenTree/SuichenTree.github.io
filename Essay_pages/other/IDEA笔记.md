# IDEA的笔记

写作日期： 2019-6-13

## 1.IDEA 与 Eclipse 的区别

1. IDEA是没有Eclipse的workspace的概念。取代workspace的是Project。

2. IDEA 的 Project 是一个没有具备任何编码设置、构建等开发功能的，主要起到一个项目定义、范围约束、规范等类型的效果，也许我们可以简单地理解为就是一个单纯的目录，只是这个目录命名上必须有其代表性的意义。

3. 在IDEA中 Project 是最顶级的级别，次级别是 Module。一个 Project 可以有多个 Module。目前主流的大型项目结构都是类似这种多 Module 结构。比如：core Module、web Module、plugin Module等，模块之间彼此可以相互依赖。这些 Module应该都是处于同一个项目业务情况下的模块，彼此之间是有不可分割的业务关系的。

下表是IDEA 与 Eclipse 之间一些概念的对比：

Eclipse | 	IntelliJ IDEA
-- | --
Workspace   |  Project
Project | Module
Facet | Facet
Library | Library
JRE | SDK
Classpath variable | Path variable

## 2. SDK（Software Development Kit）介绍

IDEA 的sdk（软件开发工具包）,就相当于 jre 运行环境。