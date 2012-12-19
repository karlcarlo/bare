/***************************************************
* 通用函数，截字之类的
* 
*
*
***************************************************/


define(function(){

	//中文验证正则
	var replaceCJK = /[\u2E80-\u9FFF\uF92C-\uFFE5]/g,
		testCJK    = /[\u2E80-\u9FFF\uF92C-\uFFE5]/;

	var exports = {
		cjkLength: function(strValue){
			return strValue ? strValue.replace(replaceCJK, "aa").length : 0;
		},
		isCjk: function(strValue){
			return testCJK.test(strValue);
		},
		subString: function(str,len,suffix,slen){
			suffix = suffix || '';
			slen = slen || suffix.length;
			if(str.length > len){
				str = str.substr(0,len - slen) + suffix;
			}
			return str;
		},
		/**
		 * 按字符数截取
		 * @param {String} str 字符串
		 * @param {Number} len 字节长度（中文算2个）
		 * @param {String} suffix 字符串：后缀
		 * @param {Number} slen 后缀长度
		 * @return {String} 截取后的字符串
		 */
		cjkSubString: function(str,len,suffix,slen){
			suffix = suffix || '';
			slen = slen || suffix.length;
			len -= slen;
			if(this.cjkLength(str) <= len){
				return str;
			}
			var s = str.split(''),c = 0,tmpA = [];
			for(var i=0;i<s.length;i+=1){
				if(this.isCjk(s[i])){
					c += 2;
				}else{
					c += 1;
				}
				if(c < len){
					tmpA[tmpA.length] = s[i];
				}
			}
			return tmpA.join('') + suffix;
		}

	};

	return exports;

})