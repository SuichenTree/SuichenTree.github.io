[TOC]

# 软件测试

软件测试：是为了发现软件产品中的各种缺陷，而对软件产品进行验证和确认的活动过程，此过程贯穿整个软件开发生命周期。

# 1.软件测试的目的和原则

<h3>软件测试的目的：</h3>

>验证软件需求和功能是否得到完整实现
验证软件是否可以发布
尽可能多的发现软件中的bug
尽可能早的发现软件中的bug
对软件质量做出合理评估
预防下个版本可能出现的问题
预防用户使用可能出现的问题
发现开发过程中的问题和风险

<h3>软件测试的原则：</h3>

>所有测试的标准都是建立在用户需求之上 。
80-20原则，软件中80%的bug可以在分析、设计与评审阶段就能被发现与修正，16%的缺陷在系统的软件测试中发现，最后剩下的4%是用户长期使用的过程中才能暴露出来。
尽可能早的开展测试，越早发现错误，修改的代价越小。
发现错误较多的程序段，应进行更深入的测试。
软件项目一启动，软件测试也就是开始，而不是等程序写完，才开始进行测试 。
软件开发人员即程序员应当避免测试自己的程序.
严格执行测试计划，排除测试的随意性，以避免发生疏漏或者重复无效的工作.

---

# 2.软件测试流程：

测试计划->需求分析->测试用例->测试用例执行->提交bug->回归测试

回归测试:回归测试有两类：用例回归和错误回归。
>用例回归:是过一段时间以后再回头对以前使用过的用例在重新进行测试，看看会重新发现问题。
错误回归:就是在新版本中，对以前版本中出现并修复的缺陷进行再次验证。

---

# 3.软件测试的分类

>1. 按照是否执行程序来分：

①静态测试：是指不运行程序，主要对软件需求说明书、设计说明书、软件源代码进行检查与分析。

②动态测试：指通过运行被测程序，检查运行结果与预期结果的差异，分析差异原因。

>2. 按照测试技术分为黑盒测试和白盒测试：

①黑盒测试：黑盒测试又叫功能测试，在完全不考虑程序内部结构和内部特性的情况下，通过软件的外部表现来发现其缺陷和错误。

②白盒测试：白盒测试也称结构测试或逻辑驱动测试，它是按照程序内部的结构进行测试程序，通过测试来检测产品内部逻辑是否按照设计规格说明书的规定正常进行，检验程序中的每条通路是否都能按预定要求正确工作。

>3. 按照测试手段来分，可以分为手工测试和自动化测试

>4. 按照过程阶段来分，可以分为单元测试、集成测试、系统测试和验收测试

①单元测试：通过对模块(类/方法/函数)测试，使代码达到设计要求 主要目的是针对编码过程中可能存在的各种错误，例如用户输入验证过程中的边界值的错误。

②集成测试：将经过单元测试的模块逐步组装成完整的程序。 主要目的是检查各单元与其它程序部分之间的接口是否存在问题，各模块功能之间是否有影响。

③系统测试：是将已经确认的软件、硬件、外设、网络等其他元素结合在一起进行测试。 系统测试是针对整个产品系统进行的测试，目的是验证系统是否满足了需求规格的定义，找出与需求规格不符或与之矛盾的地方 ，进行改正。

④验收测试：验收测试是在软件产品完成了单元测试、集成测试和系统测试之后，产品发布之前所进行的最后一次软件测试活动，也称为交付测试。 以确认产品能真正符合用户业务上的需要。


---

# 4.白盒测试方法

>白盒测试基本方法（强度由低到高）：语句覆盖、判定覆盖、条件覆盖、判定条件覆盖、条件组合覆盖、路径覆盖。

（1）语句覆盖：就是设计若干个测试用例，运行被测程序，使得每一可执行语句至少执行一次。

（2）判定覆盖：使设计的测试用例==保证程序中每个判断的每个取值分支至少经历一次。==

（3）条件覆盖：条件覆盖是指选择足够的测试用例，使得运行这些测试用例时，==判定中每个条件的所有可能结果至少出现一次，但未必能覆盖全部分支==

（4）判定条件覆盖：就是设计足够的测试用例，使得判断中每个条件的所有可能取值至少执行一次，同时每个判断的所有可能判断结果至少执行，即要求各个判断的所有可能的条件取值组合至少执行一次。

（5）条件组合覆盖：在白盒测试法中，选择足够的测试用例，使所有判定中各条件判断结果的所有组合至少出现一次，满足这种覆盖标准成为条件组合覆盖。

（6）路径覆盖：是每条可能执行到的路径至少执行一次。

---

# 5.黑盒测试方法

## 1.等价类划分  

等价类划分法将程序所有可能的输入数据（有效的和无效的）划分成若干个等价类。然后从每个部分中选取具有代表性的数据当做测试用例进行合理的分类，测试用例由有效等价类和无效等价类的代表组成，从而保证测试用例具有完整性和代表性。

有效等价类：合理的、有意义的输入数据构成的集合。
无效等价类：没有意义的、不合理的输入数据集合。例如，验证外部边界的值，在一个不正确的地方提供适当的值。

##2. 边界值分析法  

边界值分析方法是对等价类划分方法的补充。一般大量的错误是发生在输入或输出范围的边界上.因此针对各种边界情况设计测试用例,可以查出更多的错误.  

首先应确定边界情况.应当选取正好等于,刚刚大于或刚刚小于边界的值作为测试数据,而不是选取等价类中的典型值或任意值作为测试数据. 

##3. 错误推测法  

错误推测法指的是在测试程序时，测试人员可以根据经验或直觉推测程序中可能存在的各种错误，进而有针对性地编写检查这些错误的测试用例的方法。

错误推测方法的基本思想: 列举出程序中所有可能有的错误和容易发生错误的特殊情况,根据他们选择测试用例. 例如, 在单元测试时曾列出的许多在模块中常见的错误. 以前产品测试中曾经发现的错误等, 这些就是经验的总结。还有, 输入数据和输出数据为0的情况。输入表格为空格或输入表格只有一行. 这些都是容易发生错误的情况。可选择这些情况下的例子作为测试用例.  

##4. 因果图法  

考虑输入条件之间的相互组合,可能会产生一些新的情况. 这就需要利用因果图(逻辑模型). 因果图方法最终生成的就是判定表，即输入条件的各种组合情况.  

##5. 场景法  

指根据用户场景来模拟用户的操作步骤，这个比较类似因果图，但是可能执行的深度和可行性更好。
