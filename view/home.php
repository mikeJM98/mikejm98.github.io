<?php
require_once("head.php");
require_once("nav.php");
?>
    
    <div class="hero">
        <div class="backdrop" style="background-image: url('../asset/raul/imagenes/fondo.jpeg');">
            <!--<video poster="../asset/raul/demo/hero-static.jpg" id="herovid" playsinline autoplay muted loop>
                <source src="../asset/raul/demo/hero-video.webm" type="video/webm">
                <source src="../asset/raul/demo/hero-video.mp4" type="video/mp4">
            </video>-->
        </div><!--/.backdrop-->
        <div class="container">
            <div class="row">
                <div class="col-lg-10 col-lg-offset-1">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-10">
                            <!-- aqui insertaremos el slider -->
                            <div id="carousel1" class="carousel slide" data-ride="carousel">
                            <!-- Indicatodores -->
                            <ol class="carousel-indicators">
                                <li data-target="#carousel1" data-slide-to="0" class="active"></li>
                                <li data-target="#carousel1" data-slide-to="1"></li>
                                <li data-target="#carousel1" data-slide-to="2"></li>
                            </ol>

                            <!-- Contenedor de las imagenes -->
                            <div class="carousel-inner" role="listbox">

                                <div class="item active bg-success">
                                <img src="../asset/raul/imagenes/carrucel1.jpeg" alt="Imagen 1" height="250" width="1000">
                                <div class="carousel-caption"> </div>
                                </div>

                                <div class="item">
                                <img src="../asset/raul/imagenes/carrucel2.jpeg" alt="Imagen 2" height="250" width="1000">
                                <div class="carousel-caption"> </div>
                                </div>

                                <div class="item">
                                <img src="../asset/raul/imagenes/carrucel3.jpeg" alt="Imagen 3" height="250" width="1000">
                                <div class="carousel-caption"> </div>
                                </div>
                            </div>

                            <!-- Controls -->
                            <a class="left carousel-control" href="#carousel1" role="button" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                <span class="sr-only">Anterior</span>
                            </a>
                            <a class="right carousel-control" href="#carousel1" role="button" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                <span class="sr-only">Siguiente</span>
                            </a>

                        </div>
                    </div>
                </div>
            </div>
					<div class="hp-banner-hotspot" style="height: 100px">
						<!-- Banner Link -->
						<!-- 
						<a target="_blank" href="https://store.EABH.com/black-friday-deals/" style="height: 400px;width: 100%;left: 0;top: 0;position: absolute;"><span class="clickable"></span></a>
						-->
                    </div>
                    <div class="overlay" style="margin: 0px;">
                        <div class="row">
                            <div class="col-sm-3 col-md-4">
                                <div class="overlay-image">
                                    <img class="img-responsive absent" alt="Placeholder" src="../asset/raul/imagenes/holder.jpg">
                                </div>
                            </div>
                            <div class="col-sm-9 col-md-8">
                                <div class="overlay-content">
                                    <h3 class="absent">Bienvenido a E.A.B.H!</h3>
                                    <p class="absent">GRACIAS A TODOS POR VISITARNOS. SIGUENOS EN LAS DIFERENTES REDES SOCIALES. DALE LIKE Y SUSCRIETE A NUESTRO CANAL DE YOUTUBE. VIDEOS SOBRE PRUEBAS DE AEROMODELOS A ESCALA</p>
                                    <p>
                                        <a href="contactanos.php" class="btn btn-red">Datos de Contactos</a>
                                        <a href="productos.php" class="btn btn-red">Ver Nuestros Productos</a>
                                    </p>
                                </div>
                            </div>
                        </div><!--/.row-->
                    </div><!--/.overlay-->
                </div><!--/.col-->
            </div><!--/.row-->
        </div><!--/.container-->
    </div><!--/.hero-->

    <div id="home-episodes" class="section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-heading">NUEVOS VIDEOS TODOS LOS DOMINGOS</h2>
                <p class="section-heading-byline">Vuela alto con la Escuela de Aeromodelismo Bello Horizonte</p>
            </div>
            <div class="section-content">
                <div class="row">
						<div class="col-md-6">
	                        <div class="content-item episode">
	                            <a href="https://www.youtube.com/watch?v=4pnV9WLC8zM" class="permalink popup-youtube">
	                                <span class="poster-wrap">
	                                	<img class="poster" alt="Video Poster Image" src="https://img.youtube.com/vi/4pnV9WLC8zM/maxresdefault.jpg">
	                                	<img class="play-button" alt="Play video" src="../asset/raul/imagenes/play-button.png">
	                                </span>
	                                <h3 class="title">MAIDEN F22 RAPTOR - TARAPOTO</h3>
	                            </a>
	                            <div class="description">EN UN DIA SOLEADO Y CON MUCHO VIENTO SE PUSO A PRUEBA LA DESTREZA DEL PILOTO PARA REALIZAR EL TEST DE VUELO DEL RAPTOR. 
                                    ESTA VEZ SE PRESENTA CON UN COLOR CELESTE Y LINEAS BLANCAS.
                                </div>
                            </div>
	                    </div>
	                                		                	                    <div class="col-md-6">
                        <div class="content-item episode">
                            <a href="http://www.youtube.com/watch?v=KbBusP11rgY" class="permalink popup-youtube">
                                <span class="poster-wrap">
                                    <img class="poster" alt="Video Poster Image" src="https://img.youtube.com/vi/KbBusP11rgY/maxresdefault.jpg">
                                    <img class="play-button" alt="Play video" src="../asset/raul/imagenes/play-button.png">
                                </span>
                                <h3 class="title">1er VUELO EXPLORER - TARAPOTO - EABH - NATUS FLY</h3>
                            </a>
                            <div class="description">ÉPICO MOMENTO DONDE PROBAMOS EL AVION RC EXPLORER, CONSTRUIDO EN 
                                TARAPOTO - PERU<a href="https://www.insta360.com/sal/one_x?insrc=..." target="_blank">
                                <i class="fa fa-fw fa-external-link"></i></a>
                            </div>
                        </div>
	                </div>                	
                </div>
            </div>
        </div>
    </div>

    <div class="sm2-bar-ui fixed full-width flat" style="display: none">
        <div class="bd sm2-main-controls">
            <div class="sm2-inline-texture"></div>
            <div class="sm2-inline-gradient"></div>
            <div class="sm2-inline-element sm2-button-element">
                <div class="sm2-button-bd">
                    <a href="#play" class="sm2-inline-button play-pause">Play / pause</a>
                </div>
            </div>
            <div class="sm2-inline-element sm2-inline-status">
                <div class="sm2-playlist">
                    <div class="sm2-playlist-target">
                        <ul class="sm2-playlist-bd">
                            <li></li>
                        </ul>
                    </div>
                </div>
                <div class="sm2-progress">
                    <div class="sm2-row">
                        <div class="sm2-inline-time">0:00</div>
                        <div class="sm2-progress-bd">
                            <div class="sm2-progress-track">
                                <div class="sm2-progress-bar"></div>
                                <div class="sm2-progress-ball">
                                    <div class="icon-overlay"></div>
                                </div>
                            </div>
                        </div>
                        <div class="sm2-inline-duration">0:00</div>
                    </div>
                </div>
            </div>
            <div class="sm2-inline-element sm2-button-element sm2-volume">
                <div class="sm2-button-bd">
                    <span class="sm2-inline-button sm2-volume-control volume-shade"></span>
                    <a href="#volume" class="sm2-inline-button sm2-volume-control">volume</a>
                </div>
            </div>
            <div class="sm2-inline-element sm2-button-element sm2-menu">
                <div class="sm2-button-bd">
                    <a href="#menu" class="sm2-inline-button menu">menu</a>
                </div>
            </div>
        </div>
        <div class="bd sm2-playlist-drawer sm2-element">
            <div class="sm2-inline-texture">
                <div class="sm2-box-shadow"></div>
            </div>
            <!-- playlist content is mirrored here -->
            <div class="sm2-playlist-wrapper">
                <ul class="sm2-playlist-bd">

                </ul>
            </div>
        </div>
    </div>

    <div class="section">
    </div>
    <?php
require_once("footer.php");
?>  