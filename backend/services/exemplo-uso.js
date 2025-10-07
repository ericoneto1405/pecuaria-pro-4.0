/**
 * EXEMPLOS DE USO DO SISTEMA DE ANIMAIS
 * Demonstra como usar os geradores
 */

const GeradorAnimais = require('./GeradorAnimais');
const GeradorRegistros = require('./GeradorRegistros');
const SistemaGenetico = require('./SistemaGenetico');

// ========== EXEMPLO 1: Gerar Animal Puro ==========
console.log('=== EXEMPLO 1: Animal Nelore Puro ===\n');

const nelore = GeradorAnimais.gerarAnimalPuro('Nelore', 'M', 'elite');
console.log('ID:', nelore.id);
console.log('Nome:', nelore.nome);
console.log('Raça:', nelore.raca_principal);
console.log('Registro:', nelore.registro?.numero_completo);
console.log('Idade:', nelore.idade_meses, 'meses');
console.log('Peso:', nelore.peso_kg, 'kg');
console.log('Nota Genética:', nelore.genotipo.nota_genetica.toFixed(2));
console.log('Nota Fenotípica:', nelore.fenotipo.nota_fenotipica.toFixed(2));
console.log('Valor:', 'R$', nelore.valor_mercado.toLocaleString('pt-BR'));
console.log('\n');

// ========== EXEMPLO 2: Gerar Animal F1 ==========
console.log('=== EXEMPLO 2: Animal F1 Nelore × Angus ===\n');

const f1 = GeradorAnimais.gerarAnimalF1('Nelore', 'Angus', 'F');
console.log('ID:', f1.id);
console.log('Nome:', f1.nome);
console.log('Raça:', f1.raca_principal);
console.log('Composição:', f1.composicao_racial);
console.log('Heterose:', (f1.heterose.coeficiente * 100).toFixed(0) + '%');
console.log('Bônus Heterose:');
console.log('  - Hab. Materna:', (f1.heterose.bonus.habilidade_materna * 100).toFixed(1) + '%');
console.log('  - Fertilidade:', (f1.heterose.bonus.fertilidade * 100).toFixed(1) + '%');
console.log('  - Ganho Peso:', (f1.heterose.bonus.ganho_peso * 100).toFixed(1) + '%');
console.log('Valor:', 'R$', f1.valor_mercado.toLocaleString('pt-BR'));
console.log('\n');

// ========== EXEMPLO 3: Gerar Santa Gertrudis (Raça Composta) ==========
console.log('=== EXEMPLO 3: Santa Gertrudis (Raça Composta) ===\n');

const santa = GeradorAnimais.gerarAnimalRacaComposta('Santa Gertrudis', 'M', 'boa');
console.log('ID:', santa.id);
console.log('Nome:', santa.nome);
console.log('Raça:', santa.raca_principal);
console.log('Registro:', santa.registro?.numero_completo);
console.log('Composição Fixa:', santa.composicao_racial);
console.log('Heterose:', santa.heterose.tipo, '- permanente');
console.log('Pelagem:', santa.fenotipo.pelagem);
console.log('Chifres:', santa.fenotipo.chifres);
console.log('Valor:', 'R$', santa.valor_mercado.toLocaleString('pt-BR'));
console.log('\n');

// ========== EXEMPLO 4: Gerar Mestiço ==========
console.log('=== EXEMPLO 4: Mestiço Complexo ===\n');

const mestico = GeradorAnimais.gerarAnimalMestico({
  'Nelore': 0.5,
  'Angus': 0.25,
  'Brahman': 0.25
}, 'F');
console.log('ID:', mestico.id);
console.log('Nome:', mestico.nome);
console.log('Classificação:', mestico.raca_principal);
console.log('Composição (interna):', mestico.composicao_racial);
console.log('Registro:', mestico.registro || 'Sem registro');
console.log('Valor:', 'R$', mestico.valor_mercado.toLocaleString('pt-BR'));
console.log('\n');

// ========== EXEMPLO 5: Gerar Lote de Animais ==========
console.log('=== EXEMPLO 5: Lote de 5 Animais Nelore ===\n');

const lote = GeradorAnimais.gerarLote(5, {
  racas: ['Nelore'],
  sexos: { M: 0.2, F: 0.8 }, // 20% machos, 80% fêmeas
  qualidade: 'media',
  tipo: 'puro',
  idade_min: 24,
  idade_max: 48
});

lote.forEach((animal, i) => {
  console.log(`${i+1}. ${animal.nome} (${animal.sexo}) - ${animal.idade_meses} meses - R$ ${animal.valor_mercado.toLocaleString('pt-BR')}`);
});
console.log('\n');

// ========== EXEMPLO 6: Listar Associações ==========
console.log('=== EXEMPLO 6: Associações Disponíveis ===\n');

const associacoes = GeradorRegistros.listarAssociacoes();
associacoes.forEach(a => {
  console.log(`${a.sigla} - ${a.nome}`);
  console.log(`  Raças: ${a.racas.join(', ')}`);
  console.log(`  Site: ${a.website}`);
  console.log('');
});

// ========== EXEMPLO 7: Gerar Girolando (Graus de Sangue) ==========
console.log('=== EXEMPLO 7: Girolando (Raça Composta Leiteira) ===\n');

const girolando = GeradorAnimais.gerarAnimalRacaComposta('Girolando', 'F', 'boa');
console.log('ID:', girolando.id);
console.log('Nome:', girolando.nome);
console.log('Raça:', girolando.raca_principal);
console.log('Registro:', girolando.registro?.numero_completo);
console.log('Composição:', girolando.composicao_racial);
console.log('Produção estimada:', girolando.genotipo.genetica.producao_leite || 'N/A', 'litros/dia');
console.log('\n');

// ========== EXEMPLO 8: Comparar Taurino vs Zebuíno ==========
console.log('=== EXEMPLO 8: Comparação Taurino vs Zebuíno ===\n');

const angus = GeradorAnimais.gerarAnimalPuro('Angus', 'M', 'elite');
const nelore2 = GeradorAnimais.gerarAnimalPuro('Nelore', 'M', 'elite');

console.log('ANGUS (Taurino):');
console.log('  Ganho Peso:', angus.genotipo.genetica.ganho_peso_diario.toFixed(2), 'kg/dia');
console.log('  Qualidade Carne:', angus.genotipo.genetica.qualidade_carne.toFixed(1));
console.log('  Resistência:', angus.genotipo.genetica.resistencia_doencas.toFixed(1));
console.log('');
console.log('NELORE (Zebuíno):');
console.log('  Ganho Peso:', nelore2.genotipo.genetica.ganho_peso_diario.toFixed(2), 'kg/dia');
console.log('  Qualidade Carne:', nelore2.genotipo.genetica.qualidade_carne.toFixed(1));
console.log('  Resistência:', nelore2.genotipo.genetica.resistencia_doencas.toFixed(1));
console.log('\n');

console.log('=== FIM DOS EXEMPLOS ===');

