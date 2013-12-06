var currentPost = null;
var currentLang;
var currentUrl;
var currentPath = sitePath;
var disqusComment;
var funcao;
var langJSON;
$(function()
{
	console.log(currentPath+"assets/js/lang.json");
	funcao=$.getJSON("assets/js/lang.json",function(langText)
	{
		langJSON = langText;
		language('pt-BR');
	});
	$('.scroll-pane').jScrollPane({ autoReinitialise: true });
	disqusComment = $('#disqusComment');
	disqusComment.css("display","none");
	/*$(".postContent").each(function(i, obj)
	{
		$(obj).jScrollPane({ autoReinitialise: true });
	});*/
	
});
function reiniciar()
{
	collapseCurrentPost();
}

function postHeaderClicked(event, url)
{
	postHeader = $(event.currentTarget);
	post = postHeader.parent();
	postContent = post.children("div.postContent")[0];
	$("body").append(disqusComment);
	disqusComment.css("display","none");
	if(postContent.style.visibility == "visible")
	{
		console.log("colapsando");
		collapsePost(post, $(postContent));
		currentUrl = null;
	}
	else
	{
		currentUrl = url;
		//window.history.pushState({path:currentUrl},'',currentPath+currentUrl.substr(1,currentUrl.length-1));
		$(postContent).data('jsp').getContentPane().load(currentPath+currentUrl.substr(1,currentUrl.length-1),null, function(html, textStatus){console.log(textStatus);expandPost(post, $(postContent));});
	}
}
function expandPost(post, postContent)
{
	collapseCurrentPost();
	post.removeClass("tileH1");
	post.addClass("tileH10");
	postContent[0].style.visibility = "visible";
	
	/*postContent.jScrollPane();
	postContent.jScrollPane({ autoReinitialise: true });*/
	
	//postContent.find("article").jScrollPane();
	//postContent.find("section").jScrollPane();
	currentPost = postContent;
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	postContent.find('#disqusPosition').append(disqusComment);
	disqusComment.css("display","block");
	DISQUS.reset({
	  reload: true,
	  config: function () {  
		this.page.identifier = currentUrl.substr(1,currentUrl.length-1);
		this.page.url = currentPath+currentUrl.substr(1,currentUrl.length-1);
	  }
	});
	postContent.data('jsp').reinitialise();
}

function collapsePost(post, postContent)
{
	if(post != null)
	{
		post.removeClass("tileH10");
		post.addClass("tileH1");
		postContent[0].style.visibility = "hidden";
	}
	if(currentPost[0] == postContent[0])
		currentPost = null;
}

function collapseCurrentPost()
{
	if(currentPost)
		collapsePost(currentPost.parent(), currentPost);
}

function language(lang)
{
  currentLang = lang;
	$.each(langJSON[lang], function(key,val)
	{
		$("#category"+key).text(val);
	});
	
	$(".postHeader").each(function()
	{
	  console.log($(this).find(".postRelated ." + lang).text());
	});
}
