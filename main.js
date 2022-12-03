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
		this.head = null;  // first node in linkedlist
		this.tail = null;  // last node in linkedlist
		this.size = 0;  // # of nodes in linkedlist
	}

	add(val)
	{
		this.size++;
		// if first node
		if(this.size === 1)
		{
			// set head and tail to new node
			this.head = new ListNode(val);
			this.tail = this.head;
		}
		// not first node
		else
		{
			// add node to end
			this.tail.next = new ListNode(val);
			this.tail = this.tail.next;
		}
	}

	remove(val)
	{
		// if linkedlist empty
		if(!this.head)
		{
			return;
		}
		// if removing head
		if(this.head.val === val)
		{
			// if only node in linkedlist
			if(this.size === 1)
			{
				// empty list
				this.head = null;
				this.tail = null;
			}
			// more than one node in linkedlist
			else
			{
				// advance head
				this.head = this.head.next;
			}
			this.size--;
		}
		// removing node that isn't head or not in linkedlist
		else
		{
			let iter = this.head;  // iterator
			let prev = iter;  // previous node
			// go through all nodes in linkedlist
			while(iter)
			{
				// if val found
				if(iter.val === val)
				{
					// skip iter
					prev.next = iter.next;
					this.size--;
					return
				}
				prev = iter;
				iter = iter.next;
			}
		}
	}

	at(idx)
	{
		// if idx out of range
		if(idx >= this.size)
		{
			return -1;
		}
		let iter = this.head;
		// find node @ idx
		for(let i = 0; iter; i++)
		{
			// node @ idx
			if(i === idx)
			{
				return iter;
			}
			iter = iter.next;
		}
	}

	size_()
	{
		return this.size;
	}

	empty()
	{
		this.head = null;
		this.tail = null;
		this.size = 0;
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

	empty()
	{
		this.stack.length = 0;
	}
}

class Queue
{
	constructor()
	{
		this.queue = [];
		// NOTE: using first and last index instead of shift() and unshift() for o(1) enqueue() and dequeue()
		this.first = 0;  // index of first num in queue
		this.last = 0;  // index of last num in queue
	}

	enqueue(val)
	{
		// add to end
		this.queue[this.last] = val;
		this.last++;
	}

	dequeue()
	{
		// if queue not empty
		if(this.last > this.first)
		{
			this.first++;
		}
	}

	size()
	{
		return (this.last - this.first);
	}

	empty()
	{
		this.queue.length = 0;
		this.first = 0;
		this.last = 0;
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
		this.root = null;  // root node of tree
	}

	insert(val)
	{
		// if tree empty
		if(!this.root)
		{
			// set root
			this.root = new TreeNode(val);
		}
		// tree not empty
		else
		{
			let iter = this.root;  // iterator
			let prev = iter;  // previous/parent node
			while(iter)
			{
				// if duplicate val (not allowed)
				if(val === iter.val)
				{
					return;
				}
				prev = iter;
				// set to left/right child
				iter = ((val < iter.val) ? iter.left : iter.right);
			}
			// insert left child
			if(val < prev.val)
			{
				prev.left = new TreeNode(val);
			}
			// insert right child
			else
			{
				prev.right = new TreeNode(val);
			}
		}
	}

	delete(val)
	{
		let iter = this.root;  // iterator
		let prev = iter;  // previous node
		// while iter not null and iter val not equal to val
		while(iter && (iter.val !== val))
		{
			prev = iter;
			// set to left/right child
			iter = ((val < iter.val) ? iter.left : iter.right);
		}
		// node not in tree
		if(!iter)
		{
			return;
		}
		let cnt = (!!iter.left + !!iter.right);  // child count for iter
		// no children
		if(cnt === 0)
		{
			// delete root with no children
			if(iter === this.root)
			{
				this.root = null;
			}
			// delete prev left child
			else if(val < prev.val)
			{
				prev.left = null;
			}
			// delete right child
			else
			{
				prev.right = null;
			}
		}
		// 1 child
		else if(cnt === 1)
		{
			// replace root
			if(val === this.root.val)
			{
				this.root = (this.root.left ? this.root.left : this.root.right);
			}
			// left child
			else if(val < prev.val)
			{
				// skip over left child
				prev.left = (iter.left ? iter.left : iter.right);
			}
			// right child
			else
			{
				// skip over right child
				prev.right = (iter.left ? iter.left : iter.right);
			}
		}
		// 2 children
		else
		{
			// prev stays the parent node
			prev = iter;
			let suc = iter.right;  // inorder successor of iter
			// one right, all the way left
			while(suc.left)
			{
				prev = suc;
				suc = suc.left;
			}
			let suc_val = suc.val;
			// recursively delete suc val
			this.delete(suc_val);
			// set iter val to (now deleted) suc val
			iter.val = suc_val;
		}
	}

