1.  *Modelo Genético Híbrido:*
    * *Características Quantitativas (Poligênicas):* Para *Ganho de Peso Diário (kg/dia), **Habilidade Materna (escala 0-100%), **Fertilidade (% de chance de concepção), **Resistência a Doenças (escala 0-100%)* e *Qualidade da Carne (escala 0-100%), cada bovino terá um valor genético. O valor do bezerro será a **média dos pais + variação aleatória, inversamente proporcional à **heritabilidade* (ex: Ganho de Peso ~0.4, Habilidade Materna ~0.2, Fertilidade ~0.1, Resistência ~0.2, Qualidade Carne ~0.5).
    * *Características Qualitativas (Mendelianas):* Para *Cor da Pelagem* (2-3 genes com dominância/recessividade/codominância) e *Presença/Ausência de Chifres* (mocho dominante 'P', chifres recessivo 'p'). Use a lógica do *Quadro de Punnett*.

2.  *Influência Ambiental:*
    * O *fenótipo final* de um bovino (o que o jogador "vê") será o valor genético *mais um componente ambiental aleatório*.

3.  *Sistema de Raças e Genética Específica:*
    * Cada bovino terá uma *Raça Principal. O sistema deve permitir **cruzamentos. Defina **valores genéticos médios e desvios padrão* para cada raça nas características quantitativas, refletindo suas especializações:
        * *Raças Taurinas:* Angus (alta Qualidade da Carne, bom Ganho de Peso e Fertilidade), Hereford (ótimo Ganho de Peso, boa Qualidade da Carne), Charolês (maior Ganho de Peso, alta Qualidade da Carne), Senepol (bom Ganho de Peso, boa Resistência a Doenças e Habilidade Materna para um taurino, alta Qualidade da Carne), Bonsmara (boa Resistência a Doenças e Fertilidade, excelente Habilidade Materna).
        * *Raças Zebuínas:* Nelore (alta Resistência a Doenças, rusticidade, bom Ganho de Peso, Habilidade Materna sólida), Brahman (alta Resistência a Doenças, Habilidade Materna e Ganho de Peso), Tabapuã (boa Habilidade Materna, Ganho de Peso, dócil), Guzerá (excelente Habilidade Materna, alta Resistência a Doenças), Sindi (alta Resistência a Doenças, Habilidade Materna).

4.  *Recursos Avançados:*
    * *Endogamia:* Calcule o *grau de parentesco* entre os pais. Alta endogamia aumenta a chance de *genes deletérios* (menor Fertilidade, maior Suscetibilidade a Doenças, redução geral nos valores genéticos).
    * *Heterose:* Cruzamentos entre raças *geneticamente distantes* devem gerar um *bônus nos valores genéticos quantitativos*, especialmente em Habilidade Materna, Fertilidade e Ganho de Peso.

5.  *Genealogia e Raças Mistas (Visão do Jogador):*
    * Bovinos puros terão *genealogia rastreável* (IDs do pai/mãe, etc.).
    * Mestiços *não terão genealogia de raça específica visível ao jogador*, sendo representados como "Mestiço" ou "X% Raça1 / Y% Raça2". O sistema deve rastrear internamente a porcentagem de cada raça.

6.  *Sistemas de Reprodução:*
    * *Central de Sêmen (IATF):* Crie uma classe ⁠ CentralSemen ⁠ para gerenciar a oferta de touros. Ela deve *gerar e armazenar touros de alta qualidade genética* para cada raça, com *nomes aleatórios. A ⁠ CentralSemen ⁠ deve implementar um mecanismo de *"renovação" periódica** de seus touros para evitar endogamia e oferecer variedade. Implemente a funcionalidade para o jogador *"apresentar" um touro de sua fazenda à Central de Sêmen*; se aceito, o jogador é recompensado.
    * *Cobertura Natural:* O ⁠ SistemaReproducao ⁠ deve permitir o acasalamento por cobertura natural *apenas se um macho e uma fêmea estiverem no mesmo pasto e a fêmea estiver em cio*. A chance de concepção será influenciada pela fertilidade de ambos.

7.  *Estrutura do Código em Python:*
    * Crie classes ⁠ Bovino ⁠, ⁠ SistemaReproducao ⁠ e ⁠ CentralSemen ⁠.
    * Utilize a biblioteca padrão ⁠ random ⁠ para aleatoriedade.
    * O código deve ser modular, bem comentado e com exemplos de definição de heritabilidades e valores genéticos base por raça, além da inicialização da ⁠ CentralSemen ⁠ e a lógica de renovação/adição de touros, e a lógica para cobertura natural.
