

# JS

## 1.数据类型

**基本数据类型：数字、字符串、布尔、undefined、null**

undefined类型？

1、一个变量声明了，但是没有赋值，值默认为undefined

2、一个变量声明了，并且赋值了一个undefined的值

3、一个对象中，获取某个不存在的属性，值也是undefined

**复杂数据类型：数组、函数、正则表达式、Date**

## 2.构造函数

```
function Person(name,age){
	this.name=name;
	this.age=age;
	
}
var p1=new Person("lily",17)
//p1的构造函数==>Person

```

如何分辨出一个对象到底是不是某个构造函数的实例？

```
//instanceof
var isTrue=xxx instanceof Person
//true==>xxx为Person构造函数的实例
```

如何判断一个数据是否是复杂数据类型？

```
使用排除法：
a、看它的值是不是：数字、字符串、布尔值、null、undefined，
b、如果不是以上5种值，那就是复杂数据类型
```

## 3.原型对象

【构造函数的prototype对象】称之为原型对象

```
Person的原型对象是谁呢？
//  -->首先要知道Person的构造函数：-->Function
//  -->所以Person的原型对象是：Function.prototype
```

## 4.继承

通过【某种方式】让一个对象可以访问到另一个对象中的属性和方法，我们把这种方式称之为继承

```
function Person(name){
	this.name=name;
}
```

### 原型链继承1

```
Person.prototype.say=function(){
        console.log("你好")
}
//方法多了会造成代码冗余
```

### 原型链继承2

constructor

```
Person.prototype={
	constructor:Person,
	say:function(){
		console.log("say");
	},
	run:function(){
		console.log("run");
	}
}
```

**注意**

a、一般情况下，应该先改变原型对象，再创建对象

b、一般情况下，对于新原型，会添加一个constructor属性，从而不破坏原有的原型对象的结构

### 拷贝继承(混入继承)

```
var source={name:"lily",age:18}
var target={}
function extend(target,source){
	 for (key in source){
	 	target[key]=source[key];
	 }
	 return target;
}
extend(target,source)
```

```
es6 对象扩展运算符
var target={...source,age:20}
//target 为source的浅拷贝，并且将age的属性作了更改
```

```
jquery: $.extend()
//用于将一个或多个对象的内容合并到目标对象。
$.extends(target,object1)
```



### 原型式继承

空对象：Object.create(null)

```
var s1={name:'lily',say:function(){}}
var s2=Object.create(s1);
```

### 借用构造函数实现继承

```
function Parent(name,age){
 	this.name=name;
 	this.age=age;
}
function Son(name,age,gender){
 Parent.call(this,name,age);//等价于 Parent.apply(this,[name,age])
 this.gender=gender;
}
```

局限性：Parent（父类函数）必须完全适用于Son（子类函数）