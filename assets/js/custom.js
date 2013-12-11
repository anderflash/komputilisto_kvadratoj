var DISQUS;
var currentPost = null;
var currentLang;
var currentUrl;
var currentPath = sitePath;
var disqusComment;
var funcao;
var langJSON;
var pode = true;


var languages = ["en-GB","pt-BR","eo"];

var idiomaCarregado = false;
var postsCarregados = 0;
var aplicacaoPronta = false;
var sammyContext;


function executarApp()
{
  if(idiomaCarregado && (postsCarregados == languages.length) && aplicacaoPronta) app.run();
}

$.getJSON("assets/js/lang.json",function(langText){
  for(var i = 0; i < languages.length; i++)
  {
    console.log("carregando Idioma: " + languages[i]);
    allMeta[languages[i]].interface = langText[languages[i]];
  }
  idiomaCarregado = true;
  executarApp();
});

for(var i = 0; i < languages.length; i++)
{
  
  var language = languages[i];
  (function(language){
    $.getJSON("category"+language+".json",function(langText){
      console.log("carregando post do idioma: " + language);
      allMeta[language].posts = langText.posts;
      postsCarregados++;
      executarApp();
    });
  })(language);
}

//---------------------------------------------------------------
var allMeta = {"en-GB":{},"pt-BR":{},"eo":{}};
allMeta.getThumb = function(postTitle, lang)
{
  var post = getPostMetaByTitle(postTitle, lang);
  if(post) return post.thumbnail;
  return null;
};

allMeta.getPostMetaByTitle = function(postTitle, lang)
{
  if(!lang) lang = currentLang;
  var posts = this[lang].posts;
  for(index in posts)
    if(post[index].title == postTitle) return post[index];
  return null;
};

allMeta.getTitleAnotherLang = function (postTitle, lang, langDestiny)
{
  if(!lang) lang = currentLang;
  if(!langDestiny) langDestiny = currentLang;
  if(lang == langDestiny) return postTitle;
  
  var post = getPostMetaByTitle(postTitle, lang);
  if(post) return post[langDestiny];
  return null;
};

allMeta.getPostIndex = function(postAddress)
{
  var i = 0;
  var posts = this[currentLang].posts;
  for(index in posts)
  {
    if(posts[index][currentLang] == postAddress) return i;
    i++;
  }
  return null;
};

allMeta.getPostTitle = function(index)
{
  return this[currentLang].posts[index].title;
}

allMeta.getPostAddress = function(index)
{
  return this[currentLang].posts[index][currentLang];
}

allMeta.getPostTile = function(postAddress)
{
  var i = this.getPostIndex(postAddress);
  if(i != null) return $($(".postHeader")[i]).parent();
  return null;
};

allMeta.postPath = function(domain, lang, post)
{
  return domain+lang+"/blogo/"+post+".html";
}

allMeta.getPostContent = function(postAddress)
{
  var i = this.getPostIndex(postAddress);
  if(i != null) return $($(".postContent")[i]);
  return null;
};

allMeta.getPostContentByIndex = function(i)
{
  return $($(".postContent")[i]);
}

allMeta.getPostHeader = function(postAddress)
{
  var i = this.getPostIndex(postAddress);
  if(i != null) return $($(".postHeader")[i]);
  return null;
};

allMeta.changeLanguage = function(lang)
{
  if(lang && lang != currentLang)
  {
    var headerTags = $(".postHeader");
    var headerMetas = this[lang].posts;
    for(var i = 0; i < headerMetas.length; i++)
    {
      var headerTag = $(headerTags[i]);
      var headerMeta = headerMetas[i];
      var postDate = headerTag.find(".postDate");
      var postRelated = headerTag.find(".postRelated");
      headerTag.find(".postThumbnail").find("img").attr("src",headerMeta.thumbnail);
      headerTag.find(".postTitle").text(headerMeta.title);
      headerTag.find(".postDescription").text(headerMeta.description);
      postDate.find(".month").text(headerMeta.month);
      postDate.find(".day").text(headerMeta.day);
      postDate.find(".year").text(headerMeta.year);
      headerTag.attr("onclick","app.gotoPostByIndex("+i+");");
      for(var language in languages)
      {
	postRelated.find("."+language).text(headerMeta[language]);
      }
    }
    var interfaceMeta = this[lang].interface;
    for(key in interfaceMeta)
    {
	$("#"+key).text(interfaceMeta[key]);
    }
    currentLang = lang;
  }
};

