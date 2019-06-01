
<body ng-app="EABH">
<header id="header" style="background: green">
    <div class="container " >
        <div class="row">
            <div class="col-md-9 col-md-offset-3 text-dark">
                <div class="account-bar">

                    <div class="hidden-xs hidden-sm">
                        <a target="_blank" title="Login" data-toggle="modal" data-target="#myModal">
                        <i class="fa fa-sign-in" aria-hidden="true"></i> 
                            &nbsp;Iniciar Sesion.                        
                        </a>
                    </div>                    
                </div>
                <div class="row hidden-xs hidden-sm">
                    <div class="col-md-12 col-lg-12">
                        <ul class="social-links ">
                            <li ><h3 class="p-5 mb-5 ">
                               Visitanos
                               <i class="fa fa-hand-o-right" aria-hidden="false"></i></h3>
                            </a></li>
                            <li><a target="_blank" title="Facebook" href="https://web.facebook.com/Escuela-de-Aeromodelismo-Bello-Horizonte-EABH-563453077461356/"><i
                                            class="fa fa-fw fa-facebook-official"></i></a></li>
                            <li><a target="_blank" title="YouTube" href="https://www.youtube.com/channel/UCQPGLfndh8iRbJLIMmqr1xA?view_as=subscriber"><i
                                            class="fa fa-fw fa-youtube"></i></a></li>
                            <li><a target="_blank" title="Instagram" href="https://www.instagram.com/aeromodelismo_bello_horizonte/"><i
                                            class="fa fa-fw fa-instagram"></i></a></li>
                            
                        </ul>
                    </div>
                </div>
            </div><!--/.col-->
        </div><!--/.row-->
    </div><!--/.container-->
        <div class="navtop">
        <div class="container">
            <div class="row">
                <div class="col-md-3 relative">
                    <a class="logo" title="Home" href="home.php">
                        <img alt="E.A.R.H  Logo" src="../asset/raul/imagenes/logo.png" height="180" width="150">
                    </a>
                </div>
                <div class="col-md-9">
                    <nav class="navbar">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="offcanvas"
                                    data-target="#mobile-nav" aria-expanded="false" aria-controls="navbar">
                                <span class="sr-only">Toggle Navigation</span>
                                <i class="fa fa-bars" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div id="navbar" class="navbar-collapse collapse hidden-md hidden-lg">
                            <ul class="nav navmenu-nav navbar-right">
                                <li class=><a title="Home" href="home.php">HOME</a></li>
                                <li><a title="Show" href="nosotros.php">NOSOTROS</a></li>
                                <li><a title="Articles" href="productos.php">PRODUCTOS</a></li>
                                <li><a title="Get Started" href="contactanos.php">CONTACTO</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div><!--/.row-->
        </div><!--/.container-->
    </div><!--/.nav-top-->

    <div class="container">
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Iniciar sesion</h4>
                </div>
                <div class="modal-body">
                <p>Some text in the modal.</p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
            
        </div>
    </div>
  
</div>

</header>