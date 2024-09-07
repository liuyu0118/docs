## 安装 mysql

MySQL 是一种开源的`关系型数据库`管理系统（RDBMS），它是最受欢迎的数据库系统之一。MySQL 广泛用于 Web 应用程序和其他需要可靠数据存储的应用程序中。

**特点和概念：**

- 数据库：MySQL 是一个数据库管理系统，用于创建和管理数据库。数据库是一个组织结构，用于存储和管理数据。
- 表：数据库中的数据被组织成表的形式。表由行和列组成，行表示记录，列表示字段。
- SQL：MySQL 使用结构化查询语言（SQL）进行数据库操作。SQL 是一种用于定义、操作和查询数据库的语言。
- 数据类型：MySQL 支持各种数据类型，例如整数、浮点数、字符串、日期和时间等。每个列都有自己的数据类型。
- 索引：MySQL 允许创建索引以加快数据检索速度。索引是对表中一列或多列的值进行排序的数据结构。
- 主键：主键是表中的唯一标识符。它用于确保表中的每个记录都有唯一的标识。
- 外键：外键用于建立表与表之间的关联。它定义了一个表中的列与另一个表中的列之间的关系。
- 触发器：触发器是一种在数据库中定义的操作，它会在特定事件发生时自动执行。例如，当向表中插入新记录时，可以触发一个触发器来执行其他操作。
- 存储过程：存储过程是一组预编译的 SQL 语句，可以在数据库中进行重复使用。它可以接受参数并返回结果。
- 备份和恢复：MySQL 提供了备份和恢复数据库的工具和命令，以确保数据的安全性和可靠性。

**什么是关系型数据库？**

> 在关系型数据库中，数据以结构化的方式存储，其中每个表格由一组列（字段）和一组行（记录）组成。每个列定义了数据的类型和属性，而每个行则表示一个特定的数据实例。表格之间的关系通过使用主键和外键进行建立。主键是唯一标识表格中每个行的列，而外键是指向其他表格主键的列，用于建立表格之间的关联关系。

**安装**

https://www.mysql.com/

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/677589eafded4be8a4e41ed7dc58c4e0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=zn%2F4ak961pvghiKownMevB2vafI%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f55cc6e2a17f4dc9b86780bffa337c89~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=ZLX9mmhqkkfjWTCGJ1IyfZa1%2Ffk%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/cc2ac5db94e34c7fa850fc995cadf066~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=A2jvxOmXRDDBvKJZpsxxlpORycs%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/6e2bffd243b748e8b9113a8c8ad4d5a2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=UkjxM%2FZYXv4D%2Fo9cKypMFMGRvnI%3D)

后续安装一直默认下一步就行

安装完成后我们需要配置一下环境变量，完成后打开命令行，执行以下操作：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a42e5bcb02414dbb9c064d23e6c210df~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=PQnMZ0p5vwgOTXqiL2I4O2u1%2BnA%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/84c8056b59144dbf97c1c8bc7e7f1b96~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=RCbcde1oz%2FsHvJIcscTHs4WsWv8%3D)

上述结果表示安装成功

**安装可视化插件**

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3f0d456cfc2e464f864884a4294a7d9b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=P0JaRPAa8nguX2WEh0SIgCnn9AA%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/44b1e5cf25274705832271ed6b7bdc5c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=%2FqD%2FjlQDIVjCpkJNAZP581Hug1A%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/47250f4940ab47f69746f484cd0e6252~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=KMOXav88coR6vK%2Fp0TaA8Y66ghY%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2d8058d0930042f894d10f15bb771205~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=eFQ%2FalXkKIb0HKFaykansP9KmQE%3D)

到这里表示连接上数据库了。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7552b29e10c246e0abc65077a5260bbd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=QqErwU0oDlkmirkH%2BoDhoOk9jME%3D)

然后新建数据库，库名随便取

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/123916ef58df4279ba1963e1666302f9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=phWxDjmB%2BBTbCWaefx21%2FY5QzeE%3D)

新建表，表名随便取

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d07474c8893a45a68399684f3c29515f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726129769&x-orig-sign=qKiHI1t6FmNEdElJbv%2B1N6661PM%3D)

