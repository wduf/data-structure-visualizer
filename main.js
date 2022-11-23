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

class BinarySearchTree
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
		const cnt = (!!iter.left + !!iter.right);  // child count for iter
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
			const suc_val = suc.val;
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
}

// TODO:
class MaxHeap
{}

// data structures
const llist = new LinkedList();  // (singly) linkedlist
const stack = new Stack();
const queue = new Queue();
const bst = new BinarySearchTree();
// TODO: add maxHeap, map, graph eventually

// canvas
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
ctx.textAlign = "center";  // align nums in center of their container
const center_x = (cvs.width / 2);  // horizontal center of canvas
const center_y = (cvs.height / 2);  // vertical center of canvas

function drawLinkedList()
{
	const size = llist.size_();
	const scale_x = ((0.95 * cvs.width) / ((3 * size) + 1));  // scale radius based on width
	const scale_y = (cvs.height / 4);  // scale radius based on height
	// take the smaller of the two to ensure all nodes fit
	const rad = Math.min(scale_x, scale_y);  // node radius
	// go through nodes in linkedlist
	for(let i = 0; i < size; i++)
	{
		const x = (center_x + (3 * (i - ((size - 1) / 2)) * rad));  // x value of node
		// if not head
		if(i > 0)
		{
			const left = (x - rad);  // left edge of node
			const arrow = (rad * 0.2);  // offset of arrow head
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
		const val = llist.at(i).val.toString();  // value at node
		const shrink = Math.pow((val.length - (val[0] === '-')), 0.6);  // shrink factor for text
		const font_size = (rad / shrink);
		ctx.font = `${font_size}px Arial`;
		ctx.fillStyle = "red";
		// center text in node
		ctx.fillText(val, x, (center_y + (rad * (0.33 / shrink))));
	}
}

function drawStack()
{
	const size = stack.size();
	const half = (size / 2);
	const height = Math.min((0.2 * cvs.height), ((0.85 * cvs.height) / size)) ;  // height of rectangle
	const width = (4 * height);  // width of rectangle
	// go through all vals in stack
	for(let i = 0; i < size; i++)
	{
		const y = (center_y + ((half - 0.5 - i) * height));  // y value for this element
		// draw rect
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.rect((center_x - (width / 2)), (y - (height / 2)), width, height);
		// draw val
		const val = stack.stack[i].toString();
		const font_size = (height / (1.2 * Math.pow((val.length - (val[0] === '-')), 0.5)));
		ctx.fillStyle = "red";
		ctx.font = `${font_size}px Arial`;
		ctx.fillText(val, center_x, (y + (0.35 * font_size)));  // y offset to center text in node
		ctx.stroke();
	}
}

function drawQueue()
{
	const size = queue.size();
	const half = (size / 2);
	const height = Math.min((0.2 * cvs.height), ((0.85 * cvs.height) / size)) ;  // height of rectangle
	const width = (4 * height);  // width of rectangle
	// go through all vals in queue
	for(let i = 0; i < size; i++)
	{
		const y = (center_y + ((half - 0.5 - i) * height));  // y value for this element
		// draw rect
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.rect((center_x - (width / 2)), (y - (height / 2)), width, height);
		// draw val
		const val = queue.queue[i + queue.first].toString();
		const font_size = (height / (1.2 * Math.pow((val.length - (val[0] === '-')), 0.5)));
		ctx.fillStyle = "red";
		ctx.font = `${font_size}px Arial`;
		ctx.fillText(val, center_x, (y + (0.35 * font_size)));  // y offset to center text in node
		ctx.stroke();
	}
}

function drawBinarySearchTree()
{
	const h = bst.height();  // height of bst
	const scale_x = (cvs.width / (1.65 * Math.pow(2, h)));  // scale rad size based on cvs width
	const scale_y = (cvs.height / (3 * h));  // scale rad size based on cvs height
	// scale based on size of canvas, make sure all nodes fit
	const rad = Math.min(scale_x, scale_y); // node radius

	const f = (node, idx, lvl, width) =>
	{
		// empty node
		if(!node)
		{
			return;
		}
		const x = (center_x + ((idx - ((width - 1) / 2)) * 1.5 * (Math.pow(2, h) / width) * rad));  // x value of node
		const y = (center_y + ((lvl - ((h - 1) / 2)) * 3 * rad));  // y value of node
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
		const val = node.val.toString();
		const shrink = Math.pow((val.length - ((val[0] === '-') ? 1 : 0)), 0.6);  // shrink factor for text
		const font_size = (rad / shrink);
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

// buttons
const llist_button = document.getElementById("linkedlist-button");
const stack_button = document.getElementById("stack-button");
const queue_button = document.getElementById("queue-button");
const bst_button = document.getElementById("bst-button");
// function wrappers
const llist_fcns = document.getElementById("linkedlist-functions");
const stack_fcns = document.getElementById("stack-functions");
const queue_fcns = document.getElementById("queue-functions");
const bst_fcns = document.getElementById("bst-functions");
// inputs
const add_input = document.getElementById("add-input");
const remove_input = document.getElementById("remove-input");
const push_input = document.getElementById("push-input");
const enqueue_input = document.getElementById("enqueue-input");
const insert_input = document.getElementById("insert-input");
const delete_input = document.getElementById("delete-input");

function draw(data_structure)
{
	// clear canvas
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	if(data_structure === "linkedlist")
	{
		// set button borders
		llist_button.style.borderBottom = "none";
		stack_button.style.borderBottom = "1px solid black";
		queue_button.style.borderBottom = "1px solid black";
		bst_button.style.borderBottom = "1px solid black";
		// show functions
		llist_fcns.style.display = "flex";
		stack_fcns.style.display = "none";
		queue_fcns.style.display = "none";
		bst_fcns.style.display = "none";
		drawLinkedList();
	}
	else if(data_structure === "stack")
	{
		// set button borders
		llist_button.style.borderBottom = "1px solid black";
		stack_button.style.borderBottom = "none";
		queue_button.style.borderBottom = "1px solid black";
		bst_button.style.borderBottom = "1px solid black";
		// show functions
		llist_fcns.style.display = "none";
		stack_fcns.style.display = "flex";
		queue_fcns.style.display = "none";
		bst_fcns.style.display = "none";
		drawStack();
	}
	else if(data_structure === "queue")
	{
		// set button borders
		llist_button.style.borderBottom = "1px solid black";
		stack_button.style.borderBottom = "1px solid black";
		queue_button.style.borderBottom = "none";
		bst_button.style.borderBottom = "1px solid black";
		// show functions
		llist_fcns.style.display = "none";
		stack_fcns.style.display = "none";
		queue_fcns.style.display = "flex";
		bst_fcns.style.display = "none";
		drawQueue();
	}
	else if(data_structure === "bst")
	{
		// set button borders
		llist_button.style.borderBottom = "1px solid black";
		stack_button.style.borderBottom = "1px solid black";
		queue_button.style.borderBottom = "1px solid black";
		bst_button.style.borderBottom = "none";
		// show functions
		llist_fcns.style.display = "none";
		stack_fcns.style.display = "none";
		queue_fcns.style.display = "none";
		bst_fcns.style.display = "flex";
		drawBinarySearchTree();
	}
	// ... more data structures to be added
}

function isValidInput(val)
{
	return ((val == parseInt(val)) && (parseInt(val) !== NaN) && (Math.abs(parseInt(val)) < 1001));
}

function addHandler()
{
	const val = add_input.value;
	if(isValidInput(val))
	{
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		llist.add(parseInt(val));
		drawLinkedList();
	}
	add_input.value = "";
}

function removeHandler()
{
	const val = remove_input.value;
	if(isValidInput(val))
	{
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		llist.remove(parseInt(val));
		drawLinkedList();
	}
	remove_input.value = "";
}

function pushHandler()
{
	const val = push_input.value;
	if(isValidInput(val))
	{
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		stack.push(parseInt(val));
		drawStack();
	}
	push_input.value = "";
}

function popHandler()
{
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	stack.pop();
	drawStack();
}

function enqueueHandler()
{
	
	const val = enqueue_input.value;
	if(isValidInput(val))
	{
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		queue.enqueue(parseInt(val));
		drawQueue();
	}
	enqueue_input.value = "";
}

function dequeueHandler()
{
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	queue.dequeue();
	drawQueue();
}

function insertHandler()
{
	const val = insert_input.value;
	if(isValidInput(val))
	{
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		bst.insert(parseInt(val));
		drawBinarySearchTree();
	}
	insert_input.value = "";
}

function deleteHandler()
{
	const val = delete_input.value;
	if(isValidInput(val))
	{
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		bst.delete(parseInt(val));
		drawBinarySearchTree();
	}
	delete_input.value = "";
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