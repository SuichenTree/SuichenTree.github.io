[toc]
# C,C++ 练习题：

收集程序书中关于C与C++的习题。


## 1. 简单逻辑：
        
### 1.把100—200之间的素数输出出来。

==方法一：判断是否能被2~√n之间的数整除：==
```c++
#include<stdio.h>
#include<math.h>
int main(){
	
	int i,n,k;

	for(int n=100;n<=200;n++){
		
		k=sqrt(1.0*n);      //vs2010对sqrt函数有两个重载，sqrt(float),sqrt(double)
		for(i=2;i<=k;i++){
			if(n%i==0){			//能整除的不是素数
				break;    
			}
		}
		if(i<k){    //当i<k 时，表示 n不能整除2~k的所有数，即i没有变为k
			printf("%d 不是素数\n",n);
		}else{
			printf("%d 是素数\n",n);
		}

	}

	return 0;
}
```


==方法二：判断是否能被1~n-1之间的数整除：==

```c
#include<stdio.h>
#include<math.h>
int main(){
	//能被 1 与 自身 整除的数叫做素数。
	int i,j;
	for(i=1;i<=1000;i++){

		for(j=2;j<i;j++){
			if(i%j==0){
				break;
			}
		}

		if(j==i){
			printf("%d 是素数\n",i);
		}
	}

}


```



### 1-5.编程输出10000之内的回文式素数。如；2,11,97879

```c

#include<stdio.h>
#include<math.h>
int huiwen(int i);    //判断是否是回文数
int main(){
	//能被 1 与 自身 整除的数叫做素数。
	int a,b;

	for(a=1;a<10000;a++){
		for(b=2;b<a;b++){
			if(a%b==0){
				break;
			}
		}
		if(b==a){
			if(huiwen(a)){
				printf("%d 是回文素数\n",a);
			}
		}
	}
}


int huiwen(int i){
	int sum=0,ge,shi,bai,qian;

		if(i<10){
			return 1;
	    }else if(i>=10&&i<100){
			ge=i%10;
			shi=i/10;
			sum=ge*10+shi;
			if(i==sum){
				//printf("%d 是回文数\n",i);
				return 1;
			}else{
				return 0;
			}
		}else if(i>=100&&i<1000){
			ge=i%10;
			shi=i/10%10;
			bai=i/100;
			sum=ge*100+shi*10+bai;
			if(i==sum){
				//printf("%d 是回文数\n",i);
				return 1;
			}else{
				return 0;
			}
		}else if(i>=1000&&i<10000){
			ge=i%10;
			shi=i/10%10;
			bai=i/100%10;
			qian=i/1000;
			sum=ge*1000+shi*100+bai*10+qian;
			if(i==sum){
				//printf("%d 是回文数\n",i);
				return 1;
			}else{
				return 0;
			}
		}
			
		
}
```


### 2.求水仙花数；水仙花数：153=1*1*1+5*5*5+3*3*3

```c++
#include<stdio.h>
#include<math.h>
int main(){
	
	int a=0,b=0,c=0;   //a为百位的数字，b为十位的数字，c为各位的数字

	for(int i=100;i<=999;i++){
		
		a=(i/100);              // 153/100==1
		b=((i%100)/10);			// 153%100==53 , 53/10==5
		c=(i%100)%10;			// 53%10==3
	
		if(i==a*a*a+b*b*b+c*c*c){
			printf("%d 是水仙花数\n",i);
		}

	}

}
```

### 3.从键盘输入若干整数（0表示结束），计算所有整数的和。请分别用递归和非递归的方法设计函数int f()完成上述任务：

==非递归的方法：==

```c
#include<stdio.h>
#include<math.h>
int f1();
int main(){
	
	int sum=0;

	sum=f1();

	printf("%d\n",sum);

}

//非递归的方法的函数f1

int f1(){
	int a,sum=0;
	scanf("%d",&a);
	while(a!=0){
		sum+=a;
		scanf("%d",&a);
	}
	return sum;
}
```


==递归的方法==

