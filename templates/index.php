<html>
  <meta charset="UTF-8">
  <head>
	<script type="text/javascript">
	/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
	var disqus_shortname = 'andersonvision'; // required: replace example with your forum shortname
	<?php
	  echo("var disqus_url = window.location.href;");
	  echo("var disqus_identifier = '$$lang$$postAddress';");
	?>
	/* * * DON'T EDIT BELOW THIS LINE * * */
	(function() {
		var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = false;
		dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	})();
	</script>
	<?php
	  error_reporting(E_ALL);
	  ini_set('display_errors', 1);
	  $$lang = file_get_contents('assets/js/lang.json');
	  
	  $$postsPt = file_get_contents('categorypt-BR.json');
	  $$postsEn = file_get_contents('categoryen-GB.json');
	  $$postsEo = file_get_contents('categoryeo.json');
	  
	  $$decodedPt = json_decode($$postsPt, true) or die('erro');
	  $$decodedEn = json_decode($$postsEn, true) or die('erro');
	  $$decodedEo = json_decode($$postsEo, true) or die('erro');
	  
	  $$decodedLang = array($$decodedPt, $$decodedEn, $$decodedEo);
	  //$$posts = file_get_contents('');
	  
	  $$decoded = json_decode($$lang) or die('erro');
	  $$thumbnailUrl = "http://vision.ime.usp.br/~acmt/komputilisto/";
	  $$postUrl = "http://vision.ime.usp.br/~acmt/komputilisto/";
	  $$pageTitle = "Komputilisto - Anderson Carlos Moreira Tavares";
	  $$title = "";
	  $$description = "";
	  $$postAddress = "";
	  $$lang = "pt-BR";
	  
	  if(isset($$_GET['_escaped_fragment_']))
	  {
		$$getParams = explode('/', $$_GET['_escaped_fragment_']);
		
		
		$$title = $$getParams[2];
		if($$getParams[1]=='lang')
		{
		  $$lang = $$getParams[2];
		  
		  $$thumbnailUrl .= "assets/images/logo.png";
		  $$title = "Komputilisto - Anderson Carlos Moreira Tavares";
		}
		else if($$getParams[1]=='post')
		{
		  $$postAddress = $$getParams[2];
		  $$lang = $$getParams[3];
		  echo("<script type='text/javascript'>
		  <!--
		  window.location = '$${postUrl}#!/post/$${postAddress}/$${lang}';
		  //-->
		  </script>");
		  
		  $$languages = array("pt-BR","en-GB","eo");
		  for($$i = 0; $$i < count($$languages); $$i++)
		  {
			if($$languages[$$i] == $$lang)
			{
			  $$decodedLanguage = $$decodedLang[$$i];
			  //print_r($$decodedLanguage['posts']);
			  for($$j = 0; $$j < count($$decodedLanguage['posts']);$$j++)
			  {
				$$post = $$decodedLanguage['posts'][$$j];
				if($$post[$$lang] == $$postAddress)
				{
				  $$postUrl .= "#!/post/$$postAddress/$$lang";
				  $$thumbnailUrl .= $$post['thumbnail'];
				  $$title = $$post['title'];
				  $$description = $$post['description'];
				  $$pageTitle = $$title." - ".$$pageTitle;
				  break;
				}
			  }
			  
			  /*$$decodedLanguage = $$decodedLang[$$i];
			  
			  //print_r($$decodedLanguage);
			  foreach($$decodedLanguage as $$posts)
			  {
				foreach($$posts as $$post)
				{
				  print_r($$post.day);
				}
				
				/*for($$j = 0; $$j < count($$decodedLanguage);$$j++)
				{
				  if($$decodedLanguage[$$j][$$lang] == $$postAddress)
				  {
					$$thumbnailUrl .= $$decodedLanguage[$$j]['thumbnail'];
					$$title = $$decodedLanguage[$$j]['title'];
					break;
				  }
				}*/
				//echo(count($$items));
			  //}
			  /*for($$j = 0; $$j < count($$decodedLang[$$i]['posts']);$$j++)
			  {
				if($$decodedLang[$$i]['posts'][$$j][$$lang] == $$postAddress)
				{
				  $$thumbnailUrl .= $$decodedLang[$$i]['posts'][$$j]['thumbnail'];
				  $$title = $$decodedLang[$$i]['posts'][$$j]['title'];
				  break;
				}
			  }*/
			  break;
			}
		  }
		}
	  }
	  else
	  {
		$$thumbnailUrl .= "logo.png";
		$$title = "Komputilisto - Anderson Carlos Moreira Tavares";
	  }
	  
	  echo("<title>$$pageTitle</title>");
	  echo("<meta property='shareaholic:image' content='$$thumbnailUrl' id='facebookShareMeta'/>");
	  echo("<meta property='twitter:image' content='$$thumbnailUrl' id='twitterShareMeta'/>");
	  echo("<meta property='og:image' content='$$thumbnailUrl' id='ogShareMeta'/>");
	  echo("<meta property='og:title' content='$$title' />");
	  echo("<meta property='og:url' content='$$postUrl' />");
	  echo("<meta property='og:description' content='$$description' />");
	  echo("<meta property='twitter:description' content='$$description' />");
	  echo("<meta property='twitter:title' content='$$title' />");

	?>
    <!--<meta property="shareaholic:image" content="http://vision.ime.usp.br/~acmt/komputilisto/assets/images/logo.png" id="facebookShareMeta"/>
    <meta property="twitter:image" content="http://vision.ime.usp.br/~acmt/komputilisto/assets/images/logo.png" id="twitterShareMeta"/>
    <meta property="og:image" content="http://vision.ime.usp.br/~acmt/komputilisto/assets/images/logo.png" id="ogShareMeta"/>
    <meta property="og:title" content="Komputilisto - Anderson Carlos Moreira Tavares" />-->
    <meta property="og:type" content="article" />
    <title>Komputilisto - Anderson Carlos Moreira Tavares</title>
    <script>var sitePath = "$sitePath$/" ;</script>
    
        
  <!-- SHAREAHOLIC -->
	<script type="text/javascript">
//<![CDATA[
  (function() {
    var shr = document.createElement('script');
    shr.setAttribute('data-cfasync', 'false');
    shr.src = '//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js';
    shr.type = 'text/javascript'; shr.async = 'true';
    shr.onload = shr.onreadystatechange = function() {
      var rs = this.readyState;
      if (rs && rs != 'complete' && rs != 'loaded') return;
      var apikey = 'a90fae8b3b87717b1a083a5abb334088';
      try { Shareaholic.init(apikey); } catch (e) {}
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(shr, s);
  })();
//]]>
</script>

	<!-- CORRECT.LI -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="assets/js/correctliapi.js" type="text/javascript" ></script>
	<!--<script type="text/javascript">
		jQuery(document).ready(function() {
		  jQuery("body").correctli({
			language: 'en',
			minimumCharacters: '1',
			maximumCharacters: '200',
			keyCombination: 'none'
		  });
		});
	</script>-->
	<!--SAMMY-->
	<script type="text/javascript" src="assets/js/sammy-latest.min.js"></script>
		<!-- JSCROLLPANE -->
  	<!-- styles needed by jScrollPane -->
	<link type="text/css" href="css/jquery.jscrollpane.css" rel="stylesheet" media="all" />
	<link type="text/css" href="css/custom.css" rel="stylesheet" media="all" />
	<link type="text/css" href="css/syntax.css" rel="stylesheet" />
        
	<!-- latest jQuery direct from google's CDN -->
	<!--<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>-->
	<!-- the mousewheel plugin - optional to provide mousewheel support -->
	<script type="text/javascript" src="assets/js/jquery.mousewheel.js"></script>
	<!-- the jScrollPane script -->
	<script type="text/javascript" src="assets/js/jquery.jscrollpane.min.js"></script>
	<script type="text/javascript" src="assets/js/custom.js"></script>
	
	<!-- MATHJAX -->
    <script type="text/javascript"
	  src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
	</script>

	<!-- GOOGLE ANALYTICS -->
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-5512691-10', 'usp.br');
		ga('send', 'pageview');

	</script>
  </head>
  <body>
		<div class="content" id="main">
			
			<div class="category tilesW6">
				<div class="categorytitle" id="categoryBLOGO">
				  Blog
				</div>
				<!--<div class="categoryPaginator">
					<div class="back"></div>
					<div class="page">15</div>
					<div class="forward"></div>
				</div>-->
				<div class="tiles">
					$body$
				</div>
			</div>
			<div class="category tilesW4">
				<div class="categorytitle" id="categoryLERNADO">
					Aprendizado
				</div>
				<div class="tiles">
					<div class="tile tileW1 tileH1" style="background:#aa0000;" id="appwebgl">
						<a href="#!/app/webgl"><img src="assets/images/webgl-logo.svg"/></a>
					</div>
					<div class="tile tileW1 tileH1" style="background:#537f9a;" id="appopengl">
						<a href="#!/app/opengl"><img src="assets/images/opengl-logo.svg"/></a>
					</div>
					<div class="tile tileW1 tileH1 clicavel icon" style="background:#966c52">
					  <a href="http://www.wikicfp.com/" target="_blank">
						  <img src="assets/images/wikicfp-logo.svg"/>
						  <div>WikiCFP</div>
					  </a>
					</div>
				</div>
			</div>
			<div class="category tilesW4">
				<div class="categorytitle" id="categoryESPERANTO" >
					Programaroj
				</div>
				<div class="tiles">
					<a href="http://lernu.net/" target="_blank">
					  <div class="tile tileW1 tileH1 clicavel" style="background:#384f6f;">
						  <img src="assets/images/lernu_logo.svg"/>
					  </div>
					</a>
					<div class="tile tileW1 tileH1 clicavel icon" style="background:#500010" id="appmuzaiko">
					  <a href="#!/app/muzaiko" target="_blank">
						  <img src="assets/images/muzaiko_logo.svg"/>
						  <div>Muzaiko</div>
					  </a>
					</div>
					<div class="tile tileW1 tileH1 clicavel icon" style="background:#509910">
					  <a href="http://www.podkasto.net/" target="_blank">
						  <img src="assets/images/varsoviavento_logo.svg"/>
						  <div>Varsovia Vento</div>
					  </a>
					</div>
					<div class="tile tileW1 tileH1 clicavel icon" style="background:#C0A080">
					  <a href="http://edukado.net/" target="_blank">
						  <img src="assets/images/edukado_logo.png"/>
						  <div>Edukado</div>
					  </a>
					</div>
					<div class="tile tileW1 tileH1 clicavel icon" style="background:#505010">
					  <a href="http://eo.radiovaticana.va/" target="_blank">
						  <img src="assets/images/radiovatikana_logo.svg"/>
						  <div>Rd. Vatikana</div>
					  </a>
					</div>
					<div class="tile tileW1 tileH1 icon" style="background:#500050" id="appyahoo">
					    <a href="#!/app/yahoo"><img src="assets/images/yahoo_answers_logo.svg"/></a>
					    <div>Yahoo Respostas</div>
					</div>
				</div>
			</div>
			<div class="category tilesW4">
				<div class="categorytitle" id="categoryPRIMI">
					Pri Mi
				</div>
				<div class="tiles">
					<div class="tile tileW1 tileH1 clicavel">
						<a target="_blank" href="http://www.twitter.com/anderflash"><img src="assets/images/twitter_logo.svg"/></a>
					</div>
					<div class="tile tileW1 tileH1 clicavel">
						<a target="_blank" href="http://www.facebook.com/anderflash"><img src="assets/images/facebook_logo.svg"/></a>
					</div>
					<div class="tile tileW1 tileH1 clicavel">
						<a target="_blank" href="https://plus.google.com/+AndersonTavaresBR"><img src="assets/images/gplus_logo.svg"/></a>
					</div>
					<div class="tile tileW1 tileH1 clicavel" style="background:white;">
						<a target="_blank" href="https://github.com/anderflash"><img src="assets/images/github-logo.svg"/></a>
					</div>
					<div class="tile tileW1 tileH1 clicavel">
						<a target="_blank" href="https://linkedin.com/in/andersontavares"><img src="assets/images/linkedin-logo.svg"/></a>
					</div>
					<div class="tile tileW1 tileH1 clicavel" style="background:green;" id="primiemail">
						<a href="#!/primi/email"><img src="assets/images/email-logo.svg"/></a>
					</div>
				</div>
			</div>
			<div class="category tilesW4">
				<div class="categorytitle" id="categoryPROJEKTOJ">
					Projetos
				</div>
				<div class="tiles">
					<div class="tile tileW1 tileH1">
						<img src="assets/images/nhe-thumb.jpg" style="width:64px; height:64px;"/>
					</div>
					<div class="tile tileW1 tileH1">
						<img src="assets/images/eye-tracking-thumb.jpg" style="width:64px; height:64px;"/>
					</div>
					<div class="tile tileW1 tileH1">
						<img src="assets/images/anamorphism-swimming.jpg" style="width:64px; height:64px;"/>
					</div>
				</div>
			</div>
		</div>
    <div class="top">
	  <div class="logo" onclick="app.restart()">
      </div>
      <div class="langs">
		  <img src="assets/images/Brazil.png" class="clicavel" id="flagpt-BR" onclick="app.gotoLang('pt-BR');"/>
		  <img src="assets/images/United_Kingdom.png" class="clicavel" id="flagen-GB"  onclick="app.gotoLang('en-GB');"/>
		  <img src="assets/images/esperanto.svg" class="clicavel" id="flageo" onclick="app.gotoLang('eo');"/>
      </div>
      <span class="rss">
		<a href="$sitePath$/rss.xml" target="_blank" onclick="event.preventDefault();window.open('$sitePath$/rss.xml');"><img src="assets/images/rss-logo.svg"></a>
      </span>
      <input id="buscarInput" type="text" class="" name="q" placeholder="Serĉo" onkeypress="serĉaKlavoPremita(event)">
    </div>
    <footer class="copyright"><span id="POWEREDBY">Farita de</span> <a href="http://www.ime.usp.br/~acmt" target="_blank">Anderson Tavares</a> - 2013 <a rel="license" target="_blank" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Licença Creative Commons" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/4.0/80x15.png" /></a></footer>
    <div id="disqusComment">
		<div id="disqus_thread"></div>
		<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
		<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
    </div>
  </body>
</html>
