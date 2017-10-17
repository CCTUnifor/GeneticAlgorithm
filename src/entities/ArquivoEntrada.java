package entities;

import utils.GerenciadorDeIO;
import utils.GlobalVariables;

import java.io.IOException;
import java.util.ArrayList;
import java.util.stream.Collectors;

public class ArquivoEntrada {
    private int quantidadeDeCidades;
    private ArrayList<Coordenada> coordenadas;

    public ArquivoEntrada() {
        this.coordenadas = new ArrayList<Coordenada>();
    }

    public void carregarArquivoEntrada() throws IOException {
        ArrayList<String> linhas = GerenciadorDeIO.getArquivoEntrada(GlobalVariables.ARQUIVO_ENTRADA);
        this.quantidadeDeCidades = Integer.parseInt(linhas.get(0));
        linhas.remove(0);
        this.coordenadas = (ArrayList<Coordenada>) linhas.stream().map(x -> new Coordenada(Integer.parseInt(x.split(" ")[0]), Integer.parseInt(x.split(" ")[1]))).collect(Collectors.toList());
    }

    public int getQuantidadeDeCidades() {
        return quantidadeDeCidades;
    }

    public ArrayList<Coordenada> getCoordenadas() {
        return coordenadas;
    }
}
