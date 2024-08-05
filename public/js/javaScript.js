document.querySelector('body').onload = async () => {
    const res = await fetch (`htp:// localhost:8080/add`);
    const datos = await res.json();
    let listaHtml = document.querySelector('#crearUsuario')
    listaHtml.innerHTML = ''
    datos.forEach(registro => {
        listaHtml.innerHTML = `
          <form action="/add?method=post" method="post">
            <label class="fomInputCrear"><h2>Crear:</h2> </label>
                <input type="number" name="control" placeholder="Número de control" required>
                <input type="number" name="lote" placeholder="Número de lote" required>
                <input type="text" name="direccion" placeholder="Dirección" required>            
                <input type="number" name="telefono" placeholder="Número de teléfono">
                <input type="text" name="nombre" placeholder="Nombre">
                <input type="text" name="javascript" placeholder="Formulario inyectado">
                <input type="submit" value="Crear">           
        </form>
        `
    });
}