```c
#include<stdio.h>
#include<math.h>
int f2();
int main(){
	int sum=0;
	sum=f2();
	printf("%d\n",sum);
}

//递归的方法的函数f2
int f2(){
	
	int a;
	scanf("%d",&a);
	if(a!=0){
		return a+f2();
	}else{
		return 0;
	}
}
```

### 4.求m,n的最大公约数与最小公倍数
```c

#include<stdio.h>
#include<math.h>
int main(){
	
	//求m,n的最大公约数与最小公倍数
	//思路：
	//   辗转相除法：若m,n中的大数除小数余数k不为0。则把k与被除数n，组成新的
	//              m,n。在重复以上过程，直到大数除小数的余数为0。当余数为0
	//				时，最新的m,n中 小数n是最初的m,n的最大公约数。
	//m,n的最小公倍数=(m*n)/m,n的最大公约数

	int s,n,m,k;

	printf("输入两个数m,n：");
	scanf("%d%d",&m,&n);
	s=m*n;
	if(m>n){
		
		while(m%n!=0){
			k=m%n;
			m=n;
			n=k;
		}
		printf("最大公约数为 %d\n",n);
		printf("最小公倍数为 %d\n",s/n);
	}else{
	
		while(n%m!=0){
			k=n%m;
			n=m;
			m=k;
		}
		printf("最大公约数为 %d\n",m);
		printf("最小公倍数为 %d\n",s/n);
	}

}


```


### 5:给出一个不超过5位数的正整数，求1.它是几位数，2，分别输出每一位数。3，按逆序输出各位数字。若1234->4321
	

```c
#include<stdio.h>
#include<math.h>
int main(){
	//给出一个不超过5位数的正整数，求1.它是几位数，
	//2，分别输出每一位数。3，按逆序输出各位数字。若1234->4321
	
	int a;
	printf("输入数a:\n");
	scanf("%d",&a);

	int k,ge,shi,bai,qian;
	ge=a%10;
	shi=(a/10)%10;
	bai=(a/100)%10;
	qian=a/1000;

	k=a/10;
	if(k>=100){
		printf("a 是4位数\n");
		printf("千位：%d,百位:%d,十位:%d,个位:%d\n",qian,bai,shi,ge);
		printf("逆序是：%d\n",ge*1000+shi*100+bai*10+qian);
	}else if(k>=10){
		printf("a 是3位数\n");
		printf("百位:%d,十位:%d,个位:%d\n",bai,shi,ge);
		printf("逆序是：%d\n",ge*100+shi*10+bai);
	}else if(k>=1){
		printf("a 是2位数\n");
		printf("十位:%d,个位:%d\n",shi,ge);
		printf("逆序是：%d\n",ge*10+shi);
	}else{
		printf("a 是1位数\n");
		printf("个位:%d\n",ge);
		printf("逆序是：%d\n",ge);
	}

}


```


### 6.输入一行字符，分别统计其中的英文字母，空格，数字和其他字符的个数:

```c
#include<stdio.h>
#include<math.h>
int main(){
	//输入一行字符，分别统计其中的英文字母，空格，数字和其他字符的个数。

	char c[100];
	gets(c);
	int e=0,k=0,m=0,o=0;

	for(int i=0;i<100;i++){
		if(((c[i]>='A')&&(c[i]<='Z'))||(('z'>=c[i])&&(c[i]>='a'))){
			e++;
		}else if(c[i]==32){
			k++;
		}else if((c[i]>='0')&&(c[i]<='9')){
			m++;
		}else if(c[i]=='\0'){     //'\0'表示输入的字符最后一个字符的后面一个占位符
			break;
		}else{                    //表示其他字符
			o++;
		}
	}
	printf("字母:%d,空格：%d,数字：%d,其他字符：%d\n",e,k,m,o);
}


```

### 7.找1000以内的完数：

