class ListNode
{
	constructor(val, next)
    {
        this.val = val;  // node value
        this.next = next;  // next node
    }
}

class LinkedList
{
	constructor()
	{
		this.root = null;  // root node
		this.tail = null  // tail node
		this.size = 0;  // size of list / count of nodes
	}
	add(val)
	{
		// increase size
		this.size++;
		// if first node
		if(this.size === 1)
		{
			// update root
			this.root = new ListNode(val);
			// update tail -> root
			this.tail = this.root;
			return;
		}
		// add node to end
		this.tail.next = new ListNode(val);
		// advance tail
		this.tail = this.tail.next;
	}
	remove(val)
	{
		// if list empty
		if(this.size === 0)
		{
			return;
		}
		// if removing root
		if(this.root.val === val)
		{
			// if only node in list
			if(this.size === 1)
			{
				// empty list
				this.root = null;
				this.tail = null;
			}
			// more than one node in list
			else
			{
				// advance root
				this.root = this.root.next;
			}
			// decrease size
			this.size--;
			return;
		}
		let iter = this.root;  // iterator
		let prev = iter;  // node before iter
		while(iter)
		{
			// if val found
			if(iter.val === val)
			{
				// skip over iter
				prev.next = iter.next;
				// decrease size
				this.size--;
				return;
			}
			// update prev
			prev = iter;
			// advance iter
			iter = iter.next;
		}
	}
	// size is a built-in
	at(idx)
	{
		// if idx is out of range
		if(idx >= this.size)
		{
			return -1;
		}
		let iter = this.root;  // iterator
		for(let i = 0; iter; i++)
		{
			// if node @ idx reached
			if(i === idx)
			{
				// return it
				return iter;
			}
			// advance iter
			iter = iter.next;
		}
	}
}

class Stack
{
	constructor()
	{
		this.stack = [];
	}
	push(val)
	{
		this.stack.push(val);
	}
	pop()
	{
		this.stack.pop();
	}
	size()
	{
		return this.stack.length;
	}
}

class Queue
{
	constructor()
	{
		this.queue = [];
		// NOTE: using first and last instead of shift()/unshift() for O(1) enqueue()/dequeue()
		this.first = 0;  // index of first item in queue
		this.last = 0;  // index past last item in queue
	}
	enqueue(val)
	{
		// add to end
		this.queue[this.last] = val;
		// update last
		this.last++;
	}
	dequeue()
	{
		// if queue not empty
		if(this.last > this.first)
		{
			// update first
			this.first++;
		}
	}
	size()
	{
		return (this.last - this.first);
	}
}

class TreeNode
{
	constructor(val, left, right)
	{
		this.val = val;  // node value
		this.left = left;  // left child
		this.right = right;  // right child
	}
}

