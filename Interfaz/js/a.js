// Función para generar los campos de la Función Objetivo
document.getElementById('generarCampos').addEventListener('click', function() {
    const numVariables = document.getElementById('variable').value;
    const funcionZContainer = document.getElementById('funcionZ');

    funcionZContainer.innerHTML = '';

    if (numVariables > 0) {
        for (let i = 1; i <= numVariables; i++) {
            const signo = document.createElement('input');
            signo.type = 'text';
            signo.placeholder = '+/-';
            signo.name = `signo${i}`;
            signo.style.width = '30px';
            funcionZContainer.appendChild(signo);

            const coeficiente = document.createElement('input');
            coeficiente.type = 'text';
            coeficiente.placeholder = `Coef ${i}`;
            coeficiente.name = `coeficiente${i}`;
            funcionZContainer.appendChild(coeficiente);

            const variableLabel = document.createElement('span');
            variableLabel.innerText = `X${i} `;
            funcionZContainer.appendChild(variableLabel);
        }
    } else {
        alert("Por favor ingresa un número válido de variables.");
    }
});

// Función para limpiar los campos generados en la Función Objetivo
document.getElementById('limpiarCampos').addEventListener('click', function() {
    document.getElementById('funcionZ').innerHTML = '';
    document.getElementById('variable').value = '';
});

// Función para generar una nueva restricción
document.getElementById('generarRestriccion').addEventListener('click', function() {
    const numVariables = document.getElementById('numVariableRestriccion').value;
    const restriccionesContainer = document.getElementById('restricciones');

    if (numVariables > 0) {
        const restriccionDiv = document.createElement('div');
        restriccionDiv.classList.add('restriccion');

        // Agregar título de la restricción (R1, R2, etc.)
        const numRestricciones = restriccionesContainer.children.length + 1;
        const restriccionLabel = document.createElement('label');
        restriccionLabel.innerText = `R${numRestricciones} = `;
        restriccionDiv.appendChild(restriccionLabel);

        // Generar coeficientes y variables para la restricción
        for (let i = 1; i <= numVariables; i++) {
            const signo = document.createElement('input');
            signo.type = 'text';
            signo.placeholder = '+/-';
            signo.name = `signo${i}_restriccion${numRestricciones}`;
            signo.style.width = '30px';
            restriccionDiv.appendChild(signo);

            const coeficiente = document.createElement('input');
            coeficiente.type = 'text';
            coeficiente.placeholder = `Coef ${i}`;
            coeficiente.name = `coeficiente${i}_restriccion${numRestricciones}`;
            restriccionDiv.appendChild(coeficiente);

            const variableLabel = document.createElement('span');
            variableLabel.innerText = `X${i} `;
            restriccionDiv.appendChild(variableLabel);
        }

        // Espacio para la parte derecha de la restricción (<=, =, >= y valor)
        const comparacion = document.createElement('input');
        comparacion.type = 'text';
        comparacion.placeholder = '<=, =, >=';
        comparacion.style.width = '40px';
        restriccionDiv.appendChild(comparacion);

        const valorDerecho = document.createElement('input');
        valorDerecho.type = 'text';
        valorDerecho.placeholder = 'Valor';
        restriccionDiv.appendChild(valorDerecho);

        // Agregar la restricción al contenedor
        restriccionesContainer.appendChild(restriccionDiv);
    } else {
        alert("Por favor ingresa un número válido de variables para las restricciones.");
    }
});

// Función para reiniciar y limpiar todo
document.querySelectorAll('.elementosFun').forEach(button => {
    if (button.innerText === 'Reiniciar') {
        button.addEventListener('click', function() {
            // Limpiar Función Objetivo
            document.getElementById('funcionZ').innerHTML = '';
            document.getElementById('variable').value = '';

            // Limpiar restricciones
            document.getElementById('restricciones').innerHTML = '';
            document.getElementById('numVariableRestriccion').value = '';
        });
    }
});