allMeta.openPostByIndex = function(i)
{
  allMeta.correctShareMeta(i);
  var postContent = this.getPostContent(this.getPostAddress(i));
  console.log(this.postPath(currentPath,currentLang,this[currentLang].posts[i][currentLang]));
  /*app.get(this.postPath(currentPath,currentLang,this[currentLang].posts[i][currentLang]), function()
  {
    this.expandPost(postContent, i);
    openCorrectLi();
    correctShareMeta(i);
  });
  
  
  */postContent.data('jsp').getContentPane().load(this.postPath(currentPath,currentLang,this[currentLang].posts[i][currentLang]), {data:""},function()
  {
    allMeta.expandPost(postContent, i);
    allMeta.openCorrectLi();
    allMeta.correctShareMeta(i);
  });
};

allMeta.expandPostByIndex = function(i)
{
  
  
}

allMeta.expandPost = function(postContent, i)
{
  currentPost = i;
  var post = postContent.parent();
  post.removeClass("tileH1");
  post.addClass("tileH10");
  postContent.css("visibility","visible");
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  postContent.find('#disqusPosition').append(disqusComment);
  disqusComment.css("display","block");
  postContent.data('jsp').reinitialise();
  $('html, body').animate({
      scrollTop: post.offset().top - 30
  }, 2000,"swing",function()
  {
    allMeta.correctShareMeta(i);
  });
  if(DISQUS)
  {
	console.log(currentLang+allMeta.getPostAddress(i));
	console.log(window.location.href);
    DISQUS.reset({
      reload: true,
      config: function () {  
	    this.page.identifier = currentLang+allMeta.getPostAddress(i);
	    this.page.url = window.location.href;
      }
    });
  }
}

allMeta.openPostByAddress = function(postAddress)
{
  if(currentPost != this.getPostIndex(postAddress))
	this.closeCurrentPost();
  var index = this.getPostIndex(postAddress);
  if(index != null) this.openPostByIndex(index);
};

allMeta.closeCurrentPost = function()
{
  if(currentPost != null)
  {
	$("body").append(disqusComment);
	disqusComment.css("display","none");
    var postContent = this.getPostContentByIndex(currentPost);
    var post = postContent.parent();
    post.removeClass("tileH10");
    post.addClass("tileH1");
    postContent.css("visibility","hidden");
    currentPost = null;
	$("title").text("Komputilisto - Anderson Carlos Moreira Tavares");
  }
};

allMeta.openCorrectLi = function()
{
  if(pode)
  {
    jQuery("body").correctli({
      language: 'en',
      minimumCharacters: '1',
      maximumCharacters: '200',
      keyCombination: 'none'
    });
    pode = false;
  }
};

allMeta.correctShareMeta = function(i)
{
  var metaShareaholic = $("head").find("[property='shareaholic:image']");
  var metaTwitter 	= $("head").find("[property='twitter:image']");
  var metaTwitterTitle 	= $("head").find("[property='twitter:title']");
  var metaTwitterDescription 	= $("head").find("[property='twitter:description']");
  var metaOg 		= $("head").find("[property='og:image']");
  var metaOgTitle	= $("head").find("[property='og:title']");
  var metaOgDescription	= $("head").find("[property='og:description']");
  var metaOgURL	= $("head").find("[property='og:url']");
  
  
  $("head").append(metaShareaholic);
  $("head").append(metaTwitter);
  $("head").append(metaOg);
  $("head").append(metaOgTitle);
  $("head").append(metaOgDescription);
  $("head").append(metaOgURL);
  $("head").append(metaTwitterTitle);
  $("head").append(metaTwitterDescription);
  
  
  var thumbnailUrl = currentPath + this[currentLang].posts[i].thumbnail;
  var title = this[currentLang].posts[i].title;
  var description = this[currentLang].posts[i].description;
  metaShareaholic.attr("content",thumbnailUrl);
  metaTwitter.attr("content",thumbnailUrl);
  metaOg.attr("content",thumbnailUrl);
  metaOgTitle.attr("content",title);
  metaOgDescription.attr("content",description);
  metaOgURL.attr("content",window.location.href);
  metaTwitterTitle.attr("content",title);
  metaTwitterDescription.attr("content",description);
  
  $("title").text(title + " - Komputilisto - Anderson Carlos Moreira Tavares");
}

