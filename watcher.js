function Watcher (vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get(); // 将自己添加到订阅器上
}

Watcher.prototype = {
    update: function () {
        this.run();
    },
    run: function () {
        var value = this.vm.data[this.exp];
        var oldValue = this.value;
        if (value !== oldValue) {
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }
    },
    get: function () {
        Dep.target = this;
        var value = this.vm.data[this.exp]; // 强制执行defineProperty中的get函数
        Dep.target= null;
        return value;
    }
}