class BST
{
	constructor()
	{
		this.root = null;  // root node
		this.size = 0;  // # of nodes
		this.arr = [];  // array representation of bst (identical to standard heap representation), starts @ idx 1
	}
	insert(val)
	{
		// if empty
		if(!this.root)
		{
			// add to root
			this.root = new TreeNode(val);
			// add to arr
			this.arr[1] = val;
			// increment size
			this.size++;
			return;
		}
		// NOTE: need node and int b/c we have to update the node and array
		let iter = this.root;  // iterator
		let prev = iter;  // node before iter
		let i = 1;  // index in arr
		while(iter)
		{
			// update prev
			prev = iter;
			// if val already in tree
			if(val === iter.val)
			{
				// don't add it, duplicates not allowed
				return;
			}
			// update i
			i *= 2;
			// if val greater than iter val
			if(val > iter.val)
			{
				// right child
				iter = iter.right;
				i++;
			}
			// if val less than iter val
			else
			{
				// left child
				iter = iter.left;
			}
		}
		// increment size
		this.size++;
		// if val greater than prev val
		if(val > prev.val)
		{
			// prev right child = new node
			prev.right = new TreeNode(val);
		}
		// if val less than prev val
		else
		{
			// prev left child = new node
			prev.left = new TreeNode(val);
		}
		// add to arr
		this.arr[i] = val;
	}
	delete(val)
	{
		let iter = this.root;  // iterator
		let prev = iter;  // node before iter
		let i = 1;  // idx in arr
		while(iter)
		{
			// if node found
			if(iter.val === val)
			{
				break;
			}
			// update prev
			prev = iter;
			// update i
			i *= 2;
			// if val greater than iter val
			if(val > iter.val)
			{
				i++;
				iter = iter.right;
			}
			// if val less than iter val
			else
			{
				iter = iter.left;
			}
		}
		// if node not found
		if(!iter)
		{
			return;
		}
		// node found @ iter
		const cnt = ((iter.left) + (iter.right));  // child cound for iter
		// if no children
		if(cnt === 0)
		{
			// decrement size
			this.size--;
			// if root with no children		
			if(val === this.root.val)
			{
				// delete root
				this.root = null;
			}
			// if prev left child
			else if(val < prev.val)
			{
				// delete left child
				prev.left = null;
			}
			// if prev right child
			else
			{
				// delete right child
				prev.right = null;
			}
			// TODO: if last item in array, splice to previous item in array, do this for all deletes
			//* NOTE: if you assign length to 4, it will truncate everything past first 5 nums, use this instead
			//* once this is done, update all instances where this is used and this matters
			// delete from arr
			this.arr[i] = null;
			return;
		}
		// if 1 child
		if(cnt === 1)
		{
			// decrement size
			this.size--;
			// if left child
			if(iter.left)
			{
				// replace this node with left child
				iter.val = iter.left.val;
				iter.left = iter.left.left;
				iter.right = iter.left.right;
				// delete left child
				iter.left = null;
				// delete from arr
				this.arr[i] = this.arr[2 * i];
				this.arr[2 * i] = null;
			}
			// if right child
			else
			{
				// replace this node with right child
				iter.val = iter.right.val;
				iter.left = iter.right.left;
				iter.right = iter.right.right;
				// delete right child
				iter.right = null;
				// delete from arr
				this.arr[i] = this.arr[(2 * i) + 1];
				this.arr[(2 * i) + 1] = null;
			}
		}
		// if 2 children
		if(cnt === 2)
		{
			prev = iter;
			let succ = iter.right;  // inorder successor
			let j = ((2 * i) + 1);  // idx of right child in arr
			// one right, all the way left
			while(succ.left)
			{
				prev = succ;
				succ = succ.left;
				j *= 2;
			}
			const succ_val = succ.val;  // inorder successor val
			// update arr
			this.arr[i] = this.arr[j];
			// delete succ
			this.delete(succ_val);
			// set iter val to succ val
			iter.val = succ_val;
		}
	}
	height()
	{
		// if root null
		if(!this.root)
		{
			return 0;
		}
		// search backwards in arr for first non-null/undefined/empty val and use that to calculate height
		let last = (this.arr.length - 1);  // index of last value in arr
		for(; ((this.arr[last] != 0) && !this.arr[last]); last--);
		return (Math.floor(Math.log2(last)) + 1);
	}

}

// data structures
const list = new LinkedList();  // (singly) linkedlist
const stack = new Stack();  // stack
const queue = new Queue();  // queue
const bst = new BST();  // binary search tree
// TODO: const heap = new Heap();  // heap
// TODO: const map = new Map();  // dictionary/hashmap/map/symbol table

// canvas
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
ctx.fillStyle = "red";
ctx.textAlign = "center";

function drawLinkedList()
{
	const size = list.size;
	const scale_x = (cvs.width / ((2 * size) + (size + 1)));  // scale based on width of canvas
	const scale_y = (cvs.height / ((2 * size) + (size + 1)));  // scale based on height of canvas
	// take the smaller of the two to ensure all nodes will fit
	const rad = Math.min(scale_x, scale_y);  // node radius
	const y = (cvs.height / 2);  // y value, horizontal line in center
	for(let i = 0; i < size; i++)
	{
		const x = ((i + 1) * rad) + ((1 + (i * 2)) * rad);  // x value of current node
		// if more than one node
		if(i > 0)
		{
			const left = (x - rad);  // left side of current node
			const arrow = (rad * 0.2);  // offset of arrow root
			// draw line between this and the previous node
			ctx.beginPath();
			ctx.moveTo((left - rad), y);
			ctx.lineTo(left, y);
			ctx.stroke();
			// draw triangle at end of arrow
			ctx.beginPath();
			ctx.moveTo(left, y);
			ctx.lineTo((left - arrow), (y - arrow));
			ctx.lineTo((left - arrow), (y + arrow));
			ctx.closePath();
			ctx.fillStyle = "black";
			ctx.fill();

		}
		// draw node
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.arc(x, y, rad, 0, (Math.PI * 2));
		// draw val
		const val = list.at(i).val.toString();  // value @ node @ i
		const shrink = Math.pow((val.length - ((val[0] === '-') ? 1 : 0)), 0.6);  // shrink factor for text
		const font_size = (rad / shrink);
		ctx.font = `${font_size}px Arial`;  // use rad as font size
		ctx.fillStyle = "blue";
		ctx.fillText(val, x, (y + (rad * (0.33 / shrink))));  // y offset to center text in node
		ctx.stroke();
	}
}

