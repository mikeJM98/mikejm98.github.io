<html>
   <body>
      <form action="foto_post.php" method="post" enctype="multipart/form-data">
        <label for="archivo">Sube un archivo:</label>
        <input type="file" name="archivo" id="archivo" />
        <input type="submit" name="boton" value="Subir" />
      </form>
      <div class="resultado"> <!-- Aqui ira el codigo PHP --> </div>
   </body>
</html>