```c
#include<stdio.h>
#include<math.h>
int main(){
	/*
	一个数如果恰好等于它的因子之和，这个数就称为“完数”，例如：6的因子是1，2，3。而6=1+2+3。
	因此6是完数。编程找出1000之内的完数，并按如下格式输出:
	6 its factors are 1 2 3
	
	*/
	int sum=1;
	for(int i=2;i<1000;i++){
	
		for(int j=2;j<i;j++){
			if(i%j==0){
				sum+=j;
			}
		}
		if(i==sum){                  //当判断是否为完数时，无论该数是否为完数
									 //，把sum变为1，为下一个判断完数进行计算。
			printf("%d是完数\n",i);
		}
		sum=1;
	}


}


```


### 8.求 a+aa+aaa+aaaa+....+n个a的值，n表示n的位数，a由键盘输入：

```c
#include<stdio.h>
#include<math.h>
int main(){
	//求 a+aa+aaa+aaaa+....+n个a的值，n表示n的位数，a由键盘输入。
	//例如：2+22+222+2222，  此时n=4.

	int k,n,a,sum=0;
	scanf("%d%d",&a,&n);
	k=a;   

	for(int i=0;i<n;i++){
		if(i>=1){
			a=a+k*pow(1.0*10,i);    //k用于存储a的值，用于乘10的指数
		}
		sum=sum+a;
	}
	printf("%d\n",sum);
}
```

### 9.求 1!+2!+3!+...+20! ,此时n=20：

```c
#include<stdio.h>
#include<math.h>
int main(){
	/*
	求 1!+2!+3!+...+20! ,此时n=20
	*/
	int a=1,sum=0,n;
	scanf("%d",&n);

	for(int i=1;i<=n;i++){
		a=a*i;
		sum=sum+a;
	}
	printf("%d",sum);

}

```


### 10.求一个分数序列： 2/1 + 3/2 + 5/3 + 8/5 + ...

```c
#include<stdio.h>
#include<math.h>
int main(){
	/*
	求一个分数序列： 2/1 + 3/2 + 5/3 + 8/5 + ...
	后一个分数的分子是前一个分数的分子+分母之和，分母是是前一个分数的分子。
	*/
	int n;
	double a,b,sum=0,t;
	scanf("%d",&n);
	a=2,b=1;
	
	for(int i=0;i<n;i++){
		if(i>=1){
			t=a;
			a=a+b;
			b=t;
			printf(" + %.1lf / %.1lf ",a,b);
			sum=sum+a/b;
		}else{
			printf(" %.1lf / %.1lf ",a,b);
			sum=a/b;
		}
	}
	printf("= %lf",sum);
}


```

### 11.判断丑数,以及输出丑数的因子个数

```c

#include<stdio.h>
#include<math.h>
int choushu(int a);
int yz_number(int a);
int main(){
	/*
	如果一个正整数分解后的所有素因子最多只有2，3，5，7四种，则被称为丑数。
	例如：1 2 3 4 5 6 7 8 9 10 12 ...就是前11个丑数。
	假定给你一个数，先判断是否为丑数，若是则输出因子的个数，否则输出“no”.
	例如丑数4的因子个数是3，因为4由3个因子（1，2，4）.
	*/

	int a,sum;
	printf("input choushu :");
	scanf("%d",&a);
	if(choushu(a)){
		sum=yz_number(a);
		printf("%d\n",sum);
	}else{
		printf("NO\n");
	}
	

}
int choushu(int a){
	//因为丑数的因子只有2 3 5 7，所有对a不断除余来判断是否为丑数。
	while(a%2==0){
		a=a/2;
	}
	while(a%3==0){
		a=a/3;
	}
	while(a%5==0){
		a=a/5;
	}
	while(a%7==0){
		a=a/7;
	}
	if(a==1){
		return 1;
	}else{
		return 0;
	}
}
int yz_number(int a){
	int sum=0;
	for(int i=1;i<=a;i++){
		if(a%i==0){
			sum++;
		}
	}
	return sum;
}

```

### 12.把数组的前半部元素与后半部分元素对换。若n为奇数，则中间元素不动。

