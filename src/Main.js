import isEqual from 'lodash.isequal';
var MyTree = /** @class */ (function () {
    function MyTree() {
        this.root = null;
        this.size = 0;
    }
    MyTree.prototype.successor = function (t) {
        if (t == null)
            return null;
        else if (t.right != null) {
            var p = t.right;
            while (p.left != null) {
                p = p.left;
            }
            return p;
        }
        else {
            var p = t.parent;
            var ch = t;
            while (p != null && ch == p.right) {
                ch = p;
                p = p.parent;
            }
            return p;
        }
    };
    MyTree.prototype.deleteTreeNode = function (n) {
        this.size--;
        if ((n === null || n === void 0 ? void 0 : n.left) != null && n.right != null) {
            var s = this.successor(n);
            if (s != null) {
                n.key = s.key;
                n.value = s.value;
                n = s;
            }
        }
        var replacement = (n.left != null ? n.left : n.right);
        if (replacement != null) {
            replacement.parent = n.parent;
            if (n.parent == null)
                this.root = replacement;
            else if (n == n.parent.left)
                n.parent.left = replacement;
            else
                n.parent.right = replacement;
            n.left = n.right = n.parent = null;
        }
        else if (n.parent == null) {
            this.root = null;
        }
        else {
            if (n.parent != null) {
                if (n == n.parent.left)
                    n.parent.left = null;
                else if (n == n.parent.right)
                    n.parent.right = null;
            }
        }
    };
    MyTree.prototype.remove = function (key) {
        var n = this.getTreeNode(key);
        if (n != null)
            this.deleteTreeNode(n);
    };
    MyTree.prototype.getTreeNode = function (key) {
        var n = this.root;
        while (n != null) {
            var cmp = compareTo(key, n.key);
            if (cmp < 0) {
                n = n.left;
            }
            else if (cmp > 0) {
                n = n.right;
            }
            else {
                return n;
            }
        }
        return null;
    };
    MyTree.prototype.get = function (key) {
        var n = this.getTreeNode(key);
        return (n == null ? null : n.value);
    };
    MyTree.prototype.add = function (key, value) {
        var t = this.root;
        if (t == null) {
            this.root = new TreeNode(key, value, null);
            this.size = 1;
            return;
        }
        var cmp;
        var parent;
        if (key == null)
            return;
        do {
            parent = t;
            cmp = compareTo(key, t.key);
            if (cmp < 0)
                t = t.left;
            else if (cmp > 0)
                t = t.right;
            else
                t.value = value;
        } while (t != null);
        var e = new TreeNode(key, value, parent);
        if (cmp < 0)
            parent.left = e;
        else
            parent.right = e;
    };
    MyTree.prototype.getFirstNode = function () {
        var p = this.root;
        if (p != null)
            while ((p === null || p === void 0 ? void 0 : p.left) != null)
                p = p.left;
        return p;
    };
    MyTree.prototype.getTree = function (n) {
        console.log(n.printNode());
        if (n.left != null) {
            this.getTree(n.left);
        }
        if (n.right != null) {
            this.getTree(n.right);
        }
        if (n.left == null && n.right == null) {
            return;
        }
    };
    MyTree.prototype.printTree = function () {
        var node = this.root;
        if (node == null) {
            console.log("NULL");
            return;
        }
        this.getTree(node);
    };
    MyTree.prototype.getLastNode = function () {
        var p = this.root;
        if (p != null)
            while ((p === null || p === void 0 ? void 0 : p.right) != null)
                p = p.right;
        return p;
    };
    return MyTree;
}());
function isObject(object) {
    return object != null && typeof object === 'object';
}
function compareTo(obj1, obj2) {
    var fieldsObj1 = Object.keys(obj1);
    var fieldsObj2 = Object.keys(obj2);
    if (fieldsObj1.length == 0) {
        if (obj1 > obj2) {
            return 1;
        }
        else if (obj1 < obj2) {
            return -1;
        }
        else {
            return 0;
        }
    }
    for (var i = 0; i < fieldsObj1.length; i++) {
        var val1 = fieldsObj1[i];
        var val2 = fieldsObj2[i];
        var areObjects = isObject(val1) && isObject(val2);
        if (!areObjects) {
            if (val1 > val2) {
                return 1;
            }
            else if (val1 < val2) {
                return -1;
            }
            else {
                return 0;
            }
        }
        else {
            compareTo(val1, val2);
        }
    }
    return -2;
}
var TreeNode = /** @class */ (function () {
    function TreeNode(key, value, parent) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = parent;
    }
    TreeNode.prototype.equalsKey = function (obj) {
        isEqual(this.key, obj.key);
        return false;
    };
    TreeNode.prototype.equalsValue = function (obj) {
        isEqual(this.value, obj.value);
        return false;
    };
    TreeNode.prototype.getKey = function () {
        return this.key;
    };
    TreeNode.prototype.getValue = function () {
        return this.value;
    };
    TreeNode.prototype.setValue = function (value) {
        this.value = value;
    };
    TreeNode.prototype.printNode = function () {
        return "{" + "K:" + this.key + " = " + "V:" + this.value + "P:" + this.parent + "}";
    };
    return TreeNode;
}());
var tree = new MyTree();
tree.add(10, "str10");
tree.add(8, "str28");
tree.add(11, "str20");
tree.add(9, "str24");
tree.add(7, "str2");
tree.printTree();
console.log("===================================");
tree.remove(8);
tree.printTree();
console.log(tree.get(9));
