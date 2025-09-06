import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Equipment extends Model {
  public id!: number;
  public nome!: string;
  public areaId!: number;
  public tipo!: string;
}

Equipment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    tipo: { type: DataTypes.STRING, allowNull: false },     // <-- adicionar
    areaId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "equipments", timestamps: true }
);

export default Equipment;