```c
#include<stdio.h>
#include<math.h>
#include<stdlib.h>
void fun(int a[],int n){
	int  i,t,p;
	p=(n+1)/2;
	for(i=0;i<(n/2);i++){
		t=a[i];
		a[i]=a[p+i];
		a[p+i]=t;
	}
}
int main(){
	/*
	把数组的前半部元素与后半部分元素对换。
	若n为奇数，则中间元素不动。
	若1 2 3 4 5 6 7 8 9 ——> 6 7 8 9 5 1 2 3 4
	*/

	int a[100],n;
	scanf("%d\n",&n);
	for(int i=0;i<n;i++){
		scanf("%d",&a[i]);
	}
	fun(a,n);
	for(int i=0;i<n;i++){
		printf("%d",a[i]);
	}
}

```

### 13.把字符串逆序排列输出：

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
void fun(char *s);
int main(){
	char str[100];
	gets(str);
	fun(str);
	puts(str);
}
void fun(char *s){
	/*
	把字符串s的字符逆序排列，如abc->cba
	*/
	int t,i=0,j;
	j=strlen(s)-1;
	while(i<j){
		t=s[i];
		s[i]=s[j];
		s[j]=t;
		j--;
		i++;
	}
}

```

### 14.奇偶交换排序：

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>
void oesort(int a[],int n){
	int t,flag=0;
	do{
		for(int i=0;i<n-1;i=i+2){
			if(a[i]>a[i+1]){
				t=a[i];a[i]=a[i+1];a[i+1]=t;
				flag=1;
			}
		}
		for(int i=1;i<n-1;i=i+2){
			if(a[i]>a[i+1]){
				t=a[i];a[i]=a[i+1];a[i+1]=t;
				flag=1;
			}
		}
	}while(flag);

}
int main(){
	/*
	奇偶交换排序：
	oesort函数，对偶数的i，把a[i],a[i+1]比较。对奇数的i，把a[i],a[i+1]比较。
	每次比较，若a[i]>a[i+1],则交换双方。重复以上过程，直到整个数组有序。
	*/

}
```

### 15:将"China"译成密码:

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>
int main(){
	/*
	要将"China"译成密码，译码规律是：用原来字母后面的第4个字母代替原来的字母．
	例如，字母"A"后面第4个字母是"E"．"E"代替"A"。
	因此，"China"应译为"Glmre"。
	请编一程序，用赋初值的方法使cl、c2、c3、c4、c5五个变量的值分别为，
	’C’、’h’、’i’、’n’、’a’，经过运算，使c1、c2、c3、c4、c5
	分别变为’G’、’l’、’m’、’r’、’e’，并输出。
	*/
	char c1='C',c2='h',c3='i',c4='n',c5='a';
	c1+=4;  
	c2+=4;  
	c3+=4;  
	c4+=4;  
	c5+=4;  
	printf("密码是%c%c%c%c%c\n",c1,c2,c3,c4,c5); 

}
```

### 16:猴子吃桃问题

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>
int main(){
	/*
	猴子吃桃问题。猴子第一天摘下若干个桃子，当即吃了一半，还不过瘾，又多吃了一个。
	第二天早上又将剩下的桃子吃掉一半，又多吃一个。
	以后每天早上都吃了前一天剩下的一半零一个。
	到第10天早上想再吃时，见只剩下一个桃子了。求第一天共摘多少桃子。 
	*/
	int sum=0;  
	for(int i=0;i<10;i++){
		sum=sum*2+1;
	}
	printf("%d",sum);
}
```

