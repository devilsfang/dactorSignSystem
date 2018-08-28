(function($){
    $.validator.addMethod("notnull", function(value, element){
        return !$(element).hasClass("l-text-field-null")&&(value!="不限")&&value!=null&&value!="";
    }, "不能为空");
    
    //字母数字
    jQuery.validator.addMethod("alnum", function(value, element){
        return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
    }, "只能包括英文字母和数字");
    
    // 手机号码验证   
    jQuery.validator.addMethod("cellphone", function(value, element){
        var length = value.length;
        return this.optional(element) || (length == 11 && /^(1\d{10})$/.test(value));
    }, "请正确填写手机号码");
    
    // 电话号码验证   
    jQuery.validator.addMethod("telephone", function(value, element){
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写电话号码****-*********(-可以省略）");
    
    // 邮政编码验证
    jQuery.validator.addMethod("zipcode", function(value, element){
        var tel = /^[0-9]{6}$/;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写邮政编码");
    
    // 汉字
    jQuery.validator.addMethod("chcharacter", function(value, element){
        var tel = /^[\u4e00-\u9fa5]+$/;
        return this.optional(element) || (tel.test(value));
    }, "请输入汉字");
    
    // QQ
    jQuery.validator.addMethod("qq", function(value, element){
        var tel = /^[1-9][0-9]{4,}$/;
        return this.optional(element) || (tel.test(value));
    }, "请输入正确的QQ");
    
    // 用户名
    jQuery.validator.addMethod("username", function(value, element){
        return this.optional(element) || /^[a-zA-Z][a-zA-Z0-9_]+$/.test(value);
    }, "用户名格式不正确");
    // 用户名
    jQuery.validator.addMethod("ptTest", function(value, element){
        return this.optional(element) || /^[a-zA-Z][a-zA-Z0-9_]+$/.test(value);
    }, "ptTest不正确");
	
	 // 身份证
    jQuery.validator.addMethod("cardNo", function(value, element){
    	return this.optional(element) ||idCardNoUtil.checkIdCardNo(value); 
    }, "身份证格式不正确");
    
	//身份证号长度验证
	jQuery.validator.addMethod("idCardLength", function(value, element){
        var length = value.length;
        return this.optional(element) || (length == 15 || length==18);
    }, "身份证号为15位或者18位");
    //银行卡长度验证
	jQuery.validator.addMethod("bankCardLength", function(value, element){
        var length = value.length;
        return this.optional(element) || (length == 19);
    }, "银行卡号为19位");
    
	//交易日志长度验证
	jQuery.validator.addMethod("Jrn", function(value, element){
        var length = value.length;
        return this.optional(element) || (length == 9&& /^(\d{9})$/.test(value));
    }, "交易编号为9位");
    
    //效验金额格式
	jQuery.validator.addMethod("amt", function(value, element){
        return this.optional(element) || (/^(([1-9]\d*)|\d)(\.\d{1,3})?$/).test(value);
    }, "金额格式不正确");
})(jQuery);