//---------------------------------------------------------------
// ------------------------SAMMY---------------------
// define a new Sammy.Application bound to the #main element selector
var app = Sammy('#main', function() {
  
  // define a 'get' route that will be triggered at '#!/path'
  this.get('#!/path', function() {
    // this context is a Sammy.EventContext
  });
  
  this.gotoLang = function(lang)
  {
    var new_location = '#!/lang/'+lang;
    this.trigger('redirect',{to:new_location});
    this.last_location = ['get',new_location];
    this.setLocation(new_location);
  }
  
  this.gotoPost = function(title)
  {
    var new_location = '#!/post/'+title+"/"+currentLang;
    this.trigger('redirect',{to:new_location});
    this.last_location = ['get',new_location];
    this.setLocation(new_location);
  }
  
  this.gotoPostByIndex = function(index, canClose)
  {
	if(index == currentPost && canClose != false)
	{
	  allMeta.closeCurrentPost();
	  this.gotoLang(currentLang);
	}
	else
	{
	  var new_location = '#!/post/'+allMeta.getPostAddress(index)+"/"+currentLang;
	  this.trigger('redirect',{to:new_location});
	  this.last_location = ['get',new_location];
	  this.setLocation(new_location);
	}
  }
  
  this.restart = function(index)
  {
	allMeta.closeCurrentPost();
	$('html, body').animate({
		scrollTop: 0
	}, 2000);
	var new_location = '#!/lang/'+(currentLang || 'pt-BR');
    this.trigger('redirect',{to:new_location});
    this.last_location = ['get',new_location];
    this.setLocation(new_location);
  }
  
  this.get('#!/post/:address/:lang', function(valor) {
    allMeta.changeLanguage(this.params['lang']);
	allMeta.correctShareMeta(allMeta.getPostIndex(this.params['address']));
    allMeta.openPostByAddress(this.params['address']);
  });
    
  this.get('#!/lang/:lang',function()
  {
    allMeta.changeLanguage(this.params['lang']);
	if(currentPost != null) app.gotoPostByIndex(currentPost, false);
  });
  
  this.get('#!/', function()
  {
  });
  
  this.get('', function()
  {
    allMeta.closeCurrentPost();
    var new_location = '#!/lang/'+ (currentLang || 'pt-BR');
    this.redirect(new_location);
    app.setLocation(new_location);
    
    /*app.trigger('redirect',{to:new_location});
    app.last_location = ['get',new_location];
    app.setLocation(new_location);*/
    
    //allMeta.changeLanguage('en-GB');
  });
});

$(function()
{
  console.log("load executando");
  
  var metaShareaholic = $("head").find("[property='shareaholic:image']");
  var metaTwitter 	= $("head").find("[property='twitter:image']");
  var metaOg 		= $("head").find("[property='og:image']");
  var metaOgTitle	= $("head").find("[property='og:title']");
  
  $("head").append(metaShareaholic);
  $("head").append(metaTwitter);
  $("head").append(metaOg);
  $("head").append(metaOgTitle);
  //var thumbnailUrl = currentPath + this[currentLang].posts[i].thumbnail;
  var title = "Teste";
  metaOgTitle.attr("content",title);
  
  aplicacaoPronta = true;
  $('.scroll-pane').jScrollPane({ autoReinitialise: true });
  disqusComment = $('#disqusComment');
  disqusComment.css("display","none");
  executarApp();
});

//---------------------------------------------------------------
// --------------------DEPRECATED------------------------

function openPost(lang, title, thumb)
{
  language(lang);
}

function openPost(postContent, lang, url, callback)
{
  if(!lang) lang = currentLang;
  if(!url) url = currentUrl;
  if(!callback) callback = function(html, textStatus)
  {
    expandPost($(postContent).parent(), $(postContent));
    openCorrectLi();
    correctShareMeta(postContent);
  };
  $(postContent).data('jsp').getContentPane().load(postPath(currentPath,lang,url),null, callback);
}

if(getKey("thumb"))
{
  var key = getKey("thumb");
  document.getElementById("facebookShareMeta").attributes[1].value = currentPath + "assets/images/" + key;
  document.getElementById("twitterShareMeta").attributes[1].value = currentPath + "assets/images/" + key;
  document.getElementById("ogShareMeta").attributes[1].value = currentPath + "assets/images/" + key;
}

/*

$(function()
{
	var idioma = $.getUrlVar("lingvo") || 'pt-BR';
	currentUrl = $.getUrlVar("malfermita");
	if(currentUrl == "none") currentUrl = null;
	langJSON = langText;
	var post = searchPost(currentUrl, idioma);
	if(post) currentPost = post.find(".postContent");
	language(idioma);
	currentLang = idioma;
	
// 	if(currentUrl)
// 	{
// 	  var post = searchPost(currentUrl);
// 	  openPost(post.find(".postContent")[0]);
// 	}
	$('.scroll-pane').jScrollPane({ autoReinitialise: true });
	disqusComment = $('#disqusComment');
	disqusComment.css("display","none");
// 	$(".postContent").each(function(i, obj)
// 	{
// 		$(obj).jScrollPane({ autoReinitialise: true });
// 	});
});*/

