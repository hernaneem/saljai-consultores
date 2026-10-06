// Contacto oculto: arma enlaces de correo y teléfono en el navegador para que la dirección
// no aparezca en el HTML. Uso: <a data-contacto="correo" data-u="hola" data-d="ejemplo.mx"></a>
//   correo   -> mailto:u@d
//   telefono -> tel:+cifras (u+d en dos atributos; se aceptan espacios, guiones y paréntesis y se conservan en el texto,
//               p. ej. data-u="+52 55 " data-d="1234-5678" -> texto "+52 55 1234-5678", href tel:+525512345678)
// Si el enlace ya trae texto se respeta; si está vacío se rellena con la dirección.
(function () {
  var SEGURO = /^[A-Za-z0-9._+\-]+$/;
  var TELEFONO = /^[+0-9 ().\-]+$/;

  function armar(raiz) {
    var enlaces = raiz.querySelectorAll('[data-contacto]');
    for (var i = 0; i < enlaces.length; i++) {
      var a = enlaces[i];
      var tipo = a.dataset.contacto;
      var u = a.dataset.u || '';
      var d = a.dataset.d || '';
      if (tipo === 'telefono') {
        if (!TELEFONO.test(u) || !TELEFONO.test(d)) continue;
      } else if (!SEGURO.test(u) || !SEGURO.test(d)) {
        continue;
      }
      var texto;
      if (tipo === 'correo') {
        texto = u + '@' + d;
        a.setAttribute('href', 'mailto:' + texto);
      } else if (tipo === 'telefono') {
        // El texto conserva espacios, guiones y paréntesis; el href lleva solo las cifras y un + inicial.
        texto = (u + d).trim();
        var cifras = texto.replace(/\D/g, '');
        if (cifras.length < 7) continue;
        a.setAttribute('href', 'tel:' + (texto.charAt(0) === '+' ? '+' : '') + cifras);
      } else {
        continue;
      }
      if (!a.textContent || !a.textContent.trim()) a.textContent = texto;
    }
  }

  window.ContactoOculto = { armar: armar };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { armar(document); });
  } else {
    armar(document);
  }
})();
