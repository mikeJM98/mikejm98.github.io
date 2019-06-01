<?php
require_once("head.php");
require_once("nav.php");
?>
    <div id="Productos-page">
        <div class="container">

            <div class="section-header">
                <h1 class="section-heading">Productos</h1>
                <p class="section-heading-byline">Nuestros Nuevos Productos</p>
            </div><!--/.section-header-->
            
            <div class="create-article">
                    <div class="row">
                      <div class="col-sm-12 col-md-12">
                          <div class="row">
                            <?php
                            for ($i=0; $i < 12; $i++) { ?> 
                                <div class="col-sm-6 col-md-3">
                                    <div class="content-item featured-article text-center">
                                        <div class="image-correction">
                                            <a href="#modal" class="permalink">
                                                <img class="poster" alt="producto1" src="../asset/raul/imagenes/festival.jpeg">
                                            </a>
                                        </div><!--/.image-->
                                        <h2 class="title">
                                            <a href="#modal" class="text-primary">Nombre del Producto</a>
                                        </h2>
                                        <div class="text-center ">
                                            <button type="submit" class="btn btn-primary btn-lg"  data-toggle="modal" data-target=".bs-example-modal-lg">Ver</button>
                                        </div>
                                    </div><!--/.featured-article-->
                                </div><!--/.col-->
                            <?php } ?>
                            </div><!--/.row-->
                      </div><!--/.col-->
                  </div>
              </div>
            </div>
        </div>
    </div>
            
<!-- Large modal -->
<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="row">
            <div class="col col-sm-5 text-center">
                <br><br>  
                <img src="../asset/raul/imagenes/festival.jpeg" alt="producto" width="300" height="300">                           
            </div>
            <div class="col col-sm-7">
                <div class="">
                    <h3>Nombre del producto: <em>avion</em></h3>
                </div>
                <div class="">
                    <h3>codigo del producto: <em>1244524</em></h3>
                </div>
                <div class="">
                    <h3>descripcion:</h3>
                    <h4><em>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi suscipit aperiam assumenda sint saepe ducimus recusandae dolore molestias, commodi neque, exercitationem sapiente iure architecto in repellat quaerat tenetur aliquam!</em></h3>
                </div>
                <div class="">
                    <h3>Precio del producto: <em>s./ 524</em></h3>
                </div>
                <div class="text-center">
                    <a href="contactanos.php" class="btn btn-primary btn-lg">Ver</a>
                    <br>
                    -
                </div>
            </div>
        </div>
    </div>
  </div>
</div>

<?php
require_once("footer.php");
?>