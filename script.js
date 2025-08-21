function calculaLPS(palavra) {
    const lps = Array(palavra.length).fill(0);
    let comprimento = 0;
    let i = 1;

    while (i < palavra.length) {
        if (palavra[i] === palavra[comprimento]) {
            comprimento++;
            lps[i] = comprimento;
            i++;
        } else {
            if (comprimento !== 0) {
                comprimento = lps[comprimento - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

function kmpVisual(texto, palavra) {
    const lps = calculaLPS(palavra);
    let i = 0, j = 0;
    const posicoes = [];

    console.log("Texto:  " + texto);
    console.log("Palavra: " + palavra);
    console.log("LPS:    " + lps.join(" "));

    while (i < texto.length) {
        console.log(`\nComparando texto[${i}]='${texto[i]}' com palavra[${j}]='${palavra[j]}'`);
        
        if (texto[i] === palavra[j]) {
            i++;
            j++;
            console.log("Iguais, avançando ambos os índices");
        } 

        if (j === palavra.length) {
            console.log(`Palavra encontrada na posição ${i - j}`);
            posicoes.push(i - j);
            j = lps[j - 1];
            console.log(`Voltando j para ${j} usando LPS`);
        } else if (i < texto.length && texto[i] !== palavra[j]) {
            if (j !== 0) {
                console.log(`Erro, j > 0, atualizando j de ${j} para ${lps[j - 1]} usando LPS`);
                j = lps[j - 1];
            } else {
                console.log(`Erro, j = 0, apenas avançando i`);
                i++;
            }
        }
    }

    console.log("\nTodas as ocorrências encontradas nas posições:", posicoes);
    return posicoes;
}

// Exemplo de uso:
const texto = "AABAACAADAABAABA";
const palavra = "AABA";

kmpVisual(texto, palavra);