### 17: 打印 ****** 组成的菱形图案

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>
int main(){
	/*
				*  
			     *  *   *   
		          *  *  *   *   *    
	               *  *  *  *   *   *   *   
		          *  *  *  *   *   
			     *	*  *  
				*  
	*/
	int i,j,k;  

	 for(i=0;i<=3;i++)     //打印前4行
	  {for(j=0;j<=2-i;j++)  
		printf(" ");  
		for(k=0;k<=2*i;k++)  
		   printf("*");  
		printf("\n");  
	   }  
	 for(i=0;i<=2;i++)    //打印后3行
	  {for(j=0;j<=i;j++)  
		 printf(" ");  
	   for(k=0;k<=4-2*i;k++)  
		 printf("*");  
	   printf("\n");  
	   }   
}
```

### 18.打印出以下杨辉三角形：

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>
int main(){
	/*
		打印出以下杨辉三角形（要求打印出10行）。  
		1  
		1　　1  
		1　　2　　1  
		1　　3　　3　　1  
		1　　4　　6　　4　　1  
		1　　5　　10　10　　5　　1  
		∶   
		∶  
	*/
	static int m,n,k,b[15][15];  
	b[0][1]=1;  
	for(m=1;m<=10;m++)  
	{	for(n=1;n<=m;n++)  
		{ 
			b[m][n]=b[m-1][n-1]+b[m-1][n];  
			printf("%-5d",b[m][n]);
		}
		printf("\n");  
	}  
}

```

### 18.建立1~15阶魔方阵：

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>
int main(){
	/*

	打印“魔方阵”，所谓魔方阵是指这样的方阵，它的每一行、每一列和对角线之和均相等。例如，三阶魔方阵为  
		8   1   6  
		3   5   7  
		4   9   2  
	要求打印出由1～n*n的自然数构成的魔方阵。  
				
	*/
  int a[16][16],i,j,k,p,m,n;  
  p=1;  
  
  while(p==1)                             /*要求阶数为1～15的商数*/  
  { printf("Enter n(n=1～15)：");  
      scanf("%d",&n);  
    if((n!=0)&&(n<=15)&&(n%2!=0))  p=0;  
  }  
  
  for(i=1;i<=n;i++){                      /*初始化*/  
	  for(j=1;j<=n;j++){
	    a[i][j]=0;
	  }
  }
  
  j=n/2+1;                               /*建立魔方阵*/  
  a[1][j]=1;  
  for(k=2;k<=n*n;k++)  
  { i=i-1;  
    j=j+1;  
    if((i<1)&&(j>n))  
    { i=i+2;  
      j=j-1;  
    }  
    else  
    { if(i<1)  i=n;  
      if(j>n)  j=1;  
    }  
    if(a[i][j]==0)  a[i][j]=k;  
    else  
    { i=i+2;  
      j=j-1;  
      a[i][j]=k;  
    }  
  }  
  
  for(i=1;i<=n;i++)                      /*输出魔方阵*/  
  { for(j=1;j<=n;j++)  
      printf("%4d",a[i][j]);  
    printf("\n");  
  }  
}
```


---

## 2. 数据结构：


### 1.输入10个数,按输入时的逆序建立一个单链表

静态链表方式：

```c
#include<stdio.h>
#include<math.h>
#include<stdlib.h>
typedef struct link{
	int data;
	struct link *next;
}slink;
int main(){
	/*
	从键盘输入10个数，按输入时的逆序建立一个单链表，
	即先输入的位于链表尾，然后再按输入的反序输出，并释放全部节点。
	*/
	int a[10];
	slink s[10];
	for(int i=0;i<10;i++){
		scanf("%d",&a[i]);
	}

	for(int i=0;i<10;i++){
		s[i].data=a[10-1-i];
	}

	for(int i=0;i<10;i++){
		printf("%d",s[i].data);
	}
	free(&s);

}

```

动态链表方式：

```c
#include<stdio.h>
#include<math.h>
#include<stdlib.h>
typedef struct link{
	int data;
	struct link *next;
}slink;
int main(){
	/*
	从键盘输入10个数，按输入时的逆序建立一个单链表，
	即先输入的位于链表尾，然后再按输入的反序输出，并释放全部节点。
	*/
	int a[10];
	slink s[10];
	for(int i=0;i<10;i++){
		scanf("%d",&a[i]);
	}

	for(int i=0;i<10;i++){
		s[i].data=a[10-1-i];
	}

	for(int i=0;i<10;i++){
		printf("%d",s[i].data);
	}
	free(&s);

}

