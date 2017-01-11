//javascript设计模式 张容铭著（2015.8出版）
-- -- -- -- -- -- -- -- -- -- -- - 第一章-- -- -- -- -- -- -- -- -- -- -- -- -
1， 函数的两种写法及区别
写法一：
function email() {

}

function phone() {

}
写法二：
var email = function() {

};
var phone = function() {

};
2, 对象的写法及区别
写法一：
var CheckObject = function() {

};
CheckObject.email = function() {
    console.log("email...");
};
CheckObject.phone = function() {
    console.log("phone...");
};
//测试
CheckObject.email();
写法二：（ 真假对象）
var CheckObject = function() {
    return {
        email: function() {
            console.log("email...");
        },
        phone: function() {
            console.log("phone...");
        }
    };
};
写法三：
var CheckObject = function() {
    this.email = function() {
        console.log("email...");
    };
    this.phone = function() {
        console.log("phone...");
    };
};
写法四：
var CheckObject = function() {

};
CheckObject.prototype.email = function() {
    console.log("email...");
};
CheckObject.prototype.phone = function() {
    console.log("phone...");
};
写法五：
var CheckObject = function() {

};
CheckObject.prototype = {
    Constructor: CheckObject,
    email: function() {
        console.log("email...");
    },
    phone: function() {
        console.log("phone...");
    }
};
//测试
var a = CheckObject();
a.email();
写法六： 链式调用
var CheckObject = function() {

};
CheckObject.prototype = {
    Constructor: CheckObject,
    email: function() {
        console.log("email...");
    },
    phone: function() {
        console.log("phone...");
    }
};
//测试
var a = CheckObject();
a.email().phone();
//3,函数方法拓展
方式一:
    Function.prototype.addMethod = function(name, fn) {
        this[name] = fn;
        return this;
    };
方式二:
    Function.prototype.addMethod = function(name, fn) {
        this.prototype[name] = fn;

    };
//示例
var methods = function() {};
methods.addMethod('email', function() {
    console.log("email...");
    return this;
}).addMethod('phone', function() {
    console.log("phone...");
    return this;
});
//方式一测试
methods.email().phone();
//方式二测试
var m = new methods();
m.email().phone();
课后练习：
1， 真假对象实现链式调用
var CheckObject = function() {
    return {
        email: function() {
            console.log("email...");
            return this;
        },
        phone: function() {
            console.log("phone...");
            return this;
        }
    };
};
var co = CheckObject();
co.email().phone();
2， 定义一个可以为函数添加多个方法的addMethod方法
Function.prototype.addMethod = function(obj) {
    for (var item in obj) {
        this.prototype[item] = obj[item];
    }
};
var Methods = function() {

};

Methods.addMethod({
    'email': function() {
        console.log("email...");
        return this;
    },
    'phone': function() {
        console.log("phone...");
        return this;
    }
});

var m = new Methods();
m.email().phone();
3， 定义一个既可以为函数原型也可以为自身添加方法的addMethod方法

Function.prototype.addMethod = function(obj) {

    for (var item in obj) {
        this[item] = obj[item];
        this.prototype[item] = obj[item];
    }


};
var Methods = function() {

};
Methods.addMethod({
    'email': function() {
        console.log("email...");
        return this;
    },
    'phone': function() {
        console.log("phone...");
        return this;
    }
});
Methods.email().phone();
var m = new Methods();
m.email().phone();
本章总结： 展示了函数和对象的「 灵活性」。
-- -- -- -- -- -- -- -- -- -- -- - 第二章-- -- -- -- -- -- -- -- -- -- -- -- -
1， 面向对象与面向过程。 未使用new使用函数的， 都是面向过程的。
私有： 外部无法访问到的。
公有： 通过this创建的方法和属性， new 创建后， 外部通过都可以访问到。
静态： 所有实例不可修改， 不可以访问。
共有： 所有实例共同拥有的。
构造器： 创建对象时调用的方法。 影响对象的传入参数的调整等。
特权方法： 可以访问到类的私有和共有属性和方法的方法。
静态属性：
静态方法：
共有属性：
共有方法：
注： 严格上只区分公有和私有。 其他命名是根据他们的特殊用途命名的。 并无严格的划分。
写法一：
var Book = function(id, name, price) {
    var num = 1; //私有属性
    function checkId() {
        //私有方法
    };
    this.id = id; //对象公有属性
    this.copy = function() {}; //对象公有方法

    this.setName = function(name) {}; //构造器
    this.setPrice = function(price) {}; //构造器

    this.getName = function() {}; //特权方法
    this.getPrice = function() {}; //特权方法

};
Book.isChinese = true; //静态属性，对象不能访问
Book.resetTime = function() {}; //静态方法，对象不能访问
Book.prototype = function() {
        isJsBook: true, //共有属性
        display: function() { //共有方法

        }
    }
    //测试
var book = new Book(11, 'javascript设计模式', 50);
console.log(book.num); //undefined
console.log(book.isJsBook); //true
console.log(book.id); //11
console.log(book.isChinese); //undefined
console.log(Book.isChinese); //true

写法二： 闭包实现（ 简言之： 函数里有函数） 特点: 可以使用被调用函数内的变量和方法并保留。
var Book = (function(id, name, price) {
    var bookNum = 0; //静态私有属性
    function checkBook(name) {
        //静态私有方法
    };
    //创建类
    function _book(newId, newName, newPrice) {
        var name, price; //私有变量
        function checkId() {
            //私有方法
        };
        this.id = id; //对象公有属性
        this.copy = function() {}; //对象公有方法

        this.setName = function(name) {}; //构造器
        this.setPrice = function(price) {}; //构造器

        this.getName = function() {}; //特权方法
        this.getPrice = function() {}; //特权方法
        bookNum++;
        if (bookNum > 100) {
            throw new Error('我们仅出版100本');
        }


    }
    _book.prototype = {
            isJsBook: true, //静态共有属性
            display: function() { //静态共有方法

            }
        }
        //返回类
    return _book;

})();
//类使用的安全模式:
var Book = function(title, time, type) {
    if (this instanceof Book) {
        this.title = title;
        this.time = time;
        this.type = type;
    } else {
        return new Book(title, time, type);
    }
}
var book = Book('javascript', 2016, 'js');
console.log(book);
console.log(book.title); //javascript
console.log(window.title); //undefined
建议； 类的创建， 尽量使用new 来操作。 按照规范来。
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
2, 继承
2.1 类式继承： 子类的原型作为父类的实例。
特点：(1) 新创建的对象， 可以访问父类原型上的属性和方法， 也可以访问父类构造函数内的属性和方法;
(2) 新创建的对象的原型， 也可以访问父类原型上的属性和方法， 也可以访问父类构造函数内的属性和方法;
(3) 父类的属性和方法， 成为子类的共有属性和方法。 每个实例共有。(缺点)

function SuperClass() {
    this.superValue = true;
}
SuperClass.prototype.getSuperValue = function() {
    return this.superValue;
}

function SubClass() {
    this.subValue = false;
}
SubClass.prototype = new SuperClass(); //实现继承
SubClass.prototype.getSubValue = function() {
        return this.subValue;
    }
    //测试