	height()
	{
		const f = (node) =>
		{
			if(!node)
			{
				return 0;
			}
			// return max height between left and right child
			return Math.max((1 + f(node.left)), (1 + f(node.right)));
		}

		return f(this.root);
	}

	empty()
	{
		this.root = null;
	}
}

class MaxHeap
{
	constructor()
	{
		this.arr = [null];  // array to store node vals (standard)
		this.last = 0;  // index of last node
	}

	swap(i, j)
	{
		let tmp = this.arr[i];
		this.arr[i] = this.arr[j];
		this.arr[j] = tmp;
	}

	insert(val)
	{
		this.last++;
		this.arr[this.last] = val;

		const swim = (idx) =>
		{
			// swam to top
			if(idx == 1)
			{
				return;
			}
			let p = Math.floor(idx / 2);  // parent idx
			// parent larger
			if(this.arr[idx] >= this.arr[p])
			{
				// swim up
				this.swap(idx, p);
				return swim(p);
			}
		}

		swim(this.last);
	}

	delete()
	{
		// empty, can't remove anything
		if(this.last == 0)
		{
			return;
		}
		// only root, delete it
		if(this.last == 1)
		{
			this.arr.length = 1;
			this.last = 0;
			return;
		}
		// switch with last, remove old root
		this.swap(1, this.last);
		this.last--;

		const sink = (idx) =>
		{
			let cur = this.arr[idx];  // current val
			let j = (idx * 2);  // child index
			let l = ((j <= this.last) ? this.arr[j] : cur);  // left child
			let r = (((j + 1) <= this.last) ? this.arr[j + 1] : cur);  // right child
			// both greater, sink towards larger child
			if((l > cur) && (r > cur))
			{
				if(l >= r)
				{
					this.swap(idx, j);
					return sink(j);
				}
				this.swap(idx, (j + 1));
				return sink(j + 1);
			}
			// one greater, sink towards that one
			if((l > cur) || (r > cur))
			{
				if(l > cur)
				{
					this.swap(idx, j);
					return sink(j);
				}
				this.swap(idx, (j + 1));
				sink(j + 1);
			}
		}

		// sink root
		sink(1);
	}

	height()
	{
		return (this.last ? (Math.floor(Math.log2(this.last)) + 1) : 0);
	}

	empty()
	{
		this.arr.length = 1;
		this.last = 0;
	}
}

// data structures
let llist = new LinkedList();  // (singly) linkedlist
let stack = new Stack();
let queue = new Queue();
let bst = new BST();
let heap = new MaxHeap();
// TODO: add map, graph eventually

// canvas
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
ctx.textAlign = "center";  // align nums in center of their container
let center_x = (cvs.width / 2);  // horizontal center of canvas
let center_y = (cvs.height / 2);  // vertical center of canvas

