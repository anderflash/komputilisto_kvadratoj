------------------------------
author: Anderson Tavares
title: Tutorial WebGL: Introdução
description: Instalação e Configuração
tags: WebGL, OpenGL
thumbnail: assets/images/webgl-introducao-thumb.png
biblio: library.bib
csl: ieee-with-url.csl
math: True
en-GB: 2013-11-27-webgl-introducao
eo: 2013-11-27-webgl-introducao
pt-BR: 2013-11-27-webgl-introducao
------------------------------

# Firefox

Você pode visualizar seus ambientes WebGL no Firefox. Atualmente o Firefox está na versão 25+. Caso seu computador não tenha placa gráfica, você pode ainda sim habilitar a execução de conteúdo 3D por meio de software. Para habilitar, navege na página `about:config` e clique em *Serei cuidadoso, eu prometo!*, ou *I'll be carefull, I promise!*. Procure a variável `webgl.force-enabled` e dê um duplo-clique, a opção ficará em **negrito** e com o valor *true*. Embora seja mais lento que a aceleração em hardware, a renderização em software é uma possibilidade para quem não tem placa.

# Chrome

Existem dois programas com roadmaps diferentes:

- Google Chrome
- Chromium

Chromium é um navegador de desenvolvimento 100% em software livre. Google Chrome é desenvolvido de forma fechada. Atuamente, tanto a versão do Google Chrome como a versão do Chromium estão em 31+.

Se seu computador tem placa de aceleração gráfica instalada e devidamente configurada, para verificar se o Chrome/Chromium estão conseguindo usar a GPU, acesse a página `chrome://gpu` e veja nas opções onde contém `WebGL`. Caso estejam aparecendo as respostas do tipo "indisponível", então é necessário configurar corretamente as placas. No Ubuntu 13.10+, o seguinte <a href="http://www.vivaolinux.com.br/dica/Driver-NVidia-no-Ubuntu-1310" target="_blank">link</a> contém uma forma de instalar os pacotes da placa. No Windows, é necessário o acesso à página da fabricante para instalação dos *drivers*.

Se seu computador **não** tem placa de aceleração gráfica, então acesse a página `chrome://flags` e habilite a opção *Override software rendering list* (geralmente a primeira opção). Reinicie o navegador.

# Internet Explorer 

Usuários comentam que o navegador IE versão 11+ já suporta WebGL. Se você tiver mais informações sobre o processo, não hesite em mandar um e-mail.

# Ferramentas

Existem diversas ferramentas que ajudam o desenvolvedor na criação de conteúdos em WebGL, especialmente ferramentas que permitem o usuário inserir uma esfera com um simples comando, como `insiraEsfera(raio, x,y)`. Pensando na didática, aprenderemos conceitos básicos usando diretamente a API da WebGL. Usaremos algumas bibliotecas para funcionalidades fora do escopo da disciplina.

## glMatrix

Para manipulação de matrizes e vetores, utilizaremos a biblioteca [glMatrix](http://glmatrix.net/).