var subcls = new SubClass();
console.log(subcls.getSuperValue()); //true
console.log(subcls.getSubValue()); //false
console.log(subcls instanceof SubClass); //true
console.log(subcls instanceof SuperClass); //true
console.log(SubClass instanceof SubClass); //false
console.log(SubClass.prototype instanceof SuperClass); //true
console.log(subcls instanceof Object); //true
2.2 构造函数继承： 在子类的构造函数环境中执行父类构造函数。
特点：(1) 在子类的构造函数中使用call函数实现继承， 继承了父类的共有属性;
(2) 父类的属性和方法， 每个子类的实例都不同;
(3) 新创建的对象， 不能继承父类原型的方法;
(缺点)

function SuperClass(id) {
    this.id = id; //值类型共有属性
    this.books = ['javascript', 'html', 'css']; //引用类型共有属性
}
SuperClass.prototype.showBooks = function() {
    console.log(this.books);
}

function SubClass() {
    SuperClass.call(this, id); //继承父类
}
//测试
var book1 = new SubClass(10);
var book2 = new SubClass(11);
book1.push('css3');
console.log(book1.books);
console.log(book1.id);
console.log(book2.books);
console.log(book2.id);
book1.showBooks(); //TypeError
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
2.3 组合继承: 组合了类式继承和构造函数式继承

function SuperClass(name) {
    this.name = name; //值类型共有属性
    this.books = ['javascript', 'html', 'css']; //引用类型共有属性
}
SuperClass.prototype.getName = function() {
    console.log(this.name);
}

function SubClass(name, time) {
    SuperClass.call(this, name); //构造函数式继承父类
    this.time = time; //子类新增共用属性
}
SubClass.prototype = new SuperClass(); //类式继承
SubClass.prototype.getTime = function() {
        return this.time;
    }
    //测试
var book1 = new SubClass('jsbook', 2016);
var book2 = new SubClass('cssbook', 2017);
book1.books.push('css3');
console.log(book1.books);
console.log(book1.getName());
console.log(book1.getTime());
console.log(book2.books);
console.log(book2.getName());
console.log(book2.getTime());

-- - -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
2.4 原型式继承： 对类式继承的封装。 后来的Object.create() 方法;

function inheritObject(obj) {
    function F() {};
    F.prototype = obj;
    return new F();
}
-- - -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
2.5 寄生式继承
var book = {
    name: 'jsbook',
    alickbook: ['cssbook', 'htmlbook']
};

function creatBook(obj) {
    var o = inheritObject(obj);
    o.getName = function() { //添加新方法
        console.log(name)
    }
    return o;
}
-- - -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
2.6 寄生组合式继承

function inheritPrototype(subClass, superClass) {
    //子类的原型继承了父类的原型，但么有执行父类的构造函数 ，且子类原来的原型被抛弃
    var p = inheritObject(superClass.prototype); //原型式继承
    p.constructor = subClass;
    subClass.prototype = p;
}