function searchPost(post, idioma)
{
  var result;
  $('.postRelated').each(function(i, elem)
  {
    if($(this).find('.'+idioma).text() == post) {result = $(this).parent().parent().parent();return false;}
  });
  return result;
}
function reiniciar()
{
  collapseCurrentPost();
  $('html, body').animate({
      scrollTop: 0
  }, 2000);
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
		collapsePost(post, $(postContent));
		currentUrl = null;
		window.history.replaceState({path:currentUrl},'',currentPath+"?lingvo="+currentLang+"&malfermita=none");
	}
	else
	{
		var urlSplitted = url.split("/");
		urlSplitted = urlSplitted[urlSplitted.length-1];
		urlSplitted = urlSplitted.substr(0,urlSplitted.length - 5);
		currentUrl = urlSplitted;
		
		var thumbnail = postHeader.find(".postThumbnail").find("img").attr("src").split("/");
		thumbnail = thumbnail[thumbnail.length-1];
		window.history.replaceState({path:currentUrl},'',currentPath+"?lingvo="+currentLang+"&malfermita="+currentUrl+"&thumb="+thumbnail);
		openPost(postContent);
	}
}

// To convert it to a jQuery plug-in, you could try something like this:
(function($){
	$.getUrlVar = getKey;
})(jQuery);

function getKey(key)
{
  var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
  return result && unescape(result[1]) || ""; 
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
	postContent.data('jsp').reinitialise();
	$('html, body').animate({
	    scrollTop: post.offset().top - 30
	}, 2000,"swing",function()
	{
	  correctShareMeta(postContent[0]);
	});
	if(DISQUS)
	{
	  DISQUS.reset({
	    reload: true,
	    config: function () {  
		  this.page.identifier = currentUrl.substr(1,currentUrl.length-1);
		  this.page.url = currentPath+currentUrl.substr(1,currentUrl.length-1);

	    }
	  });
	}
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
  if(lang != currentLang)
  {
    if(currentLang)
      var post = searchPost(currentUrl, currentLang);
    else
      var post = searchPost(currentUrl, lang);
    currentLang = lang;
    $.each(langJSON[lang], function(key,val)
    {
	    $("#"+key).text(val);
    });
    $.getJSON(currentPath + "category" + lang + ".json", function(text)
    {
      $(".postHeader").each(function(i, elem)
      {
	    var post = text.posts[i];
	    $(this).find(".postTitle").text(post.title);
	    $(this).find(".postDate .month").text(post["date.month"]);
	    $(this).find(".postDate .day").text(post["date.day"]);
	    $(this).find(".postDate .year").text(post["date.year"]);
	    $(this).find(".postDescription").text(post.description);
	    $(this).attr("onclick","postHeaderClicked(event, '"+ "/" + lang + "/blogo/" + post[lang] +".html')");
      });
      if(currentPost)
      {
	currentUrl = currentPost.siblings('.postHeader').find('.'+lang).text();
	openPost(currentPost[0],lang);
      }
    });
    /*$(".postHeader").each(function()
    {
      $.get(currentPath + lang + "/blogo/" + $(this).find(".postRelated ." + lang).text()+".html")
	.done(function(html)
	{
	      console.log(html);
	});;
    });*/
    var thumbnailPart = "";
    if(post) 
    {
      currentUrl = post.find("." + currentLang).text();
      var thumbnail = post.find(".postThumbnail").find("img").attr("src").split("/");
      thumbnail = thumbnail[thumbnail.length-1];
      thumbnailPart = "&thumb="+thumbnail;
    }
    var hash = window.location.hash;
    
    
		
    window.history.replaceState({lang:currentLang, post:currentUrl},'',currentPath+"?lingvo="+currentLang+"&malfermita="+(currentUrl||"none")+thumbnailPart+hash);
  }
}

function loadGist(element, gistId) {
    var callbackName = "gist_callback";
    window[callbackName] = function (gistData) {
        delete window[callbackName];
        var html = '<link rel="stylesheet" href="https://gist.github.com/' + $('<div/>').attr('test-attr', gistData.stylesheet)[0].attributes[0].value + '"></link>';
        html += gistData.div;
        element.innerHTML = html;
        script.parentNode.removeChild(script);
    };
    var script = document.createElement("script");
    script.setAttribute("src", "https://gist.github.com/" + gistId + ".json?callback=" + callbackName);
    document.body.appendChild(script);
}