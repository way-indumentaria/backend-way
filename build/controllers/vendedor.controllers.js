"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendedorController = void 0;
const database_1 = require("../routes/database");
class vendedorController {
    listaVendedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let vendedores = yield db.query('select v.id_vendedor, v.nombre, v.apellido, v.dni, v.domicilio, v.email, l.descripcion as descripcion, l.id_localidad as id_localidad , v.adjunto, v.telefono, v.nom_garante, v.ape_garante, v.email_garante, v.dni_garante, v.domicilio_garante, v.telefono_garante, v.estado from vendedor v,localidad l where v.localidad = l.id_localidad order by v.nombre asc');
                res.json(vendedores);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    guardarVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let vendedor = req.body;
                yield db.query('insert into vendedor set ?', [vendedor]);
                res.json('El vendedor fue guardado exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    eliminarVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                yield db.query("delete from vendedor where id_vendedor = ?", [codigo]);
                res.json('El vendedor se elimino exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json("No se puede eliminar un vendedor que este siendo utilizado por una venta");
            }
        });
    }
    actualizarVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                let vendedor_actualizado = req.body;
                yield db.query("update vendedor set ? where id_vendedor = ?", [vendedor_actualizado, codigo]);
                res.json("Se actualizo exitosamente");
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    obtenerUnVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                let unVendedor = yield db.query("select * from vendedor where id_vendedor = ?", [codigo]);
                res.json(unVendedor[0]);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.vendedorController = vendedorController;