function SuperClass(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperClass.prototype.getName = function() {
    console.log(this.name);
}

function SubClass(name, time) {
    SuperClass.call(this, name); //构造函数式继承
    this.time = time;
}
inheritPrototype(subClass, superClass); //实现继承
SubClass.prototype.getTime = function() {
        return this.time;
    }
    //测试
var book1 = new SubClass('jsbook', 2016);
var book2 = new SubClass('cssbook', 2017);

book1.colors.push('black');
console.log(book1.colors);
console.log(book1.getName());
console.log(book1.getTime());
console.log(book2.colors);
console.log(book2.getName());
console.log(book2.getTime());
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
2.7 多继承： 复制的原理
Object.prototype.extend = function(target, source) {
    //单继承
    for (var porperty in source) {
        target[porperty] = source[porperty];
    }
    return target;
}
Object.prototype.mix = function() {
        //多继承
        var i = 1,
            len = arguments.length,
            target = arguments[0],
            arg;
        for (; i < len; i++) {
            arg = arguments[i];
            for (var property in arg) {
                target[property] = arg[property];
            }
        }
        return target;
    }
    //测试
var book = {
    name: 'js',
    alike: ['css', 'html']
}
var anthbook = {
    color: 'red'
}
var book2 = {
    type: 'web'
}
book.extend(book, anthbook);
console.log(book.color);
book.mix(book, book2, anthbook);
console.log(book);
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
2.8 多态

function add() {
    var len = arguments.length;
    switch (len) {
        case 0:
            return 10;
        case 1:
            return 10 + arguments[0];
        default:
            return 0;
    }
}
//测试
console.log(add());
console.log(add(1));
console.log(add(1, 2));
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
//课后练习
1， 深复制的实现

var deepCopy = function(source) {
    var result = {};
    for (var key in source) {
        //result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
        if (source[key] === 'object') {
            result[key] = deepCopy(source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
}
var test1 = {
    name: 'js',
    colors: ['red', 'blue']
}

var test2 = deepCopy(test1);
console.log(test2);
test1.colors.push('green');
console.log(test1.colors, test2.colors);
-- -- -- -- -- -- -- -- -- --第三章-- -- -- -- -- -- -- -- -- -- -- -
1， 简单工厂模式
特点：（ 1）： 批量产生具有相同属性和方法的类;（
2）： 每创建一次， 共同点都需要初始化一次。
function factory(name, bref, type) {
    var o = new Object(); //或者Object.create(null);
    o.name = name;
    o.bref = bref;
    o.type = type;
    o.getName = function() {
        console.log(this.name);
    }
    o.show = function() {
        console.log(this.bref);
    }
    return o;
}
//弹窗工厂
var alert = factory('alertname', 'alert win', 'alert');
var confirm = factory('confirmname', 'confirm win', 'confirm');
var prompt = factory('promptname', 'prompt win', 'prompt');
课后作业：
1， 工厂模式和类（ 寄生式继承） 的异同：
不同点： 前者返回的对象。 后者返回的是function。 通过new来创建的。
相同点： 都是产生了一类具有属性和方法的对象。

-- -- -- -- -- -- -- -- -- --第四章-- -- -- -- -- -- -- -- -- -- -- -
1， 工厂方法模式:
    特点：(1): 原型式类模式。 利用原型的实例共享特性， 无限扩展， 适应不断增长的需要;
(2): 原型不断修改， 越来越大。

var Factory = function(type, content) {
    if (this instanceof Factory) {
        var s = new this[type](content);
        return s;
    } else {
        new Factory(type, content);
    }
}
Factory.prototype = {
    java: function(content) {
        console.log('java...', content);
    },
    php: function(content) {
        console.log('php...', content);
    },
    javascript: function(content) {
        console.log('javascript...', content);
    }
}
测试：
var data = [{
    type: 'java',
    content: 'hello java'
}, {
    type: 'php',
    content: 'hello php'
}, {
    type: 'javascript',
    content: 'hello javascript'
}];
for (var i = 0; i < data.length; i++) {
    var item = data[i];
    Factory(item.type, item.content);
}
-- -- -- -- -- -- -- -- --第五章-- -- -- -- -- -- -- -- -- -- -- -- -
1， 抽象工厂模式
特点: (1) 父类定义特性， 子类继承并实现， 扩展性强, 更规模化;
(2) 原理类似[寄生组合式继承], 这种方式类似于java的抽象类实现。
var VehicleFactory = function(subType, superType) {
    if (typeof VehicleFactory[superType] === 'function') {
        function F() {};
        F.prototype = new VehicleFactory[superType](); //继承了父类的构造函数和原型
        //console.log(new F());
        subType.constructor = subType;
        subType.prototype = new F(); //这样做好吗?加长了原型链
        //console.log(new subType());
    } else {
        throw new Error('为创建该抽象类');
    }
}
VehicleFactory.Car = function() {
    this.type = 'car';
};
//小轿车抽象类
VehicleFactory.Car.prototype = {
        getPrice: function() {
            return new Error('抽象方法不能调用');
        },
        getSpeed: function() {
            return new Error('抽象方法不能调用');
        }
    }
    //公交车抽象类
VehicleFactory.Bus = function() {
    this.type = 'bus';
};
//公交车抽象类
VehicleFactory.Bus.prototype = {
        getPrice: function() {
            return new Error('抽象方法不能调用');
        },
        getPassengerNum: function() {
            return new Error('抽象方法不能调用');
        }
    }
    //小轿车子类
var BMW = function(price, speed) {
    this.price = price;
    this.speed = speed;
}
VehicleFactory(BMW, 'Car');
BMW.prototype.getPrice = function() {
    return this.price;
}
BMW.prototype.speed = function() {
    return this.speed;
}
var bmw = new BMW(100, 200);
console.log(bmw.getPrice());
console.log(bmw.type);
-- -- -- -- -- -- -- -- -- --第六章-- -- -- -- -- -- -- -- -- -- -- -
1， 建造者模式
特点: (1) 多个对象组合或组装为一个完整的实体。
var Human = function(param) {
    this.skill = param && param.skill || '保密'; //技能
    this.hobby = param && param.hobby || '保密'; //兴趣爱好
}
Human.prototype = {
    getSkill: function() {
        return this.skill;
    },
    getHobby: function() {
        return this.hobby;
    }
}
var Named = function(name) {
    var that = this;
    //计算的属性用函数初始化
    (function(name, that) {
        that.wholeName = name;
        if (name.indexOf(' ') > -1) {
            that.firstName = name.slice(0, name.indexOf(' '));
            that.secondName = name.slice(name.indexOf(' '));

        }
    })(name, that);
}
var Work = function(work) {
    var that = this;
    (function(work, that) {
        switch (work) {
            case 'code':
                that.work = '工程师';
                that.workDesc = 'everyday codeing';
                break;
            case 'ui':
            case 'ue':
                that.work = '设计师';
                that.workDesc = 'everyday copying';
                break;
            default:
                that.work = work;
                that.workDesc = 'everyday studying';
                break;
        };
    })(work, that);

};
Work.prototype.chageWork = function(work) {
    this.work;
}
Work.prototype.chageDesc = function(setence) {
        this.workDesc = setence;
    }
    //创建应聘者
var Person = function(name, work) {
    var _person = new Human();
    _person.name = new Named(name);
    _person.work = new Work(work);
    return _person;
}
var person = new Person('doing', 'code');
console.log(person.skill);
console.log(person.name);
console.log(person.work.work);
console.log(person.work.workDesc);
Person.work.chageDesc('coding day in day ');
console.log(person.work.workDesc);

-- -- -- -- -- -- -- -- -- --第七章-- -- -- -- -- -- -- -- -- -- -- -
1， 原型模式
特点：
//图片轮播类
var LoopImages = function(imgArr, cotainer) {
    this.imageArray = imgArr;
    this.cotainer = cotainer;
}
LoopImages.prototype = {
    createImage: function() {
        console.log('LoopImages createImage...');
    },
    changeImage: function() {
        console.log('LoopImages changeImage...');
    }
}

//上下滑动类
var SlideLoopImg = function(imgArr, cotainer) {
    LoopImages.call(this, imgArr, cotainer); //构造函数继承
}
SlideLoopImg.prototype = new LoopImages(); //类式继承
SlideLoopImg.prototype.changeImage = function() {
    console.log('slideLoopImg changeImage...');
}

//渐隐切换类
var FadeLoopImg = function(imgArr, cotainer, arrow) {
    LoopImages.call(this, imgArr, cotainer); //构造函数继承
    this.arrow = arrow;
}
FadeLoopImg.prototype = new LoopImages(); //类式继承
FadeLoopImg.prototype.changeImage = function() {
    console.log('FadeLoopImg changeImage...');
}

//测试用例：
var fadeimg = new FadeLoopImg([], 'fade', 'left');
console.log(fadeimg.cotainer);
console.log(fadeimg.changeImage());

LoopImages.prototype.getImgLength = function() {
    return this.imageArray.length;
}
FadeLoopImg.prototype.getContainer = function() {
    return this.container;
}

console.log(fadeimg.getImgLength());
console.log(fadeimg.getContainer());

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
2， 原型继承

function prototypeExtend() {
    var F = function() {},
        args = arugemnts,
        i = 0,
        len = args.length;
    for (; i < len; i++) {
        for (var j in args[i]) {
            F.prototype[j] = args[i][j];

        }
    }
    return new F();
}
//示例
var penguin = prototypeExtend({
    speed: 20,
    swim: function() {
        consloe.log("游泳速度=", this.speed);
    }
}, {
    run: function(speed) {
        consloe.log("奔跑速度=", this.speed);
    }
}, {
    jump: function() {
        consloe.log("跳跃动作");
    }
});
penguin.swim();
penguin.run(10);
penguin.jump();

-- -- -- -- -- -- -- -- -- -- --第八章: 单例模式-- -- -- -- -- -- -- -- -- -- -
    1， 对象单例模式：
特点：(1) 一个对象或一个命名空间作为一个小模块, 如jquery的$等;
(2) 容易被覆盖和修改。
//一小段代码库
var Conf = {
    var conf = {
        COUNT: 100,
        MAX_NUM: 1000,
        MIN_NUM: 10
    }
    return {
        get: functon(name) {
            return conf[name] ? conf[name] : null;
        }
    }
};
//测试
var count = Conf.get('COUNT');
consloe.log(count);
2， 构造函数单例模式(惰性单例)
var LazySingle = (function() {
    var _instance = null;

    function Single() {
        var name = 'lazy';
        return {
            publicMehd: function() {
                console.log(name);
            },
            publicProy: '1.0'
        }
    }
    return function() {
        if (!_instance) {
            _instance = Single();
        }
        return _instance;
    }
})();
consloe.log(LazySingle().publicProy);
-- -- -- -- -- -- -- -- --第九章： 外观模式-- -- -- -- -- -- -- -- -- -- -- -- -
外观模式： 接口的外层包装， 为一组复杂的子系统提供一个更高级的统一接口， 用于对底层结构封装来简化用户使用。
1， 浏览器事件兼容方式
1.1 绑定事件兼容

function on(dom, type, callback) {
    if (dom.addEventListener) { //w3c浏览器
        dom.addEventListener(type, callback, false);
    } else if (dom.attachEvent) { //ie浏览器
        dom.attachEvent('on' + type, callback);
    } else {
        dom['on' + type] = callback;
    }
}

//测试
var myinput = doucument.getElementById('myinput');
on(myinput, 'click', function() {
    console.log(bind one event);
});
on(myinput, 'click', function() {
    console.log(bind two event);
});
1.2 其他
//获取对象兼容
var getEvent = function(event) {
    return event || window.event; //ie下是window.event;

};
//获取元素
var getTarget = function(event) {
    var event = getEvent(event);
    return event.target || event.srcElement;
};
//阻止默认行为
var preventDef = function(event) {
    var event = getEvent(event);
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        //ie浏览器
        event.returnValue = false;
    }
};
2， 一个小型的代码库
var A = {
    g: function(id) {
        return doucument.getElementById(id);
    },
    css: funciton(id, key, val) {
        doucument.getElementById(id).style[key] = val;
    },
    attr: function(id, key, val) {
        doucument.getElementById(id)[key] = val;
    },
    html: function(id, html) {
        doucument.getElementById(id).innerHTML = html;
    },
    on: function(id, type, fn) {
        doucument.getElementById(id)['on' + type] = fn;
    }
};
//测试
A.css('box', 'backgroud', 'red');
A.attr('box', 'className', 'box');
A.html('box', 'add new content');
A.on('box', 'click', function() {
    A.css('box', 'width', '500px');
});


-- -- -- -- -- -- -- --第十章： 适配器模式-- -- -- -- -- -- -- -- -- -- -- -- -- -
适配器模式： 将一个类（ 对象） 的接口（ 属性和方法） 转换为另一个接口， 以方便用户使用。
1， 后端数据适配

function ajaxAdapter(data) {
    return [data['key1'], data['key2']];
}
$.ajax({
    url: 'srt.php',
    success: function(data) {
        if (data) {
            dosamething(ajaxAdapter(data));
        }
    }
});
-- -- -- -- -- -- -- -- --第11章： 代理模式-- -- -- -- -- -- -- -- -- -- -- -- -
代理模式： 一个对象不能访问另一个对象。 通过代理对象起中介作用获得联系。 如翻墙， 跨域等
1， 站长统计
var Count = (function() {
    var img = new Image();
    return function(param) {
        var str = 'http://www.count.com/a.gif?';
        for (var i in param) {
            str += i + '=' + param[i];
        }
        img.src = str;
    }
})();
//测试,统计num
Count({
    num: 10
});
2， 跨域问题(jsonp)
    /**
    <script type = "text/javascript" >
        function jsopCallback(data) {
            console.log(data);
        } </script>
        <script type = "text/javascript"
    src = "http://localhost/jsonp.php?callback=jsopCallback&data=getJsopData">

        </script>
        //服务端代码
    <?php
    $data=$_GET["data"];
    $callback=$_GET["callback"];
    echo $callback."('success','".$data."')";
    ?>
    **/

-- -- -- -- -- -- -- -- --第12章： 装饰者模式-- -- -- -- -- -- -- -- -- -- -- -
装饰者模式： 在不改变原对象的基础上， 通过对其进行包装（ 添加属性和方法） 使原有对象可以满足用户更复杂的需求。

1， 装饰已有的功能：
var decorator = function(input, fn) {
    var input = doucument.getElementById(input);
    if (typeof input.onclick === 'function') {
        var oldclickFn = input.onclick;
        input.onclick = function() {
            oldclickFn();
            fn();
        }
    } else {
        input.onclick = fn;
    }
};
-- -- -- -- -- -- -- -- -- --第13章： 桥接模式-- -- -- -- -- -- -- -- -- -- -- -
桥接模式： 将业务和抽象逻辑解耦.
1， 类似代码的提取
var span = $('span');
span[0].mouseover = function() {
    this.style.color = 'red';
    this.style.backgroud = 'green';

}
span[1].mouseover = function() {
    this.style.color = 'blue';
    this.style.backgroud = 'green';

};
//优化后
function chageColor(dom, color, bg) { //提取
    dom.style.color = color;
    dom.style.backgroud = bg;
}
var span = $('span');
span[0].mouseover = function() {
    chageColor(this, 'red', '#ddd');

}
span[1].mouseover = function() {
    tchageColor(this, 'blue', '#ccc');

};
//课后练习：创建一个对象桥接method。实现为对象拓展方法的功能
Object.prototype.method = function(name, fn) {
    if (!this[name]) {
        this[name] = fn;
    }
};

-- -- -- -- -- -- -- -- --第13章： 组合模式-- -- -- -- -- -- -- -- -- -- -- -- -
组合模式： 由部分到整体的方式， 由一个人到一群人的方式。 如套餐， 团队等
1， 新闻模块组合
//虚拟类
var News = function() {
    this.children = []; //子组件容器
    this.elem = null;
    当前组件元素
}
News.prototype = {
    init: function() {
        throw new Error('请重写这个方法');
    },
    add: function() {
        throw new Error('请重写这个方法');
    },
    getElemt: function() {
        throw new Error('请重写这个方法');
    }
};
//容器类构造函数
var Container = function(id, parent) {
    News.call(this);
    this.id = id;
    this.parent = parent;
    this.init();
};
inheritPrototype(container, News); //寄生式继承父类原型方法
Container.prototype.init = function() {
    this.elem = document.createElement('ul');
    this.elem.id = this.id;
    this.elem.className = 'new-container';
}
Container.prototype.add = function(child) {
    this.children.push(child);
    this.elem.appendChild(child.getElement());
    return this;
}
Container.prototype.getElement = function() {
    return this.elem;
}

Container.prototype.show = function() {
    this.parent.appendChild(this.elem);
};
//下一行的成员集合类
var Item = function(classname) {
    News.call(this);
    this.className = className || '';
    this.init();
};
inheritPrototype(Item, News); //寄生式继承父类原型方法
Item.prototype.init = function() {
    this.elem = document.createElement('li');
    this.elem.className = this.className;

}
Item.prototype.add = function(child) {
    this.children.push(child);
    this.elem.appendChild(child.getElement());
    return this;
}
Item.prototype.getElement = function() {
        return this.elem;
    }
    //新闻体合体类
var newsGroup = function(classname) {
    News.call(this);
    this.className = className || '';
    this.init();
};
inheritPrototype(newsGroup, News); //寄生式继承父类原型方法
newsGroup.prototype.init = function() {
    this.elem = document.createElement('div');
    this.elem.className = this.className;

}
newsGroup.prototype.add = function(child) {
    this.children.push(child);
    this.elem.appendChild(child.getElement());
    return this;
}
newsGroup.prototype.getElement = function() {
    return this.elem;
}

//图片新闻类
var ImageNews = function(url, herf, className) {
    News.call(this);
    this.url = url;
    this.herf = herf || '#';
    this.className = className || 'normal';
    this.init();
};
inheritPrototype(ImageNews, News); //寄生式继承父类原型方法
ImageNews.prototype.init = function() {
    this.elem = document.createElement('a');
    var img = new Image();
    img.src = this.url;
    this.elem.appendChild(img);
    this.elem.className = 'img-new' + this.className;
    this.elem.href = this.href;
}
ImageNews.prototype.add = function(child) {
    this.children.push(child);
    this.elem.appendChild(child.getElement());
    return this;
}
ImageNews.prototype.getElement = function() {
        return this.elem;
    }
    //图片新闻类
var IconNews = function(text, herf, type) {
    News.call(this);
    this.text = text || '';
    this.herf = herf || '#';
    this.type = type || 'video';
    this.init();
};
inheritPrototype(IconNews, News); //寄生式继承父类原型方法
IconNews.prototype.init = function() {
    this.elem = document.createElement('a');
    this.elem.innerHTML = this.text;
    this.elem.className = 'icon' + this.type;
    this.elem.href = this.href;
}
IconNews.prototype.add = function(child) {

}
IconNews.prototype.getElement = function() {
        return this.elem;
    }
    //图片新闻类
var EasyNews = function(text, herf) {
    News.call(this);
    this.text = text || '';
    this.herf = herf || '#';

    this.init();
};
inheritPrototype(EasyNews, News); //寄生式继承父类原型方法
EasyNews.prototype.init = function() {
    this.elem = document.createElement('a');
    this.elem.innerHTML = this.text;
    this.elem.className = 'text';
    this.elem.href = this.href;
}
EasyNews.prototype.add = function(child) {

}
EasyNews.prototype.getElement = function() {
        return this.elem;
    }
    //图片新闻类
var TypeNews = function(text, herf, type, pos) {
    News.call(this);
    this.text = text || '';
    this.herf = herf || '#';
    this.type = type || '';
    this.pos = pos || 'left';

    this.init();
};
inheritPrototype(TypeNews, News); //寄生式继承父类原型方法
TypeNews.prototype.init = function() {
    this.elem = document.createElement('a');
    if (this.pos === 'left') {
        this.elem.innerHTML = '[' + this.type + ']' + this.text;
    } else {
        this.elem.innerHTML = this.text + '[' + this.type + ']';
    }

    this.elem.className = 'text';
    this.elem.href = this.href;
}
TypeNews.prototype.add = function(child) {

}
TypeNews.prototype.getElement = function() {
        return this.elem;
    }
    //测试
var new1 = new Container('news', doucument.body);
new1.add(
    new Item('normal').add(
        new ImageNews('http://123.com', '#', 'imagecss')
    ).add(
        new TypeNews('ak47', '#', 'nba', 'left')
    ).add(
        new EasyNews('240斤', '#')
    )
);

-- -- -- -- -- -- -- --第15章： 享元模式-- -- -- -- -- -- -- -- -- -- -- -- -- -
享元模式： 模块化， 相同内容提取封装。 避免对象间有相同内容造成多余开销且难维护。
1， 游戏中的人物， 精灵等角色， 创建一个统一享元类， 实现横向和纵向移动。
var FlyWeight = {
    moveX: function(x) {
        this.x = x;
    },
    moveY: function(y) {
        this.y = y;
    }
};
var Player = function(x, y, c) {
    this.x = x;
    this.y = y;
    this.color = c;

};
Player.prototype = FlyWeight;
Player.prototype.changeR = function(r) {
    this.r = r;
};

//精灵
var Spirit = function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
}
Spirit.prototype = FlyWeight;
Spirit.prototype.changeR = function(r) {
    this.r = r;
};
//测试
var player1 = new Player(5, 6, 'red');
console.log("player...=", player1);

var spirit1 = new Spirit(2, 3, 4);
console.log("spirit1...=", spirit1);

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- --行为型设计模式-- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -

-- -- -- -- -- -- --第16章： 模板方法模式-- -- -- -- -- -- -- -- --
模板方法模式： 父类定义一组算法骨架， 而子类在不改变骨架的基础上做一些拓展。
1， 提示框归一化
var Alert = function(data) {
    if (!data) {
        return;
    }
    this.content = data.content; //设置内容
    this.panel = document.createElement('div'); //创建提示框面板
    this.contentNode = document.createElement('p'); //创建提示内容组件
    this.confirmBtn = document.createElement('span'); //创建确定按钮组件
    this.closeBtn = document.createElement('b'); //创建关闭按钮组件
    this.panel.className = "alert"; //为提示面板添加类
    this.closeBtn.className = "a-close"; //为关闭按钮添加类
    this.confirmBtn.className = "a-confirm"; //为确定按钮添加类
    this.confirmBtn.innerHTML = data.confirm || '确认';
    this.contentNode.innerHTML = this.content; //为提示内容添加文本
    this.success = data.success || function() {};
    this.fail = data.fail || function() {};

};
Alert.prototype = {
    init: function() {
        this.panel.appendChild(this.closeBtn);
        this.panel.appendChild(this.contentNode);
        this.panel.appendChild(this.confirmBtn);
        document.body.appendChild(this.panel); //插入页面中
        this.bindEvent();
        this.show();
    },
    bindEvent: function() {
        var me = this;
        this.closeBtn.onclick = function() {
            me.fail();
            me.hide();
        }
        this.confirm.onclick = function() {
            me.success();
            me.hide();
        }
    },
    hide: function() {
        this.panel.style.display = 'none';

    },
    show: function() {
        this.panel.style.display = 'show';
    }
};



//右侧按钮提示框
var RightAlert = function(data) {
    Alert.call(this, data);
    this.confirmBtn.className = this.confirmBtn.className + 'right';
}
RightAlert.prototype = new Alert();
//标题提示框
var TitleAlert = function(data) {
    Alert.call(this, data);
    this.title = data.title;
    this.titleNode = document.createElement('h3');
    this.titleNode.innerHTML = this.title;
}
TitleAlert.prototype = new Alert();
TitleAlert.prototype.init = function() {
        this.panel.insertBefore(this.titleNode, this.panel.firstChild);
        Alert.prototype.init.call(this);
    }
    //带有取消按钮的弹出框
var CanelAlert = function(data) {
    TitleAlert.call(this, data);
    this.cancel = data.cancel;
    this.cancelBtn = doucument.body.appendChild('span');
    this.cancel.className = 'cancel';
    this.cancelBtn.innerHTML = this.cancel || '取消';

}
CanelAlert.prototype = new Alert();
CanelAlert.prototype.init = function() {
    TitleAlert.prototype.init.call(this);
    this.panel.appendChild(this.cancelBtn);

}
CanelAlert.prototype.bindEvent = function() {
    var me = this;
    TitleAlert.prototype.bindEvent.call(this);
    this.cancelBtn.onclick = function() {
        me.fail();
        me.hide();
    }
};
//测试：
new CanelAlert({
    title: '提示标题',
    content: '',
    success: function() {
        console.log('ok');
    },
    fail: function() {
        console.log('fail');
    }
}).init();

2， 创建多类导航

function formateString(str, data) {
    //格式化字符串
    return str.replace(/\{#(\w+)#\}/g, function(match, key) {
        return typeof data[key] === undefined ? '' : data[key];
    });
}
//基础导航
var Nav = function(data) {
    this.item = '<a href="{#href#}" title="{#title#}">{#name#}</a>';
    this.html = '';
    for (var i = 0, len = data.length; i < len; i++) {
        this.html += formateString(this.item, data);
    }
    return this.html;
};
//带有消息提醒导航
var NumNav = function(data) {
    var tpl = '<b>{#num#}</b>';
    for (var i = data.length - 1; i >= 0; i--) {
        data[i].name += data[i].name + formateString(tpl, data[i]);
    }
    return Nav.call(this, data);
};
//带有链接地址的导航
var LinkNav = function(data) {
    var tpl = '<span>{#link#}</span>';
    for (var i = data.length - 1; i >= 0; i--) {
        data[i].name += data[i].name + formateString(tpl, data[i]);
    }
    return Nav.call(this, data);
};
//测试
var nav = document.getElementById('content');
nav.innerHTML = NumNav([{
    href: 'http://www.baidu.com',
    title: '百度一下，你就知道',
    name: '百度',
    num: '10'
}, {
    href: 'http://www.taobao.com',
    title: '淘宝商城',
    name: '淘宝',
    num: '2'
}]);

-- -- -- -- -- -- -- -- --第17章： 观察者模式-- -- -- -- -- -- -- -
观察者模式：（ 也叫发布 - 订阅者模式） 定义一种依赖关系， 解决主体对象与观察者之间的耦合。 如机场塔楼.
主要应用与模块间的通讯。
var Observer = (function() {
    var _messages = {};
    return {
        regist: function(type, fn) { //注册
            if (typeof _messages[type] === 'undefined') {
                _messages[type] = [fn];
            } else {
                _messages[type].push(fn);
            }

        },
        fire: function(type, args) { //发布
            if (!_messages[type]) {
                return;
            }
            var events = {
                    type: type,
                    args: args || {}
                },
                i = 0,
                len = _messages[type].length;
            for (; i < len; i++) {
                _messages[type][i].call(this, events);
            }

        },
        remove: function(type, fn) { //移除
            if (_messages[type] instanceof Array) {
                var i = _messages[type].length - 1;
                for (; i >= 0; i--) {
                    console.log(_messages[type][i] === fn);
                    _messages[type][i] === fn && _messages[type].splice(i, 1);
                }

            }
        }
    }
})();
//测试
var test = function(e) {
    console.log(e.type, e.args.msg);
}
Observer.regist('test', test);

Observer.fire('test', {
    msg: '传递参数'
});
Observer.remove('test', test); //使用匿名函数的话，无法remove。_messages[type][i] === fn永远是false
Observer.fire('test', {
    msg: '传递参数111'
});

//对象解耦
var Student = function(result) {
    var that = this;
    this.result = result;
    this.say = function() {
        console.log(this.result);
    }
};
Student.prototype.answer = function(question) {
    Observer.regist(qustion, this.say);
};
Student.prototype.sleep = function(question) { //学生呼呼
    console.log(this.result + ' ' + question + '被注销');
    Observer.remove(qustion, this.say);
};
//教师类
var Teacher = function() {};
Teacher.prototype.ask = function(question) {
    console.log('问题是： ' + question);
    Observer.fire(qustion);
};
//测试
var student1 = new Student('学生1回答问题'),
    student2 = new Student('学生2回答问题'),
    student3 = new Student('学生3回答问题');
student1.answer('什么是苹果');
student1.answer('什么是橘子');
student2.answer('什么是黄元帅');
student3.answer('什么是西瓜');
student3.answer('什么是猕猴桃');
student3.sleep('什么是猕猴桃');

var teacher = new Teacher();
teacher.ask('什么是苹果');
teacher.ask('什么是猕猴桃');

-- -- -- -- -- -- -- -- --第18章： 状态模式-- -- -- -- -- -- -- --
状态模式： 状态的改变, 引起行为的变化。 主要用来处理臃肿的分支语句。 如： http的状态码等
1， 状态对象的实现
var ResultState = function() {
    var States = {
        state0: function() {
            //处理结果0
            console.log('这是第一种情况');
        },
        state1: function() {
            //处理结果0
            console.log('这是第2种情况');
        },
        state2: function() {
            //处理结果0
            console.log('这是第3种情况');
        },
        state3: function() {
            //处理结果0
            console.log('这是第4种情况');
        }
    };

    function show(result) {
        States['state' + result] && States['state' + result]();
    }
    return {
        show: show
    }
}();
//测试
console.log(ResultState.show(0));
2， 超级玛丽
var MarryState = function() {
    var _currentState = {},
        states = {
            jump: function() {
                console.log('jump...');
            },
            move: function() {
                console.log('move...');
            },
            shoot: function() {
                console.log('shoot...');
            },
            squat: function() {
                //蹲下
                console.log('squat...');
            },
        };
    var Action = {
        chageState: function() {
            var args = arguments,
                _chageState = {};
            重置内部状态
            if (args.length) {
                for (var i = 0, len = args.length; i < len; i++) {
                    _chageState[args[i]] = true;
                }
            };
            return this;
        },
        goes: function() {
            console.log('触发一次动作');
            for (var i in _chageState) {
                states[i] && states[i]();
            }
        }
    }
    return {
        change: Action.chageState,
        goes: Action.goes
    }
};
//测试
var marry = new MarryState();
marry.change('jump', 'shoot').goes().goes().change('shoot').goes();

-- -- -- -- -- -- -- -- -- --第19章： 策略模式-- -- -- -- -- -- --
策略模式： 算法不同， 业务相同。 封装的算法具有独立性。 多用于促成活动类似的场景。
1， 商品促销
var PriceStrategy = function() {
    var strategy = {
        return30: function(price) {
            //100返30
            return Number(price) + parseInt(price / 100) * 30;
        },
        return50: function(price) {
            //100返30
            return Number(price) + parseInt(price / 100) * 50;
        },
        percent90: function(price) {
            //9折
            return parseInt(price) * 100 * 90 / 10000;
        }
    };
    return function(alg, price) {
        return strategy[alg] && strategy[alg](price);
    };
};
//测试
var price = PriceStrategy('return50', '314.26');
console.log("price..=", price);
-- -- -- -- -- -- -- -- --第20章: 职责链模式-- -- -- -- -- -- -- -
    职责链模式： 一件多职责的事情。 需要各个角色做到单一职责。 然后把流程执行完成。 如ajax请求数据，
jquey处理交互。 dom渲染到页面。
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- -- --第21章: 命令模式-- -- -- -- -- -- -- -- -
    命令模式： 对一系列命令封装， 简化操作。 可以批量执行命令。
    //用canvas绘制对象
var CanvasCmd = (function() {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');
    var Action = {
        fillStyle: function(c) {
            ctx.fillStyle = c;
        },
        fillRect: function(x, y, width, height) {
            ctx.fillRect(x, y, width, height);
        },
        fill: function() {
            ctx.fill();
        }
    };
    return {
        excute: function(msg) {
            if (!msg) {
                return;
            }
            if (msg.length) { //msg为数组
                for (var i = 0, len = msg.length; i < len; i++) {
                    arugemnts.callee(msg[i]);
                }
            } else {

                msg.param = Object.prototype.toString.call(msg.param) === "[object Array]" ? msg.param : [msg.param];
                Action[msg.command].apply(Action, msg.param);
            }
        }
    };
})();
//测试
填充为红色， 并绘制矩形
CanvasCmd.excute([{
    command: 'fillStyle',
    param: 'red'
}, {
    command: 'fillRect',
    param: [20, 20, 100, 100]
}]);
-- -- -- -- -- -- -- -- --第22章: 访问者模式-- -- -- -- -- -- -- -
    1， 对象访问器
var Visitor = (function() {
    return {
        splice: function() {
            var args = Array.prototype.splice.call(arguments, 1);
            return Array.prototype.splice.apply(arguments[0], args);
        },
        push: function() {
            var len = arguments[0].length || 0;
            var args = this.splice(arguments, 1);
            arguments[0].length = len + arguments.length - 1;
            return Array.prototype.push.apply(arguments[0], args);
        },
        pop: function() {
            return Array.prototype.pop.apply(arguments[0]);
        }
    }
})();
//测试
var a = new Object();
console.log(a.length);
Visitor.push(a, 1, 2, 3, 4);
console.log(a.length);
Visitor.push(a, 4, 5, 6);
console.log(a);
Visitor.pop(a);
console.log(a);
Visitor.splice(a, 2);
console.log(a);
-- -- -- -- -- -- -- -- --第23章: 中介者模式-- -- -- -- -- -- -- -
    中介者模式： 对象间解耦。 起到承上启下和桥梁的作用。 类似发布 - 订阅模式.如翻墙软件， 代理工具

-- -- -- -- -- -- -- -- -- --第24章: 备忘录模式-- -- -- -- -- -- -
    //缓存已请求的翻页数据
    var Page = function() {
        var cache = {};
        return function(page, fn) {
            if (cache[page]) {
                showPage(page, cache[page]);
                fn && fn();
            } else {
                $.post('http://demo.php', {
                    page: page
                }, function(res) {
                    if (res.errNo = 0) {
                        showPage(page, cache[page]);
                        cache[page] = res.data;
                        fn && fn();
                    }
                });
            }
        };
    };
-- -- -- -- -- -- -- -- -- -- --第25章: 迭代器模式-- -- -- -- -- -- -- -- -- -- -
    迭代器模式： 在不暴露对象内部结构的同时， 可以顺序地访问聚合对象内部的元素。
1, 迭代器
var Iterator = function(items, container) {
    var container = container && document.getElementById(container) || document,
        items = container.getElementByTagName(items),
        length = items.length,
        index = 0;
    var splice = [].splice;
    return {
        first: function() {
            index = 0;
            return items[index];
        },
        last: function() {
            index = length - 1;
            return items[index];
        },
        pre: function() {
            if (--index > 0) {
                return items[index];
            } else {
                index = 0;
                return null;
            }
        },
        next: function() {
            if (++index < length) {
                return items[index];
            } else {
                index = length - 1;
                return null;
            }
        },
        get: function(num) {
            index = num >= 0 ? num % length : num % length + length;
            return items[index];
        },
        dealEach: function(fn) {
            //对每一个元素执行某操作
            var args = Array.prototype.splice.call(arguments, 1);
            for (var i = 0; i < length; i++) {
                fn.apply(items[i], args);
            }
        },
        dealItem: function(num, fn) {
            //对某一个元素执行某操作
            fn.apply(this.get(num), Array.prototype.splice.call(arguments, 2));
        },
        exclusive: function(num, allFn, numFn) {
            //排他方式处理某一元素
            this.dealEach(allFn);
            if (Object.prototype.toString.call(num) === "[object Array]") {
                for (var i = 0, len = num.length; i < len; i++) {
                    this.dealItem(num[i], numFn);
                }
            } else {
                this.dealItem(num, numFn);
            }
        }
    };

};
//测试
// <ul id="container"><li>1</li><li>2</li><li>3</li><li>4</li></ul>
var demo = new Iterator('li', 'container');
console.log(demo.first());
console.log(demo.pre());
console.log(demo.next());
console.log(demo.get(2000));
demo.dealEach(function(text, color) {
    this.innerHTML = text;
    this.style.backgroud = color;
}, 'test', 'pink');
demo.exclusive([2, 3], function() {
    this.innerHTML = '被排除的';
    this.style.backgroud = 'green';
}, function() {
    this.innerHTML = '选中的';
    this.style.backgroud = 'red';
});
2, 数组迭代器
var eachArray = function(arr, fn) {
    var i = 0,
        len = arr.length;
    for (; i < len; i++) {
        if (fn.call(arr[i], i, arr[i]) === false) {
            break;
        }
    }
};
3, 对象迭代器
var eachObject = function(obj, fn) {
    for (var i in obj) {
        if (fn.call(obj[i], i, obj[i]) === false) {
            break;
        }
    }
};
//测试
var arr = [1, 2, 5, 6];
eachArray(arr, funciton(i, data) {
    console.log(i, data);
});
var obj = {
    a: 1,
    b: 3,
    c: 23
}
eachObject(obj, funciton(i, data) {
    console.log(i, data);
});
4, 同步变量迭代器: 这个很有用， 用来检查后端返回json数据是否有字段。
var AGetter = function(key) {
        if (!A) {
            return undefined;
        }
        var res = A,
            key = key.split('.');
        for (var i = 0, len = key.length; i < len; i++) {
            if (res[key[i]] !== undefined) {
                res = res[key[i]]
            } else {
                return undefined;
            }
        }
        return res;
    }
    //测试
var A = {
    common: {},
    client: {
        user: {
            username: 'doing',
            uid: 123
        }
    },
    server: {}
};
console.log(AGetter(client.user.username));
console.log(AGetter(server.lang.local));
5, 同步变量迭代赋值器
var AGetter = function(key, val) {
    if (!A) {
        return false;
    }
    var res = A,
        key = key.split('.');
    for (var i = 0, len = key.length; i < len; i++) {
        if (res[key[i]] === undefined) {
            res[key[i]] = {};
        }
        if (!res[key[i]] instanceof Object) {
            throw new Error('A.' + key.splice(0, i + 1).join('.') + 'is not object');
            return false;
        }
        res = res[key[i]];
    }
    return res[key[i]] = val;
};
//测试
var A = {
    common: {},
    client: {
        user: {
            username: 'doing',
            uid: 123
        }
    },
    server: {}
};
console.log(AGetter(client.user.username, 'john'));
console.log(AGetter(server.lang.local, 'cn'));
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- --第26章: 解释器模式-- -- -- -- -- -- -- -- --
    解释器模式: 对于客户的一个需求， 经过解析而形成的一个抽象解析程序。 如tmpl模板解析， seajs， babel等。
1， xpath解析器
var Interpreter = (function() {
    //获取兄弟元素名称
    function getSublingName(node) {
        if (node.previousSibling) { //存在兄弟节点
            var name = '',
                count = 1,
                nodeName = node.nodeName,
                subling = node.previousSibling; //前一个兄弟节点
            while (subling) {
                if (subling.nodeType == 1 && subling.nodeType == node.nodeType && subling.nodeName) {
                    if (nodeName == subling.nodeName) {
                        name += ++count; //节点名称后边添加计数
                    } else {
                        count = 1; //重置相同紧邻节点名称节点个数
                        name += '|' + ubling.nodeName.toUpperCase(); //追加新的节点名称
                    }
                }
                subling = subling.previousSibling; //向前获取前一个兄弟节点
            }
            return name;
        } else {
            return '';
        }
    }
    return function(node, wrap) {
        //node:目标节点，wrap:容器节点
        var path = [],
            wrap = wrap || doucument;
        if (node === wrap) { //当前目标节点等于容器节点
            if (wrap.nodeType == 1) { //容器节点为元素
                path.push(wrap.nodeName.toUpperCase());
            }
            return wrap;
        }
        if (node.parentNode !== wrap) {
            path = arguments.callee(node.parentNode, wrap);
        } else {
            if (wrap.nodeType == 1) { //容器节点为元素
                path.push(wrap.nodeName.toUpperCase());
            }
        }
        var sublingsNames = getSublingName(node);
        if (node.nodeType == 1) { //节点为元素
            path.push(node.nodeName.toUpperCase() + sublingsNames);
        }
        return path;
    }
})();
//测试
dom结构略
// <div>
//   <ul>
//     <li>
//       <span>1</span>
//       <span>2</span>
//     </li>
//     <li>
//       <span id="span6">6</span>
//       <span id="span7">7</span>
//     </li>
//   </ul>
// </div>
var path = Interpreter(doucument.getElementById('span7'));
console.log(path.join('>')); //HTML>BODY|HEAD>DEV2>DEV>UL>LI>SPAN

-- -- -- -- -- -- -- --技巧型设计模式-- -- -- -- -- -- -- -- -- -

-- -- -- -- -- -- -- --第27章: 链模式-- -- -- -- -- -- -- -- -- -
    1, 原型式继承
var A = function() {};
A.prototype = {
    length: 2,
    size: function() {
        return this.length;
    }
};
//测试
var a = new A();
console.log(a.size());
console.log(A.size()); //报错
console.log(A().size()); //报错
2， 缺点优化
var A = function() {
    return A.fn;
};
A.fn = A.prototype = {
    length: 2,
    size: function() {
        return this.length;
    }
};
//测试
var a = new A();
console.log(a.size());
console.log(A.size()); //报错
console.log(A().size());
3， 获取元素
var A = function(selector) {
    return A.fn.init(selector);
};
A.fn = A.prototype = {
    length: 2,
    init: function(selector) {
        return document.getElementById(selector);
    },
    size: function() {
        return this.length;
    }
};
console.log(A('demo'));
console.log(A('demo').size()); //报错
4， 问题优化
var A = function(selector) {
    return A.fn.init(selector);
};
A.fn = A.prototype = {
    length: 2,
    init: function(selector) {
        this[0] = document.getElementsByTagName(selector);
        this.length = 1;
        console.log(A.fn, A.prototype, this);
        return this;
    },
    size: function() {
        return this.length;
    }
};

var demo = A('p');
console.log(demo);
console.log(demo.size());
var test = A('div');
console.log(demo); //这个对象被覆盖了
console.log(demo.size());
5， 优化
var A = function(selector) {
    return new A.fn.init(selector);
};
A.fn = A.prototype = {
    length: 2,
    constructor: A,
    init: function(selector) {
        this[0] = document.getElementsByTagName(selector); //为了测试，正常：getElementsById
        this.length = 1;
        console.log(A.fn, A.prototype, this);
        return this;
    },
    size: function() {
        return this.length;
    }
};
A.fn.init.prototype = A.fn; //关键代码
//测试
var demo = A('p');
console.log(demo);
console.log(demo.size());
var test = A('div');
console.log(demo);
console.log(demo.size());
6, 丰富元素获取
var A = function(selector, context) {
    return new A.fn.init(selector, context);
};
A.fn = A.prototype = {
    length: 2,
    constructor: A,
    init: function(selector, context) {
        this.length = 0,
            context = context || document;
        if (~selector.indexOf('#')) { //将-1转为0
            this[0] = document.getElementsById(selector.slice(1));
            this.length = 1;
        } else {
            var doms = document.getElementsByTagName(selector),
                i = 0,
                len = doms.length;
            for (; i < len; i++) {
                this[i] = doms[i];
            }
            this.length = len;
        }
        this.context = context;
        this.selector = selector;
        return this;
    },
    size: function() {
        return this.length;
    },
    push: [].push,
    sort: [].sort
};
A.fn.init.prototype = A.fn; //关键代码
7, 对象、 方法拓展
A.extend = A.fn.extend = function() {
    var i = 1,
        len = arugemnts.length,
        target = arguments[0],
        j;
    if (i == len) {
        target = this;
        i--; //只有一个参数，i从0计数
    }
    for (; i < len; i++) {
        for (j in arguments[i]) {
            target[j] = arguments[i][j];
        }
    }
    return target;

};
//测试
var demo = A.extend({
    first: 1
}, {
    first: 2
});
console.log(demo);
A.extend(
    A.fn, {
        version: 1
    });
A.extend(
    A, {
        name: 'john'
    });
//事件方法处理
A.fn.extend({
    on: (function() {
        if (document.addEventListener) {
            return function(type, fn) {
                var i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i].addEventListener(type, fn, false);
                }
                return this;
            };
        } else if (document.attachEvent) {
            return function(type, fn) {
                var i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i].attachEvent('on' + type, fn);
                }
                return this;
            };
        } else {
            return function(type, fn) {
                var i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i]['on' + type] = fn;
                }
                return this;
            };
        }
    })()
});
//将-样式处理成驼峰
A.extend({
    camelCase: function(str) {
        return str.replace(/\-(\w)/g, function(all, letter) {
            return letter.toUpperCase();
        });
    }
});
A.extend({
    css: function() {
        var arg = arugemnts,
            len = arg.length;
        if (this.length < 1) {
            return this;
        }
        if (len === 1) {
            if (typeof arg[0] === 'string') {
                if (this[0].currentStyle) { //ie
                    return this[0].currentStyle[name];
                } else {
                    return getComputeStyle(this[0], false)[name];
                }
            } else if (typeof arg[0] === 'object') {
                for (var i in arg[0]) {
                    for (var j = this.length - 1; j >= 0; j--) {
                        this[j].style[A.camelCase(i)] = arg[0][1];
                    }
                }
            }
        } else if (len === 2) {
            for (var j = this.length - 1; j >= 0; j--) {
                this[j].style[A.camelCase(arg[0])] = arg[1];
            }
        }
        return this;
    }
});
A.fn.extend({
    attr: function() {
        var arg = arguments,
            len = arg.length;
        if (this.length < 1) {
            return this;
        }
        if (len === 1) {
            if (typeof arg[0] === 'string') {
                return this[0].getAttribue(arg[0]);
            } else if (typeof arg[0] === 'object') {
                for (var i in arg[0]) {
                    for (var j = this.length - 1; j >= 0; j--) {
                        this[j].setAttibute(i, arg[0][i]);
                    }
                }
            }
        } else if (len === 2) {
            for (var j = this.length - 1; j >= 0; j--) {
                this[j].setAttibute(arg[0], arg[1]);
            }
        }
        return this;
    }
});
A.fn.extend({
    html: function() {
        var arg = arguments,
            len = arg.length;
        if (len == 0) {
            return this[0] && this[0].innerHTML;
        } else {
            for (var j = this.length - 1; j >= 0; j--) {
                this[j].innerHTML = arg[0];
            }
        }
        return this;
    }
});
//测试
A('div').css({
  height:'30px',
  'backgroud-color':'red'
}).attr('class','demo').html('add text').on('click',function(){
  console.log('clicked');
});
-- -- -- -- -- -- -- -- -- -- 第28章: 委托模式-- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
