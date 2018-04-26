[toc]
#PAT 乙级（Basic Level）

链接：[PAT官网](https://www.patest.cn/)

考生应具备以下基本能力：
1.	基本的C/C++的代码设计能力，以及相关开发环境的基本调试技巧；
2.	理解并掌握最基本的数据存储结构，即：数组、链表；
3.	理解并熟练编程实现与基本数据结构相关的基础算法，包括递归、排序、查找等；
4.	能够分析算法的时间复杂度、空间复杂度和算法稳定性；
5.	具备问题抽象和建模的初步能力，并能够用所学方法解决实际问题。


## PAT乙级真题及训练集

链接：[PAT乙级真题及训练集](https://www.patest.cn/contests/pat-b-practise)


### 1001. 害死人不偿命的(3n+1)猜想 (15)

> 卡拉兹(Callatz)猜想：

对任何一个自然数n，如果它是偶数，那么把它砍掉一半；如果它是奇数，那么把(3n+1)砍掉一半。这样一直反复砍下去，最后一定在某一步得到n=1。卡拉兹在1950年的世界数学家大会上公布了这个猜想，传说当时耶鲁大学师生齐动员，拼命想证明这个貌似很傻很天真的命题，结果闹得学生们无心学业，一心只证(3n+1)，以至于有人说这是一个阴谋，卡拉兹是在蓄意延缓美国数学界教学与科研的进展……

> 我们今天的题目不是证明卡拉兹猜想，而是对给定的任一不超过1000的正整数n，简单地数一下，需要多少步（砍几下）才能得到n=1？

输入格式：每个测试输入包含1个测试用例，即给出自然数n的值。

输出格式：输出从n计算到1需要的步数。

输入样例：
3
输出样例：
5

Code:
```c
#include<stdio.h>
int main(){
	
	int n;
	int i=0;
	
	scanf("%d",&n);          //输入n 
	 
        while(n!=1){        //当n==1，跳出循环 
            
            if(n%2==0){     //判断n是不是偶数 
                n=n/2; 
                i=i+1;      //计算多少步 
            }else{
                n=(3*n+1)/2;
                i=i+1;
            }
        }
		
	printf("%d\n",i);
	
	return 0;
} 

```

---

### 1002. 写出这个数 (20)：

> 读入一个自然数n，计算其各位数字之和，用汉语拼音写出和的每一位数字。

输入格式：每个测试输入包含1个测试用例，即给出自然数n的值。这里保证n小于10100。

输出格式：在一行内输出n的各位数字之和的每一位，拼音数字间有1 空格，但一行中最后一个拼音数字后没有空格。

输入样例：
1234567890987654321123456789
输出样例：
yi san wu

Code 
==格式可能有问题==
```c
#include<stdio.h> 
#include<string.h> 

int main(){
	long n;
	int i=0;
	int sum=0;     //n的各个位数之和
	
	int a=0;       //n的各个位数之和的颠倒数(若sum=45 ,则a=54)       
	
	printf("shu ru n:\n");    
	scanf("%d",&n);			//读入自然数n 
	
	while(n!=0){            //使用while循环遍历n
		i=n%10;             // 取出n的个位数 
		sum=sum+i;          // 把取出的个位数 加到一起
		n=n/10;             //把n从 n 位数变成 n-1 位数。(例如：123 -> 12) 
		
	}
	
	printf("sum is %d\n",sum);    //sum是n的各个数之和 
	printf("\n");
	 
	 
	while(sum>10){           //把sum的位数反转（例如：123 -> 321） 
		a=sum%10;
		a=a*10; 
		sum=sum/10;
	}
	    a=a+sum;            //此时的sum是原先的sun的最高位数，与a相加后，会变成a的最低位数。 
	 
	printf("reverse is %d\n",a); 
	 
	while(a!=0){             // 遍历 a 
		
		switch(a%10){        //取出a的个位数(就是原先sun的最高位数) 
			case 1:
				printf("yi ");
				break;
			case 2:
				printf("er ");
				break;
			case 3:
				printf("san ");
				break;
			case 4:
				printf("si ");
				break;
			case 5:
				printf("wu ");
				break;
			case 6:
				printf("liu ");
				break;
			case 7:
				printf("qi ");
				break;
			case 8:
				printf("ba ");
				break;
			case 9:
				printf("jiu ");
				break;
		}
		
		a=a/10;        //把a从 n 位数变成 n-1 位数。
	}
	
}
```