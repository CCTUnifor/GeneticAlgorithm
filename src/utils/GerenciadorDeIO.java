package utils;

import entities.ArquivoEntrada;
import entities.Coordenada;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.ArrayList;

public class GerenciadorDeIO {
    public static ArrayList<String> getArquivoEntrada(String diretorio) throws IOException {
        RandomAccessFile randomAccessFile = new RandomAccessFile(diretorio, "r");
        ArrayList<String> linhas = new ArrayList<String>();

        String linhaAux = null;

        do {
            linhaAux = randomAccessFile.readLine();
            if (linhaAux != null)
                linhas.add(linhaAux);

        } while (linhaAux != null);

        randomAccessFile.close();
        return linhas;
    }
}
