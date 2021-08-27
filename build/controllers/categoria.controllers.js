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
exports.categoriaController = void 0;
const database_1 = require("../routes/database");
class categoriaController {
    listaCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let categoria = yield db.query('select * from categoria');
                return res.json(categoria);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    guardarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let categoria = req.body;
                req.body.estado = Number(req.body.estado);
                yield db.query('insert into categoria set ?', [categoria]);
                res.json('La categoria fue guardada exitosamente');
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    eliminarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                yield db.query("delete from categoria where id_categoria = ?", [codigo]);
                return res.json('La categoria se elimino exitosamente');
            }
            catch (error) {
                return res.json("No se puede eliminar una categoria que este siendo utilizada por un producto");
            }
        });
    }
    actualizarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                let categoria_actualizado = req.body;
                yield db.query("update categoria set ? where id_categoria = ?", [categoria_actualizado, codigo]);
                res.json("Se actualizo exitosamente");
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    obtenerUnaCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                let unaCategoria = yield db.query("select * from categoria where id_categoria = ?", [codigo]);
                res.json(unaCategoria[0]);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
}
exports.categoriaController = categoriaController;