```


### 2.建立动态链表，可增加，删除，遍历：

样例1：
```c
#include<stdio.h>
#include<stdlib.h>
typedef struct stu{
	int data;
	struct stu *next;
}linklist;
void printfLinklist(linklist *head){
	linklist *t;
	t=head->next;
	while(t!=NULL){
		printf("%d\n",t->data);
		t=t->next;
	}
	printf("=====打印链表完成=====\n");
}
linklist getPoint(linklist *head,int a){
	linklist *t;
	t=head->next;
	for(int j=0;j<a-1;j++){       
		t=t->next;
	}
	//遍历a-1次for循环后，t指的是指定节点。 
	return *t;
}
void deletePonint(linklist *head,int a){
	linklist *t;
	t=head->next;
	for(int j=0;j<a-2;j++){       
		t=t->next;
	}
	t->next=t->next->next;   //遍历a-2次for循环后，t指的是要删除节点的上一个节点。    
	printf("=====删除指定节点完成=====\n");
}
void addPonint(linklist *head,int a,int num){
	printf("=====增加指定节点开始=====\n");
	linklist *t,*s;
	t=head->next;
	for(int j=0;j<a-1;j++){       
		t=t->next;
	}
	s=(linklist*)malloc(sizeof(linklist));
	s->data=num;
	s->next=t->next;    //新的节点连接指定节点的下一个节点
	t->next=s;			//则指定节点的下一个节点变成新的节点
	printf("=====增加指定节点完成=====\n");
}
void DestoryLinklist(linklist *head){
	printf("=====销毁链表开始=====\n");
	linklist *t1,*t2;
	t1=head->next;
	while(t1){
		t2=t1->next;
		free(t1);
		t1=t2;
	}
	head->next=NULL;
	printf("=====销毁链表完成=====\n");
}
int main(){
   linklist *head,*p1,*p2;
   int n;
   printf("input n:\n");
   scanf("%d",&n);
   head=p1=(linklist*)malloc(sizeof(linklist));
   head->data=0;
   for(int i=1;i<=n;i++){
		p2=(linklist*)malloc(sizeof(linklist));
		p2->data=i;
		p1->next=p2;
		p1=p2;
   }
   p1->next=NULL;         //设置最后一个节点的next为空
    
	/*
	这里填写某个函数，来实验代码。
	*/


   printf("------------------\n");
}
```


样例2：
```c
#include<stdio.h>
#include<math.h>
#include<stdlib.h>
typedef struct stu{
	int num;
	struct stu *next;
}slink;
void deletePoint(slink *head,int x){
	/*
	设置两个指针，t1指向后一个，t2指向前一个.
	当t1指向要删除的节点，则t2指向被删除节点的上一个节点。
	t2->next=t1->next;   //被删除节点t1的上一个节点t2,t2的下一个节点是t1的下一个节点。从而，绕过了被删除节点
	*/
	printf("=======delete==========\n");
	slink *t1,*t2;
	t2=head;                    
	t1=head->next;
	while(t1!=NULL){
		if(t1->num!=x){
			t2=t2->next;
			t1=t1->next;
		}else{
			t2->next=t1->next;      
			break;
		}
	}

}
void addpoint(slink *head,int x){
	/*
	设置两个指针，t1指向后一个，t2指向前一个.
	当t1指向要增加的节点的下一个节点，则t2指向增加节点的上一个节点。
	
	slink *L=(slink*)malloc(sizeof(slink));   //开辟一个节点L,L是要增加的节点。
	L->next=t1;   //增加的节点的下一个节点为t1。
	t2->next=L;   //增加的节点的上一个节点为t2。
	*/
	printf("=======add==========\n");
	slink *t1,*t2;
	int a=0;
	t2=head;                    
	t1=head->next;
	printf("add num:\n");
	scanf("%d",&a);
	slink *L=(slink*)malloc(sizeof(slink));
	L->num=a;
	while(t1!=NULL){
		if(t1->num!=x){
			t2=t2->next;
			t1=t1->next;
		}else{
			L->next=t1;
			t2->next=L;
			break;
		}
	}
}
void showPoint(slink *head,int n){
	printf("=======show ==========\n");
	slink *t1;
	t1=head;
	for(int i=0;i<n;i++){     //n为链表中的节点个数
		printf("%d ",t1->num);
		t1=t1->next;
	}
	printf("n= %d\n",n);
}
int main(){
	slink *head,*p1,*p2;
	int n=1;
	head=p1=p2=(slink*)malloc(sizeof(slink));
	scanf("%d",&p1->num);
	while(p2->num!=0){
		p2=(slink*)malloc(sizeof(slink));
		n++;
		scanf("%d",&p2->num);
		p1->next=p2;
		p1=p2;
	}

	int a,x,b,c=1;
	printf("shu ru a:a=0->exit, a=1->delete,a=2->add,a=3->show\n");
	scanf("%d",&a);
	while(c){
		switch(a){
			case 0:
				printf("是否退出(1/0)?\n");
				scanf("%d",&c);
				break;
			case 1:
				printf("shu chu num x: \n");
				scanf("%d",&x);
				deletePoint(head,x);
				n--;
				showPoint(head,n);
				break;
			case 2:
				printf("shu chu num x: \n");
				scanf("%d",&x);
				addpoint(head,x);
				n++;
				showPoint(head,n);
				break;
			case 3:
				showPoint(head,n);
				break;
		}
		printf("shu ru a:a=0->exit, a=1->delete,a=2->add,a=3->show\n");
		scanf("%d",&a);
	}
	
}


