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

## 2.创建微信小程序码,并在其中添加自定义数据。

PS：创建的微信小程序码图片的文件名是“用户的userId+时间撮”。(例如：100_20190919111825.png)

```java
public class filetest {

	public static void main(String[] args) {
		createQRcodeImg(100,"1111111");
	}

	//获取当前日期时间的时间撮
	public static String time(){
	SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
	System.out.println("当前日期时间撮为:"+df.format(new Date()));
	return df.format(new Date());
	} 

/**
* 根据小程序的appid和secret来获取微信小程序accesstoken
*/
public static String getAccessToken(){
	System.out.println("getAccessToken方法----------开始获取accesstoken");
	//小程序的appid
	String appid="wxc3cf8b246ab675bf";
	//小程序的secret
	String secret="dd27742df6c858a4d5b2613ccbe3c78c";
	try{
		URL url = new URL("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appid+"&secret="+secret);
		HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
		httpURLConnection.setRequestMethod("GET");// get提交模式
		httpURLConnection.connect();    
		BufferedReader reader = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
		String line;
		StringBuffer buffer = new StringBuffer();
		while ((line = reader.readLine()) != null) {
			buffer.append(line);
		}
		reader.close();
		httpURLConnection.disconnect();
		System.out.println("微信接口返回的数据: "+buffer.toString());
		//读取微信接口返回的数据
		JSONObject jsonObject=new JSONObject(buffer.toString());
		String accessToken=jsonObject.getString("access_token");
		System.out.println("getAccessToken方法----------成功获取accesstoken");
		return accessToken;
	}catch(Exception exception){
		System.out.println("获取accesstoken方法异常");
		return null;
	}
}
	

/**
* 该方法的作用就是创建小程序的二维码，并在其中携带参数(用户的邀请码信息)
* PS:二维码的名称为用户的userId+当前时间撮
*/
public static void createQRcodeImg(Integer userId,String inviteCode){
		String accesstoken=getAccessToken();
		//为该用户创建一个二维码图片
		try
		{
			URL url = new URL("https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token="+accesstoken);
			HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
			httpURLConnection.setRequestMethod("POST");// 提交模式
			// 发送POST请求必须设置如下两行
			httpURLConnection.setDoOutput(true);
			httpURLConnection.setDoInput(true);
			// 获取URLConnection对象对应的输出流
			PrintWriter printWriter = new PrintWriter(httpURLConnection.getOutputStream());
			JSONObject paramJson = new JSONObject();
			System.out.println("要给二维码传入的scene值为 code="+inviteCode);
			paramJson.put("scene","qrcode="+inviteCode);
			paramJson.put("page", "pages/index/index");
			paramJson.put("width", 430);
			paramJson.put("auto_color", true);
			printWriter.write(paramJson.toString());
			
			// flush输出流的缓冲
			printWriter.flush();
			//开始获取数据
			BufferedInputStream bis = new BufferedInputStream(httpURLConnection.getInputStream());
			//找出目录中是否有同前缀，后缀的图片文件。并记录数量
			File file = new File("C:/Users/Administrator/Desktop/filetest/");
			//查询同前缀名文件并删除
			imgDelete(file, userId);
			
			String osPath="C:\\Users\\Administrator\\Desktop\\filetest\\"+userId+"_"+time()+".png";
			File osFile = new File(osPath);
			OutputStream os = new FileOutputStream(osFile);
			int len;
			byte[] arr = new byte[1024];
			while ((len = bis.read()) != -1)
			{	
				os.write(len);
				os.flush();
			}
			os.close();
			System.out.println("创建新图片成功");
		}
		catch (Exception e)
		{
			e.printStackTrace();
			System.out.println("创建图片异常");
		}
	
}

/**
* 查询目录中是否有相同前缀名的文件。若有则删除。
* @param file
* @param userId
* @return
*/
public static void imgDelete(File file,Integer userId){
	int imgCount=0;
	//遍历该目录
	File[] tempFile = file.listFiles();
	for(int i = 0; i < tempFile.length; i++){
		if(tempFile[i].getName().startsWith(userId.toString())){
				imgCount++;
				System.out.println("该目录下相同前缀的文件有："+tempFile[i].getName());
		}
	}
	System.out.println("当前该同名前缀文件的数量为 "+imgCount);
	if(imgCount>0){
		//表示该目录中有相同前缀的图片。先删除原先的图片。在创建新图片
		for(int i = 0; i < tempFile.length; i++){
			//寻找前缀为userId的图片
			if(tempFile[i].getName().startsWith(userId.toString())){
				System.out.println("正在删除前缀为"+userId+"的文件");
				tempFile[i].delete();
			}
		}
	}
}

    //根据userId,找出目录中以userId为前缀的图片名称
	public static String getQRCodeimgPath(Integer userId){
		String targetPath="C:/Users/Administrator/Desktop/filetest/";
		File file=new File(targetPath);
		//list()方法返回该目录下所有文件和目录的名称
		String[] listFiles = file.list();
		for(int i=0;i<listFiles.length;i++){
			if(listFiles[i].startsWith(userId.toString())){
				System.out.println(listFiles[i]);
				System.out.println("https://api.chiltoon.com/statics/qr_code/"+listFiles[i]);
				return "https://api.chiltoon.com/statics/qr_code/"+listFiles[i];
			}
		}
		return "";
	}

}

```

