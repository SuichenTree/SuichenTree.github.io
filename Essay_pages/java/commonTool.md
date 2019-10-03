# 常用工具类（方法）

## 1.把13位时间撮转换为日期

```java
public String convertDate(){
		//把13位时间撮转换为日期
		String createTime="1566879011468";
		long msgCreateTime = Long.parseLong(createTime);
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String format2 = format.format(new Date(msgCreateTime));
		System.out.println(format2);
		return format2;
}

```

