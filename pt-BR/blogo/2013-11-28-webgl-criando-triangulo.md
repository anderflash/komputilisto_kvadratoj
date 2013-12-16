------------------------------
author: Anderson Tavares
title: Tutorial WebGL: Criando triângulos
description: Criando triângulos
tags: WebGL, OpenGL
thumbnail: assets/images/webgl-criando-triangulo-thumb.png
biblio: library.bib
csl: ieee-with-url.csl
math: True
en-GB: 2013-11-28-webgl-criando-triangulo
eo: 2013-11-28-webgl-criando-triangulo
pt-BR: 2013-11-28-webgl-criando-triangulo
------------------------------

Bem vindo ao meu primeiro tutorial de WebGL! Esta lição é baseado na [lição 1](http://learningwebgl.com/blog/?p=28) do site LearningWebGL.
Nesta lição aprenderemos a exibir um triângulo e um quadrado. É o primeiro passo para criação de ambientes tridimensionais interessantes. 
Colocaremos em prática as teorias obtidas no curso.

Antes de fuçar o código, o resultado:

<img src="assets/images/webgl-criando-triangulo-resultado.png" style="height:300px;"/>

<a href="webgl/demo-criando-triangulo" target="_blank">Veja o resultado</a>. 
<a href="webgl/demo-criando-triangulo/demo.zip" target="_blank">Baixe o demo</a>.

Inicialmente crie uma estrutura de pastas para as lições. Lembre-se que você pode copiar diretamente para seu espaço pessoal no servidor do IME, para mostrar os resultados ao público e enriquecer o portifólio. Então é recomendável criar as pastas sem acentos, espaços, e caracteres especiais.

# HTML

HTML é uma linguagem de formatação, no qual todas as instruções de formatação estão misturadas com o conteúdo. Os pedaços que compõem um site estão estruturados como uma árvore. As instruções de formatação são chamadas de tags. Todas a página está contida na tag `<html>`.

Dentro da pasta da lição 1, crie o arquivo index.html. Coloque o seguinte código 

~~~~ {#mycode .html .numberLines startFrom="1"}
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
	Olá mundo.
  </body>
<html>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Essa estrutura minimalista cria uma página apenas com a palavra Olá mundo. O conteúdo deve estar contido entre as tags `<body>` e `</body>`. Vínculos para outros arquivos, arquivos de estilo e scripts que tornam a página mais dinâmica geralmente ficam entre as tags `<head>` e `</head>`.

# Canvas WebGL

Para poder desenhar, precisamos configurar a tela de desenho. A tela é denominada *canvas*, e é acessado pela tag `<canvas>`. O *canvas* pode exibir tanto conteúdo tridimensional (no contexto do WebGL) como desenhos em bitmap (no contexto do HTML5 2D). Como este é um curso 