```


### 3. 输入10个数，建立反序单链表，即先输入的位于链表尾，然后再输出，并释放全部节点.

```c
#include<stdio.h>
#include<stdlib.h>
typedef struct stu{
	int data;
	struct stu *next;
}slink;
int main(){
	slink *head,*p;
	int n;
	printf("input n:\n");
	scanf("%d",&n);
    head=NULL;                   //这段很重要，把head变为空

	//按输入的反序建立单链表，即先输入的位于链表尾
	for(int i=0;i<n;i++){
		p=(slink*)malloc(sizeof(slink));   //使p指向新创建的节点空间
		p->data=i;
		p->next=head;                      //然p的下一个节点指向空
		head=p;                            //把head指向与p指向相同的节点空间
	}

	while(head){ 
		p=head;                  //让p与head指向同一个节点
		head=head->next;         //然head指向下一个节点
		printf("%d\n",p->data);  //打印p指向的节点数据
		free(p);                //释放p指向的节点空间
	}
}
```


### 4.函数DelList的功能是在head中查找所有大于mink且小于maxk的节点。若找到，则删除该节点。若haed中不存在满足该条件的节点，则返回1.否则返回删除的节点数。

```c
#include<stdio.h>
#include<stdlib.h>
typedef struct link{
	int data;
	struct link *next;
}slink;
int DelList(slink *head,int mink,int maxk){
	slink *q,*p;
	int t=0;
	q=head;
	p=head->next;
	while(p){
		if(p->data>=mink){
			q=p;
			p=p->next;
		}else if(p->data<maxk){
			q->next=p->next;
			free(p);
			p=q->next;
			t++;
		}else{
			break;
		}
	}
	if(t==0){
		return -1;
	}else{
		return t;
	}

}
int main(){
	/*
	已知带头节点的单链表head，其节点的元素以递减的方式排列。
	函数DelList的功能是在head中查找所有大于mink且小于maxk的节点。
	若找到，则删除该节点。若haed中不存在满足该条件的节点，则返回1.
	否则返回删除的节点数。
	*/
	slink *head,*p1,*p2,*q;
	int t;
	head=p1=(slink*)malloc(sizeof(slink));
	head->data=0;
	for(int i=10;i>0;i--){
		p2=(slink*)malloc(sizeof(slink));
		p2->data=i;
		p1->next=p2;
		p1=p2;
	}
	p1->next=NULL;         //设置最后一个节点的next为空

	q=head->next;
	while(q){
		printf("%d\n",q->data);
		q=q->next;
	}

	printf("=============\n");
	t=DelList(head,2,4);
	printf("%d",t);
	return 0;
}