添加数据，到此我们第一步便完成了。

## sql 语句

SQL（Structured Query Language）是一种用于管理关系型数据库系统的语言。它是一种标准化语言，用于执行各种数据库操作，包括数据查询、插入、更新和删除等。

**数据库操作**

创建数据库

```sql
CREATE DATABASE 库名
```

数据库进行重复创建就会失败，加上`if not exists`就可以避免这个问题

```sql
CREATE DATABASE IF NOT EXISTS 库名
```

添加字符集 `utf8mb4` 支持存储更广泛的字符集

```sql
CREATE DATABASE IF NOT EXISTS 库名
 DEFAULT CHARACTER SET = 'utf8mb4'
```

创建表

```sql
CREATE TABLE `user` (
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name varchar(100) COMMENT '名字',
   age int COMMENT '年龄',
   address varchar(200) COMMENT '地址',
   create_time timestamp DEFAULT CURRENT_TIMESTAMP  COMMENT '创建时间'
) COMMENT '用户表'
```

- `id`字段名称 `int`数据类型代表数字类型 `NOT NULL`(不能为空) `AUTO_INCREMENT`(id 自增) `PRIMARY KEY`(id 为主键)
- `name`(字段名称) `varchar(100)`字符串类型 100 字符 `COMMENT`(注释)
- `age`(字段名称) `int`数据类型代表数字类型 `COMMENT`(注释)
- `create_time`(字段名称) `timestamp`(时间戳) `DEFAULT CURRENT_TIMESTAMP`(自动填充创建时间)

修改表名 把`user`修改为`user1`

```sql
ALTER TABLE `user` RENAME `user1`;
```

增加列 `user`表增加`type`

```sql
ALTER TABLE `user` ADD COLUMN `type` varchar(10)
```

删除列 `user`表删除`type`

```sql
ALTER TABLE `user` DROP COLUMN `type`
```

编辑列 `user`表编辑`age`，修改类型为 varchar(3)，注释改为`改变后的年龄类型`

```sql
ALTER TABLE `user` MODIFY COLUMN `age` varchar(3) NULL COMMENT '改变后的年龄类型'
```

**查询**

查询单个列

```sql
SELECT id FROM `user`;
```

查询多个列

```sql
SELECT id,name FROM `user`;
```

查询所有列

```sql
SELECT * FROM `user`;
```

列的别名，`as`可以省略

```sql
SELECT id as user_id FROM `user`;
```

排序，`DESC`代表升序`ASC`代表降序

```sql
SELECT * FROM `user` ORDER BY id DESC;
SELECT * FROM `user` ORDER BY age ASC;
```

限制查询结果 limit[开始行][限制条数]

```sql
SELECT * FROM `user` LIMIT 0,2;//从第零个开始，查询两条
```

条件查询 `AND`并且 `OR`或者

```sql
SELECT * FROM `user` WHERE name = '历史';
SELECT * FROM `user` WHERE name = '历史' AND age <=30;
```

模糊查询 `LIKE`用于模糊匹配字符串，用`%`作通配符，表示任意多个字符

- `%历`：匹配以`历`结尾的字符串，前面可以有任意字符
- `历%`：匹配以`历`开头的字符串，后面可以有任意字符
- `%历%`：匹配任意位置包含`历`的字符串，前后可以有任意字符

```sql
SELECT * FROM `user` WHERE name LIKE '%历%';
```

**新增**

下面示例`name`,`age`,`address`必须 key 和 value 一致，多个值`，`分隔，如果在设计表的时候允许为 null，对应字段就可以插入 null 值

```sql
INSERT INTO user(`name`,`age`,`address`) VALUES('zs',12,'阿斯顿打撒'),('zs1',22,'阿斯顿打撒'),('zs2',33,'阿斯顿打撒')
```

**更新**

```sql
UPDATE `user` SET name='zs4',age=22,address='啊倒萨' WHERE id = 8;
```

**删除与批量删除**

```sql
DELETE FROM `user` WHERE id = 8 ;
DELETE FROM `user` WHERE id IN(1,2,3) ;
```

## 表达式

MySQL 表达式是一种在 MySQL 数据库中使用的计算式或逻辑式。它们可用于查询、更新和过滤数据，以及进行条件判断和计算。

