let isEqual = require('lodash.isequal');

interface ITree<K, V>{
    size: number;
    add(key: K, value: V): void;
    remove(key: K): void;

    get(key: K): null | V;

}

class MyTree <K,V> implements ITree<K, V>{

    root: TreeNode<K, V> | null;

    size: number;

    constructor() {
        this.root = null;
        this.size = 0;
    }

    private successor(t:TreeNode<K, V> | null) :TreeNode<K, V> | null {
        if (t == null)
            return null;
        else if (t.right != null) {
            let p:TreeNode<K, V> = t.right;
            while (p.left != null) {
                p = p.left;
            }
            return p;
        } else {
            let p:TreeNode<K, V> | null = t.parent;
            let ch:TreeNode<K, V> = t;
            while (p != null && ch == p.right) {
                ch = p;
                p = p.parent;
            }
            return p;
        }
    }

    private deleteTreeNode(n:TreeNode<K, V>) : void {
        this.size--;
        if (n?.left != null && n.right != null) {
            let s:TreeNode<K,V> | null = this.successor(n);
            if (s != null) {
                n.key = s.key;
                n.value = s.value;
                n = s;
            }

        }
        let replacement:TreeNode<K,V> | null = (n.left != null ? n.left : n.right);
        if (replacement != null) {
            replacement.parent = n.parent;
            if (n.parent == null)
                this.root = replacement;
            else if (n == n.parent.left)
                n.parent.left = replacement;
            else
                n.parent.right = replacement;

            n.left = n.right = n.parent = null;

        } else if (n.parent == null) {
            this.root = null;
        } else {
            if (n.parent != null) {
                if (n == n.parent.left)
                    n.parent.left = null
                else if (n == n.parent.right)
                    n.parent.right = null;
            }
        }
    }


    remove(key: K): void {
        let n : TreeNode<K,V> | null = this.getTreeNode(key);
        if (n != null)
            this.deleteTreeNode(n);
    }

    private getTreeNode(key:K) : TreeNode<K, V> | null {
        let n:TreeNode<K, V> | null = this.root;
        while (n!=null) {
            let cmp = compareTo(key,n.key);
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
    }

    get(key: K): null | V {
        let n:TreeNode<K, V> | null = this.getTreeNode(key);
        return (n==null ? null : n.value);
    }

    add(key: K, value: V): void {
        let t:TreeNode<K,V> | null = this.root;
        if (t == null) {
            this.root = new TreeNode<K, V>(key, value,null);
            this.size = 1;
            return;
        }
        let cmp:number;
        let parent:TreeNode<K, V>;
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
        } while (t!= null)
        let e:TreeNode<K,V> = new TreeNode<K, V>(key, value, parent);
        if (cmp < 0)
            parent.left = e;
        else
            parent.right = e;
    }


    private getFirstNode():null | TreeNode<K, V> {
       let p : TreeNode<K, V> | null = this.root;
        if (p != null)
            while (p?.left != null)
                p = p.left;
        return p;
    }

    private getTree(n:TreeNode<K, V>):void {
        console.log(n.printNode());
        if (n.left != null) {
             this.getTree(n.left);
        } if (n.right != null) {
            this.getTree(n.right);
        } if (n.left == null && n.right == null) {
            return;
        }
    }

    printTree ():void{
        let node:TreeNode<K, V> | null = this.root;
        if (node == null) {
            console.log("NULL");
            return;
        }
        this.getTree(node);

    }

    private getLastNode():null | TreeNode<K, V> {
        let p : TreeNode<K, V> | null = this.root;
        if (p != null)
            while (p?.right != null)
                p = p.right;

        return p;
    }



}

function isObject<O>(object :O ) : boolean {
    return object != null && typeof object === 'object';
}

function compareTo<O>(obj1: O, obj2 : O):number{
    let fieldsObj1 = Object.keys(obj1)
    let fieldsObj2 = Object.keys(obj2)

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
    for (let i = 0; i < fieldsObj1.length; i++) {
        let val1 = fieldsObj1[i];
        let val2 = fieldsObj2[i];
        let areObjects = isObject(val1) && isObject(val2);
        if (!areObjects) {
            if(val1 > val2) {
                return 1;
            }
            else if(val1<val2) {
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

class TreeNode <K,V> {
    key: K;
    value: V;
    left: TreeNode<K, V> | null;
    right: TreeNode<K, V> | null;
    parent: TreeNode<K, V> | null;


    constructor(key: K, value: V, parent: TreeNode<K, V> | null) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = parent;
    }

    equalsKey(obj: TreeNode<K, V>): boolean {
        isEqual(this.key,obj.key);
        return false;
    }

    equalsValue(obj: TreeNode<K, V>): boolean {
        isEqual(this.value,obj.value);
        return false;
    }

    getKey(): K {
        return this.key
    }

    getValue(): V {
        return this.value;
    }

    setValue(value: V) {
        this.value = value;
    }
    public printNode() {
        return "{" + "K:" + this.key + " = " + "V:" + this.value + "P:" + this.parent + "}";
    }
}


let tree : MyTree<number, string> = new MyTree<number, string>();
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