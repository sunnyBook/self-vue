// 实现一个数据监听


function Obsever (data) {
    this.data = data;
    this.walk(data);
}

Obsever.prototype = {
    walk: function (data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key]);
        })
    },
    defineReactive: function (data, key, val) {
        var dep = new Dep();
        obsever(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            set: function (newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();    // 数据变化通知所有的订阅者
            },
            get: function () {
                if (Dep.target) { // 是否需要订阅者
                    dep.addSub(Dep.target); // 添加订阅者
                }
                return val;
            }
        });
    }
};

function obsever (value, vm) {
    if (!value || typeof value !== 'object') {
        return ;
    }
    return new Obsever(value);
}


function Dep () { // 消息订阅器-收集订阅者
    this.subs = [];
}

Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
};

Dep.target = null;