function drawLinkedList()
{
	let size = llist.size_();
	let scale_x = ((0.95 * cvs.width) / ((3 * size) + 1));  // scale radius based on width
	let scale_y = (cvs.height / 4);  // scale radius based on height
	// take the smaller of the two to ensure all nodes fit
	let rad = Math.min(scale_x, scale_y);  // node radius
	// go through nodes in linkedlist
	for(let i = 0; i < size; i++)
	{
		let x = (center_x + (3 * (i - ((size - 1) / 2)) * rad));  // x value of node
		// if not head
		if(i > 0)
		{
			let left = (x - rad);  // left edge of node
			let arrow = (rad * 0.2);  // offset of arrow head
			// draw arrow line
			ctx.beginPath();
			ctx.moveTo((left - rad), center_y);
			ctx.lineTo(left, center_y);
			ctx.strokeStyle = "black";
			ctx.stroke();
			// draw arrow head
			ctx.beginPath();
			ctx.moveTo(left, center_y);
			ctx.lineTo((left - arrow), (center_y - arrow));
			ctx.lineTo((left - arrow), (center_y + arrow));
			ctx.closePath();
			ctx.fillStyle = "black";
			ctx.fill();
		}
		// draw node
		ctx.beginPath()
		ctx.arc(x, center_y, rad, 0, (Math.PI * 2));
		ctx.strokeStyle = "black";
		ctx.stroke();
		// draw val
		let val = llist.at(i).val.toString();  // value at node
		let shrink = Math.pow((val.length - (val[0] === '-')), 0.6);  // shrink factor for text
		let font_size = (rad / shrink);
		ctx.font = `${font_size}px Arial`;
		ctx.fillStyle = "red";
		// center text in node
		ctx.fillText(val, x, (center_y + (rad * (0.33 / shrink))));
	}
}

function drawStack()
{
	let size = stack.size();
	let half = (size / 2);
	let height = Math.min((0.2 * cvs.height), ((0.85 * cvs.height) / size)) ;  // height of rectangle
	let width = (4 * height);  // width of rectangle
	// go through all vals in stack
	for(let i = 0; i < size; i++)
	{
		let y = (center_y + ((half - 0.5 - i) * height));  // y value for this element
		// draw rect
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.rect((center_x - (width / 2)), (y - (height / 2)), width, height);
		// draw val
		let val = stack.stack[i].toString();
		let font_size = (height / (1.2 * Math.pow((val.length - (val[0] === '-')), 0.5)));
		ctx.fillStyle = "red";
		ctx.font = `${font_size}px Arial`;
		ctx.fillText(val, center_x, (y + (0.35 * font_size)));  // y offset to center text in node
		ctx.stroke();
	}
}

function drawQueue()
{
	let size = queue.size();
	let half = (size / 2);
	let height = Math.min((0.2 * cvs.height), ((0.85 * cvs.height) / size)) ;  // height of rectangle
	let width = (4 * height);  // width of rectangle
	// go through all vals in queue
	for(let i = 0; i < size; i++)
	{
		let y = (center_y + ((half - 0.5 - i) * height));  // y value for this element
		// draw rect
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.rect((center_x - (width / 2)), (y - (height / 2)), width, height);
		// draw val
		let val = queue.queue[i + queue.first].toString();
		let font_size = (height / (1.2 * Math.pow((val.length - (val[0] === '-')), 0.5)));
		ctx.fillStyle = "red";
		ctx.font = `${font_size}px Arial`;
		ctx.fillText(val, center_x, (y + (0.35 * font_size)));  // y offset to center text in node
		ctx.stroke();
	}
}

function drawBST()
{
	let h = bst.height();  // height of bst
	let scale_x = (cvs.width / (1.65 * Math.pow(2, h)));  // scale rad size based on cvs width
	let scale_y = (cvs.height / (3 * h));  // scale rad size based on cvs height
	// scale based on size of canvas, make sure all nodes fit
	let rad = Math.min(scale_x, scale_y); // node radius

	const f = (node, idx, lvl, width) =>
	{
		// empty node
		if(!node)
		{
			return;
		}
		let x = (center_x + ((idx - ((width - 1) / 2)) * 1.5 * (Math.pow(2, h) / width) * rad));  // x value of node
		let y = (center_y + ((lvl - ((h - 1) / 2)) * 3 * rad));  // y value of node
		// draw outline
		ctx.beginPath();
		ctx.arc(x, y, rad, 0, (2 * Math.PI));
		ctx.strokeStyle = "black";
		ctx.stroke();
		// draw arrow (if not root)
		if(lvl > 0)
		{
			// draw line
			ctx.beginPath();
			ctx.moveTo(x, (y - rad));
			ctx.lineTo((x + (0.75 * (Math.pow(2, (h - lvl))) * ((idx % 2 === 0) ? rad : -rad))), (y - (2 * rad)));
			ctx.strokeStyle = "black";
			ctx.stroke();
		}
		// draw val
		let val = node.val.toString();
		let shrink = Math.pow((val.length - (val[0] === '-')), 0.6);  // shrink factor for text
		let font_size = (rad / shrink);
		ctx.font = `${font_size}px Arial`;  // use rad as font size
		ctx.fillStyle = "red";
		ctx.fillText(val, x, (y + (rad * (0.33 / shrink))));  // y offset to center text in node
		ctx.stroke();
		// run on both children
		idx *= 2;
		lvl++;
		width *= 2;
		f(node.left, idx, lvl, width);
		f(node.right, (idx + 1), lvl, width);
	}

	f(bst.root, 0, 0, 1);
}

