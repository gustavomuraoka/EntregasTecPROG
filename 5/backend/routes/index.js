const express = require('express');
const sequelize = require('../config/database');
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const Venda = require('../models/Venda');
const Telefone = require('../models/Telefone');
const PET = require('../models/Pet');
const RG = require('../models/RG');
const Servico = require('../models/Servico');
const Pet = require('../models/Pet');

const router = express.Router();

// CRUD para Clientes
router.post('/clientes', async (req, res) => {
  const cliente = await Cliente.create(req.body);
  res.status(201).json(cliente);
});

router.get('/clientes', async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});

router.get('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  res.json(cliente);
});

router.put('/clientes/:id', async (req, res) => {
  await Cliente.update(req.body, { where: { id: req.params.id } });
  res.status(204).send();
});

router.delete('/clientes/:id', async (req, res) => {
  await Cliente.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

// CRUD para Produtos
router.post('/produtos', async (req, res) => {
  const produto = await Produto.create(req.body);
  res.status(201).json(produto);
});

router.get('/produtos', async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
});

router.get('/produtos/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  res.json(produto);
});

router.put('/produtos/:id', async (req, res) => {
  await Produto.update(req.body, { where: { id: req.params.id } });
  res.status(204).send();
});

router.delete('/produtos/:id', async (req, res) => {
  await Produto.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

// CRUD para Serviços
router.post('/servicos', async (req, res) => {
  const produto = await Servico.create(req.body);
  res.status(201).json(produto);
});

router.get('/servicos', async (req, res) => {
  const produtos = await Servico.findAll();
  res.json(produtos);
});

router.get('/servicos/:id', async (req, res) => {
  const produto = await Servico.findByPk(req.params.id);
  res.json(produto);
});

router.put('/servicos/:id', async (req, res) => {
  await Servico.update(req.body, { where: { id: req.params.id } });
  res.status(204).send();
});

router.delete('/servicos/:id', async (req, res) => {
  await Servico.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

// Create e Read da Venda
router.post('/venda', async (req, res) => {
  const vendas = await Venda.create(req.body);
  res.status(201).json(vendas);
});

router.get('/venda', async (req, res) => {
  const vendas = await Venda.findAll({
    include: [
      { model: Produto, as: 'produto'},
      { model: Cliente, as: 'cliente'},
      { model: Servico, as: 'servico'},
      { model: Pet, as: 'pet'},
    ]
  });
  res.json(vendas);
});

// Relacionamento: Consultar Produtos de um Cliente
router.get('/clientes/:id/produtos', async (req, res) => {
  try {
    const clienteId = req.params.id;

    // Verificar se o cliente existe
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    // Buscar vendas do cliente com os produtos associados
    const vendas = await Venda.findAll({
      where: { clienteId },
      include: [
        {
          model: Produto,
          attributes: ['id', 'nome', 'preco'], // Personalize os campos retornados
        },
      ],
    });

    // Verificar se há vendas
    if (!vendas.length) {
      return res.status(404).json({ message: 'Nenhum produto encontrado para este cliente.' });
    }

    // Extrair os produtos das vendas
    const produtos = vendas.map((venda) => venda.produto);

    res.json({ produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos do cliente:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Create e Read de Telefone
router.post('/telefone', async (req, res) => {
  const telefones = await Telefone.create(req.body);
  res.status(201).json(telefones);
});

router.get('/telefone', async (req, res) => {
  const telefones = await Telefone.findAll();
  res.json(telefones);
});

// Rota para criar um RG (Create)
router.post('/rg', async (req, res) => {
  try {
    const { numero, dataEmissao, clienteCPF } = req.body;

    // Validação simples para verificar se o cliente existe
    const cliente = await Cliente.findOne({ where: { CPF: clienteCPF } });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado com o CPF fornecido' });
    }

    // Criação do RG
    const rg = await RG.create({ numero, dataEmissao, clienteCPF });
    res.status(201).json(rg);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para listar todos os RGs (Read)
router.get('/rg', async (req, res) => {
  try {
    const rgs = await RG.findAll({
      include: [
        {
          model: Cliente, // Inclui informações do Cliente associado
          attributes: ['nome', 'CPF'], // Apenas os campos necessários
        },
      ],
    });
    res.json(rgs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD DE PET
router.post('/pets', async (req, res) => {
  const pet = await PET.create(req.body);
  res.status(201).json(pet);
});

router.get('/pets', async (req, res) => {
  const pet = await PET.findAll();
  res.json(pet);
});

router.get('/pets/:id', async (req, res) => {
  const pet = await PET.findByPk(req.params.id);
  res.json(pet);
});

router.put('/pets/:id', async (req, res) => {
  await PET.update(req.body, { where: { id: req.params.id } });
  res.status(204).send();
});

router.delete('/pets/:id', async (req, res) => {
  await PET.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

// CRUD DE TELEFONE
router.post('/telefones', async (req, res) => {
  const telefone = await Telefone.create(req.body);
  res.status(201).json(telefone);
});

router.get('/telefones', async (req, res) => {
  const telefone = await Telefone.findAll();
  res.json(telefone);
});

router.get('/telefones/:id', async (req, res) => {
  try {
    const telefone = await Telefone.findOne({ where: { clienteId: req.params.id } });
    if (!telefone) {
      return res.status(404).json({ message: 'Telefone não encontrado' });
    }
    res.json(telefone);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o telefone' });
  }
});

router.put('/telefones/:id', async (req, res) => {
  try {
    const [updated] = await Telefone.update(req.body, { where: { clienteId: req.params.id } });
    if (updated === 0) {
      return res.status(404).json({ message: 'Telefone não encontrado para atualização' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o telefone' });
  }
});

router.delete('/telefones/:id', async (req, res) => {
  try {
    const deleted = await Telefone.destroy({ where: { clienteId: req.params.id } });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Telefone não encontrado para exclusão' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o telefone' });
  }
});

// Estatísticas

router.get('/estatisticas/quantidade', async (req, res) => {
  try {
    // Consulta ao banco de dados para obter os 10 clientes com mais vendas
    const clientesComMaisVendas = await Venda.findAll({
      attributes: [
        'clienteId',
        [sequelize.fn('COUNT', sequelize.col('clienteId')), 'totalVendas']
      ],
      include: [
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['nome']
        }
      ],
      group: ['clienteId', 'cliente.id'],
      order: [[sequelize.literal('totalVendas'), 'DESC']],
      limit: 10
    });

    // Formata os dados para a resposta
    const resultado = clientesComMaisVendas.map((registro) => ({
      clienteId: registro.clienteId,
      nome: registro.cliente.nome,
      totalVendas: registro.dataValues.totalVendas
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

router.get('/estatisticas/utilizacoes', async (req, res) => {
  try {
    // Seleciona os produtos com o número de vezes utilizados
    const produtos = await Venda.findAll({
      attributes: [
        [sequelize.col('produto.nome'), 'nome'],
        [sequelize.fn('COUNT', sequelize.col('produtoId')), 'numeroUtilizacoes'],
        [sequelize.literal("'Produto'"), 'tipo'] // Define o tipo como "Produto"
      ],
      include: [
        {
          model: Produto,
          as: 'produto',
          attributes: [] // Evita duplicação de atributos
        }
      ],
      group: ['produtoId', 'produto.nome'], // Agrupa pelo ID e nome do produto
      raw: true // Retorna os dados como objetos simples
    });

    // Seleciona os serviços com o número de vezes utilizados
    const servicos = await Venda.findAll({
      attributes: [
        [sequelize.col('servico.nome'), 'nome'],
        [sequelize.fn('COUNT', sequelize.col('servicoId')), 'numeroUtilizacoes'],
        [sequelize.literal("'Serviço'"), 'tipo'] // Define o tipo como "Serviço"
      ],
      include: [
        {
          model: Servico,
          as: 'servico',
          attributes: [] // Evita duplicação de atributos
        }
      ],
      group: ['servicoId', 'servico.nome'], // Agrupa pelo ID e nome do serviço
      raw: true // Retorna os dados como objetos simples
    });

    // Mescla produtos e serviços em um único array
    const utilizacoes = [...produtos, ...servicos];

    // Ordena pelo número de utilizações, em ordem decrescente
    utilizacoes.sort((a, b) => b.numeroUtilizacoes - a.numeroUtilizacoes);

    // Retorna o resultado em formato JSON
    res.json(utilizacoes);
  } catch (error) {
    console.error('Erro ao buscar estatísticas de utilizações:', error.message);
    res.status(500).json({ error: 'Erro ao buscar estatísticas de utilizações' });
  }
});

router.get('/estatisticas/raca-e-tipo', async (req, res) => {
  try {
    // Buscar todas as vendas associadas aos pets
    const vendas = await Venda.findAll({
      include: [
        {
          model: Pet,
          as: 'pet',
          attributes: ['id', 'tipo', 'raca'],  // Buscar tipo e raça do pet
        },
        {
          model: Produto,
          as: 'produto',
          attributes: ['nome'],  // Nome do produto
        },
        {
          model: Servico,
          as: 'servico',
          attributes: ['nome'],  // Nome do serviço
        },
      ],
    });

    // Agrupar as vendas por tipo de pet
    const vendasPorTipo = {};

    vendas.forEach((venda) => {
      const tipoPet = venda.pet.tipo;
      const racaPet = venda.pet.raca;
      const produtoNome = venda.produto ? venda.produto.nome : null;
      const servicoNome = venda.servico ? venda.servico.nome : null;

      // Se o tipo de pet ainda não existe no objeto, cria um objeto para ele
      if (!vendasPorTipo[tipoPet]) {
        vendasPorTipo[tipoPet] = {};
      }

      // Se a raça ainda não existe no tipo, cria um array para ela
      if (!vendasPorTipo[tipoPet][racaPet]) {
        vendasPorTipo[tipoPet][racaPet] = {
          servico: {},
          produto: {},
        };
      }

      // Contar a quantidade de serviços e produtos consumidos
      if (servicoNome) {
        vendasPorTipo[tipoPet][racaPet].servico[servicoNome] = (vendasPorTipo[tipoPet][racaPet].servico[servicoNome] || 0) + 1;
      }
      if (produtoNome) {
        vendasPorTipo[tipoPet][racaPet].produto[produtoNome] = (vendasPorTipo[tipoPet][racaPet].produto[produtoNome] || 0) + 1;
      }
    });

    // Encontrar os serviços e produtos mais consumidos por tipo e raça
    for (const tipoPet in vendasPorTipo) {
      for (const racaPet in vendasPorTipo[tipoPet]) {
        const servicos = vendasPorTipo[tipoPet][racaPet].servico;
        const produtos = vendasPorTipo[tipoPet][racaPet].produto;

        // Encontrar o serviço mais consumido
        const servicoMaisConsumido = Object.entries(servicos).reduce((max, entry) => {
          return entry[1] > max[1] ? entry : max;
        }, [null, 0]);

        // Encontrar o produto mais consumido
        const produtoMaisConsumido = Object.entries(produtos).reduce((max, entry) => {
          return entry[1] > max[1] ? entry : max;
        }, [null, 0]);

        // Atualizar o objeto com o nome do serviço e produto mais consumidos
        vendasPorTipo[tipoPet][racaPet].servico = servicoMaisConsumido[0] || 'Nenhum serviço';
        vendasPorTipo[tipoPet][racaPet].produto = produtoMaisConsumido[0] || 'Nenhum produto';
      }
    }

    // Retornar o resultado final
    return res.json(vendasPorTipo);

  } catch (error) {
    console.error('Erro ao buscar vendas por tipo e raça:', error);
    return res.status(500).json({ error: 'Erro ao buscar vendas por tipo e raça' });
  }
});

router.get('/estatisticas/clientes-valor', async (req, res) => {
  try {
    const clientesMaisConsumiram = await Venda.findAll({
      attributes: [
        'clienteId',
        [sequelize.fn('SUM', sequelize.col('valor')), 'totalConsumido']
      ],
      include: [
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['nome']
        }
      ],
      group: ['clienteId', 'cliente.id'],
      order: [[sequelize.literal('totalConsumido'), 'DESC']],
      limit: 5
    });

    // Formata os dados para a resposta
    const resultado = clientesMaisConsumiram.map((registro) => ({
      clienteId: registro.clienteId,
      nome: registro.cliente.nome,
      totalConsumido: parseFloat(registro.dataValues.totalConsumido)
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});


module.exports = router;