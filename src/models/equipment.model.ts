import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Area from "./area.model";

interface EquipmentAttributes {
  id: number;
  nome: string;
  areaId: number;
  tipo: string;
}

interface EquipmentCreationAttributes extends Optional<EquipmentAttributes, "id"> {}

class Equipment extends Model<EquipmentAttributes, EquipmentCreationAttributes> implements EquipmentAttributes {
  public id!: number;
  public nome!: string;
  public areaId!: number;
  public tipo!: string;

  // ✅ Associação
  public area?: Area; // <- adiciona para TypeScript reconhecer

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Equipment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    tipo: { type: DataTypes.STRING, allowNull: false },
    areaId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "equipments", timestamps: true }
);

export default Equipment;