function drawMaxHeap()
{
	let h = heap.height();  // height of bst
	let scale_x = (cvs.width / (1.65 * Math.pow(2, h)));  // scale rad size based on cvs width
	let scale_y = (cvs.height / (3 * h));  // scale rad size based on cvs height
	// scale based on size of canvas, make sure all nodes fit
	let rad = Math.min(scale_x, scale_y); // node radius
	let width = 1;  // width of current level
	let lvl = 0;
	for(let i = 1; i <= heap.last; i++)
	{
		// new level
		if(i == (2 * width))
		{
			lvl++;
			width *= 2;
		}
		let x = (center_x + ((i - (((3 * width) - 1) / 2)) * 1.5 * (Math.pow(2, h) / width) * rad));  // x value of node
		let y = (center_y + ((lvl - ((h - 1) / 2)) * 3 * rad));  // y value of node
		ctx.beginPath();
		ctx.arc(x, y, rad, 0, (2 * Math.PI));
		ctx.strokeStyle = "black";
		ctx.stroke();
		// draw arrow (if not root)
		if(lvl > 0)
		{
			// draw line
			ctx.beginPath();
			ctx.moveTo(x, (y - rad));
			ctx.lineTo((x + (0.75 * (Math.pow(2, (h - lvl))) * ((i % 2 === 0) ? rad : -rad))), (y - (2 * rad)));
			ctx.strokeStyle = "black";
			ctx.stroke();
		}
		// draw val
		let val = heap.arr[i].toString();
		let shrink = Math.pow((val.length - (val[0] === '-')), 0.6);  // shrink factor for text
		let font_size = (rad / shrink);
		ctx.font = `${font_size}px Arial`;  // use rad as font size
		ctx.fillStyle = "red";
		ctx.fillText(val, x, (y + (rad * (0.33 / shrink))));  // y offset to center text in node
		ctx.stroke();
	}
}

// buttons
let llist_button = document.getElementById("llist-button");
let stack_button = document.getElementById("stack-button");
let queue_button = document.getElementById("queue-button");
let bst_button = document.getElementById("bst-button");
let heap_button = document.getElementById("heap-button");

// function wrappers
let llist_fcns = document.getElementById("llist-functions");
let stack_fcns = document.getElementById("stack-functions");
let queue_fcns = document.getElementById("queue-functions");
let bst_fcns = document.getElementById("bst-functions");
let heap_fcns = document.getElementById("heap-functions");

// inputs
let llist_add_input = document.getElementById("llist-add-input");
let llist_remove_input = document.getElementById("llist-remove-input");
let stack_push_input = document.getElementById("stack-push-input");
let queue_enqueue_input = document.getElementById("queue-enqueue-input");
let bst_insert_input = document.getElementById("bst-insert-input");
let bst_delete_input = document.getElementById("bst-delete-input");
let heap_insert_input = document.getElementById("heap-insert-input");

function draw(ds)
{
	// clear canvas
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	// reset button borders
	llist_button.style.borderBottom = "1px solid black";
	stack_button.style.borderBottom = "1px solid black";
	queue_button.style.borderBottom = "1px solid black";
	bst_button.style.borderBottom = "1px solid black";
	heap_button.style.borderBottom = "1px solid black";
	// hide functions
	llist_fcns.style.display = "none";
	stack_fcns.style.display = "none";
	queue_fcns.style.display = "none";
	bst_fcns.style.display = "none";
	heap_fcns.style.display = "none";
	// enable given data structure
	switch(ds)
	{
		case "llist":
			llist_button.style.borderBottom = "none";
			llist_fcns.style.display = "flex";
			drawLinkedList();
			break;
		case "stack":
			stack_button.style.borderBottom = "none";
			stack_fcns.style.display = "flex";
			drawStack();
			break;
		case "queue":
			queue_button.style.borderBottom = "none";
			queue_fcns.style.display = "flex";
			drawQueue();
			break;
		case "bst":
			bst_button.style.borderBottom = "none";
			bst_fcns.style.display = "flex";
			drawBST();
			break;
		case "heap":
			heap_button.style.borderBottom = "none";
			heap_fcns.style.display = "flex";
			drawMaxHeap();
			break;
	}
	// ... more data structures to be added
}