/*
cont = 0;
        function crea_matriz(filas, columnas) {
            matriz = new Array(filas);
            for (i = 0; i < filas; i++) {
                matriz[i] = new Array(columnas)
                for (j = 0; j < columnas; j++) {
                    matriz[i][j] = 0;
                }
            }
        }
        function generaMatrizInputs() {
            var columnas = parseInt(document.getElementById('nd').value);
            var filas = parseInt(document.getElementById('nr').value);
            var fo = '';
            var aux = '';
            var matriz = '';
            var ceros = '';
            for (i = 1; i <= columnas; i++) {
                fo += '<input type="text" value="0" name="' + 'X' + i + '" id="' + 'X' + i + '" onClick="this.select();" required="required" style="text-align:right;" /> X' + i;
                ceros += 'X' + i;
                if (i != columnas) {
                    fo += ' + ';
                    ceros += ', ';
                }
            }
            document.getElementById('fo').innerHTML = '<p>Funcion Objetivo:</p>' + fo;
            for (i = 1; i <= filas; i++) {
                for (j = 1; j <= columnas; j++) {
                    aux += '<input type="text" value="0" name="' + i + 'X' + j + '" id="' + i + 'X' + j + '" onClick="this.select();" required="required" style="text-align:right;" /> X' + j;
                    if (j != columnas) {
                        aux += ' + ';
                    }
                }
                matriz += aux + ' ≤  <input type="text" value="0" name="' + 'R' + i + '" id="' + 'R' + i + '" onClick="this.select();" required="required"  /><br /><br />';
                aux = '';
            }
            document.getElementById('matriz').innerHTML = '<p>Restricciones:</p>' + matriz;
            ceros += ' ≥ 0';
            document.getElementById('ceros').innerHTML = ceros + '<p><input type="button" value="Resolver" id="btIterar" onClick="iterar()" /></p><hr />';
            document.getElementById('nd').readOnly = true;
            document.getElementById('nr').readOnly = true;
        }
        function genera_matriz() {
            var variables = parseInt(document.getElementById('nd').value);
            var restricciones = parseInt(document.getElementById('nr').value);
            crea_matriz(restricciones + 2, variables + restricciones + 2);
            matriz[0][0] = 'Z';
            matriz[restricciones + 1][0] = 1;
            matriz[0][variables + restricciones + 1] = 'Sol';
            for (i = 1; i <= variables; i++) {
                matriz[0][i] = 'X' + i;
            }
            for (i = 1; i <= restricciones; i++) {
                matriz[0][i + variables] = 'S' + i;
            }
            for (i = 1; i <= restricciones; i++) {
                for (j = 1; j <= variables; j++) {
                    matriz[i][j] = document.getElementById(i + 'X' + j).value;
                }
                matriz[i][variables + restricciones + 1] = document.getElementById('R' + i).value;
                for (j = 1; j <= restricciones; j++) {
                    matriz[i][i + variables] = 1;
                }
            }
            for (j = 1; j <= variables; j++) {
                matriz[restricciones + 1][j] = (document.getElementById('X' + j).value) * (-1);
            }
            imprime_tabla();
        }
        function imprime_tabla() {
            var variables = parseInt(document.getElementById('nd').value);
            var restricciones = parseInt(document.getElementById('nr').value);
            var filas = restricciones + 2;
            var columnas = variables + restricciones + 2;
            var tabla = '<p>Tabla ' + cont + ':</p><table style="text-align:center; border-color:#CCC;" border="1" cellspacing="0" cellpadding="0">';
            for (i = 0; i < filas; i++) {
                tabla += '<tr>';
                for (j = 0; j < columnas; j++) {
                    tabla += '<td>' + matriz[i][j] + '</td>';
                }
                tabla += '</tr>';
            }
            tabla += '</table>';
            document.getElementById('tabla').innerHTML += tabla;
            cont++;
        }
        function esFin() {
            var objetivo = document.getElementById('objetivo').value;
            var variables = parseInt(document.getElementById('nd').value);
            var restricciones = parseInt(document.getElementById('nr').value);
            if (objetivo == 'max') {
                for (j = 1; j <= variables; j++) {
                    if (matriz[restricciones + 1][j] < 0) {
                        return false;
                    }
                }
                return true;
            }
            if (objetivo == 'min') {
                for (j = 1; j <= variables; j++) {
                    if (matriz[restricciones + 1][j] > 0) {
                        return false;
                    }
                }
                return true;
            }
        }
        function encuentraPivoteJ() {
            var objetivo = document.getElementById('objetivo').value;
            var variables = parseInt(document.getElementById('nd').value);
            var restricciones = parseInt(document.getElementById('nr').value);
            var itemFila = matriz[restricciones + 1][1];
            pivoteJ = 1;
            if (objetivo == 'max') {
                for (j = 1; j <= variables; j++) {
                    if (matriz[restricciones + 1][j] < itemFila && matriz[restricciones + 1][j] != 0) {
                        itemFila = matriz[restricciones + 1][j];
                        pivoteJ = j;
                    }
                }
            }
            if (objetivo == 'min') {
                for (j = 1; j <= variables; j++) {
                    if (matriz[restricciones + 1][j] > itemFila && matriz[restricciones + 1][j] != 0) {
                        itemFila = matriz[restricciones + 1][j];
                        pivoteJ = j;
                    }
                }
            }
        }
        function encuentraPivoteI() {
            var restricciones = parseInt(document.getElementById('nr').value);
            var variables = parseInt(document.getElementById('nd').value);
            var razon = 0;
            var aux = Number.MAX_VALUE;
            pivoteI = 0;
            for (i = 1; i <= restricciones; i++) {
                razon = parseFloat(parseFloat(matriz[i][restricciones + variables + 1] / matriz[i][pivoteJ]));
                if (razon > 0 && razon < aux) {
                    aux = razon;
                    pivoteI = i;
                }
            }
        }
        function divideFila(i, n) {
            var variables = parseInt(document.getElementById('nd').value);
            var restricciones = parseInt(document.getElementById('nr').value);
            var ncolumnas = variables + restricciones + 2;
            for (j = 0; j < ncolumnas; j++) {
                matriz[i][j] = parseFloat(matriz[i][j]) / n;
            }
        }
        function iterar() {
            document.getElementById('btIterar').disabled = true;
            genera_matriz();
            var variables = parseInt(document.getElementById('nd').value);
            var restricciones = parseInt(document.getElementById('nr').value);
            var ncolumnas = variables + restricciones + 2;
            var itemAux = 0;
            var respuesta = '<p>Solución: </p>';
            while (esFin() == false) {
                encuentraPivoteJ();
                encuentraPivoteI();
                divideFila(pivoteI, matriz[pivoteI][pivoteJ]);
                for (i = 1; i <= (restricciones + 1); i++) {
                    itemAux = matriz[i][pivoteJ];
                    for (j = 0; j < ncolumnas; j++) {
                        if (i != pivoteI) {
                            matriz[i][j] = matriz[i][j] - (itemAux * matriz[pivoteI][j]);
                        }
                    }
                }
                imprime_tabla();
            }
            for (j = 1; j <= variables; j++) {
                for (i = 1; i <= restricciones; i++) {
                    if (matriz[i][j] == 1) {
                        respuesta += matriz[0][j] + ' = ' + matriz[i][variables + restricciones + 1] + ' <br />';
                    }
                }
            }
            respuesta += 'Z = ' + matriz[restricciones + 1][variables + restricciones + 1];
            document.getElementById('tabla').innerHTML += respuesta + '<p>Fin del proceso!</p><p><input type="button" value="Nuevo problema" onClick="location.reload()" /></p><hr />';
        }*/