- 算术表达式：可以执行基本的数学运算，例如加法、减法、乘法和除法。例如：`SELECT col1 + col2 AS sum FROM table_name;`
- 字符串表达式：可以对字符串进行操作，例如连接、截取和替换。例如：`SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM table_name;
- 逻辑表达式：用于执行条件判断，返回布尔值（TRUE 或 FALSE）。例如：`SELECT * FROM table_name WHERE age > 18 AND gender = 'Male';`
- 条件表达式：用于根据条件返回不同的结果。例如：`SELECT CASE WHEN age < 18 THEN 'Minor' ELSE 'Adult' END AS age_group FROM table_name;`
- 聚合函数表达式：用于计算数据集的聚合值，例如求和、平均值、最大值和最小值。例如：`SELECT AVG(salary) AS average_salary FROM table_name;`
- 时间和日期表达式：用于处理时间和日期数据，例如提取年份、月份或计算日期差值。例如：`SELECT YEAR(date_column) AS year FROM table_name;`

**例如查询时数值增加 100**

```sql
SELECT age + 100 as age FROM `user`;
```

## 函数

MySQL 提供了大量的内置函数，用于在查询和操作数据时进行计算、转换和处理。以下是一些常用的 MySQL 函数分类及其示例：

- 字符串函数：
  - `CONCAT(str1, str2, ...)`：将多个字符串连接起来。
  - `SUBSTRING(str, start, length)`：从字符串中提取子字符串。
  - `UPPER(str)`：将字符串转换为大写。
  - `LOWER(str)`：将字符串转换为小写。
  - `LENGTH(str)`：返回字符串的长度。
- 数值函数：
  - `ABS(x)`：返回 x 的绝对值。
  - `ROUND(x, d)`：将 x 四舍五入为 d 位小数。
  - `CEILING(x)`：返回不小于 x 的最小整数。
  - `FLOOR(x)`：返回不大于 x 的最大整数。
  - `RAND()`：返回一个随机数。
- 日期和时间函数：
  - `NOW()`：返回当前日期和时间。
  - `CURDATE()`：返回当前日期。
  - `CURTIME()`：返回当前时间。
  - `DATE_FORMAT(date, format)`：将日期格式化为指定的格式。
  - `DATEDIFF(date1, date2)`：计算两个日期之间的天数差。
- 条件函数：
  - `IF(condition, value_if_true, value_if_false)`：根据条件返回不同的值。
  - `CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 ELSE result END`：根据条件返回不同的结果。
- 聚合函数：
  - `COUNT(expr)`：计算满足条件的行数。
  - `SUM(expr)`：计算表达式的总和。
  - `AVG(expr)`：计算表达式的平均值。
  - `MAX(expr)`：返回表达式的最大值。
  - `MIN(expr)`：返回表达式的最小值。

## 子查询

子查询（Subquery），也被称为嵌套查询（Nested Query），是指在一个查询语句中嵌套使用另一个完整的查询语句。子查询可以被视为一个查询的结果集，它可以作为外层查询的一部分，用于进一步筛选、计算或操作数据。

**示例**

`关联关系为 use r表的 id 关联 table 表的 user_id`

```sql
SELECT * FROM `table` WHERE user_id = (SELECT id FROM `user` WHERE name='张一')
```

## 连表

- `内连接`的两个表，驱动表中的记录在被驱动表中找不到匹配的记录，该记录不会加入到最后的结果集，我们上边提到的连接都是所谓的`内连接`。
- `外连接`的两个表，驱动表中的记录即使在被驱动表中没有匹配的记录，也仍然需要加入到结果集。

**示例**

内连接

```sql
SELECT * FROM `user`,`table` WHERE `user`.`id` = `table`.`user_id`;
```

外连接，又分为左外连接和右外连接，主要用于确定`驱动表`，最后连接出来的数据量以`驱动表`为准。

```sql
--以 table 为驱动表
SELECT * FROM `user` RIGHT JOIN `table` ON `user`.`id` = `table`.`user_id`;
--以 user 为驱动表
SELECT * FROM `user` LEFT JOIN `table` ON `user`.`id` = `table`.`user_id`;
```