function isValidInput(val)
{
	return ((val == parseInt(val)) && (parseInt(val) !== NaN) && (Math.abs(parseInt(val)) < 1001));
}

function LListAddHandler(e)
{
	if(!e || (e.key === "Enter"))
	{
		let val = llist_add_input.value;
		if(isValidInput(val))
		{
			ctx.clearRect(0, 0, cvs.width, cvs.height);
			llist.add(parseInt(val));
			drawLinkedList();
		}
		llist_add_input.value = "";
	}
}

function LListRemoveHandler(e)
{
	if(!e || (e.key === "Enter"))
	{
		let val = llist_remove_input.value;
		if(isValidInput(val))
		{
			ctx.clearRect(0, 0, cvs.width, cvs.height);
			llist.remove(parseInt(val));
			drawLinkedList();
		}
		llist_remove_input.value = "";
	}
}

function stackPushHandler(e)
{
	if(!e || (e.key === "Enter"))
	{
		let val = stack_push_input.value;
		if(isValidInput(val))
		{
			ctx.clearRect(0, 0, cvs.width, cvs.height);
			stack.push(parseInt(val));
			drawStack();
		}
		stack_push_input.value = "";
	}
}

function stackPopHandler()
{
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	stack.pop();
	drawStack();
}

function queueEnqueueHandler(e)
{
	if(!e || (e.key === "Enter"))
	{
		let val = queue_enqueue_input.value;
		if(isValidInput(val))
		{
			ctx.clearRect(0, 0, cvs.width, cvs.height);
			queue.enqueue(parseInt(val));
			drawQueue();
		}
		queue_enqueue_input.value = "";
	}
}

function queueDequeueHandler()
{
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	queue.dequeue();
	drawQueue();
}

function BSTInsertHandler(e)
{
	if(!e || (e.key === "Enter"))
	{
		let val = bst_insert_input.value;
		if(isValidInput(val))
		{
			ctx.clearRect(0, 0, cvs.width, cvs.height);
			bst.insert(parseInt(val));
			drawBST();
		}
		bst_insert_input.value = "";
	}
}

function BSTDeleteHandler(e)
{
	if(!e || (e.key === "Enter"))
	{
		let val = bst_delete_input.value;
		if(isValidInput(val))
		{
			ctx.clearRect(0, 0, cvs.width, cvs.height);
			bst.delete(parseInt(val));
			drawBST();
		}
		bst_delete_input.value = "";
	}
}

function heapInsertHandler(e)
{
	if(!e || (e.key === "Enter"))
	{
		let val = heap_insert_input.value;
		if(isValidInput(val))
		{
			ctx.clearRect(0, 0, cvs.width, cvs.height);
			heap.insert(parseInt(val));
			drawMaxHeap();
		}
		heap_insert_input.value = "";
	}
}

function heapDeleteHandler()
{
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	heap.delete();
	drawMaxHeap();
}

function resetHandler(ds)
{
	switch(ds)
	{
		case "llist":
			llist.empty();
			break;
		case "stack":
			stack.empty();
			break;
		case "queue":
			queue.empty();
			break;
		case "bst":
			bst.empty();
			break;
		case "heap":
			heap.empty();
			break;
	}
	draw(ds);
}

function openSourceCode()
{
	window.open("https://github.com/wduf/interactive-data-structure-visualizer/tree/stable")
}

// on load
alert(
`Hi!

Thanks for using my Interactive Data Structure Visualizer. I work on this when I have free time, so updates might be a little slow. I will add more features, data structures, and quality of life changes in the future.

Numbers can be between -1000 and 1000 (inclusive).`);