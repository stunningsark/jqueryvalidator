/*!
 * jQuery Validator Plugin v1.0
 *
 * http://www.jqueryvalidator.org/
 *
 * Copyright (c) 2014 Stunning Sark
 * Released under the MIT license
 */
(function($){
jQuery.fn.extend({
jqueryvalidator: function(options) {var selector= $(this).selector ;
var defaults = {
action: $(this).attr('action'),
method:$(this).attr('method'),
asynchronous_mode:true
};
var options = $.extend(defaults, options);
return this.each(function() {
var method=options.method;
var action=options.action;
var asynchronous_mode=options.asynchronous_mode;	
var fields_array=new Array();	
for(var index in options.requiredfields) {
fields_array.push(index);
} 
var evaluate='$(this).submit(function(){';
	for(var index in fields_array)
{
var element=fields_array[index];
$(element).blur(function(){validate(element,options.requiredfields[fields_array[index]]["pattern"],options.requiredfields[fields_array[index]]["patternclass"],options.requiredfields[fields_array[index]]["patternexpr"],options.requiredfields[fields_array[index]]["patternmsg"],options.requiredfields[fields_array[index]]["range"],options.requiredfields[fields_array[index]]["rangemsg"],options.requiredfields[fields_array[index]]["maxfiles"],options.requiredfields[fields_array[index]]["maxfilesmsg"],options.requiredfields[fields_array[index]]["allowedextensions"],options.requiredfields[fields_array[index]]["allowedextensionsmsg"],options.requiredfields[fields_array[index]]["required"],options.requiredfields[fields_array[index]]["requiredmsg"],options.requiredfields[fields_array[index]]["minlength"],options.requiredfields[fields_array[index]]["minlengthmsg"],options.requiredfields[fields_array[index]]["maxlength"],options.requiredfields[fields_array[index]]["maxlengthmsg"]);});
evaluate+='validate("'+element+'","'+options.requiredfields[fields_array[index]]["pattern"]+'","'+options.requiredfields[fields_array[index]]["patternclass"]+'",'+options.requiredfields[fields_array[index]]["patternexpr"]+',"'+options.requiredfields[fields_array[index]]["patternmsg"]+'","'+options.requiredfields[fields_array[index]]["range"]+'","'+options.requiredfields[fields_array[index]]["rangemsg"]+'","'+options.requiredfields[fields_array[index]]["maxfiles"]+'","'+options.requiredfields[fields_array[index]]["maxfilesmsg"]+'","'+options.requiredfields[fields_array[index]]["allowedextensions"]+'","'+options.requiredfields[fields_array[index]]["allowedextensionsmsg"]+'",'+options.requiredfields[fields_array[index]]["required"]+',"'+options.requiredfields[fields_array[index]]["requiredmsg"]+'","'+options.requiredfields[fields_array[index]]["minlength"]+'","'+options.requiredfields[fields_array[index]]["minlengthmsg"]+'","'+options.requiredfields[fields_array[index]]["maxlength"]+'","'+options.requiredfields[fields_array[index]]["maxlengthmsg"]+'");';
}
function validate(element,pattern,patternclass,patternexpr,patternmsg,range,rangemsg,maxfiles,maxfilesmsg,allowedextensions,allowedextensionsmsg,required,requiredmsg,minlength,minlengthmsg,maxlength,maxlengthmsg){
if($(element).next("#symbol").length>0)
$(element).next("#symbol").remove();
var val=$(element).val();
var typecheck;
if(($(element).get(0).tagName=='SELECT' && $(element).attr("multiple")) || $(element).attr("type")=="file")
typecheck=1;
if(pattern=='undefined')
pattern=false;
if(pattern)
{
var filter=patternexpr;
if(filter)
{
if(!filter.test(val))
typecheck=0;
else
typecheck=1;
}
else
{
if(patternclass=='string')
{var filter=/^[a-zA-Z\s]+$/
if(filter.test(val))
typecheck=0;
else
typecheck=1;
}
else
if(patternclass=='number')
{var filter=/^[0-9]+$/;
if(!filter.test(val))
typecheck=0;
else
typecheck=1;
}
else
if(patternclass=='email')
{var filter=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
if(!filter.test(val))
typecheck=0;
else
typecheck=1;
}
}
}
else
typecheck=1;
//-------------------------

//-----------------------
if(($(element).get(0).tagName=='SELECT' && $(element).attr("multiple")) || $(element).attr("type")=="file")
range_check=1;
if(range!="undefined")
{
var range_var=range;
range_array = range.split("-");
if(patternclass=='number')
{
var minrange=parseInt(range_array[0]);
var maxrange = parseInt(range_array[1]);
}
else
{
var minrange = range_array[0];
var maxrange = range_array[1];
}
if(val<minrange || val>maxrange)
range_check=0;
else
range_check=1;
}
else
range_check=1;
//-------------------------
var file=$(element)[0]['files'];
var maxfilescheck;
var maxfiles=maxfiles;
if(maxfiles && $(element).attr("type")=="file")
{
 var n=0;
 $.each(file,function(){
 n++;});
 
 if(n>maxfiles)
 maxfilescheck=0;
 else
 maxfilescheck=1;
}
else
maxfilescheck=1;
//-------------------------
var extcheck=new Array();
if(allowedextensions && $(element).attr("type")=="file")
{
var allowedextensions=allowedextensions;
allowedextensions = allowedextensions.toLowerCase().split(",");

 $.each(file,function(i){
if(jQuery.inArray(file[i]["name"].split('.').pop().toLowerCase(), allowedextensions)==-1)
extcheck[i]=0;
else
extcheck[i]=1;
 });
}
else
extcheck[0]=1;
//-------------------------
symbol = $(element).after("<span id=symbol></span>");
    $(element).next("#symbol").css("display","inline");
	//===============================================================
	if($(element).get(0).tagName=='SELECT' && $(element).attr("multiple"))
	{
if(val==null && required)
{
	var text='';
if(requiredmsg!='undefined')
text=requiredmsg;
else
text='Required';
 $(element).next("#symbol").html(text);
 }
 else
if($(element).next("#symbol").length>0)
{$(element).next("#symbol").fadeOut(1);$(element).next("#symbol").remove();}
	}
	else
	
//===========================Required==================================
if(required && (val=='' || val=='SELECT' || $(element).is(':radio')))
{
if($(element).is(':radio') && (!$(element).is(':checked')))
{
 var text='';
if(requiredmsg!='undefined')
text=requiredmsg;
else
text='Required';
 $(element).next("#symbol").html(text);
}
else
{
 var text='';
if(requiredmsg!='undefined')
text=requiredmsg;
else
text='Required';
 $(element).next("#symbol").html(text);
}
}
//===============End Required==================================
//====================================Pattern Match===============
else if(val!='' && typecheck!=1)
{
 var text='';
if(patternmsg!='undefined')
text=patternmsg;
else
text='Pattern not matching';
 $(element).next("#symbol").html(text);

 }
//=================================End Pattern Match===============
//====================================Extension Match===============
else if(val!='' && jQuery.inArray(0,extcheck)!=-1)
{
 var text='';
if(allowedextensionsmsg!='undefined')
text=allowedextensionsmsg;
else
text='Extension not allowed';
 $(element).next("#symbol").html(text);

 }
//=================================End Extension Match===============
//====================================Max Files check===============
else if(val!='' && maxfilescheck!=1)
{
 var text='';
if(maxfilesmsg!='undefined')
text=maxfilesmsg;
else
text='Max files limit exeeded';
 $(element).next("#symbol").html(text);

 }
//=================================End Max Files Check===============
//====================================Min Length===============
else if(val.length<minlength && val!='')
{
 var text='';
if(minlengthmsg!='undefined')
text=minlengthmsg;
else
text='Min length is'+minlength;
 $(element).next("#symbol").html(text);

 }
//=================================End Min Length===============
//====================================Max Length===============
else if(val.length>maxlength && val!='')
{
 var text='';
if(maxlengthmsg!='undefined')
text=maxlengthmsg;
else
text='Max length is'+maxlength;
 $(element).next("#symbol").html(text);

 }
//=================================End Max Length===============
//====================================Range===============
else if(range_check!=1 && val!='')
{
 var text='';
if(rangemsg!='undefined')
text=rangemsg;
else
text='Must be between '+range;
 $(element).next("#symbol").html(text);

 }
//=================================End Range===============
else
{
if($(element).next("#symbol").length>0)
{$(element).next("#symbol").fadeOut(1);$(element).next("#symbol").remove();}
}

}	

evaluate+='var count_error=0;var arr=new Array();for(var index in fields_array){var element=fields_array[index];if($(element).next("#symbol").length>0){count_error++;arr.push(element);}}if(count_error>0)$("html';
evaluate+=',body").animate({ scrollTop: $(arr[0]).offset().top-10 }, 1);if(!asynchronous_mode){if(count_error!=0){ return false;}else{return true;}}else{if(count_error==0){var data = new FormData(this);$.ajax({type:method,url:action,data:data,cache: false,contentType: false,processData:false,success:function(data){alert(data);}});}return false;}});';
eval(evaluate);
});
}});
})(jQuery);
