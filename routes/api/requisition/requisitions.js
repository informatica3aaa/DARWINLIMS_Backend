import { Router } from 'express';
import * as CoreRequisition from './core-requisition';

class Requisition{
    constructor(){
        const api = Router();

        api.post('/list',this.listar); 
        api.post('/buscar', this.buscar)
        api.post('/filter', this.filtros)
        api.post('/add', this.add)
        api.post('/mail', this.correoClientes)
        api.post('/ingresos', this.listarIngresos)
        api.post('/ingresos/byestado', this.listarIngresosbyEstado)
        return api;
    };


    async correoClientes(req, res) {

        try {
            let requi = await CoreRequisition.mailClientes(req.body)
            return res.status(200).json({ ok: true, data: requi, }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }

    }




    async listar(req, res) {

        try {
            const validar = await CoreRequisition.validaListar(req.body);
            let contador = await CoreRequisition.contador(req.body)
            let requi = await CoreRequisition.getAll(req.body)
            return res.status(200).json({ ok: true, data: requi, cantidad: contador }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }

    }

    async buscar(req, res) {

        try {
            const validar = await CoreRequisition.validaBuscar(req.body);
            let requi = await CoreRequisition.getUni(req.body)
               return res.status(200).json({ ok: true, data: requi }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }

    }

    async filtros(req, res) {

        try {
            let validar = await CoreRequisition.validarFiltros(req.body);
            let requi = await CoreRequisition.getFiltros(req.body)
               return res.status(200).json({ ok: true, data: requi }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }

    }

    async add(req, res) {
        try {
            const validaAdd = await CoreRequisition.validaAdd(req.body);
            const validarQuo = await CoreRequisition.validaQuo(req.body);
            const requi = await CoreRequisition.add(req.body, req.user);
            return res.status(200).json({ ok: true, data: requi }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }
    }

    async listarIngresos(req, res) {
        try {
            const result = await CoreRequisition.listarIngresos(req.body);
            const contador = await CoreRequisition.contadorIngresos();
            
            return res.status(200).json({ ok: true, cantidad: contador , data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }
    }
    async listarIngresosbyEstado(req, res) {
        try {
            const result = await CoreRequisition.getListarIngresoByEstado(req.body);
            const contador = await CoreRequisition.contadorIngresosByEstado(req.body);
            
            return res.status(200).json({ ok: true, cantidad: contador , data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }
    }



}
export default Requisition;