```

### 5.输出指定分数范围的（[low,high]）的学生人数与学生信息。函数proc的功能是把指定范围的学生数据放在b数组中，范围内的学生人数由函数值返回。

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>
typedef struct stu{
	int num;
	int score;
}student;
int proc(student stu[100],student b[100],int low,int high){
	int j=0;
	for(int i=0;i<100;i++){
		if(stu[i].score>low&&stu[i].score<high){
			b[j]=stu[i];
			j++;
		}
	}
	return j;
}
int main(){
	/*
	学生记录由学号与成绩组成，100名的数据由键盘接受到数组stu中，
	然后输出指定分数范围的（[low,high]）的学生人数与学生信息。
	函数proc的功能是把指定范围的学生数据放在b数组中，范围内的学生人数由函数值返回。
	*/
	student stu[100],b[100];
	int low,high,j;
	printf("input low,high:\n");
	scanf("%d%d",&low,&high);
	for(int i=0;i<100;i++){
		stu[i].num=i;
		stu[i].score=rand()%100+1;   //rand()%100+1 随机生成1-100的数
	}
	printf("===================\n");
	for(int i=0;i<100;i++){
		printf("%d %d\n",stu[i].num,stu[i].score);
	}

	j=proc(stu,b,low,high);
	printf("===================\n");
	printf("have %d\n",j);
	for(int i=0;i<j;i++){
		printf("%d %d\n",b[i].num,b[i].score);
	}
	return 0;
}


```


### 6.编程统计输入的一行的大写字母，小写字母，数字，单词的个数:

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>
int main(){
	/*
	编程统计输入的一行的大写字母，小写字母，数字，单词的个数（单词以空格隔开）。
	*/
	char str[100];
	int i=0,num1=0,num2=0,num3=0,num4=0;
	gets(str);
	

	while(str[i]){
		if(str[i]>='A'&&str[i]<='Z'){
			num1++;
		}else if(str[i]>='a'&&str[i]<='z'){
			num2++;
		}else if(str[i]>='0'&&str[i]<='9'){
			num3++;
		}else if(str[i]=='\0'&&str[i]==' '){
			num4++;
		}
		i++;
	}

	printf("===========\n");
	printf("%d %d %d %d",num1,num2,num3,num4);

}
```
### 7: 建立一个学生登记表（<100人）,有 input函数，sort函数，二分查找法：

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>
typedef struct student{
	long no;
	char name[80];
	char sex;
	float score;
}stu;
int input(stu *s){
	int i=0,num=0;
	scanf("%ld",&num);
	while(num){
		s[i].no=num;
		scanf("%s%c%f",s[i].name,s[i].sex,s[i].score);
		i++;
		scanf("%ld",&num);
	}
	return i;
}
void sort(stu *s,int n){
	stu t;
	for(int i=0;i<n;i++){
		for(int j=0;j<n-1-j;j++){
			if(strcmp(s[j].name,s[j+1].name)<0){
				t=s[j];
				s[j]=s[j+1];
				s[j+1]=t;
			}
		}
	}
}
stu search(stu *s,char *c,int n){
	int top=n-1,bot=1,mid;
	while(bot<=top){
		mid=(bot+top)/2;
		if(strcmp(s[mid].name,c)>0){
			top=mid-1;
		}else if(strcmp(s[mid].name,c)<0){
			bot=mid+1;
		}else{
			break;
		}
	}
	if(bot<=top){
		printf("%d%s%c",s[mid].no,s[mid].name,s[mid].sex,s[mid].score);
	}else{
		printf("NO found\n");
	}

}

int main(){
	/*
	建立一个学生登记表（<100人），学生包含学号，姓名，性别，分数
	结构定义：struct student{ long no,char name[80],char sex,float score};	
	要求：
	1. input函数：当输入学号-1时，结束信息录入，函数返回学生人数。
		input(struct student *stu);
	2. 用sort函数，按学生姓名升序排序
	3. 用二分查找法，定义search函数，根据姓名，查找学生信息，若不再，给出提示信息。
	*/
	

}
```