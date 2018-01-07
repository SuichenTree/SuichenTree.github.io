# 网页布局：

## 双飞翼布局：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #middle #inside{
            float: left;
            height: 100px;
            width: 100%;
            background: blue;
        }
        #left {
            float: left;
            width: 180px;
            height: 100px;
            background: #0c9;
            margin-left: -100%;
        }

        #right {
            float: left;
            width: 200px;
            height: 100px;
            background: #0c9;
            margin-left: -200px;
        }
        
    </style>
</head>

<body>

    <div id="middle">
        <div id="inside">middle</div>
    </div>
    <div id="left">left</div>
    <div id="right">right</div>

</body>
</html>
```