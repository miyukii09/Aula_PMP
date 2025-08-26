package com.carro.carro.controller;

import com.carro.carro.model.Carros;
import com.carro.carro.model.TipoCarros;
import com.carro.carro.service.CarrosService;
import com.carro.carro.service.TipoCarrosService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class NavegacaoController {

    private static final Logger logger = LoggerFactory.getLogger(NavegacaoController.class);

    @Autowired
    private CarrosService carrosService;

    @Autowired
    private TipoCarrosService tipoCarrosService;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("section", "home");
        return "index";
    }

    @GetMapping("/cadastrarCarros")
    public String cadastrarCarros(Model model) {
        model.addAttribute("section", "cadastrarCarros");
        try {
            model.addAttribute("carros", carrosService.listarTodos());
            model.addAttribute("tipos", tipoCarrosService.listarTodos());
        } catch (Exception e) {
            logger.error("Erro ao carregar dados para cadastrarCarros", e);
            model.addAttribute("mensagem", "Erro ao carregar dados: " + e.getMessage());
        }
        return "index";
    }

    @PostMapping("/cadastrarCarros")
    public String salvarCarro(@ModelAttribute Carros carro, Model model) {
        try {
            if (carro.getTipoCarros() != null && carro.getTipoCarros().getId() != null) {
                TipoCarros tipo = tipoCarrosService.listarTodos().stream()
                        .filter(t -> t.getId().equals(carro.getTipoCarros().getId()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Tipo de carro com ID " + carro.getTipoCarros().getId() + " não encontrado."));
                carro.setTipoCarros(tipo);
            }
            carrosService.salvar(carro);
            model.addAttribute("mensagem", "Carro adicionado com sucesso!");
        } catch (Exception e) {
            logger.error("Erro ao salvar carro", e);
            model.addAttribute("mensagem", "Erro ao adicionar carro: " + e.getMessage());
        }
        model.addAttribute("section", "cadastrarCarros");
        model.addAttribute("carros", carrosService.listarTodos());
        model.addAttribute("tipos", tipoCarrosService.listarTodos());
        return "index";
    }

    @GetMapping("/cadastrarTipoCarro")
    public String cadastrarTipoCarro(Model model) {
        model.addAttribute("section", "cadastrarTipoCarro");
        try {
            model.addAttribute("tipos", tipoCarrosService.listarTodos());
        } catch (Exception e) {
            logger.error("Erro ao carregar tipos", e);
            model.addAttribute("mensagem", "Erro ao carregar tipos: " + e.getMessage());
        }
        return "index";
    }

    @PostMapping("/cadastrarTipoCarro")
    public String salvarTipoCarro(@ModelAttribute TipoCarros tipo, Model model) {
        try {
            tipoCarrosService.salvar(tipo);
            model.addAttribute("mensagem", "Tipo adicionado com sucesso!");
        } catch (Exception e) {
            logger.error("Erro ao salvar tipo", e);
            model.addAttribute("mensagem", "Erro ao adicionar tipo: " + e.getMessage());
        }
        model.addAttribute("section", "cadastrarTipoCarro");
        model.addAttribute("tipos", tipoCarrosService.listarTodos());
        return "index";
    }

    @GetMapping("/buscaPlaca")
    public String buscaPlaca(@RequestParam(value = "placa", required = false) String placa, Model model) {
        model.addAttribute("section", "buscaPlaca");
        try {
            if (placa != null) {
                model.addAttribute("carroBusca", carrosService.buscarPorPlaca(placa).orElse(null));
            }
        } catch (Exception e) {
            logger.error("Erro ao buscar por placa", e);
            model.addAttribute("mensagem", "Erro na busca: " + e.getMessage());
        }
        return "index";
    }

    @GetMapping("/contato")
    public String contato(Model model) {
        model.addAttribute("section", "contato");
        return "index";
    }

    @GetMapping("/api/carros/delete/{id}")
    public String deletarCarro(@PathVariable Long id, Model model) {
        try {
            carrosService.excluir(id);
            model.addAttribute("mensagem", "Carro excluído com sucesso!");
        } catch (Exception e) {
            logger.error("Erro ao excluir carro", e);
            model.addAttribute("mensagem", "Erro ao excluir carro: " + e.getMessage());
        }
        return "redirect:/cadastrarCarros";
    }
}