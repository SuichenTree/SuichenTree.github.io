[TOC]

# 微信小程序

## 1. java对于微信昵称中的特殊字符(emoji符号等)的处理

现在，许多微信用户的昵称有特殊符号。例如emoji表情符号等。若想把微信昵称存储在数据库中。大致有两种方法。一是修改数据库配置，使其能够存储特殊字符。二是对微信昵称进行处理后，再存储在数据库中。

> 方法1.对数据库配置进行修改

大多数特殊字符都是4 字节长度的 UTF-8 字符。要在 Mysql 中保存 4 字节长度的 UTF-8 字符，需要使用 utf8mb4 字符集，但只有 5.5.3 版本以后的才支持。

1. 修改database,table,column字符集。设置为utf8mb4_unicode_ci
2. 修改mysql配置文件my.cnf（window为my.ini）

```
[client]
default-character-set = utf8mb4
[mysql]
default-character-set = utf8mb4
[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init_connect=‘SET NAMES utf8mb4‘
```
3. 确保mysql connection版本高于5.1.13
4. 修改项目的数据库配置文件


> 方法2.若数据库版本过低，则以代码的形式处理特殊字符

```java
public class test3 {
	public static void main(String[] args) throws Exception {
		String t="sui😄chenTree";
        //替换方法
		System.out.println("原字符串 "+t);
		String newt = containsEmoji(t);
		System.out.println("替换后 "+newt);
		
        //过滤方法
        String newt2=filterOffUtf8Mb4(t);
        System.out.println("过滤后 "+newt2);

	}
	
	/**
     * 过滤掉超过3个字节的UTF8字符（特殊符号占用的字节超过3个）
     * @param text
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String filterOffUtf8Mb4(String text) throws UnsupportedEncodingException {
	    if(text!=null&&!(text.equals(""))){
	    	 byte[] bytes = text.getBytes("utf-8");
	         ByteBuffer buffer = ByteBuffer.allocate(bytes.length);
	         int i = 0;
	         while (i < bytes.length) {
	             short b = bytes[i];
	             if (b > 0) {
	                 buffer.put(bytes[i++]);
	                 continue;
	             }
	             b += 256; // 去掉符号位
	             if (((b >> 5) ^ 0x6) == 0) {
	                 buffer.put(bytes, i, 2);
	                 i += 2;
	             } else if (((b >> 4) ^ 0xE) == 0) {
	                 buffer.put(bytes, i, 3);
	                 i += 3;
	             } else if (((b >> 3) ^ 0x1E) == 0) {
	                 i += 4;
	             } else if (((b >> 2) ^ 0x3E) == 0) {
	                 i += 5;
	             } else if (((b >> 1) ^ 0x7E) == 0) {
	                 i += 6;
	             } else {
	                 buffer.put(bytes[i++]);
	             }
	         }
	         buffer.flip();
	         return new String(buffer.array(), "utf-8");
	    }else{
	    	return "";
	    }
    }
	
    /**
     * 检测字符串是否有emoji字符,有就用？替换。
     */
    public static String containsEmoji(String text) {
    	StringBuilder sBuilder=new StringBuilder(text);
    	for(int i=0;i<sBuilder.length();i++){
    		if(!notisEmojiCharacter(sBuilder.charAt(i))){
    			sBuilder.setCharAt(i,'?');
    		}
    	}
    	return sBuilder.toString();
    }
    
    /**
     * 非emoji表情字符判断,true表示不是特殊字符。false表示是特殊字符
     * @param codePoint
     * @return
     */
    public static boolean notisEmojiCharacter(char codePoint) {
        return (codePoint == 0x0) || 
                (codePoint == 0x9) ||                            
                (codePoint == 0xA) ||
                (codePoint == 0xD) ||
                ((codePoint >= 0x20) && (codePoint <= 0xD7FF)) ||
                ((codePoint >= 0xE000) && (codePoint <= 0xFFFD)) ||
                ((codePoint >= 0x10000) && (codePoint <= 0x10FFFF));
    }
}


```

![1](./in_img/1.png)