function drawStack()
{
	const size = stack.size();
	const half = (size / 2);
	// TODO: eventually set height to sin and cos, inscribed in a circle w/ diameter 0.9 * width/height
	// scale rectangle height based on how many items in stack
	// NOTE: does not work if very thin canvas
	let height = Math.min((0.18 * cvs.height), ((0.8 * cvs.height) / size)) ;  // height of rectangle
	const width = 4 * height;  // width of rectangle
	const x = (cvs.width / 2);  // x value, vertical line in center
	const center_y = (cvs.height / 2);
	for(let i = 0; i < size; i++)
	{
		const y = (center_y + ((half - 0.5 - i) * height));  // y value for this element
		// draw element
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.rect((x - (width / 2)), (y - (height / 2)), width, height);
		// draw val
		const val = stack.stack[i].toString();
		const font_size = (height / (1.2 * Math.pow((val.length - ((val[0] === '-') ? 1 : 0)), 0.5)));
		ctx.fillStyle = "blue";
		ctx.font = `${font_size}px Arial`;
		ctx.fillText(val, x, (y + (0.35 * font_size)));  // y offset to center text in node
		ctx.stroke();
	}
}

function drawQueue()
{
	const size = queue.size();
	const half = (size / 2);
	// TODO: eventually set height to sin and cos, inscribed in a circle w/ diameter 0.9 * width/height
	// scale rectangle height based on how many items in queue
	let height = Math.min((0.18 * cvs.height), ((0.8 * cvs.height) / size)) ;  // height of rectangle
	const width = 4 * height;  // width of rectangle
	const x = (cvs.width / 2);  // x value, vertical line in center
	const center_y = (cvs.height / 2);
	for(let i = 0; i < size; i++)
	{
		const y = (center_y + ((half - 0.5 - i) * height));  // y value for this element
		// draw element
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.rect((x - (width / 2)), (y - (height / 2)), width, height);
		// draw val
		const val = stack.stack[i].toString();
		const font_size = (height / (1.2 * Math.pow((val.length - ((val[0] === '-') ? 1 : 0)), 0.5)));
		ctx.fillStyle = "blue";
		ctx.font = `${font_size}px Arial`;
		ctx.fillText(val, x, (y + (0.35 * font_size)));  // y offset to center text in node
		ctx.stroke();
	}
}

function drawBST()
{
	const h = bst.height();  // bst height
	if(h === 0)
	{
		return;
	}
	const scale_x = (cvs.width / (2 * Math.pow(2, h)));
	const scale_y = (cvs.height / (2 * h));
	// scale based on size of canvas, make sure all nodes fit
	const rad = Math.min(scale_x, scale_y); // node radius
	const center_x = (cvs.width / 2);
	const center_y = (cvs.height / 2);
	// TODO: when sizing up, use scale_x, scale_y
	let lvl = 0;  // curr level
	let width = 1;  // how many nodes on this level
	// 0 is null
	for(let i = 1; i < bst.arr.length; i++)
	{
		// if end of level reached
		if(i === (2 * width))
		{
			// move down a level
			lvl++;
			width *= 2;
		}
		const curr = i - width;
		if((bst.arr[i] != 0) && !bst.arr[i])
		{
			continue;
		}
		// draw node
		const y = (center_y + ((lvl - ((h - 1) / 2)) * 3 * rad));
		const x = (center_x + ((curr - ((width - 1) / 2)) * 1.5  * (Math.pow(2, h) / width) * rad));
		ctx.beginPath();
		ctx.arc(x, y, rad, 0, (2 * Math.PI));
		ctx.strokeStyle = "black";
		ctx.stroke();
		// TODO: draw numbers w/ tens accounted for, could just convert to string and do string length (see if this fixes rounding?)
		// TODO: lines between nodes: could use sin, cos to go 45% up the perimeter of the circle
		// draw node
		ctx.beginPath();
		ctx.moveTo(x, (y - rad));
		if(i > 1)
		{
			// draw line
			ctx.lineTo((x + (0.75 * (Math.pow(2, (h - lvl))) * ((curr % 2 === 0) ? rad : -rad))), (y - (2 * rad)));
			ctx.strokeStyle = "black";
			ctx.stroke();
		}
		// draw val
		const val = bst.arr[i].toString();  // value @ node @ i
		const shrink = Math.pow((val.length - ((val[0] === '-') ? 1 : 0)), 0.6);  // shrink factor for text
		const font_size = (rad / shrink);
		ctx.font = `${font_size}px Arial`;  // use rad as font size
		ctx.fillStyle = "blue";
		ctx.fillText(val, x, (y + (rad * (0.33 / shrink))));  // y offset to center text in node
		ctx.stroke();
	}
}

function update()
{
	// drawLinkedList();
	drawStack();
	// drawQueue();
	// drawBST();
	// TODO: eventually replace fps system with update() call every time something is added/removed
}

const LL_fcns = document.getElementById("linkedlist-functions")

draw(data_structure)
{
	// clear canvas
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	if()
}