![3](../java/in_img/3.png)




```js
//在微信小程序的onLaunch和onShow方法参数中可获取场景值
App({
    onLaunch: function (options) {
        console.log("[onLaunch] 本次场景值:", options.scene)
    },
    onShow: function (options) {
        console.log("[onShow] 本次场景值:", options.scene)
    }
})
```



## 3.创建微信公众号的二维码，并添加自定义信息

<font color="red">PS:若要读取微信公众号二维码中的信息。需要在微信公众平台开通服务器配置。</font>

```java
public class UrlUtil {
	public static void main(String[] args) {
		createWXCode();
	}
	
	/**
	 * 根据微信公众号的appid,secret
	 * 获取微信公众号的accesstoken
	 */
	public static String getAccessToken(){
		System.out.println("getAccessToken方法----------开始获取accesstoken");
		//微信公众号的appid
		String appid="wx3eacafdd063cf79b";
		//微信公众号的secret
		String secret="7f2f63c36562ac4c72d73bb7f99ce862";
		try{
			URL url = new URL("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appid+"&secret="+secret);
	        HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
	        httpURLConnection.setRequestMethod("GET");
	        httpURLConnection.connect();    
			BufferedReader reader = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
			String line;
			StringBuffer buffer = new StringBuffer();
			while ((line = reader.readLine()) != null) {
				buffer.append(line);
			}
			reader.close();
			httpURLConnection.disconnect();
			System.out.println("getAccessToken方法调用微信接口返回的数据: "+buffer.toString());
			
			JSONObject jsonObject=new JSONObject(buffer.toString());
			String accessToken=jsonObject.getString("access_token");
			System.out.println("getAccessToken方法----------成功获取accesstoken");
			return accessToken;
		}catch(Exception exception){
			System.out.println("获取accesstoken方法异常");
			return null;
		}
	}
	
	/**
	 * 根据微信公众号的accesstoken获取微信公众号的ticket
	 * **/
	public static String getTicket(){
		String accessToken = getAccessToken();
		try{
			URL url = new URL("https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token="+accessToken);
	        HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
	        httpURLConnection.setRequestMethod("POST");
	        // 发送POST请求必须设置如下两行
            httpURLConnection.setDoOutput(true);
            httpURLConnection.setDoInput(true);
            
            PrintWriter printWriter = new PrintWriter(httpURLConnection.getOutputStream());
            //发送的json字符串格式是{"action_name": "QR_LIMIT_STR_SCENE", "action_info": {"scene": {"scene_str": "test"}}}
            JSONObject paramJson = new JSONObject();
            JSONObject middle=new JSONObject();
            JSONObject small=new JSONObject();
            //给微信公众号的二维码传入自定义数据
            small.put("scene_str", "这是开发者自定义数据");
            middle.put("scene",small);
            paramJson.put("action_info", middle);
            paramJson.put("action_name","QR_LIMIT_STR_SCENE");
            System.out.println("getTicket方法发送给微信接口的json数据："+paramJson.toString());
            //把json数据写进请求中
            printWriter.write(paramJson.toString());
            // flush输出流的缓冲
            printWriter.flush();
            //连接请求
	        httpURLConnection.connect();    
			BufferedReader reader = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
			String line;
			StringBuffer buffer = new StringBuffer();
			while ((line = reader.readLine()) != null) {
				buffer.append(line);
			}
			reader.close();
			httpURLConnection.disconnect();
			System.out.println("getTicket方法调用微信接口返回的数据是: "+buffer.toString());
			
			JSONObject jsonObject=new JSONObject(buffer.toString());
			String ticket=jsonObject.getString("ticket");
			System.out.println("getTicket方法----------成功获取ticket。 ticket = "+ticket);
			return ticket;
		}catch(Exception exception){
			System.out.println("获取getTicket方法异常");
			return null;
		}
	}
	
	/*
	 * 根据微信公众号的ticket创建微信公众号的二维码
	 * */
	public static void createWXCode(){
		String ticket = getTicket();
		try{
			URL url = new URL("https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+ticket);
            HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
            httpURLConnection.setRequestMethod("GET");// 提交模式
			//开始获取数据
            BufferedInputStream bis = new BufferedInputStream(httpURLConnection.getInputStream());
    		//文件路径
    		String osPath="C:\\Users\\Administrator\\Desktop\\WXCODE.png";
    		// 判断文件夹内是否存在相同名字的二维码
    		File osFile = new File(osPath);
    		if (osFile.exists()) {
    			System.out.println("该二维码图片之前存在，现在删除并重新创建。");
    			osFile.delete();
    		}
            OutputStream os = new FileOutputStream(osFile);
            int len;
            byte[] arr = new byte[1024];
            while ((len = bis.read()) != -1)
            {	
                os.write(len);
                os.flush();
            }
            os.close();
            System.out.println("创建图片成功");
		}catch(Exception exception){
			System.out.println("创建图片异常");
		}
	}
}



```