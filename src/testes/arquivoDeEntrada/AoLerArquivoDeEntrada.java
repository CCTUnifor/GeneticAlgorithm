package testes.arquivoDeEntrada;

import entities.ArquivoEntrada;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

public class AoLerArquivoDeEntrada {
    @Test
    public void QuantidadeDeCidadesDeveSerTrinta() throws IOException {
        ArquivoEntrada entrada = new ArquivoEntrada();
        entrada.carregarArquivoEntrada();

        Assert.assertEquals(entrada.getQuantidadeDeCidades(), 30);
    }

    @Test
    public void SizeDasCoordenadasDeveSerTrinta() throws IOException {
        ArquivoEntrada entrada = new ArquivoEntrada();
        entrada.carregarArquivoEntrada();

        Assert.assertEquals(entrada.getCoordenadas().size(), 30);
    }
}
