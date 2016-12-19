
var myItcast = {
	getDomById:function (id,results){
	  var results = results || [];
		results.push(document.getElementById(id));
		return results;
	},
	getDomByClass:function (cla,context,results){
		// 利用ssport里边的getElementsByClaName方法判断兼容性
	  var	results = results || [];
	  var	context = context || document;
		if(this.support.getElementsByClaName()){
			results.push.apply(results,context.getElementsByClassName(cla));
		}else{
			var nodes = document.getElementsByTagName('*');
			this.each(nodes,function (){
				var claName = ' '+this.className+' ';
				if(claName.indexOf(' '+cla+' ') > -1){
					results.push(this);
				}
			});
		}
		return results;
	},
	getDomByTag:function (tag,context,results){
	  var	results = results || [];
	  var	context = context || document;
		results.push.apply(results,context.getElementsByTagName(tag));
		return results;
	},
	get:function (selector,context,results){
	    var	results = results || [];
    	var	context  = context || document;
		var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([a-zA-Z-]+)|(\*))$/;
		var m = rquickExpr.exec(selector);
		if(typeof context === 'string'){
			context = this.get(context);
		}
		if(context.nodeType){
			context = [context];
		}
		if(m){
		var that = this;
		this.each(context,function (){
			if(m[1]){
				results.push.apply(results,that.getDomById(m[1]));
			}else if(m[2]){
				results.push.apply(results,that.getDomByClass(m[2],this));
			}else{
				results.push.apply(results,that.getDomByTag(m[3] || m[4],this));
			}
		});
		}
		return results;
	},
	each:function (arr,callback){
		for(var i=0;i<arr.length;i++){
			if(callback.apply(arr[i],[arr[i],i]) === false){
				break;
			};
		}
	},
	addClass:function (){},
	removeClass:function (){},
	//添加样式方法
	css:function (dom,obj){
		this.each(dom,function (value){
			for(var k in obj){
				value.style[k] = obj[k];
			}
		});
	},
	//获取元素属性方法
	getAttr:function (dom,attr){
		var attrArr = [];
		var temp = null;
		this.each(dom,function (){
			if(this.currentStyle){
				temp = this.currentStyle[attr];
			}else{
				temp = getComputedStyle(this)[attr];
			}
			attrArr.push(temp);
		});
		return attrArr;
	},
	//判断兼容性对象属性
	support:{
		rnative:/^[^{]+\{\s*\[native \w/,
		getElementsByClaName:function (){
			return this.rnative.test(document.getElementsByClassName);
		}
	},
	//实现并集选择器
	select:function (selector,context,results){
	  var	results = results || [];
	  var	context = context || document;
		var singleSelectors = selector.split(',');
		var that = this;
		this.each(singleSelectors,function (){
		// 	results.push.apply(results,that.get(this.trim()));
		// });
		var c = context;
			that.each(this.split(" "),function (){
				// c = that.get(this.trim(),c);
				c = myItcast.get(this.trim(),c);
		});
			results.push.apply(results,c);
			});
		return results;
	},
	//往节点里添加元素方法
	cElment:function (htmlStr){
		var dfr = document.createDocumentFragment();
		var dv = document.createElement('div');
		dv.innerHTML = htmlStr;
		while(dv.firstChild){
			dfr.appendChild(dv.firstChild);
		}
		return dfr;
	}
}
;
(function (win){
	var itcast = function (selector){
		return new itcast.prototype.init(selector);
	}
	itcast.Select = myItcast.select;
	itcast.fn = itcast.prototype = {
		constructor:itcast,
		init:function (selector){
			if(selector.charAt(0) === '<'){
				// return myItcast.cElment(selector);
				this.element = myItcast.cElment(selector);
				// return [].push.apply(this,myItcast.cElment(selector));
			}else{
				// return myItcast.select(selector)
				this.elementDom = itcast.Select(selector);
			}
		}
	}
	
	//给itcast添加静态extend方法
	itcast.fn.extend = itcast.extend = function (obj){
		for(var k in obj){
			this[k] = obj[k];
		}
	};
//实现静态extend方法
	itcast.extend({
		each:function (arr,callback){
				for(var i=0;i<arr.length;i++){
				if(callback.apply(arr[i],[arr[i],i]) === false){
					break;
			};
		}
		}
	});
	//实现实例extend方法
	itcast.fn.extend({
		each:function (callback){
			if(this.elementDom){
			itcast.each(this.elementDom,callback);
			}
			return this;
		}
	});
	// itcast.extend({
	// 	sayHi:function (){
	// 		console.log(11);
	// 	}
	// })
	//把appendto添加进fn里
	itcast.fn.extend({
		appendTo:function (node){
			var dom = itcast(node);
			var that = this;
			itcast.each(dom.elementDom,function (){
				this.appendChild(that.element.cloneNode(true));
			});
			return dom;
		}
	});
	// 把prependto添加进fn里
	itcast.fn.extend({
		prependTo:function (node){
			var dom = itcast(node);
			var that = this;
			itcast.each(dom.elementDom,function (){
				this.insertBefore(that.element.cloneNode(true),this.firstChild);
			});
			return dom;
		}
	});
	//把css方法添加进fn里
	////完善css方法，传一个参数代表获取，传两个参数代表设置一个样式，传对象代表设置多个样式
	itcast.fn.extend({
		css:function (name,value){
			// var dom = this.elementDom;
			if(typeof name === 'object'){
				return this.each(function (){
					for(var k in name){
						this.style[k] = name[k];
					}
				});
			}
			if(value === undefined){
				var dom = this.elementDom[0];
				if(dom.currentStyle){
					return dom.currentStyle[name];
				}else{
					return getComputedStyle(dom)[name];
				}
			}
			return this.each(function (){
				this.style[name] = value;
			});
		}
	})
	//把getAttr添加进fn里,只能改样式
	itcast.fn.extend({
		attr:function (attr,value){
			var dom = this.elementDom[0];
			if(typeof value === 'undefined'){
				return dom.getAttribute(attr);
			}else{
				return this.each(function (){
					this.setAttribute(attr,value);
				});
			}
		}
	});

	//实现添加自定义属性
	itcast.fn.extend({
		sOgetAttr:function (attr,value){
			// var dom = this.elementDom;
			var arr = [];
			if(value){
				this.each(function (){
				this.setAttribute(attr,value);
				});
			}
			return this.each(function (){
				arr.push(this.getAttribute(attr));
			})
			
		}
	})
	//实现nextSbling方法
	itcast.extend({
		next:function (dom){
			var nextNode = dom;
			while(nextNode = nextNode.nextSibling){
				if(nextNode.nodeType === 1){
					return nextNode;
				}
			}
		}
	})
	//实现next方法
	itcast.fn.extend({
		next:function (){
			var next = this.elementDom[0];
			console.log(next);
			while(next = next.nextSibling){
				if(next.nodeType === 1){
					// console.log(next.toString());
					 return next;
				}
			}
		}
	});
	//获取dom后面的所有元素nextAll
	itcast.extend({
		nextAll:function (dom){
			var nextNode = dom;
			var arr = [];
			while(nextNode = nextNode.nextSibling){
				if(nextNode.nodeType === 1){
					arr.push(nextNode);
				}
			}
			return arr;
		}
	})
	//fn里的nextAll方法
	itcast.fn.extend({
		nextAll:function (){
			var dom = this.elementDom[0];
			var arr = [];
			while(dom = dom.nextSibling){
				if(dom.nodeType === 1){
					arr.push(dom);
				}
			}
			return arr;
		}
	})
	//添加click方法，也就是添加click事件,加进fn on方式里
	// itcast.fn.extend({
	// 	click:function (callback){
	// 		this.each(this.elementDom,function (){
	// 			this.onclick = callback;
	// 		});
	// 	}
	// })
	//添加click方法，addevent方式
	itcast.fn.extend({
		click:function (callback){
			return this.each(function (e){
				e.preventDefault;
				e.stopPropagation;
				this.addEventListener('click', callback);
			});
		}
	})
	//itcast里的removeChild方法
	itcast.extend({
		remove:function (dom){
			var reNode = dom;
			if(reNode.length){
				each(reNode,function (){
				this.parentNode.removeChild(this);
				})
			}else{
				reNode.parentNode.removeChild(reNode);
			}
		}
	})
	//写一个itcast的remove方法，利用dom的removechild方法，父级.removeChild(指定的子级)
	itcast.fn.extend({
		remove:function (){
			// var reNode = this.elementDom;
			var dom = null;
			this.each(function (){
				this.parentNode.removeChild(this);
			});
		}
	})
	//实现on方式的事件注册
	itcast.fn.extend({
		on:function (etype,callback){
			return this.each(function (){
				var self = this;
				if(window.addEventListener){
				self.addEventListener(etype,callback);
			}else{
				self.attachEvent('on'+etype,function (event){
					event = event ||　window.event;
					callback.call(self,event);
				});
			}
			});
		}
	})
	//hasClass方法
	itcast.fn.extend({
		hasClass:function (classname){
			var hasClass = false;
			this.each(function (){
				itcast.each(this.className.trim().split(" "),function (v){
					if(v === classname){
						hasClass = true;
						return false;
					}
				})
			});
			return hasClass;
		}
	});
	//addClass方法
	itcast.fn.extend({
		addClass:function (cName){
			return this.each(function (){
				//添加之前判断有没有
				if((' '+this.className+' ').indexOf(' '+cName+' ') === -1){
				var str = this.className + ' '+cName;
				this.className = str.trim();
			}
			});
		}
	});
	//removeClass方法
	itcast.fn.extend({
		removeClass:function (cName){
			return this.each(function (){
				var str = this.className;
				if(cName){
					while((' '+str+' ').indexOf(' '+cName+' ')>=0){
						str = str.replace(cName,'');
						this.className = str.trim();
					}
				}else{
					this.className = '';
				}
			});
		}
	})
	//togleClassName判断有就加没有就去掉
	itcast.fn.extend({
		toggleClassName:function (cName){
			return this.each(function (){
				var str = this.className;
				if(cName){
					if((' '+str+' ').indexOf(' '+cName+' ') >= 0){
						while((' '+str+' ').indexOf(' '+cName+' ') >= 0){
							str = str.replace(cName,'');
							this.className = str.trim();
						}
					}else{
						str = str + ' ' + cName;
						this.className = str.trim();
					}
				}else{
					return false;
				}
			});
		}
	})
	//off解绑事件利用removeEventLisener和detachEvent和onclick = null来解绑事件
	itcast.fn.extend({
		off:function (etype,callback){
			this.each(function (){
				if(this.removeEventLisener){
					this.removeEventListener(etype,callback);
				}else if(this.detachEvent){
					this.detachEvent('on'+etype,callback);
				}else{
					this['on'+etype] = null;
				}
			});
		}
	})
	//添加val方法
	itcast.fn.extend({
		val:function (varStr){
			var dom = this.elementDom[0];
			if(typeof varStr === "undefined"){
				return dom.value;
			}else{
				return this.each(function (){
					this.value = varStr;
					return false;
				});
			}
		}
	})
	//实现html方法
	itcast.fn.extend({
		html:function (hStr){
			var dom = this.elementDom[0];
			if(typeof hStr === 'undefined'){
				return dom.innerHTML;
			}else{
				return this.each(function (){
					this.innerHTML = hStr;
					return false;
				});
			}
		}
	})
	//添加innerText和textContent方法(text)
	itcast.fn.extend({
		text:function (txt){
			var dom = this.elementDom[0];
			if(typeof txt === 'undefined'){
				if('innerText' in dom){
					return dom.innerText;
				}else{
					return dom.textContent;
				}
			}
			return this.each(function (){
				if('innerText' in this){
					this.innerText = txt;
				}else{
					this.textContent = txt;
				}
			});
		}
	})
	//实现innerText方法
	itcast.fn.extend({
		innerText:function (node){
			var txtArr = [];
			var cNodes = node.childNodes;
			for(var i = 0; i < cNodes.length; i++) {
				if(cNodes[i].nodeType === 3) {
					txtArr.push( cNodes[i].nodeValue );
				} else if(cNodes[i].nodeType === 1) {
					txtArr.push( getText(cNodes[i]) );
				}
			}
			return txtArr.join("");
		}
	})
	//添加18种常用方法
	//添加一个hover方法,总共传两个参数，用mouseenter和mouselezve,如果传一个参数移入和移出都执行这个函数,不传参数直接return this   
	//完善css方法，传一个参数代表获取，传两个参数代表设置一个样式，传对象代表设置多个样式
	//
	//each函数
	function each(arr,callback){
		for(var i=0;i<arr.length;i++){
			if(callback.apply(arr[i],[arr[i],i]) === false){
				break;
			};
		}
	};
	itcast.prototype.init.prototype = itcast.prototype;

	win.itcast = itcast;

})(window);