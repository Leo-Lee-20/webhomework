function is_number(s) {
	return s == "1" || s == "2" || s == "3" || s == "4" || s == "5" || s == "6" ||
		   s == "7" || s == "8" || s == "9" || s == "0" || s == "." || s == "(" ||
		   s == ")";
}

function is_operator(s) {
	return s == "+" || s == "-" || s == "*" || s == "/";
}

window.onload = function() {
	var input = "0123456789+-*/().";
	for (var i = input.length - 1; i >= 0; i--) {
		document.getElementById(input[i]).onclick = function() {
			var str = document.getElementById("answer").innerHTML;
			if (str.length < 22)
				document.getElementById("answer").innerHTML = str + this.innerHTML;
		}
	}
	document.getElementById("CE").onclick = function() {
		document.getElementById("answer").innerHTML = "";
	}
	document.getElementById("cancel").onclick = function() {
		var str = document.getElementById("answer").innerHTML;
		if (str.length != 0) {
			var result = str.substr(0, str.length - 1);
		    document.getElementById("answer").innerHTML = result;
		}
	}
	document.getElementById("=").onclick = function() {
		var str = document.getElementById("answer").innerHTML;
		var flag = true;
		var bracket = [];
		for (var i = 0; i < str.length; ++i) {
			if (str[i] == "/") {
				var count = 0;
				for (var j = i + 1; is_number(str[j]); ++j) {
					++count;
				}
				if (parseFloat(str.substr(i + 1, count)) == 0) {
					flag = false;
					break;
				}
			}
			if (str[i] == "(") {
				bracket.push(str[i]);
				if (i != 0) {
					if (is_operator(str[i - 1]) == false && str[i - 1] != "(") {
						flag = false;
						break;
					}
				}
			}
			if (str[i] == ")") {
				if (bracket.length != 0) {
					if (bracket.pop() != "(") {
						flag = false;
						break;
					}
				} else {
					flag = false;
					break;
				}
				if (i != str.length - 1) {
					if (is_operator(str[i + 1]) == false && str[i + 1] != ")") {
						flag = false;
						break;
					}
				}
			}
			if (str[i] == "*" || str[i] == "-" || str[i] == "*" || str[i] == "/") {
				if (i != 0 && i != str.length - 1) {
					if (is_number(str[i - 1]) == false || is_number(str[i + 1]) == false) {
							flag = false;
							break;
					}
				}
				else {
					flag = false;
					break;
				}
			}

		}
		if (bracket.length != 0) flag = false;
		if (flag)
		    document.getElementById("answer").innerHTML = eval(str);
		else {
			alert("您输入的算式格式错误");
			document.getElementById("answer").innerHTML = "";
		}
	}
}